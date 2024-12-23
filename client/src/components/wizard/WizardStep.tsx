import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WizardStepProps {
  title: string;
  description?: string;
  currentStep: number;
  stepNumber: number;
  isActive: boolean;
  isCompleted: boolean;
  children: React.ReactNode;
}

export default function WizardStep({
  title,
  description,
  currentStep,
  stepNumber,
  isActive,
  isCompleted,
  children
}: WizardStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative",
        !isActive && "pointer-events-none"
      )}
    >
      <Card className={cn(
        "transition-colors",
        isActive && "border-primary",
        isCompleted && "border-primary/50 bg-primary/5"
      )}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              isCompleted ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              {stepNumber}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
