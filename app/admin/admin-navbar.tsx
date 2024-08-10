"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const { user, signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="px-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Button asChild variant="link">
          <Link href="/admin" className="font-semibold">
            Admin Dashboard
          </Link>
        </Button>
        <div className="space-x-2">
          <span className="font-semibold">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <Button
            variant="link"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
