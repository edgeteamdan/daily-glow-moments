import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function AddWinForm() {
  const [winText, setWinText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (winText.trim()) {
      console.log("New win added:", winText);
      setWinText("");
    }
  };

  return (
    <Card className="bg-gradient-secondary border-none">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="win-input" className="text-sm font-medium text-foreground mb-2 block">
              What's your win today? ✨
            </label>
            <Input
              id="win-input"
              type="text"
              placeholder="I completed my morning routine..."
              value={winText}
              onChange={(e) => setWinText(e.target.value)}
              className="bg-background border-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 border-none"
            disabled={!winText.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your Win
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}