# Notes Application

A modern note-taking application built with Next.js, featuring user authentication, account management, and a rich editor for CRUD operations on notes.

## Technology Stack

- **Framework**: Next.js
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm
- **Architecture**: Monorepo

## Project Structure

- `apps/web` — Main Next.js application
- `packages/ui` — Shared UI component library

## Installation

```bash
pnpm install
pnpm dev
```

## Adding UI Components

To add shadcn/ui components:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components are placed in `packages/ui/src/components`.

## Usage

Import components from the shared UI package:

```tsx
import { Button } from "@workspace/ui/components/button";
```
