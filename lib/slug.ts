import GithubSlugger from "github-slugger";

export function slugify(input: string): string {
  return new GithubSlugger().slug(input);
}
