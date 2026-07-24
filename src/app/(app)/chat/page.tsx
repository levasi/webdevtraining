import { DeveloperChat } from "@/components/chat/developer-chat";

export const metadata = {
  title: "Ask AI",
};

export default function ChatPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-2 py-4 sm:px-6 sm:py-8">
      <div className="space-y-1 px-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Ask AI</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Interview coaching for web developers. Answers prefer your study bank
          when a match is found.
        </p>
      </div>
      <DeveloperChat />
    </div>
  );
}
