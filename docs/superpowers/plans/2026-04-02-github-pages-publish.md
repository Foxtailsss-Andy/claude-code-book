# GitHub Pages Publish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish this static site as a public GitHub repository and a GitHub Pages project site.

**Architecture:** Keep the existing repository structure intact, publish the repository root through GitHub Pages, and use local git plus GitHub tooling to create and push the remote repository. Because the site already uses relative paths, it can be served from a project subpath without rewriting links.

**Tech Stack:** HTML, CSS, TypeScript, esbuild, git, GitHub Pages

---

### Task 1: Prepare repository metadata

**Files:**
- Create: `.gitignore`
- Create: `README.md`

- [ ] **Step 1: Add `.gitignore`**

Ignore `node_modules/`, macOS metadata, logs, and other local-only artifacts.

- [ ] **Step 2: Add `README.md`**

Document the site purpose, local preview commands, structure, and target Pages URL shape.

### Task 2: Verify publishable output

**Files:**
- Modify: none
- Test: `package.json`

- [ ] **Step 1: Run type check**

Run: `npm run check`
Expected: TypeScript completes without errors.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `assets/app.js` is generated successfully.

### Task 3: Create and publish the git repository

**Files:**
- Modify: local git metadata only

- [ ] **Step 1: Initialize git**

Run: `git init -b main`
Expected: local repository created on `main`.

- [ ] **Step 2: Commit the site**

Stage the intended files and create the first commit for public release.

- [ ] **Step 3: Create remote repository and push**

Use GitHub tooling to create public repo `claude-code-book`, add `origin`, and push `main`.

### Task 4: Enable GitHub Pages and verify

**Files:**
- Modify: GitHub repository settings only

- [ ] **Step 1: Turn on GitHub Pages**

Publish from the repository default branch and root directory.

- [ ] **Step 2: Verify the live URL**

Confirm the repo URL and Pages URL are both reachable.
