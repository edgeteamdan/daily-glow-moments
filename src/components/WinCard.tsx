import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WinCardProps {
  win: string;
  date?: string;
}

export function WinCard({ win, date }: WinCardProps) {
  return (
    <Card className="group transition-all duration-300 hover:drop-shadow-warm hover:scale-[1.02] cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Star className="w-4 h-4 text-success-foreground fill-current" />
          </div>
          <div className="flex-1">
            <p className="text-foreground leading-relaxed">{win}</p>
            {date && (
              <p className="text-muted-foreground text-sm mt-2">{date}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}