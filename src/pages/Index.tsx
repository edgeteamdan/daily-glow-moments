import { Sparkles, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WinCard } from "@/components/WinCard";
import { AddWinForm } from "@/components/AddWinForm";
import { useAuth } from "@/contexts/AuthContext";

// Sample wins data - will be replaced with real data later
const sampleWins = [
  {
    id: 1,
    text: "Finished a tough workout and felt amazing afterwards",
    date: "Today, 8:30 AM"
  },
  {
    id: 2,
    text: "Had a great conversation with a friend I hadn't talked to in months",
    date: "Yesterday, 2:15 PM"
  },
  {
    id: 3,
    text: "Finally organized my workspace and it looks fantastic",
    date: "Yesterday, 11:00 AM"
  },
  {
    id: 4,
    text: "Tried a new recipe and it turned out delicious",
    date: "2 days ago, 7:30 PM"
  },
  {
    id: 5,
    text: "Got a compliment from my boss on the project I submitted",
    date: "3 days ago, 3:45 PM"
  },
  {
    id: 6,
    text: "Helped a stranger with directions and made their day better",
    date: "3 days ago, 12:20 PM"
  }
];

const Index = () => {
  const { user, loading, signOut } = useAuth();

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
        <div className="mb-8">
          <AddWinForm />
        </div>

        {/* Wins List */}
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Recent Wins
            </h2>
            <p className="text-muted-foreground">
              Keep the momentum going! Here are some recent victories to celebrate 🎉
            </p>
          </div>

          <div className="grid gap-4">
            {sampleWins.map((win) => (
              <WinCard
                key={win.id}
                win={win.text}
                date={win.date}
              />
            ))}
          </div>
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