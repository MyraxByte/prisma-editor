import { PropsWithChildren } from "react";
import Header from "~/components/layout/header/header";
import { cn } from "../ui/lib/cn";

export default function Layout({ children, className }: PropsWithChildren<{ className?: string; }>) {
  return (
    <main className={cn("min-h-screen dark:bg-slate-900", className)}>
      <Header />
      {children}
    </main>
  );
};
