import { Sparkles, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WinCard } from "@/components/WinCard";
import { AddWinForm } from "@/components/AddWinForm";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

interface Win {
  id: string;
  message: string;
  created_at: string;
}

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [wins, setWins] = useState<Win[]>([]);
  const [winsLoading, setWinsLoading] = useState(true);

  const fetchWins = async () => {
    if (!user) {
      setWins([]);
      setWinsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wins')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWins(data || []);
    } catch (error) {
      console.error('Error fetching wins:', error);
    } finally {
      setWinsLoading(false);
    }
  };

  useEffect(() => {
    fetchWins();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary">
        <div className="container mx-auto px-4 py-12 text-center relative">
          {/* Auth Button */}
          <div className="absolute top-4 right-4">
            {user ? (
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Link to="/auth">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-4xl font-bold text-primary-foreground">Daily Wins</h1>
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Celebrate your victories, big and small. Every step forward deserves recognition. 
            Track your progress and build momentum with positivity.
          </p>
          {user && (
            <p className="text-primary-foreground/80 text-sm mt-2">
              Welcome back, {user.email}!
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Add Win Form */}
        {user && (
          <div className="mb-8">
            <AddWinForm onWinAdded={fetchWins} />
          </div>
        )}

        {/* Wins List */}
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {user ? "Your Recent Wins" : "Recent Wins"}
            </h2>
            <p className="text-muted-foreground">
              {user 
                ? "Keep the momentum going! Here are your recent victories to celebrate 🎉"
                : "Sign in to start tracking your daily wins!"
              }
            </p>
          </div>

          {user ? (
            winsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your wins...</p>
              </div>
            ) : wins.length > 0 ? (
              <div className="grid gap-4">
                {wins.map((win) => (
                  <WinCard
                    key={win.id}
                    win={win.message}
                    date={formatDistanceToNow(new Date(win.created_at), { addSuffix: true })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No wins yet! Add your first victory above ✨
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Sign in with Google to start tracking your daily wins!
              </p>
              <Button asChild variant="outline">
                <Link to="/auth">
                  <LogIn className="w-4 h-4 mr-2" />
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Motivational Footer */}
        <div className="text-center mt-12 p-6 bg-gradient-secondary rounded-lg">
          <p className="text-foreground font-medium">
            "Success is the sum of small efforts repeated day in and day out."
          </p>
          <p className="text-muted-foreground text-sm mt-2">— Robert Collier</p>
        </div>
      </div>
    </div>
  );
};

export default Index;