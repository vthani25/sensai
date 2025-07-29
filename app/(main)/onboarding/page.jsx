import { getUserOnboardingStatus } from "@/actions/user"
import { industries } from "@/app/data/industries"
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";
import { checkUser } from "@/lib/checkUser";

const OnboardingPage = async () => {
  // const { user } = await checkUser()

  // if (!user) {
  //   redirect("/sign-in")
  // }

  // const {isOnboarded} = await getUserOnboardingStatus();

  // if (isOnboarded) {
  //   redirect("/dashboard");
  // } else {
  //   redirect("/onboarding");
  // }

  return (
    <main>
        <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnboardingPage
