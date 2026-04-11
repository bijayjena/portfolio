import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPresetAnswer, PROFILE_CONTEXT } from "@/utils/chatbot";
import type { ReactNode } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const renderInlineMarkdown = (text: string): ReactNode[] => {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="font-semibold">{token.slice(2, -2)}</strong>;
    }

    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-black/10 px-1.5 py-0.5 text-[0.85em] font-mono"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={index} className="italic">{token.slice(1, -1)}</em>;
    }

    return token;
  });
};

const MarkdownMessage = ({ content }: { content: string }) => {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks: Array<{ type: "paragraph" | "list"; content: string | string[] }> = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: "list", content: currentList });
      currentList = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }

    flushList();
    blocks.push({ type: "paragraph", content: trimmed });
  });

  flushList();

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <ul key={index} className="list-disc pl-5 space-y-1">
            {(block.content as string[]).map((item, itemIndex) => (
              <li key={itemIndex}>{renderInlineMarkdown(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={index}>{renderInlineMarkdown(block.content as string)}</p>
        )
      )}
    </div>
  );
};

const SUGGESTED_QUESTIONS = [
  "What is Bijay's experience?",
  "Tell me about his projects",
  "What technologies does he use?",
  "What is his current role?",
  "What are his AI skills?",
];

const GEMINI_MODEL = "gemini-2.5-flash";

const AIChatbot = () => {
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Bijay's AI assistant. Ask me anything about his experience, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage || isLoading) return;

    const newUserMessage: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const presetAnswer = getPresetAnswer(userMessage);

      if (presetAnswer) {
        console.info("Chatbot preset answer used for suggested question:", userMessage);
        setMessages((prev) => [...prev, { role: "assistant", content: presetAnswer }]);
        return;
      }

      if (!geminiApiKey) {
        throw new Error("Gemini API key is not configured in the Vite client env");
      }

      console.info("Calling Gemini directly from client:", GEMINI_MODEL);

      const contents = [
        {
          role: "user",
          parts: [{ text: PROFILE_CONTEXT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will only answer questions about Bijay Jena's professional profile and redirect any off-topic questions." }],
        },
        ...messages.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to get Gemini response");
      }

      const data = await response.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error("Invalid Gemini response");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message.includes("Gemini API key")
            ? "Gemini API key is not loaded in the browser. Restart the dev server after updating your .env file."
            : `Gemini request failed: ${error.message}`
          : "Sorry, I'm having trouble connecting. Please try again later.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
          size="icon"
          aria-label="Open AI Chat Assistant"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[600px] max-h-[80vh] shadow-2xl z-50 flex flex-col overflow-hidden border-2">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white" />
              <div>
                <h3 className="font-bold text-white">Bijay's AI Assistant</h3>
                <p className="text-xs text-white/80">Powered by Gemini</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    msg.role === "user"
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                      : "bg-muted"
                  )}
                >
                  <MarkdownMessage content={msg.content} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSuggestionClick(q)}
                >
                  {q}
                </Badge>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Bijay..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-sky-500 to-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
