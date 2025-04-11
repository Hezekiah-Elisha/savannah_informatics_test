import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b font-monserrat">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-black">
        <div className="font-bold text-xl text-primary">
          Photos<span className="text-black">+</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#pricing"
            className="text-sm hover:text-primary transition-colors"
          >
            Albums
          </a>
          <a
            href="#about"
            className="text-sm hover:text-primary transition-colors"
          >
            Users
          </a>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
      </div>
    </nav>
  );
}
