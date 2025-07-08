import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AddWinFormProps {
  onWinAdded?: () => void;
}

export function AddWinForm({ onWinAdded }: AddWinFormProps) {
  const [winText, setWinText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!winText.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('wins')
        .insert([
          {
            message: winText.trim(),
            user_id: user.id
          }
        ]);

      if (error) throw error;

      setWinText("");
      toast({
        title: "Win added! 🎉",
        description: "Your victory has been recorded.",
      });
      onWinAdded?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add your win. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            disabled={!winText.trim() || !user || isSubmitting}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isSubmitting ? "Adding..." : "Add Your Win"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}