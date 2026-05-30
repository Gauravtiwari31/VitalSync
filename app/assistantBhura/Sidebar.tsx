"use client";

import React, { useState } from "react";
import {
  Menu,
  Home,
  Plus,
  ChevronDown,
  Clock,
  Settings,
  LogOut,
  Bot,
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

// Types
type ModelType = "curo-beat" | "curo-flash";
type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
  model: ModelType;
};

const SidebarComponent = ({setSelectedModel,selectedModel}:any) => {
  

  // Chat history — empty by default (no hardcoded/demo chats)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);

  // Function to start a new chat (dummy functionality)
  const startNewChat = () => {
    console.log("Starting new chat with model:", selectedModel);

    // Start a new chat — do not persist/demo-save in sidebar
    // Implementation note: actual chat creation should be handled by
    // the chat view or backend. Sidebar will keep history empty.
  };

  // Function to select a chat (dummy functionality)
  const selectChat = (chatId: string) => {
    console.log("Selected chat:", chatId);
  };

  // Sidebar content component to avoid duplication
  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Assistant Bhura
          </h2>
          <DarkModeToggle />
        </div>
      </div>

      {/* Model Selection and Actions */}
      <div className="p-4 space-y-4">
        {/* Model dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-amber-500" />
                <span className="font-medium">
                  {selectedModel === "curo-beat" ? "Bhura 1.0 Pro" : "Bhura 1.0 Flash"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => setSelectedModel("curo-beat")}>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-amber-600" />
                <div className="flex flex-col">
                  <span className="font-medium">Bhura 1.0 Pro</span>
                  <span className="text-xs text-slate-500">
                    Comprehensive health analysis
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedModel("curo-flash")}>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-orange-600" />
                <div className="flex flex-col">
                  <span className="font-medium">Bhura 1.0 Flash</span>
                  <span className="text-xs text-slate-500">
                    Quick health responses
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* New Chat Button */}
        <Button
          className="w-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          onClick={startNewChat}
        >
          <Plus className="h-4 w-4 mr-2" /> New Chat
        </Button>

        {/* Home Button */}
        <Button
          variant="outline"
          className="w-full justify-start border-slate-200 dark:border-slate-700"
          asChild
        >
          <Link href="/">
            <Home className="h-4 w-4 mr-2 text-slate-500" /> Home
          </Link>
        </Button>
      </div>

      {/* Chat History */}
      {/* Chat list header removed to avoid showing demo history */}

      {/* Chat List with Scroll Area */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {chatHistory.map((chat) => {
            const ChatItem = (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start px-3 py-2 h-auto text-left"
                onClick={() => selectChat(chat.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-1.5",
                      chat.model === "curo-beat"
                        ? "bg-amber-500"
                        : "bg-orange-500"
                    )}
                  />
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-slate-700 dark:text-slate-200 truncate">
                      {chat.title}
                    </span>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {chat.date}
                      </span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400">
                        {chat.model === "curo-beat" ? "Beat" : "Flash"}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            );
            
            return isMobile ? (
              <SheetClose key={chat.id} asChild>
                {ChatItem}
              </SheetClose>
            ) : (
              ChatItem
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer Settings */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2 text-slate-500" />
          <span>Settings</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );

  // Mobile Sidebar with Sheet
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed z-50 top-4 left-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md"
        >
          <Menu className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SidebarContent isMobile={true} />
      </SheetContent>
    </Sheet>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="fixed top-0 left-0 z-40 h-full w-72 bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <SidebarContent isMobile={false} />
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <MobileSidebar />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
    </>
  );
};

export default SidebarComponent;