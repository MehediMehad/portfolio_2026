import { Button } from "@/components/ui/button";
import { Calendar, Home, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const OfficialProjectsPage = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 pb-20 pt-5 text-center">
      {/* Icon and Badge Section */}
      <div className="relative mb-8 flex flex-col items-center justify-center">
        {/* Background glow effects */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#a855f7]/10" />
          <div className="absolute inset-4 rounded-full border border-[#a855f7]/20" />
          <div className="absolute inset-8 flex items-center justify-center rounded-full border border-[#a855f7]/50 bg-[#a855f7]/10 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Lock className="h-8 w-8 text-[#a855f7]" />
          </div>
          <div className="absolute -left-2 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#a855f7]/50" />
          <div className="absolute bottom-4 left-4 h-1 w-1 rounded-full bg-[#a855f7]/30" />
        </div>

        {/* <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-md">
          <Lock className="h-3.5 w-3.5" />
          <span>Official Projects</span>
        </div> */}
      </div>

      {/* Heading Section */}
      <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
        These Are <span className="text-primary">Official Projects</span>
      </h1>

      <div className="mt-6 flex justify-center">
        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <p className="mt-8 max-w-2xl text-center text-[15px] leading-relaxed text-gray-400 md:text-base">
        The projects listed in my GitHub profile are part of my official work and are proprietary
        to my organization/clients. For security and confidentiality reasons,
        the source code cannot be shared publicly.
      </p>

      {/* Info Cards */}
      <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-[#0b1222]/50 p-8 text-left backdrop-blur-xl md:grid-cols-2 lg:gap-12 lg:p-10">
        <div className="flex flex-col gap-4 md:border-r md:border-white/10 md:pr-8 sm:flex-row lg:gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Want to See the Code?</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              If you would like to see the code or discuss any of these projects, I can arrange a
              private demonstration or walkthrough.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:pl-4 sm:flex-row lg:gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Let&apos;s Connect!</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Feel free to reach out to me to schedule a meeting or discuss opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Appreciation Note */}
      <div className="mt-6 flex w-full max-w-4xl flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#0b1222]/50 p-6 text-center backdrop-blur-xl sm:flex-row sm:text-left lg:p-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm leading-relaxed text-gray-400">
            I appreciate your understanding and respect for confidentiality.
            <br className="hidden sm:block" />
            <span className="font-medium text-white sm:mt-1 sm:block">Thank you!</span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <Button size="lg" asChild variant="outline" className="h-12 rounded-xl border-white/10 bg-transparent hover:bg-white/5 dark:bg-transparent dark:hover:bg-white/5">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button size="lg" asChild className="h-12 rounded-xl bg-primary text-white hover:bg-primary/80 cursor-pointer">
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" />
            Go to Contact
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OfficialProjectsPage;
