import { useState } from "react";
import { Gift } from "@/types/gift";
import { GiftCard } from "./GiftCard";

interface PresentBoxProps {
  gift: Gift;
  onAddToWishlist: (gift: Gift) => void;
  isInWishlist: boolean;
}

export function PresentBox({ gift, onAddToWishlist, isInWishlist }: PresentBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  if (isOpen) {
    return (
      <div className="animate-reveal">
        <GiftCard gift={gift} onAddToWishlist={onAddToWishlist} isInWishlist={isInWishlist} />
      </div>
    );
  }

  return (
    <div
      className="relative cursor-pointer transform transition-transform hover:scale-105 animate-wiggle"
      onClick={handleClick}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    >
      {/* Present Box */}
      <div
        className="w-full aspect-square rounded-lg shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: gift.boxColor,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Ribbon Vertical */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-full"
          style={{ backgroundColor: gift.ribbonColor }}
        />

        {/* Ribbon Horizontal */}
        <div
          className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1/4"
          style={{ backgroundColor: gift.ribbonColor }}
        />

        {/* Bow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className="w-16 h-16 rounded-full"
            style={{ backgroundColor: gift.ribbonColor }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30"
          />
        </div>

        {/* Sparkle Effect */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-white/60 rounded-full animate-twinkle" />
        <div
          className="absolute bottom-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-twinkle"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Click to Open Text */}
      <div className="text-center mt-4">
        <p className="text-sm font-medium text-foreground">Click to unwrap! 🎁</p>
      </div>
    </div>
  );
}
