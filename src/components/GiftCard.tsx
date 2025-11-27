import { Gift } from "@/types/gift";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, DollarSign } from "lucide-react";

interface GiftCardProps {
  gift: Gift;
  onAddToWishlist: (gift: Gift) => void;
  isInWishlist: boolean;
}

export function GiftCard({ gift, onAddToWishlist, isInWishlist }: GiftCardProps) {
  return (
    <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-accent/30 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">{gift.name}</h3>
            <Badge variant="secondary" className="text-sm">
              {gift.category}
            </Badge>
          </div>
          <Button
            variant={isInWishlist ? "default" : "outline"}
            size="icon"
            onClick={() => onAddToWishlist(gift)}
            className={isInWishlist ? "bg-primary" : ""}
          >
            <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 text-lg font-semibold text-accent">
          <DollarSign className="h-5 w-5" />
          <span>{gift.priceRange}</span>
        </div>

        {/* Description */}
        <p className="text-foreground leading-relaxed">{gift.description}</p>

        {/* Christmas Message */}
        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
          <p className="text-sm text-foreground italic">{gift.christmasMessage}</p>
        </div>
      </div>
    </Card>
  );
}
