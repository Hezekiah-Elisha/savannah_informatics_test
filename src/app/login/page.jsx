import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div>
      Continue With Github
      <Button className="">
        <Github className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  );
}
