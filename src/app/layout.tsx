import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Topbar from "@/components/topbar/topbar";
import TasksProvider from "@/context/tasksContext";
import AuthProvider from "@/context/authContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Orion",
  description: "Stop guessing what works. Start understanding how you create your best work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased text-dark dark:bg-dark dark:text-white/[0.9] md:text-[14px] text-[12px]`}
      >
      <TasksProvider>
      <AuthProvider>
          <Topbar />
          {children}
          <Footer />
      </AuthProvider>
      </TasksProvider>
      </body>
    </html>
  );
}
