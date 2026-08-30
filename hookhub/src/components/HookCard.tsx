import type { Hook } from "@/data/hooks";

interface HookCardProps {
  hook: Hook;
}

export function HookCard({ hook }: HookCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-foreground/20 bg-background p-6 shadow-sm transition-shadow hover:shadow-md dark:border-foreground/10">
      {/* Name */}
      <h3 className="text-lg font-semibold text-foreground">{hook.name}</h3>

      {/* Category badge */}
      <span className="inline-flex w-fit rounded-full bg-foreground/10 px-3 py-1 text-sm font-medium text-foreground dark:bg-foreground/5">
        {hook.category}
      </span>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-foreground/70">
        {hook.description}
      </p>

      {/* Link to repo */}
      <a
        href={hook.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground underline hover:text-foreground/80 transition-colors"
      >
        View Repository
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
}