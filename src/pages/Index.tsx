import { useState } from "react";
import { RecipientProfile, Gift } from "@/types/gift";
import { generateGifts, generateSurpriseGifts } from "@/utils/giftGenerator";
import { addToWishlist, removeFromWishlist, isInWishlist, getWishlist } from "@/utils/wishlist";
import { Header } from "@/components/Header";
import { Snowfall } from "@/components/Snowfall";
import { GiftForm } from "@/components/GiftForm";
import { PresentBox } from "@/components/PresentBox";
import { WishlistPanel } from "@/components/WishlistPanel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [wishlistVersion, setWishlistVersion] = useState(0);

  const handleGenerate = (profile: RecipientProfile) => {
    const newGifts = generateGifts(profile);
    setGifts(newGifts);
    toast.success("🎅 Gifts generated! Click presents to unwrap them!");
  };

  const handleSurpriseMe = () => {
    const newGifts = generateSurpriseGifts();
    setGifts(newGifts);
    toast.success("🎁 Surprise gifts ready! Open them up!");
  };

  const handleAddToWishlist = (gift: Gift) => {
    if (isInWishlist(gift.id)) {
      removeFromWishlist(gift.id);
      setWishlistVersion((v) => v + 1);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(gift);
      setWishlistVersion((v) => v + 1);
      toast.success("Added to wishlist! ❤️");
    }
  };

  const handleRegenerate = () => {
    if (gifts.length > 0) {
      const newGifts = generateSurpriseGifts();
      setGifts(newGifts);
      toast.success("🎲 New gifts generated!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted relative overflow-hidden">
      <Snowfall />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        <Tabs defaultValue="generate" className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="generate">Generate Gifts</TabsTrigger>
            <TabsTrigger value="wishlist">
              Wishlist ({getWishlist().length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-8 mt-8">
            <GiftForm onGenerate={handleGenerate} onSurpriseMe={handleSurpriseMe} />

            {gifts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-foreground">
                    🎁 Your Gift Ideas
                  </h2>
                  <Button
                    variant="outline"
                    onClick={handleRegenerate}
                    className="shimmer-effect"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gifts.map((gift) => (
                    <PresentBox
                      key={gift.id}
                      gift={gift}
                      onAddToWishlist={handleAddToWishlist}
                      isInWishlist={isInWishlist(gift.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wishlist" className="mt-8">
            <WishlistPanel key={wishlistVersion} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
