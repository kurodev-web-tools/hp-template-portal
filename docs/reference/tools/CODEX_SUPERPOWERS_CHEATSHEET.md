# Codex + superpowers Cheat Sheet

## Positioning
- Use `superpowers` as a skill library, not as the main operating system.
- Let the global `C:\Users\taka\.codex\AGENTS.md` remain the default behavior.
- Let each repository `AGENTS.md` override project-specific behavior.
- Use skills only when they materially improve quality, speed, or clarity.

## Good Default Usage
- Large feature or new integration: consider `brainstorming` then `writing-plans`
- Hard-to-explain bug: consider `systematic-debugging` or `root-cause-tracing`
- Before finishing a meaningful change: consider `requesting-code-review`
- Small HTML/CSS or script edits: skip skills unless there is a real need

## Best Fit For This Workspace
- Multi-tool portal design
- Integration planning
- Failure-path review
- Debugging cross-tool behavior
- Reviewing larger implementation batches

## Use Carefully
- `using-superpowers`
- `test-driven-development`
- `subagent-driven-development`
- `using-git-worktrees`

These are useful, but they add process weight. Use them only for larger, riskier work.

## Practical Rule
- Prefer project context over skill doctrine.
- Prefer existing `task.md`, `spec.md`, and repository rules over a generic workflow.
- Use the minimum skill set needed for the task at hand.

## Install Notes
- Official repo: `https://github.com/obra/superpowers`
- Suggested local path: `C:\Users\taka\.codex\superpowers`
- Skills link path: `C:\Users\taka\.agents\skills\superpowers`
- Restart Codex after installation so new skills are detected.

## Manual Install
```powershell
git clone https://github.com/obra/superpowers.git C:\Users\taka\.codex\superpowers
New-Item -ItemType Directory -Force C:\Users\taka\.agents\skills | Out-Null
New-Item -ItemType Junction -Path C:\Users\taka\.agents\skills\superpowers -Target C:\Users\taka\.codex\superpowers | Out-Null
```
