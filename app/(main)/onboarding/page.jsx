"use client"


import { industries } from "@/app/data/industries"
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";

const OnboardingPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mt-10" width={"100%"} color="gray"/>
  }

  if (user) {
    return (
    <main>
        <OnboardingForm industries={industries}/>
    </main>
  )
  }
  
  
}

export default OnboardingPage
