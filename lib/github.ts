import { cacheLife } from "next/cache";

import { REPO_URL } from "@/lib/site";

export async function getStars(): Promise<number | null> {
  "use cache";
  cacheLife("hours");

  try {
    const repo = new URL(REPO_URL).pathname.replace(/^\//, "");
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export function formatStars(value: number) {
  if (value >= 1000)
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
  return String(value);
}
