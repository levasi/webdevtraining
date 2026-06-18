import Link from "next/link";

import { ProposeContentDialog } from "@/components/layout/propose-content-dialog";

const footerLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/quiz", label: "Quizzes" },
  { href: "/challenges", label: "Challenges" },
  { href: "/resources", label: "Resources" },
];

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Web Dev Training</p>
          <p className="text-sm text-muted-foreground">
            Practice questions, quizzes, and coding challenges.
          </p>
          <p className="text-xs text-muted-foreground">
            © {year} Web Dev Training
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ProposeContentDialog />
        </div>
      </div>
    </footer>
  );
}
