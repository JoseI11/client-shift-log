import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: StatsCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div
            className={`text-xs mt-2 font-medium ${
              trend.isPositive ? "text-success" : "text-destructive"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% desde el mes pasado
          </div>
        )}
      </CardContent>
    </Card>
  );
};
