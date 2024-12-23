import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Protocols from "@/components/sections/Protocols";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <Protocols />
    </main>
  );
}