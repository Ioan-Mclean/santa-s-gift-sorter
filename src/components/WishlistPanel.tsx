import { useState, useEffect } from "react";
import { WishlistItem } from "@/types/gift";
import { getWishlist, removeFromWishlist, exportWishlist } from "@/utils/wishlist";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, X } from "lucide-react";
import { toast } from "sonner";

export function WishlistPanel() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (giftId: string) => {
    removeFromWishlist(giftId);
    setWishlist(getWishlist());
    toast.success("Removed from wishlist");
  };

  const handleExport = () => {
    const text = exportWishlist();
    navigator.clipboard.writeText(text);
    toast.success("Wishlist copied to clipboard!");
  };

  if (wishlist.length === 0) {
    return (
      <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-2 border-muted animate-fade-in">
        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
        <p className="text-lg font-semibold text-foreground">Your wishlist is empty! 🎄</p>
        <p className="text-sm text-muted-foreground mt-2">
          Tap the heart on gifts to save your favourites ❤️
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-current" />
          My Wishlist ({wishlist.length})
        </h2>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="space-y-3">
        {wishlist.map((item) => (
          <Card
            key={item.id}
            className="p-4 bg-card/90 backdrop-blur-sm border border-accent/20 animate-fade-in hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-accent font-medium mb-1">{item.priceRange}</p>
                <p className="text-sm text-muted-foreground">{item.christmasMessage}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(item.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
