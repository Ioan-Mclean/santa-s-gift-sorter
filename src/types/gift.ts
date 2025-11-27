export type AgeRange = "child" | "teen" | "adult" | "senior";
export type RelationType = "friend" | "partner" | "parent" | "sibling" | "coworker" | "child";
export type GiftStyle = "practical" | "fun" | "sentimental" | "luxury" | "experience";
export type GiftCategory = "Tech" | "DIY" | "Experience" | "Books" | "Lifestyle" | "Budget-Friendly" | "Fashion" | "Home" | "Games" | "Food & Drink";

export interface RecipientProfile {
  ageRange: AgeRange;
  relationship: RelationType;
  interests: string[];
  budgetMin: number;
  budgetMax: number;
  giftStyle: GiftStyle;
}

export interface Gift {
  id: string;
  name: string;
  category: GiftCategory;
  priceRange: string;
  description: string;
  christmasMessage: string;
  boxColor: string;
  ribbonColor: string;
}

export interface WishlistItem extends Gift {
  addedAt: number;
}
