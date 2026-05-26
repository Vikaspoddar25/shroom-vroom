"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

const categories = ["All", "Recipe", "Health", "Guide"] as const;

export function LearnArticles({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? articles
      : articles.filter((a) => a.category === filter);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-forest text-cream"
                : "bg-mist text-char/70 hover:bg-forest/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => (
          <FadeIn key={article.slug} delay={i * 0.05}>
            <Link
              href={`/learn/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-organic border border-mist bg-white/60 dark:bg-[#2a2c2a] transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[8/5] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-terracotta">
                    {article.category}
                  </span>
                  <span className="text-xs text-char/40">{article.date}</span>
                </div>
                <h2 className="mt-2 font-serif text-lg font-semibold text-forest transition-colors group-hover:text-terracotta">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-char/60">{article.excerpt}</p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
