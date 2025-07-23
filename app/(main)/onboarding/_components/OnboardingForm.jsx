"use client"

import { onboardingSchema } from "@/lib/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const OnboardingForm = ({industries}) => {
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const router = useRouter();

    const 
    {register, handleSubmit, formState: {errors}, setValue, watch} = 
    useForm({
        resolver: zodResolver(onboardingSchema)
    })

    const onSubmit = async (values) => {
        console.log(values)
    }

    const watchIndustry = watch("industry");

    useEffect(() => {
        register("industry"); 
        register("subIndustry")
    }, [register]);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg mt-10 mx-2 bg-background">
        <CardHeader>
            <CardTitle className="gradient-title text-4xl">
            Complete Your Profile</CardTitle>
            <CardDescription>
            Select Your Industry to Get Personalized Career Insights</CardDescription>
        </CardHeader>
        <CardContent>
        
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Select Industry */}
                <div className="space-y-2 mb-4">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                        onValueChange={(value)=>{
                            setValue("industry", value, { shouldValidate: true });
                            setSelectedIndustry(industries.find((ind)=> ind.id === value));
                            setValue("subIndustry", "", { shouldValidate: true })
                        }}>
                        <SelectTrigger id="industry">
                            <SelectValue placeholder="Select an Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {industries.map((ind)=> (
                                <SelectItem value={ind.id} key={ind.id}>
                                    {ind.name} </SelectItem>
                            ))}
                            
                        </SelectContent>
                    </Select>
                    {errors.industry && (
                        <p className="text-sm text-red-500">Please select an industry</p>
                    )}
                </div>

                {/* Select Subindustry after industry*/}
                {watchIndustry && (
                <div className="space-y-2 mb-4">
                    <Label htmlFor="subIndustry">Specialization</Label>
                    <Select 
                        onValueChange={(value)=>{
                            setValue("subIndustry", value, { shouldValidate: true });
                        }}>
                        <SelectTrigger id="subIndustry">
                            <SelectValue placeholder="Select an Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectedIndustry?.subIndustries.map((ind)=> {
                                return(
                                <SelectItem value={ind} key={ind}>
                                    {ind} </SelectItem>
                                )
                            })}
                            
                        </SelectContent>
                    </Select>
                    {errors.subIndustry && (
                        <p className="text-sm text-red-500">Please select a specialization</p>
                    )}
                </div>
                )}

                {/* Experience */}
                <div className="space-y-2 mb-4">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number"
                    min="0" max="50" placeholder="Enter Years of Experience"
                    {...register("experience")}/>
        

                    {errors.experience && (
                        <p className="text-sm text-red-500">Please input years of experience.</p>
                    )}
                </div>

                {/* Skills */}
                <div className="space-y-2 mb-4">
                    <Label htmlFor="skills">Skills</Label>
                    <Input id="skills" placeholder="ex. Python, JS, Project Management, Accounting"
                    {...register("skills")}/>
        
                <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas</p>

                    {errors.skills && (
                        <p className="text-sm text-red-500">{errors.skills.message}</p>
                    )}
                </div>

                {/* Bio */}
                <div className="space-y-2 mb-4">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea id="bio" 
                    placeholder="Tell us about your professional background..."
                    className="h-32"
                    {...register("bio")}/>

                    {errors.bio && (
                        <p className="text-sm text-red-500">{errors.bio.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Complete Profile
                </Button>
            </form>
        </CardContent>
        </Card>
    </div>
  )
}

export default OnboardingForm
