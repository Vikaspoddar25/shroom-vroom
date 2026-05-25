import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const title = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} — Learn`,
    description: `Read about ${title.toLowerCase()} on the Shroom Vroom blog.`,
  };
}

export default function LearnArticlePage({ params }: Props) {
  // TODO(shroom-vroom): Wire up MDX content or CMS fetch for real articles
  const title = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <Section className="pt-28">
      <Container className="max-w-3xl">
        <span className="text-xs font-medium uppercase tracking-wider text-terracotta">
          Article
        </span>
        <h1 className="mt-3 font-serif text-display-md font-bold text-forest">{title}</h1>
        <div className="prose mt-8 max-w-none text-char/70">
          <p>
            This is a placeholder article page. In production, this would render MDX content or
            fetch from a headless CMS like Sanity or Contentful.
          </p>
          <p>
            The routing is set up and ready — just drop your content into the data layer and
            it&apos;ll render beautifully here.
          </p>
        </div>
      </Container>
    </Section>
  );
}
