import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CollectionDeployerParams, BaseAgentProps } from "@/types/agents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  uri: z.string().url("Must be a valid URI"),
  royaltyBasisPoints: z.number().min(0).max(10000),
  creators: z.array(z.object({
    address: z.string(),
    percentage: z.number().min(0).max(100)
  }))
});

export default function CollectionDeployer({ onSuccess, onError }: BaseAgentProps) {
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);

  const form = useForm<CollectionDeployerParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      royaltyBasisPoints: 500,
      creators: [{ address: "", percentage: 100 }]
    }
  });

  const onSubmit = async (data: CollectionDeployerParams) => {
    setIsDeploying(true);
    try {
      // TODO: Implement collection deployment using Solana Agent Kit
      // const collection = await agent.deployCollection({
      //   name: data.name,
      //   uri: data.uri,
      //   royaltyBasisPoints: data.royaltyBasisPoints,
      //   creators: data.creators
      // });
      
      toast({
        title: "Collection Deployed",
        description: `Successfully deployed collection ${data.name}`
      });
      onSuccess?.(data);
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
        <CardTitle>Deploy NFT Collection</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Collection" {...field} />
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
              name="royaltyBasisPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Royalty % (basis points)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creators.0.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Solana address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isDeploying}
            >
              {isDeploying ? "Deploying..." : "Deploy Collection"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
