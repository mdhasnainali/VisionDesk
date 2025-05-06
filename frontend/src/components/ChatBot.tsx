"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const intents = [
  {
    keywords: ["live", "stream", "broadcast", "video", "watch"],
    path: "/dashboard",
    reply: "You seem to be looking for live streaming! Let me take you there.",
  },
  {
    keywords: ["Heatmap", "heat map", "map", "heat"],
    path: "/dashboard/report/heatmap",
    reply: "Opening the desk list for you.",
  },
  {
    keywords: ["report", "reports", "all reports", "view reports"],
    path: "/dashboard/report",
    reply: "Opening the reports section for you.",
  },
  {
    keywords: ["onboarding", "start onboarding", "get started", "begin setup"],
    path: "/onboarding",
    reply: "Starting your onboarding process now!",
  },
  {
    keywords: ["annotate", "image annotation", "annotate image", "edit image"],
    path: "/onboarding/annotate-image",
    reply: "Opening the image annotation tool for you.",
  },
  {
    keywords: ["help", "assist", "support", "need help"],
    path: "/support",
    reply: "I can help you! Redirecting to the support page.",
  },
  {
    keywords: ["thank you", "thanks", "appreciate it", "grateful"],
    path: "/thank-you",
    reply: "You're welcome! Glad to be of help.",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const simulateAIResponse = (reply: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, `🤖 AI: ${reply}`]);
      setIsTyping(false);
    }, 1300); // Simulated delay for typing
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const lowerInput = input.toLowerCase();
    let matchedIntent = null;

    for (const intent of intents) {
      if (intent.keywords.some((keyword) => lowerInput.includes(keyword))) {
        matchedIntent = intent;
        break;
      }
    }

    if (matchedIntent) {
      setMessages((prev) => [...prev, `🧑 You: ${input}`]);
      simulateAIResponse(matchedIntent.reply);
      setTimeout(() => router.push(matchedIntent.path), 3000); // Simulated AI delay with a bit of pause before redirection
    } else {
      setMessages((prev) => [
        ...prev,
        `🧑 You: ${input}`,
        "🤖 AI: Hmm, I didn’t get that. Can you clarify or try something else?",
      ]);
    }

    setInput("");
  };

  const quickReplies = [
    { label: "Home", action: "/" },
    { label: "Dashboard", action: "/dashboard" },
    { label: "All Reports", action: "/dashboard/report" },
    { label: "Heat Map", action: "/dashboard/report/heatmap" },
    { label: "Start onboarding", action: "/onboarding" },
    { label: "Annotate image", action: "/onboarding/annotate-image" },
  ];
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 bg-transparent backdrop-blur-md  text-white rounded-xl border border-zinc-700 shadow-2xl p-4 transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          <div className="h-48 overflow-y-auto text-sm space-y-2 mb-3 scroll-smooth">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.startsWith("🤖")
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded text-white shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded text-white shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                }
              >
                {msg}
              </div>
            ))}
            {isTyping && (
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded text-white shadow-xl animate-pulse transition-all duration-300">
                🤖 AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              className="flex-1 bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              size={"sm"}
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200"
            >
              Send
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {quickReplies.map((reply, idx) => (
              <Button
                size={"sm"}
                key={idx}
                variant={"secondary"}
                onClick={() => {
                  setMessages((prev) => [...prev, `🧑 You: ${reply.label}`]);
                  simulateAIResponse(`Redirecting you to ${reply.label}...`);
                  setTimeout(() => router.push(reply.action), 1500);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition"
              >
                {reply.label}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className=" cursor-pointer shadow-lg animate-pulse"
        >
          <Image
            src="/chat-bot.jpg"
            alt="ChatBot"
            width={300}
            height={300}
            className="w-12 h-12 animate-in rounded-full "
          />
        </button>
      )}
    </div>
  );
}
