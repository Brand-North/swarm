import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LenderParams, BaseAgentProps } from "@/types/agents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  assetMint: z.string().min(1, "Asset mint address is required"),
  amount: z.number().min(0, "Amount must be positive")
});

export default function AssetLender({ onSuccess, onError }: BaseAgentProps) {
  const { toast } = useToast();
  const [isLending, setIsLending] = useState(false);

  const form = useForm<LenderParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0
    }
  });

  const onSubmit = async (data: LenderParams) => {
    setIsLending(true);
    try {
      // TODO: Implement asset lending using Solana Agent Kit
      // await agent.lendAsset(
      //   data.assetMint,
      //   data.amount
      // );
      
      toast({
        title: "Asset Lent",
        description: `Successfully lent ${data.amount} tokens`
      });
      onSuccess?.(data);
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Lending Failed",
        description: err.message,
        variant: "destructive"
      });
      onError?.(err);
    } finally {
      setIsLending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lend Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="assetMint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Mint Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Asset mint address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Lend</FormLabel>
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

            <Button
              type="submit"
              className="w-full"
              disabled={isLending}
            >
              {isLending ? "Lending..." : "Lend Assets"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
