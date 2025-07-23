"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data){
    const {userId} = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId,
        },
    })

    if (!user) throw new Error("User Not Found");

    try{
    const result = await db.$transaction( 
        async (tx)=> {
        //find if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
            where: {
                industry: data.industry,
            }
        })
       // if industry doesnt exist, create it with default value for now 
       if (!industryInsight) {
            const insights = await generateAIInsights(data.industry)

            await db.industryInsight.create({
                data: {
                    industry: data.industry,
                    ...insights,
                    nextUpdate: new Date(Date.now()+7*24*60*60*1000)
                }
            });
        }

       //update user
       const updatedUser = await tx.user.update({
        where: {
            id:user.id,
        },
        data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
        },
       });
       return {updatedUser, industryInsight};
        }, 
        {timeout: 15000}
    );
    return {success: true, ...result};
    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile" + error.message);
    }
}


export async function getUserOnboardingStatus(){
    const {userId} = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })

    if (!user) throw new Error("User Not Found");

    try{
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                industry: true,
            },
        })

        return {
            isOnboarded: !!user?.industry,
        }
    } catch (error) {
        console.error("Error checking onboarding status", error.message);
        throw new Error("Failed to check onboarding status")
    }
}