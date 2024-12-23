import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WizardStep from "./WizardStep";
import { useToast } from "@/hooks/use-toast";
import PresetConfigs from "@/components/presets/PresetConfigs";
import { SwarmPreset, CEOPersonalityTrait } from "@/types/agents";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface DeploymentWizardProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
}

export default function DeploymentWizard({ onComplete, onCancel }: DeploymentWizardProps) {
  const { toast } = useToast();
  const { connected, publicKey } = useWallet();
  const [currentStep, setCurrentStep] = useState(1);
  const [deploymentType, setDeploymentType] = useState<"preset" | "custom">("preset");
  const [selectedPreset, setSelectedPreset] = useState<SwarmPreset | null>(null);

  // CEO Configuration
  const [ceoName, setCeoName] = useState("");
  const [ceoGoal, setCeoGoal] = useState("");
  const [ceoPersonality, setCeoPersonality] = useState<CEOPersonalityTrait>(CEOPersonalityTrait.VISIONARY);
  const [riskTolerance, setRiskTolerance] = useState(0.5);
  const [innovationFactor, setInnovationFactor] = useState(0.5);
  const [decisionSpeed, setDecisionSpeed] = useState(0.5);

  const isCurrentStepValid = useCallback(() => {
    switch (currentStep) {
      case 1:
        return connected;
      case 2:
        return deploymentType === "preset" ? !!selectedPreset : true;
      case 3:
        return ceoName.length > 0 && ceoGoal.length > 0;
      default:
        return true;
    }
  }, [currentStep, connected, deploymentType, selectedPreset, ceoName, ceoGoal]);

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      if (currentStep === 1 && !connected) {
        toast({
          title: "Wallet Not Connected",
          description: "Please connect your Phantom wallet to continue",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Incomplete Step",
          description: "Please complete all required actions before proceeding.",
          variant: "destructive"
        });
      }
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete({
        deploymentType,
        selectedPreset,
        ceoConfiguration: {
          name: ceoName,
          goal: ceoGoal,
          personality: ceoPersonality,
          riskTolerance,
          innovationFactor,
          decisionSpeed
        }
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const handlePersonalityChange = (value: string) => {
    setCeoPersonality(value as CEOPersonalityTrait);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Step 1: Connect Wallet */}
        <WizardStep
          title="Connect Your Wallet"
          description="Connect your Phantom wallet to deploy and manage your swarm"
          currentStep={currentStep}
          stepNumber={1}
          isActive={currentStep === 1}
          isCompleted={currentStep > 1}
        >
          <div className="space-y-6">
            <Card className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">Connect Phantom Wallet</h3>
                <p className="text-muted-foreground">
                  Your wallet will be used to deploy and manage your AI swarm on Solana
                </p>
                <div className="flex justify-center">
                  <WalletMultiButton />
                </div>
                {connected && publicKey && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    ✓ Wallet connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </WizardStep>

        {/* Step 2: Choose Deployment Type */}
        <WizardStep
          title="Choose Deployment Type"
          description="Select between quick deploy presets or custom configuration"
          currentStep={currentStep}
          stepNumber={2}
          isActive={currentStep === 2}
          isCompleted={currentStep > 2}
        >
          <div className="space-y-4">
            <PresetConfigs
              onSelectPreset={(preset) => {
                setSelectedPreset(preset);
                setDeploymentType("preset");
              }}
            />
          </div>
        </WizardStep>

        {/* Step 3: Configure CEO */}
        <WizardStep
          title="Configure AI CEO"
          description="Set up your AI CEO's personality and goals"
          currentStep={currentStep}
          stepNumber={3}
          isActive={currentStep === 3}
          isCompleted={currentStep > 3}
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">CEO Name</label>
              <Input
                placeholder="Name your AI CEO"
                value={ceoName}
                onChange={(e) => setCeoName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Strategic Goal</label>
              <Input
                placeholder="Define the primary goal for your AI CEO"
                value={ceoGoal}
                onChange={(e) => setCeoGoal(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Personality Type</label>
              <Select
                value={ceoPersonality}
                onValueChange={handlePersonalityChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select personality type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CEOPersonalityTrait).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value.charAt(0) + value.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Risk Tolerance</label>
              <Slider
                value={[riskTolerance * 100]}
                onValueChange={([value]) => setRiskTolerance(value / 100)}
                max={100}
                min={0}
                step={10}
                className="py-2"
              />
              <p className="text-sm text-muted-foreground">
                {riskTolerance < 0.3 ? "Conservative" : 
                 riskTolerance < 0.7 ? "Balanced" : "Aggressive"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Innovation Factor</label>
              <Slider
                value={[innovationFactor * 100]}
                onValueChange={([value]) => setInnovationFactor(value / 100)}
                max={100}
                min={0}
                step={10}
                className="py-2"
              />
              <p className="text-sm text-muted-foreground">
                {innovationFactor < 0.3 ? "Traditional" : 
                 innovationFactor < 0.7 ? "Balanced" : "Disruptive"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Decision Speed</label>
              <Slider
                value={[decisionSpeed * 100]}
                onValueChange={([value]) => setDecisionSpeed(value / 100)}
                max={100}
                min={0}
                step={10}
                className="py-2"
              />
              <p className="text-sm text-muted-foreground">
                {decisionSpeed < 0.3 ? "Methodical" : 
                 decisionSpeed < 0.7 ? "Balanced" : "Swift"}
              </p>
            </div>
          </div>
        </WizardStep>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={handleNext}
            className="flex items-center gap-2"
            disabled={!isCurrentStepValid()}
          >
            {currentStep === 4 ? "Deploy" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}