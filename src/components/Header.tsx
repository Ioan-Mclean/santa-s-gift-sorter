import { Gift, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="relative z-10 py-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Gift className="w-10 h-10 text-primary animate-float" />
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Gift Genius Guide
        </h1>
        <Sparkles className="w-10 h-10 text-accent animate-twinkle" />
      </div>
      <p className="text-xl text-muted-foreground">
        🎄 Christmas Edition ✨
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-twinkle" />
        <div className="w-2 h-2 rounded-full bg-accent animate-twinkle" style={{ animationDelay: "0.3s" }} />
        <div className="w-2 h-2 rounded-full bg-secondary animate-twinkle" style={{ animationDelay: "0.6s" }} />
      </div>
    </header>
  );
}
