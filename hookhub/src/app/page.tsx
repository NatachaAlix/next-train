import { hooks } from "@/data/hooks";
import { HookGrid } from "@/components/HookGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hookhub
          </h1>
          <p className="mt-4 text-lg text-foreground/70 sm:text-xl">
            Discover open source Claude Code hooks for your workflow
          </p>
        </div>

        {/* Hook Grid */}
        <HookGrid hooks={hooks} />
      </div>
    </main>
  );
}
