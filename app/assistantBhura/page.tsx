"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Bot,
  User,
  Send,
  AlertTriangle,
  Stethoscope,
  Heart,
  Shield,
  Building2,
  ArrowUp,
  ChevronDown,
  Clock,
  ThumbsUp,
  MessageSquare,
  RefreshCw,
  XCircle,
  Info,
  Database,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarComponent from "./Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import MDEditor from "@uiw/react-md-editor";

type Message = {
  role: string;
  content: string | any;
};

// ─── Loading indicator ────────────────────────────────────────────────────────
const LoadingDots = () => {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setElapsed((p) => +(p + 0.1).toFixed(1)), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <Clock className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
        <span>Analysing… {elapsed}s</span>
      </div>
      <div className="flex gap-1.5">
        {[0, 0.15, 0.3].map((d, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: d }}
          />
        ))}
      </div>
      {[90, 75, 55].map((w, i) => (
        <motion.div
          key={i}
          className="h-3 rounded-full bg-slate-100 dark:bg-slate-700"
          style={{ width: `${w}%` }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
};

// ─── Response section card ────────────────────────────────────────────────────
const RSection = ({
  title,
  icon: Icon,
  children,
  expandable = false,
  accentClass = "bg-emerald-600",
}: any) => {
  const [open, setOpen] = useState(!expandable);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800/60"
    >
      <button
        className={cn(
          "w-full flex items-center gap-3 px-5 py-4 text-left",
          expandable && "cursor-pointer"
        )}
        onClick={() => expandable && setOpen(!open)}
      >
        <div className={`p-1.5 rounded-lg ${accentClass}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </span>
        {expandable && (
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Bot response renderer ────────────────────────────────────────────────────
const renderBotResponse = (content: any) => {
  if (!content) return null;
  if (typeof content === "string") {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {content}
      </p>
    );
  }
  if (typeof content !== "object") return null;

  return (
    <div className="space-y-3">
      <RSection title="Interpretation" icon={Heart} accentClass="bg-rose-500">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {content.interpretation?.summary}
        </p>
      </RSection>

      <RSection title="Home Remedies" icon={Shield} accentClass="bg-emerald-600">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          {content.home_remedies?.detailed_explanation}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {content.home_remedies?.remedies?.map((r: any, i: number) => (
            <div
              key={i}
              className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700"
            >
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {r.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </RSection>

      <RSection title="Precautions" icon={AlertTriangle} accentClass="bg-amber-500">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
          {content.precautions?.detailed_explanation}
        </p>
        <ul className="space-y-2">
          {content.precautions?.precaution_list?.map((p: any, i: number) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              {p}
            </li>
          ))}
        </ul>
      </RSection>

      <RSection
        title="When to See a Doctor"
        icon={Stethoscope}
        accentClass="bg-red-500"
        expandable
      >
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
          {content.when_to_see_doctor?.detailed_explanation}
        </p>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">
          Red Flags
        </p>
        <ul className="space-y-2 mb-4">
          {content.when_to_see_doctor?.red_flags?.map((f: any, i: number) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 rounded-lg px-3 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
              {f}
            </li>
          ))}
        </ul>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">
          Timeline
        </p>
        <ul className="space-y-2">
          {content.when_to_see_doctor?.after_how_many_days?.map((f: any, i: number) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
              {f}
            </li>
          ))}
        </ul>
      </RSection>

      <RSection title="Relevant Departments" icon={Building2} accentClass="bg-slate-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {content.relevant_medical_departments?.map((d: any, i: number) => (
            <div
              key={i}
              className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700"
            >
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-slate-500" />
                {d.department}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {d.description}
              </p>
            </div>
          ))}
        </div>
      </RSection>
    </div>
  );
};

// ─── Flash loading ────────────────────────────────────────────────────────────
const FlashLoading = ({ t }: { t: number }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-slate-400 text-sm">
      <Clock className="h-3.5 w-3.5 animate-pulse text-sky-500" />
      <span>Thinking… {t.toFixed(1)}s</span>
    </div>
    <div className="flex gap-1.5">
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-sky-400"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: d }}
        />
      ))}
    </div>
    {[85, 60].map((w, i) => (
      <motion.div
        key={i}
        className="h-3 rounded-full bg-slate-100 dark:bg-slate-700"
        style={{ width: `${w}%` }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
      />
    ))}
  </div>
);

// ─── Single message ───────────────────────────────────────────────────────────
const MessageItem = ({ message, isLast, loading, thinkingTime }: any) => {
  const isUser = message.role === "user";
  const [liked, setLiked] = useState(false);

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end gap-3 mb-6"
      >
        <div className="max-w-[78%] bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
          {message.content}
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
          <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 mb-6"
    >
      <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mt-0.5">
        <Bot className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            HealthBuddy
          </span>
          <Badge
            variant="outline"
            className="text-[10px] py-0 h-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          >
            Health Expert
          </Badge>
        </div>
        <div className="group relative">
          {isLast && loading && !message.content ? (
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm p-4 bg-white dark:bg-slate-800/60">
              <LoadingDots />
            </div>
          ) : (
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800/60 overflow-hidden">
              <div className="p-4">{renderBotResponse(message.content)}</div>
              <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${liked ? "text-emerald-500" : "text-slate-400"}`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </button>
                <span className="text-[10px] text-slate-400">
                  {liked ? "Helpful!" : "Was this helpful?"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Flash message ────────────────────────────────────────────────────────────
const FlashMessageItem = ({ message, isLast, loading, thinkingTime }: any) => {
  const isUser = message.role === "user";

  return (
    <div className={`mb-5 flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-slate-200 dark:bg-slate-700"
            : "bg-sky-100 dark:bg-sky-900/40"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        ) : (
          <Bot className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        )}
      </div>
      <div className={`max-w-[80%] ${isUser ? "items-end flex flex-col" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-tr-sm"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm"
          }`}
        >
          {isUser ? (
            message.content
          ) : isLast && loading && !message.content ? (
            <FlashLoading t={thinkingTime} />
          ) : (
            <MDEditor.Markdown
              source={message.content}
              style={{ background: "transparent", fontSize: 14 }}
              className="prose dark:prose-invert max-w-none"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Welcome screen ───────────────────────────────────────────────────────────
const WelcomeScreen = ({
  mode,
  onSuggestion,
}: {
  mode: "beat" | "flash";
  onSuggestion: (s: string) => void;
}) => {
  const beatSuggestions = [
    "I have a persistent headache for 3 days",
    "What should I do for a mild fever?",
    "I'm experiencing lower back pain",
    "How can I manage seasonal allergies?",
  ];
  const flashSuggestions = [
    "What are the symptoms of dehydration?",
    "Cold vs flu — how to tell?",
    "Quick remedies for heartburn",
    "Signs of high blood pressure",
  ];
  const suggestions = mode === "beat" ? beatSuggestions : flashSuggestions;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
          mode === "beat"
            ? "bg-emerald-100 dark:bg-emerald-900/30"
            : "bg-sky-100 dark:bg-sky-900/30"
        }`}
      >
        {mode === "beat" ? (
          <Stethoscope className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Database className="h-8 w-8 text-sky-600 dark:text-sky-400" />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h2
          className="text-2xl font-normal text-slate-900 dark:text-white mb-2"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {mode === "beat" ? "HealthBuddy Health Expert" : "HealthBuddy Flash"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
          {mode === "beat"
            ? "Describe your symptoms and I'll provide guidance, remedies, and when to see a doctor."
            : "Get quick, concise answers to your health questions."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl w-full"
      >
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(s)}
            className="text-left text-sm px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all"
          >
            {s}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
type ModelType = "curo-beat" | "curo-flash";

const AssistantBhura = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>("curo-beat");
  const inputRef = useRef<HTMLInputElement>(null);
  const [thinkingTime, setThinkingTime] = useState(0);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  let timer: NodeJS.Timeout;
  const startTimer = () => {
    setThinkingTime(0);
    timer = setInterval(() => setThinkingTime((p) => +(p + 0.1).toFixed(1)), 100);
  };
  const stopTimer = () => clearInterval(timer);

  const submitMessage = async (mode: "beat" | "flash") => {
    if (!input.trim()) return;
    const cur = input;
    const newMsgs = [...messages, { role: "user", content: cur }];
    if (newMsgs.length > 15) newMsgs.splice(0, 6);
    const botIdx = newMsgs.length;
    newMsgs.push({ role: "bot", content: "" });
    setMessages([...newMsgs]);
    setLoading(true);
    startTimer();
    setInput("");

    try {
      const endpoint = mode === "beat" ? "/api/bhura/beat" : "/api/bhura/flash";
      const body =
        mode === "beat"
          ? JSON.stringify({ input: cur })
          : JSON.stringify({ input: cur, messages });
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = await res.json();
      stopTimer();
      newMsgs[botIdx].content = data.response;
      setMessages([...newMsgs]);
    } catch {
      stopTimer();
      newMsgs[botIdx].content =
        "Sorry, I couldn't process your request. Please try again.";
      setMessages([...newMsgs]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(selectedModel === "curo-beat" ? "beat" : "flash");
  };

  const handleSuggestion = (s: string) => {
    setInput(s);
    setTimeout(() => {
      submitMessage(selectedModel === "curo-beat" ? "beat" : "flash");
    }, 100);
  };

  const isBeat = selectedModel === "curo-beat";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080e1a]">
      <SidebarComponent
        setSelectedModel={setSelectedModel}
        selectedModel={selectedModel}
      />

      <div className="lg:pl-72 transition-all duration-300">
        {/* Topbar */}
        <header className="fixed top-0 right-0 left-0 lg:left-72 z-40 bg-white/95 dark:bg-[#080e1a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-slate-900 dark:text-white leading-none mb-0.5">
                  HealthBuddy
                </h1>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Health Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => setMessages([])}
                    >
                      <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear conversation</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                <Sparkles className="h-3 w-3 text-emerald-500" />
                {isBeat ? "HealthBuddy Beats" : "HealthBuddy Flash"}
              </div>
            </div>
          </div>
        </header>

        {/* Chat area */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-32">
          {messages.length === 0 ? (
            <WelcomeScreen
              mode={isBeat ? "beat" : "flash"}
              onSuggestion={handleSuggestion}
            />
          ) : isBeat ? (
            <div>
              {messages.map((m, i) => (
                <MessageItem
                  key={i}
                  message={m}
                  isLast={i === messages.length - 1}
                  loading={loading}
                  thinkingTime={thinkingTime}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div>
              {messages.map((m, i) => (
                <FlashMessageItem
                  key={i}
                  message={m}
                  isLast={i === messages.length - 1}
                  loading={loading}
                  thinkingTime={thinkingTime}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        {/* Input bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-72 z-40 bg-white/95 dark:bg-[#080e1a]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
            <form id="chat-form" onSubmit={onSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isBeat
                      ? "Describe your symptoms or health concern…"
                      : "Ask a quick health question…"
                  }
                  className="pr-10 h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:border-emerald-400"
                  disabled={loading}
                />
                {input && (
                  <button
                    type="button"
                    onClick={() => setInput("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 shrink-0"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            <p className="text-[10px] text-center mt-2 text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <Info className="h-2.5 w-2.5" />
              General health information only. Always consult a qualified healthcare professional.
            </p>
          </div>
        </div>

        {/* Scroll to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-24 right-4 p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-md z-50"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssistantBhura;
