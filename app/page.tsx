"use client";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Link from "next/link";
import { Bot } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <main className="select-none bg-white dark:bg-[#080e1a]">
      <Header onSearchStateChange={setIsSearching} />
      {!isSearching && (
        <>
          <Hero />
          <HowItWorks />
          <Features />
          <PricingSection />
          <div className="w-5/6 mx-auto py-16">
            <Testimonial />
          </div>
          <div className="w-5/6 mx-auto md:w-1/2 py-10">
            <Faq />
          </div>
          <Footer />
        </>
      )}

      {/* HealthBuddy FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/assistantBhura"
          className="flex items-center justify-center w-13 h-13 bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg transition-all duration-200 w-14 h-14 hover:shadow-xl hover:scale-105"
          title="Open HealthBuddy Health Assistant"
        >
          <Bot size={26} color="white" strokeWidth={2} />
        </Link>
      </div>
    </main>
  );
}
