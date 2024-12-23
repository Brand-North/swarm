import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TokenDeployerParams, BaseAgentProps } from "@/types/agents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SolanaAgentKit } from "solana-agent-kit";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  uri: z.string().url("Must be a valid URI"),
  symbol: z.string().min(1, "Symbol is required").max(10, "Symbol must be 10 characters or less"),
  decimals: z.number().min(0).max(9),
  initialSupply: z.number().min(0)
});

export default function TokenDeployer({ onSuccess, onError }: BaseAgentProps) {
  const { toast } = useToast();
  const { publicKey, signTransaction } = useWallet();
  const [isDeploying, setIsDeploying] = useState(false);

  const form = useForm<TokenDeployerParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decimals: 9,
      initialSupply: 1000000
    }
  });

  const onSubmit = async (data: TokenDeployerParams) => {
    if (!publicKey || !signTransaction) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Phantom wallet to deploy tokens",
        variant: "destructive"
      });
      return;
    }

    setIsDeploying(true);
    try {
      const agent = new SolanaAgentKit(publicKey.toString(), "https://api.mainnet-beta.solana.com");

      const result = await agent.deployToken({
        name: data.name,
        uri: data.uri,
        symbol: data.symbol,
        decimals: data.decimals,
        initialSupply: data.initialSupply
      });

      toast({
        title: "Token Deployment Success",
        description: `Successfully deployed ${data.name} (${data.symbol})\nMint Address: ${result.mint}`
      });
      onSuccess?.(result);
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Deployment Failed",
        description: err.message,
        variant: "destructive"
      });
      onError?.(err);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy New Token</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="MTK" maxLength={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metadata URI</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="decimals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decimals</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                      min={0}
                      max={9}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initialSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Supply</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isDeploying || !publicKey}
            >
              {isDeploying ? "Deploying Token..." : "Deploy Token"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}