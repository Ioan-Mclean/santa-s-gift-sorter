import { Gift, WishlistItem } from "@/types/gift";

const WISHLIST_KEY = "christmas-wishlist";

export function getWishlist(): WishlistItem[] {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading wishlist:", error);
    return [];
  }
}

export function addToWishlist(gift: Gift): void {
  try {
    const wishlist = getWishlist();
    const exists = wishlist.some((item) => item.id === gift.id);
    
    if (!exists) {
      const newItem: WishlistItem = {
        ...gift,
        addedAt: Date.now(),
      };
      wishlist.push(newItem);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
}

export function removeFromWishlist(giftId: string): void {
  try {
    const wishlist = getWishlist();
    const filtered = wishlist.filter((item) => item.id !== giftId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
}

export function isInWishlist(giftId: string): boolean {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === giftId);
}

export function exportWishlist(): string {
  const wishlist = getWishlist();
  
  let text = "🎄 My Christmas Gift Wishlist 🎄\n\n";
  
  wishlist.forEach((item, index) => {
    text += `${index + 1}. ${item.name}\n`;
    text += `   Category: ${item.category}\n`;
    text += `   Price Range: ${item.priceRange}\n`;
    text += `   ${item.description}\n`;
    text += `   ${item.christmasMessage}\n\n`;
  });
  
  if (wishlist.length === 0) {
    text += "No items in wishlist yet!\n";
  }
  
  return text;
}
