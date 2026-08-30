export type HookCategory =
  | "Notifications"
  | "Git & Version Control"
  | "Formatting & Linting"
  | "Security & Validation"
  | "Logging & Observability"
  | "Testing"
  | "Productivity"
  | "Other";

export interface Hook {
  /** Stable slug, used as the React list key (kebab-case of the name). */
  id: string;
  name: string;
  category: HookCategory;
  /** One or two sentences describing what the hook does. */
  description: string;
  /** Link to the GitHub repository containing the hook. */
  repoUrl: string;
}

export const hooks: Hook[] = [
  {
    id: "sound-notification-hook",
    name: "Sound Notification Hook",
    category: "Notifications",
    description:
      "Plays a system sound when Claude Code needs user attention (Notification event).",
    repoUrl: "https://github.com/pascalporedda/awesome-claude-code",
  },
  {
    id: "task-complete-chime",
    name: "Task Complete Chime",
    category: "Notifications",
    description:
      "Plays a sound when Claude finishes responding, so you know a task wrapped up without watching the terminal (Stop event).",
    repoUrl: "https://github.com/pascalporedda/awesome-claude-code",
  },
  {
    id: "subagent-complete-chime",
    name: "Subagent Complete Chime",
    category: "Notifications",
    description:
      "Plays a sound when a spawned subagent finishes its work (SubagentStop event).",
    repoUrl: "https://github.com/pascalporedda/awesome-claude-code",
  },
];