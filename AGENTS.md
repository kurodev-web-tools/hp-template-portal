# HP-Portal Project AGENTS.md

## Scope
- This file defines HP-Portal-specific Codex behavior.
- Use it together with the global Codex rules. Keep generic safety, tone, and tool rules in the global `AGENTS.md`; keep HP-Portal workflow rules here.
- Apply these rules to template renewals, new template additions, category-level design work, portal UI changes, and related documentation.
- Current user instructions, Linear issue context, `WORKFLOW.md` / Symphony workflow rules, and local task/spec/design documents define the active task.
- When instructions conflict, prefer the most specific current task source and report the conflict if it changes the implementation path.

## Project Work Model
- Treat each task as one of: template renewal, new template addition, category-level design, narrow bug fix, documentation update, or project infrastructure work.
- Before editing files, identify the target category, template, expected output, relevant design documents, and acceptance criteria.
- Preserve the template's intended identity. Do not make templates in the same category visually interchangeable unless the task explicitly requests convergence.
- Keep changes independently reviewable. Avoid combining unrelated template, category, or infrastructure changes in one diff.
- If category, template, scope, or acceptance criteria are missing and implementation cannot be safely bounded, state the gap and proceed only with the smallest safe unit.

## Linear And Symphony Context
- When a Linear issue is attached, use its title, description, comments, and acceptance criteria as the primary task context.
- When Symphony or `WORKFLOW.md` is present, treat it as the workflow contract for workspace setup, status transitions, handoff states, and issue-update behavior.
- Do not change Linear status, assignee, labels, estimates, or comments unless the user or active workflow explicitly requests it.
- For design or renewal issues, map the issue to a specific category and template before implementation.
- Final reports should be short enough to paste into Linear: include progress, verification, risks, and next action.

## Worktree And Branch Policy
- Prefer one branch and one worktree per template for template renewals, new template additions, and independent category work.
- Use separate worktrees when changes should be reviewed, shipped, or reverted independently.
- Keep `main` clean and use it as the stable reference point.
- Do not create a worktree for pure planning, categorization, naming, or theme exploration. Create one only when the task becomes a concrete implementation unit with file changes.
- For small, narrow, low-risk fixes, a dedicated worktree is optional.
- For parallel work, isolate templates by default. Use a shared branch only when the templates are intentionally shipped together and the shared diff is simpler.
- Use readable branch and worktree names that include the category and template slug when applicable.
- After a worktree branch is merged and no follow-up work is expected, remove the worktree only after confirming it has no unmerged work.

## Template Renewal Workflow
- Phase 0: Intake. Read the user request or Linear issue, relevant `task.md` / spec files, category-level `DESIGN.md`, template-level `DESIGN.md`, and existing implementation.
- Phase 1: Structure only. Implement layout, section order, hierarchy, and core containers. Do not add motion, decorative effects, or heavy visual polish in this phase.
- Phase 2: Visual differentiation. Add the template's signature visual language, spacing, typography, color treatment, imagery treatment, and category-compatible atmosphere.
- Phase 3: Interaction and responsiveness. Add motion, hover/focus states, responsive behavior, accessibility details, and edge-case handling.
- Phase 4: Verification and handoff. Run relevant checks, inspect the diff, summarize changed files, and list remaining risks or follow-up work.
- Progress in meaningful units. After each unit, report what changed and what the next unit is.
- Commit per completed unit only when the user or active workflow explicitly expects commits. Otherwise leave a clean, reviewable working diff.
- The default handoff is local implementation plus verification. The user owns final push and PR unless the user or workflow explicitly assigns that step to Codex.

## Design Documentation
- Use category-level `DESIGN.md` files to define shared category direction, visual constraints, UX rules, section patterns, responsive expectations, and anti-patterns.
- Use template-level `DESIGN.md` files to define the template's unique design intent, signature elements, differentiation from sibling templates, motion language, and implementation constraints.
- Place category-level `DESIGN.md` files in the category directory.
- Place template-level `DESIGN.md` files in the template directory.
- Do not create template-level `DESIGN.md` files during ideation only. Create or update them once the template becomes a concrete implementation unit.
- Keep category-level documents focused on shared rules. Keep template-level documents focused on differences, signature elements, constraints, and anti-patterns for that template.
- Prefer updating existing documentation over creating redundant files.
- When implementation deviates from a design document, keep the deviation minimal and explain it in the final report.

## Implementation Quality
- Make minimal, cohesive changes that solve the active task.
- Follow existing project structure, naming, component patterns, styling conventions, and asset conventions.
- Maintain semantic structure, accessible labels, keyboard/focus behavior, and readable hierarchy when touching UI.
- Check responsive behavior at mobile, tablet, and desktop widths when the change affects layout.
- Avoid horizontal overflow, layout jumps, clipped content, and interaction states that depend only on hover.
- Do not introduce unlicensed external assets, hard-coded private content, or placeholder production copy unless the task explicitly calls for placeholders.
- Do not add new dependencies or broad abstractions unless they are necessary and the tradeoff is clear.
- Reuse components when repetition is real. Avoid abstractions that erase template-specific identity.
- For visual work, prioritize intentional design language over decorative additions.

## State Tracking
- Treat `task.md` as the current operational source of truth only when it exists or is provided.
- Review `task.md` before implementation when present.
- Update `task.md` after meaningful work only when the repository workflow expects it or the user requests it.
- Treat `docs/PLAN.md`, implementation plans, and design docs as supporting context for longer-term structure and phased direction.
- If Linear context, `task.md`, `docs/PLAN.md`, and `DESIGN.md` disagree, prioritize the active task's acceptance criteria and the most specific design document. Report the inconsistency.
- Keep project history, daily logs, and implementation notes aligned only when the workflow depends on them or the user asks.

## Verification
- Changes are not complete until relevant checks have been attempted.
- Discover project-defined commands from package scripts, configuration files, or local documentation before inventing commands.
- For template and UI work, at minimum inspect the diff and run the smallest relevant build, lint, type-check, or test command available.
- When layout or interaction changes are made, perform a visual sanity check when the local environment supports it.
- If checks fail, distinguish introduced failures from pre-existing or environment-limited failures when possible.
- Report exact command names, whether they passed or failed, and any blocked verification.

## Reporting
- Final reports should include: task type, category/template, files changed, completed phase or unit, verification performed, remaining risks, and next recommended action.
- Keep reports concise and technical.
- For Linear or Symphony handoff, avoid claims such as “done”, “ready to merge”, or “blocked” unless they match the active workflow state.
- Do not include long logs unless the user requests them.
