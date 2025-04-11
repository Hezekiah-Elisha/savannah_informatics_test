import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BadgePlus, LogOut } from "lucide-react";
import { auth, signIn, signOut } from "../../auth";
import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { MenubarContent } from "@radix-ui/react-menubar";

export default async function Navbar() {
  // const session = await auth();
  const session = await auth();

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
        {/* <Button className="bg-primary hover:bg-primary/90">Get Started</Button> */}
        <div className="flex flex-row gap-2">
          {session && session?.user ? (
            <Menubar className="font-poppins">
              <MenubarMenu>
                <MenubarTrigger>
                  {/* <Link href={`/user/${session?.id}`}> */}
                  <Avatar className="">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <p>Hey {session?.user?.name || ""}</p>
                  {/* </Link> */}
                </MenubarTrigger>
                <MenubarContent>
                  {/* <MenubarItem> */}
                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                      }}
                    >
                      <Button type="submit">
                        <span className="max-sm:hidden">Logout</span>
                        <LogOut className="size-6 sm:hidden text-red-500" />
                      </Button>
                    </form>
                  {/* </MenubarItem> */}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Button type={"submit"}>Login</Button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
