import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Auth Page",
  description: "Auth page for user authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
            <main className="flex-1 overflow-y-hidden">
              {children}
            </main>
      </body>
    </html>
  );
}