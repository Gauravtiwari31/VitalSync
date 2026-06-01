"use client";

import React, { useState } from "react";
import {
  Menu,
  Plus,
  ChevronDown,
  Bot,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

type ModelType = "curo-beat" | "curo-flash";

const SidebarComponent = ({ setSelectedModel, selectedModel }: any) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full bg-white dark:bg-[#080e1a]">
      {/* Header */}
      <div className="px-4 h-14 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Bot className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span
            className="font-semibold text-slate-900 dark:text-white text-sm"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            HealthBuddy
          </span>
        </div>
        <DarkModeToggle />
      </div>

      {/* Actions */}
      <div className="p-3 space-y-2 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
        {/* Model picker */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between h-9 text-sm border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 font-medium"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                {selectedModel === "curo-beat" ? "HealthBuddy Pro" : "HealthBuddy Flash"}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem
              className="gap-3 cursor-pointer"
              onClick={() => setSelectedModel("curo-beat")}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">HealthBuddy Pro</p>
                <p className="text-xs text-slate-500">Deep health analysis</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-3 cursor-pointer"
              onClick={() => setSelectedModel("curo-flash")}
            >
              <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">HealthBuddy Flash</p>
                <p className="text-xs text-slate-500">Quick responses</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="w-full h-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
          onClick={() => window.location.reload()}
        >
          <Plus className="h-3.5 w-3.5" />
          New conversation
        </Button>
      </div>

      {/* History area */}
      <ScrollArea className="flex-1 px-3 py-3">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-600 px-2 mb-2">
          Recent
        </p>
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Bot className="h-4 w-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed max-w-[140px]">
            Your conversation history will appear here
          </p>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
        <Link href="/">
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Home className="h-4 w-4" />
            Back to VitalSync
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button
            className="lg:hidden fixed top-3.5 left-4 z-50 p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-r border-slate-200 dark:border-slate-800">
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-72 border-r border-slate-200 dark:border-slate-800 z-30">
        <SidebarContent />
      </aside>
    </>
  );
};

export default SidebarComponent;
