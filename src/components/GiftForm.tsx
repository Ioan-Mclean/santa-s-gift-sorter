import { useState } from "react";
import { RecipientProfile, AgeRange, RelationType, GiftStyle } from "@/types/gift";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shuffle } from "lucide-react";

interface GiftFormProps {
  onGenerate: (profile: RecipientProfile) => void;
  onSurpriseMe: () => void;
}

const INTEREST_SUGGESTIONS = [
  "Reading",
  "Gaming",
  "Cooking",
  "Fitness",
  "Travel",
  "Music",
  "Art",
  "Tech",
  "Nature",
  "Fashion",
  "Sports",
  "Photography",
];

export function GiftForm({ onGenerate, onSurpriseMe }: GiftFormProps) {
  const [ageRange, setAgeRange] = useState<AgeRange>("adult");
  const [relationship, setRelationship] = useState<RelationType>("friend");
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [budgetMin, setBudgetMin] = useState(20);
  const [budgetMax, setBudgetMax] = useState(100);
  const [giftStyle, setGiftStyle] = useState<GiftStyle>("practical");

  const handleAddInterest = (interest: string) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      ageRange,
      relationship,
      interests,
      budgetMin,
      budgetMax,
      giftStyle,
    });
  };

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age Range */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-foreground">Age Range</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(["child", "teen", "adult", "senior"] as AgeRange[]).map((age) => (
              <Button
                key={age}
                type="button"
                variant={ageRange === age ? "default" : "outline"}
                onClick={() => setAgeRange(age)}
                className="capitalize"
              >
                {age}
              </Button>
            ))}
          </div>
        </div>

        {/* Relationship */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-foreground">Relationship</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(["friend", "partner", "parent", "sibling", "coworker", "child"] as RelationType[]).map(
              (rel) => (
                <Button
                  key={rel}
                  type="button"
                  variant={relationship === rel ? "default" : "outline"}
                  onClick={() => setRelationship(rel)}
                  className="capitalize"
                >
                  {rel}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-foreground">Interests</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add an interest..."
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddInterest(interestInput);
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleAddInterest(interestInput)}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {INTEREST_SUGGESTIONS.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => handleAddInterest(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  {interest} ✕
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-foreground">
            Budget Range: ${budgetMin} - ${budgetMax}
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Minimum</Label>
              <Input
                type="number"
                min="10"
                max="1000"
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value))}
              />
            </div>
            <div>
              <Label className="text-sm">Maximum</Label>
              <Input
                type="number"
                min="10"
                max="1000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Gift Style */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-foreground">Gift Style</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(["practical", "fun", "sentimental", "luxury", "experience"] as GiftStyle[]).map(
              (style) => (
                <Button
                  key={style}
                  type="button"
                  variant={giftStyle === style ? "default" : "outline"}
                  onClick={() => setGiftStyle(style)}
                  className="capitalize"
                >
                  {style}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold text-lg py-6"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Gifts
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onSurpriseMe}
            className="flex-1 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground font-semibold text-lg py-6"
          >
            <Shuffle className="mr-2 h-5 w-5" />
            Surprise Me!
          </Button>
        </div>
      </form>
    </Card>
  );
}
