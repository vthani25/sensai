import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/DashboardView";
import { getIndustryInsights } from "@/actions/dashboard";

const IndustryInsightsPage = async () => {

  const {isOnboarded} = await getUserOnboardingStatus();
  const insights = await getIndustryInsights();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      <DashboardView insights={insights}/>
    </div>
  )
}

export default IndustryInsightsPage
