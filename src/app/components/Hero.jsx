import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-white pt-16">
      <div className="container mx-auto px-4 py-16 text-center animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
          Transform Your Workflow
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Streamline your business operations with our powerful SaaS solution.
          Built for modern teams who demand excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg hover:shadow-lg transition-shadow hover:cursor-pointer">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" className="px-8 py-6 text-lg">
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
