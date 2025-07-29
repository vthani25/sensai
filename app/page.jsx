"use client"

import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "./data/features";
import { howItWorks } from "./data/howItWorks";
import { testimonial } from "./data/testimonial";
import Image from "next/image";
import { faqs } from "./data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";

export default function Home() {

  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mt-10" width={"100%"} color="gray"/>
  }

  if (!user) {
    return (
      <div>
        <div className="grid-background"> </div>

        <HeroSection />

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Powerful Features for Your Career Growth</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index)=>{
              return (
                <Card key={index} className="border-2 hover:border-primary transition-colors duration-300">
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}</div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex flex-col gap-6 md:flex-row md:justify-center md:items-center md:gap-8">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-4xl font-bold">50+</h3>
                <p className="text-muted-foreground">Industries Covered</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-4xl font-bold">1000+</h3>
                <p className="text-muted-foreground">Interview Questions</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-4xl font-bold">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-4xl font-bold">24/7</h3>
                <p className="text-muted-foreground">AI Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Four Simple Steps To Accelerate Your Career Growth
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 min-w-0"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/50 transition-colors duration-200">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
              What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonial.map((testimonial, index)=>{
              return (
                <Card key={index} className="border-2 hover:border-primary transition-colors duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            width={40} height={40}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="rounded-full object-cover border-2 border-primary/20"                        />
                        </div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-sm text-primary">{testimonial.company}</p>
                      </div>

                      <blockquote>
                        <p className="text-muted-foreground italic relative">
                          <span className="text-3xl text-primary absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4">
                            &quot;
                          </span>
                        </p>

                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              )
            })}</div>
          </div>
        </section>

          {/*  FAQS Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4"> Frequently Asked Questions </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => {
                return ( 
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl mb-4"> 
              Ready to Accelerate Your Career? </h2>
            <p className="text-primary-foreground/80 mx-auto max-w-[600px] md:text-xl">
              Join thousands of professional who are advancing their careers with AI powered guidance.
            </p>
            <Link href="/dashboard" passHref>
            <Button size="lg" variant="secondary" className="h-11 mt-5 animate-bounce">
              Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
            </Link>
          </div>
        </div>
      </section>


      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="bg-muted shadow-xl rounded-2xl p-10 max-w-xl w-full transition-all">
        <h1 className="text-5xl font-extrabold mb-6 text-primary tracking-tight">
          Welcome to <span className="text-sky-700">SensAI</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          You’re officially logged in! Explore your AI-powered dashboard and unlock smarter career growth.
        </p>

        <Link href="/dashboard" passHref>
          <Button
            size="lg"
            variant="default"
            className="h-12 px-6 rounded-full font-semibold bg-sky-600 hover:bg-sky-700 text-white transition-all shadow-md hover:shadow-lg"
          >
            Go to Your Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

