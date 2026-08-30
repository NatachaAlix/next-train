import type { Hook } from "@/data/hooks";
import { HookCard } from "./HookCard";

interface HookGridProps {
  hooks: Hook[];
}

export function HookGrid({ hooks }: HookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hooks.map((hook) => (
        <HookCard key={hook.id} hook={hook} />
      ))}
    </div>
  );
}