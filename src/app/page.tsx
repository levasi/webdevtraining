import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight, BookOpen, Brain, Code2, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LEARNING_MODES } from "@/lib/constants";
import { auth } from "@/lib/auth";

const features = [
  {
    icon: BookOpen,
    title: "Question Bank",
    description:
      "18 categories from JavaScript to System Design with difficulty levels.",
  },
  {
    icon: Brain,
    title: "Multiple Learning Modes",
    description:
      "Quizzes, coding challenges, API drills, and interview simulation.",
  },
  {
    icon: Code2,
    title: "Coding Playground",
    description:
      "Run JavaScript solutions against test cases with hints and progress tracking.",
  },
  {
    icon: Sparkles,
    title: "Track Progress",
    description:
      "Notes, study history, and per-category progress dashboards.",
  },
];

export default async function HomePage() {
  let startHref = "/register";

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      startHref = "/categories";
    }
  } catch {
    // Database or auth unavailable during build/local setup.
  }

  return (
    <div className="w-full px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Prepare for technical interviews with confidence
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={startHref} size="lg">
            Start practicing
            <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href="/categories" size="lg" variant="outline">
            Browse categories
          </ButtonLink>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="size-5 text-primary" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold">Learning modes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_MODES.map((mode) => (
            <Link key={mode.slug} href={`/${mode.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{mode.label}</CardTitle>
                  <CardContent className="px-0 pt-2 text-sm text-muted-foreground">
                    Start practicing in {mode.label.toLowerCase()}.
                  </CardContent>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
