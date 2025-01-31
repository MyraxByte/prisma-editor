/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { UserAccountNav } from "~/components/shared/user-account-nav";
import { Icons } from "~/components/ui/icons";
import { ModeToggle } from "~/components/ui/mode-toggle";


export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-12 items-center justify-between px-4">
          <div className="flex flex-1 items-center sm:justify-start">
            <Link href="/">
              <div className="flex flex-shrink-0 items-center gap-4">
                <Icons.logo />
                <h1 className="text-md font-bold">Prisma Editor</h1>
                <p className="sr-only">
                  Prisma Editor: Prisma Schema Editor, Prisma Schema
                  visualization, visualize and edit Prisma schemas.
                </p>
              </div>
            </Link>
          </div>
          <div className="flex items-center sm:gap-2">
            <ModeToggle />
            <UserAccountNav />
          </div>
        </div>
      </div>
    </header>
  );
};
