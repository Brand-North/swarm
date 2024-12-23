import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { NFTMinterParams, BaseAgentProps } from "@/types/agents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  collectionMint: z.string().min(1, "Collection mint address is required"),
  metadata: z.object({
    name: z.string().min(1, "Name is required"),
    uri: z.string().url("Must be a valid URI")
  }),
  recipient: z.string().optional()
});

export default function NFTMinter({ onSuccess, onError }: BaseAgentProps) {
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);

  const form = useForm<NFTMinterParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: {
        name: "",
        uri: ""
      }
    }
  });

  const onSubmit = async (data: NFTMinterParams) => {
    setIsMinting(true);
    try {
      // TODO: Implement NFT minting using Solana Agent Kit
      // await agent.mintCollectionNFT(
      //   data.collectionMint,
      //   data.metadata,
      //   data.recipient
      // );
      
      toast({
        title: "NFT Minted",
        description: `Successfully minted ${data.metadata.name} to collection`
      });
      onSuccess?.(data);
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Minting Failed",
        description: err.message,
        variant: "destructive"
      });
      onError?.(err);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mint Collection NFT</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="collectionMint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Mint Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Collection address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metadata.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My NFT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metadata.uri"
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
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipient address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isMinting}
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
