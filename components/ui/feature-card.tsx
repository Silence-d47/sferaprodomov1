import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <Card className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${className}`}>
      <CardContent className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
} 