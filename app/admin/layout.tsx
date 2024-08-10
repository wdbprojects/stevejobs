import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import AdminNavbar from "./admin-navbar";

export const metadata: Metadata = {
  title: "Admin",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <AdminNavbar />
      {children}
    </ClerkProvider>
  );
};

export default Layout;
