import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TraderParams, BaseAgentProps } from "@/types/agents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  outputMint: z.string().min(1, "Output token mint is required"),
  inputAmount: z.number().min(0, "Amount must be positive"),
  inputMint: z.string().optional(),
  slippageBps: z.number().min(0).max(10000).optional()
});

export default function TokenTrader({ onSuccess, onError }: BaseAgentProps) {
  const { toast } = useToast();
  const [isTrading, setIsTrading] = useState(false);

  const form = useForm<TraderParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slippageBps: 300, // 3% default slippage
      inputAmount: 0
    }
  });

  const onSubmit = async (data: TraderParams) => {
    setIsTrading(true);
    try {
      // TODO: Implement token trading using Solana Agent Kit
      // await agent.trade(
      //   data.outputMint,
      //   data.inputAmount,
      //   data.inputMint,
      //   data.slippageBps
      // );
      
      toast({
        title: "Trade Executed",
        description: `Successfully swapped ${data.inputAmount} tokens`
      });
      onSuccess?.(data);
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Trade Failed",
        description: err.message,
        variant: "destructive"
      });
      onError?.(err);
    } finally {
      setIsTrading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="inputMint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input Token Mint (Optional, SOL if empty)</FormLabel>
                  <FormControl>
                    <Input placeholder="Input token mint..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outputMint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Output Token Mint</FormLabel>
                  <FormControl>
                    <Input placeholder="Output token mint..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inputAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Trade</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slippageBps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slippage Tolerance: {(field.value || 0) / 100}%</FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value || 0]}
                      onValueChange={([value]) => field.onChange(value)}
                      max={1000}
                      min={0}
                      step={25}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isTrading}
            >
              {isTrading ? "Trading..." : "Execute Trade"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
