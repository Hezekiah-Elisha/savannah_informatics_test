import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b font-monserrat">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-black">
        <div className="font-bold text-xl text-primary">
          <Link href="/" className="flex items-center gap-2">
            Photos<span className="text-black">+</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/albums"
            className="text-sm hover:text-primary transition-colors"
          >
            Albums
          </Link>
          <Link
            href="/users"
            className="text-sm hover:text-primary transition-colors"
          >
            Users
          </Link>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
      </div>
    </nav>
  );
}
