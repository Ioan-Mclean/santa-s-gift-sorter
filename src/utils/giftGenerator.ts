import { RecipientProfile, Gift, GiftCategory } from "@/types/gift";

const BOX_COLORS = ["#c41e3a", "#165b33", "#d4af37", "#f8f8ff", "#c41e3a"];
const RIBBON_COLORS = ["#d4af37", "#f8f8ff", "#4169e1", "#c41e3a", "#c0c0c0"];

interface GiftTemplate {
  name: string;
  category: GiftCategory;
  basePrice: number;
  ageGroups: string[];
  relationships: string[];
  styles: string[];
  interests?: string[];
}

const GIFT_TEMPLATES: GiftTemplate[] = [
  {
    name: "Smart Watch with Fitness Tracking",
    category: "Tech",
    basePrice: 200,
    ageGroups: ["teen", "adult"],
    relationships: ["friend", "partner", "sibling", "coworker"],
    styles: ["practical", "luxury"],
    interests: ["fitness", "tech", "health"],
  },
  {
    name: "DIY Terrarium Kit",
    category: "DIY",
    basePrice: 35,
    ageGroups: ["teen", "adult", "senior"],
    relationships: ["friend", "partner", "parent", "sibling"],
    styles: ["fun", "practical"],
    interests: ["plants", "crafts", "nature"],
  },
  {
    name: "Hot Air Balloon Experience",
    category: "Experience",
    basePrice: 250,
    ageGroups: ["adult", "senior"],
    relationships: ["partner", "friend", "parent"],
    styles: ["experience", "luxury"],
    interests: ["adventure", "travel"],
  },
  {
    name: "Personalized Recipe Book",
    category: "Books",
    basePrice: 45,
    ageGroups: ["adult", "senior", "teen"],
    relationships: ["parent", "partner", "friend"],
    styles: ["sentimental", "practical"],
    interests: ["cooking", "food"],
  },
  {
    name: "Luxury Spa Gift Set",
    category: "Lifestyle",
    basePrice: 80,
    ageGroups: ["adult", "senior", "teen"],
    relationships: ["partner", "parent", "friend"],
    styles: ["luxury", "sentimental"],
    interests: ["relaxation", "self-care"],
  },
  {
    name: "Board Game Collection Bundle",
    category: "Games",
    basePrice: 60,
    ageGroups: ["child", "teen", "adult"],
    relationships: ["child", "sibling", "friend"],
    styles: ["fun", "practical"],
    interests: ["games", "social", "family"],
  },
  {
    name: "Handmade Knitted Scarf",
    category: "Fashion",
    basePrice: 40,
    ageGroups: ["teen", "adult", "senior"],
    relationships: ["parent", "partner", "friend", "sibling"],
    styles: ["sentimental", "practical"],
  },
  {
    name: "Smart Home Speaker",
    category: "Tech",
    basePrice: 100,
    ageGroups: ["adult", "senior", "teen"],
    relationships: ["parent", "partner", "friend", "coworker"],
    styles: ["practical", "luxury"],
    interests: ["tech", "music"],
  },
  {
    name: "Artisanal Coffee Subscription",
    category: "Food & Drink",
    basePrice: 50,
    ageGroups: ["adult", "senior"],
    relationships: ["coworker", "friend", "partner"],
    styles: ["practical", "luxury"],
    interests: ["coffee", "food"],
  },
  {
    name: "LEGO Architecture Set",
    category: "Games",
    basePrice: 70,
    ageGroups: ["child", "teen", "adult"],
    relationships: ["child", "sibling", "friend"],
    styles: ["fun", "practical"],
    interests: ["building", "architecture", "creativity"],
  },
  {
    name: "Cooking Class Experience",
    category: "Experience",
    basePrice: 120,
    ageGroups: ["adult", "teen"],
    relationships: ["partner", "friend", "parent"],
    styles: ["experience", "fun"],
    interests: ["cooking", "food", "learning"],
  },
  {
    name: "Cozy Weighted Blanket",
    category: "Home",
    basePrice: 90,
    ageGroups: ["teen", "adult", "senior"],
    relationships: ["partner", "parent", "friend"],
    styles: ["practical", "sentimental"],
    interests: ["sleep", "comfort", "relaxation"],
  },
  {
    name: "Photography Beginner Kit",
    category: "Tech",
    basePrice: 150,
    ageGroups: ["teen", "adult"],
    relationships: ["child", "sibling", "friend"],
    styles: ["practical", "fun"],
    interests: ["photography", "art", "creativity"],
  },
  {
    name: "Gourmet Chocolate Assortment",
    category: "Food & Drink",
    basePrice: 35,
    ageGroups: ["teen", "adult", "senior"],
    relationships: ["friend", "coworker", "parent", "partner"],
    styles: ["luxury", "fun"],
    interests: ["food", "sweets"],
  },
  {
    name: "Custom Star Map Print",
    category: "Home",
    basePrice: 55,
    ageGroups: ["adult", "teen"],
    relationships: ["partner", "parent", "friend"],
    styles: ["sentimental", "luxury"],
    interests: ["astronomy", "romance", "memories"],
  },
  {
    name: "Wireless Noise-Canceling Headphones",
    category: "Tech",
    basePrice: 180,
    ageGroups: ["teen", "adult"],
    relationships: ["child", "sibling", "friend", "partner"],
    styles: ["practical", "luxury"],
    interests: ["music", "tech", "travel"],
  },
  {
    name: "Succulent Garden Kit",
    category: "DIY",
    basePrice: 30,
    ageGroups: ["adult", "senior", "teen"],
    relationships: ["friend", "coworker", "parent"],
    styles: ["practical", "fun"],
    interests: ["plants", "nature", "decor"],
  },
  {
    name: "Wine Tasting Tour",
    category: "Experience",
    basePrice: 200,
    ageGroups: ["adult", "senior"],
    relationships: ["partner", "friend", "parent"],
    styles: ["experience", "luxury"],
    interests: ["wine", "travel", "food"],
  },
  {
    name: "Personalized Journal Set",
    category: "Books",
    basePrice: 40,
    ageGroups: ["teen", "adult", "senior"],
    relationships: ["friend", "partner", "sibling"],
    styles: ["sentimental", "practical"],
    interests: ["writing", "organization", "creativity"],
  },
  {
    name: "Essential Oil Diffuser Set",
    category: "Home",
    basePrice: 65,
    ageGroups: ["adult", "senior"],
    relationships: ["parent", "partner", "friend"],
    styles: ["practical", "luxury"],
    interests: ["wellness", "relaxation", "aromatherapy"],
  },
];

function scoreGift(template: GiftTemplate, profile: RecipientProfile): number {
  let score = 0;

  // Age match
  if (template.ageGroups.includes(profile.ageRange)) score += 20;

  // Relationship match
  if (template.relationships.includes(profile.relationship)) score += 20;

  // Style match
  if (template.styles.includes(profile.giftStyle)) score += 15;

  // Budget match
  if (template.basePrice >= profile.budgetMin && template.basePrice <= profile.budgetMax) {
    score += 25;
  } else if (template.basePrice < profile.budgetMin) {
    score += 10; // Still okay if it's cheaper
  } else {
    score -= 15; // Penalize if over budget
  }

  // Interest match
  if (template.interests && profile.interests.length > 0) {
    const interestMatches = template.interests.some((interest) =>
      profile.interests.some((userInterest) =>
        userInterest.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(userInterest.toLowerCase())
      )
    );
    if (interestMatches) score += 30;
  }

  return score;
}

function formatPriceRange(basePrice: number, budgetMax: number): string {
  const lower = Math.max(basePrice * 0.8, 10);
  const upper = Math.min(basePrice * 1.2, budgetMax);
  return `$${Math.round(lower)}-$${Math.round(upper)}`;
}

function generateChristmasMessage(
  name: string,
  relationship: string,
  style: string
): string {
  const messages = {
    sentimental: [
      `A heartwarming gift to celebrate your special bond this Christmas 🎄`,
      `Made with love for someone who means the world to you ❤️`,
      `Creating cherished memories under the mistletoe 🎅`,
    ],
    practical: [
      `Useful and thoughtful – the perfect Christmas surprise 🎁`,
      `A gift they'll use and appreciate every day ⛄`,
      `Practical magic for the holiday season ✨`,
    ],
    fun: [
      `Joy and laughter wrapped in a festive bow 🎉`,
      `Pure Christmas fun in every moment! 🎊`,
      `Bringing smiles and holiday cheer 🌟`,
    ],
    luxury: [
      `Indulge them with this luxurious Christmas treat 💎`,
      `Premium quality for someone truly special ⭐`,
      `The gift of elegance this holiday season 🎄`,
    ],
    experience: [
      `An unforgettable Christmas adventure awaits! 🎿`,
      `Creating magical memories together this season 🎅`,
      `The gift of experiences that last forever ❄️`,
    ],
  };

  const styleMessages = messages[style as keyof typeof messages] || messages.practical;
  return styleMessages[Math.floor(Math.random() * styleMessages.length)];
}

export function generateGifts(profile: RecipientProfile): Gift[] {
  // Score all templates
  const scoredTemplates = GIFT_TEMPLATES.map((template) => ({
    template,
    score: scoreGift(template, profile),
  }));

  // Sort by score and take top matches
  scoredTemplates.sort((a, b) => b.score - a.score);

  // Generate 5-7 unique gifts
  const numGifts = Math.floor(Math.random() * 3) + 5; // 5-7
  const selectedGifts = scoredTemplates.slice(0, numGifts);

  return selectedGifts.map((item, index) => ({
    id: `gift-${Date.now()}-${index}`,
    name: item.template.name,
    category: item.template.category,
    priceRange: formatPriceRange(item.template.basePrice, profile.budgetMax),
    description: `Perfect for a ${profile.ageRange} ${profile.relationship} who loves ${profile.interests.slice(0, 2).join(" and ")}. This ${item.template.category.toLowerCase()} gift combines ${profile.giftStyle} appeal with Christmas magic.`,
    christmasMessage: generateChristmasMessage(
      item.template.name,
      profile.relationship,
      profile.giftStyle
    ),
    boxColor: BOX_COLORS[Math.floor(Math.random() * BOX_COLORS.length)],
    ribbonColor: RIBBON_COLORS[Math.floor(Math.random() * RIBBON_COLORS.length)],
  }));
}

export function generateSurpriseGifts(): Gift[] {
  const randomProfile: RecipientProfile = {
    ageRange: ["child", "teen", "adult", "senior"][Math.floor(Math.random() * 4)] as any,
    relationship: ["friend", "partner", "parent", "sibling", "coworker", "child"][
      Math.floor(Math.random() * 6)
    ] as any,
    interests: ["surprises", "fun", "joy"],
    budgetMin: 20,
    budgetMax: 150,
    giftStyle: ["practical", "fun", "sentimental", "luxury", "experience"][
      Math.floor(Math.random() * 5)
    ] as any,
  };

  return generateGifts(randomProfile);
}
