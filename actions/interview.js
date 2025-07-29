"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
})

export async function generateQuiz() {
    const {userId} = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        })
    
        if (!user) throw new Error("User Not Found");

    try{
        const prompt = `
            Generate 10 technical interview questions for a ${
            user.industry
            } professional ${
            user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
        }.
            
            Each question should be multiple choice with 4 options.
            
            Return the response in this JSON format only, no additional text:
            {
            "questions": [
                {
                "question": "string",
                "options": ["string", "string", "string", "string"],
                "correctAnswer": "string",
                "explanation": "string"
                }
            ]
            }
        `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz =  JSON.parse(cleanedText);

    return quiz.questions; 
    }
    catch (error) {
        console.error("Error generating quiz: ", error);
        throw new Error("Failed to generate quiz questions")
    }
}

export async function saveQuizResult(questions, answers, score) {
    const {userId} = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        })
    
        if (!user) throw new Error("User Not Found");

        //   id               String   @id @default(uuid())
        //   userId           String
        //   user             User     @relation(fields: [userId], references: [id])
        //   quizScore        Float    
        //   questions        Json[]   // Array of question, answer, userAnswer, isCorrect
        //   category         String   //Technical, Behavioral, etc.
        //   improvementTip   String?
        //   createdAt        DateTime  @default(now())
        //   updatedAt        DateTime  @updatedAt

        const questionResults = questions.map((q, index)=>({
            question: q.question,
            answer: q.correctAnswer,
            userAnswer: answers[index],
            isCorrect: q.correctAnswer === answers[index],
            explanation: q.explanation
        }))

        //Make improvement tip with AI
        let improvementTip = null;
        const wrongAnswers = questionResults.filter((q)=>!q.isCorrect);

        if (wrongAnswers.length > 0) {
            const wrongQuestionsText = wrongAnswers.map(
                (q) => 
                    `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
            ).join("\n\n")

            const improvementPrompt = `
                The user got the following ${user.industry} technical interview questions wrong:

                ${wrongQuestionsText}

                Based on these mistakes, provide a concise, specific improvement tip.
                Focus on the knowledge gaps revealed by these wrong answers.
                Keep the response under 2 sentences and make it encouraging.
                Don't explicitly mention the mistakes, instead focus on what to learn/practice.
            `;

            try {
                const result = await model.generateContent(improvementPrompt);
                improvementTip = result.response.text().trim();
            }
            catch {
                console.error("Error generating improvement tip", error)
            }
        }

        //Add everything to the database
        try {
            const assessment = await db.assessment.create({
                data: {
                    userId: user.id,
                    quizScore: score,
                    questions: questionResults,
                    category: "Technical",
                    improvementTip,
                }
            })
            return assessment;
        }
        catch (error) {
            console.error("Error saving quiz result:", error);
            throw new Error("Failed to save quiz result")
        }
}

export async function getAssessments() {
    const {userId} = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    })

    if (!user) throw new Error("User Not Found");

    try {
        const assessments = await db.assessment.findMany({
            where:{
                userId: user.id
            },
            orderBy: {
                createdAt: "asc"
            },
        });
        return assessments;

    } catch (error) {

    }
}
