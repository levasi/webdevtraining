import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RESOURCE_TIERS } from "@/lib/resources";

export function ResourcesContent() {
  return (
    <div className="space-y-12">
      {RESOURCE_TIERS.map((tier) => (
        <section key={tier.id} className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">Tier {tier.tier}</Badge>
            <h2 className="text-xl font-semibold tracking-tight">{tier.title}</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tier.resources.map((resource) => (
              <Card key={resource.id} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{resource.name}</CardTitle>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Open ${resource.name} in a new tab`}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {resource.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Visit {resource.name}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
