"use client"

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import {useEffect, useState} from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([])
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        fn:generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz)

    const {
        loading: savingResult,
        fn:saveQuizResultFn,
        data: resultData,
        setData: setResultData
    } = useFetch(saveQuizResult)


    useEffect(()=>{
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null))
        }
    }, [quizData]);

    const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length-1) {
            setCurrentQuestion(currentQuestion+1)
            setShowExplanation(false);
        } else {
            finishQuiz()
        }
    };

    const calculateScore = () => {
        let correct = 0
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        })
        return (correct / quizData.length) * 100
    }

    const finishQuiz = async () => {
        const score = calculateScore();
        try {
            await saveQuizResultFn(quizData, answers, score)
            toast.success("Quiz completed!")
        } catch (error) {
            toast.error(error.message || "Failed to save quiz results.")
        }
    };

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />
    }

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
    }

    if (resultData) {
        return (
            <div className="mx-2">
                <QuizResult result="resultData" onStartNew={startNewQuiz}/>
            </div>
        )
    }

    if (!quizData) {
        return (
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Ready to test your knowledge? </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions specific to your industry and skills. Take your time and choose the best answer for each question.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={generateQuizFn}>Start Quiz</Button>
                </CardFooter>
            </Card>
        )
    }

    const question = quizData[currentQuestion]


  return (
    <Card className="mt-5">
        <CardHeader>
            <CardTitle>{currentQuestion+1} of {quizData.length} </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg font-medium mb-4">
            {question.question}</p>

            <RadioGroup className="space-y-2" 
            onValueChange={handleAnswer}
            value={answers[currentQuestion]}>
                {question.options.map((option, index)=>(
                    <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
            ))}
            </RadioGroup>

            {showExplanation && 
                <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="font-medium">Explanation: </p>
                    <p className="text-muted-foreground">{question.explanation}</p>
                </div>}
        </CardContent>
        <CardFooter>
            {!showExplanation && (
                // button to show explanation
                <Button
                onClick={() => setShowExplanation(true)}
                variant="outline"
                disabled={!answers[currentQuestion]}> Show Explanation 
                </Button>
            )}
            
            {/* button to move to next question */}
                <Button
                onClick={handleNext}
                className="ml-auto"
                disabled={!answers[currentQuestion] || savingResult}> 
                {savingResult && (
                    <Loader2 className="mr-2 h-4 w-4 animation-spin"/>
                )}

                {currentQuestion < quizData.length-1
                    ? "Next Question"
                    : "Finish Quiz"
                }
                </Button>
                
        </CardFooter>
    </Card>
  )
}

export default Quiz
