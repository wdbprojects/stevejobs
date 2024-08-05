import DarkMode from "@/components/shared/dark-theme";
import Link from "next/link";
import { Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="bg-muted shadow-md">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-3">
        <Button variant="ghost" size="default" asChild>
          <Link href="/">
            <Layers3 className="" />
            <span className="ml-2 text-sm font-semibold tracking-tight">
              Flow Jobs
            </span>
          </Link>
        </Button>

        <div className="flex items-center justify-end gap-4">
          <Button asChild variant="outline">
            <Link href="/jobs/new">New Job</Link>
          </Button>
          <DarkMode />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
