import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/StatsCards";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";

const InterviewPage = async () => {

  const assessments = await getAssessments();

  return (
    <div className="space-y-6">
        <h1 className="text-6xl font-bold gradient-title pt-6">
          Interview Preparation
        </h1>

      <div className="space-y-6">
        <StatsCards assessments={assessments}/>
        <PerformanceChart assessments={assessments}/>
        <QuizList assessments={assessments}/>
      </div>
    </div>
  )
}

export default InterviewPage