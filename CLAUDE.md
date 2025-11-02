# SciFeed - Research Paper Feed Platform

## Project Overview

SciFeed is a user-friendly web application that provides researchers, students, and enthusiasts with easy access to the latest open and free research papers. The platform presents scientific literature in a modern, filterable feed format, making academic research more accessible and discoverable.

## Core Features

### Subject Selection
- Users can select multiple research subjects/fields they're interested in
- Subject preferences should be persistent (consider localStorage or user accounts)
- Easy to modify/update subject preferences

### Research Paper Feed
- Display latest papers from selected subjects in a clean, scrollable feed
- Each paper entry should show:
  - Title and authors
  - Abstract/summary (truncated with expand option)
  - Publication date
  - Citation count
  - Journal/source and impact factor
  - DOI/link to full paper
  - Subject tags/categories

### Filtering & Sorting
- Filter papers by:
  - Citation count (minimum threshold or ranges)
  - Impact factor of journal/source
  - Publication date range
  - Specific subjects/sub-fields
  - Paper type (article, review, preprint, etc.)
- Sort by:
  - Most recent
  - Most cited
  - Highest impact factor
  - Relevance

### Additional Considerations
- Responsive design for mobile and desktop
- Search functionality within the feed
- Ability to bookmark/save papers for later
- Export citations in common formats (BibTeX, APA, etc.)

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with React Server Components
- **Runtime**: Bun (package manager, bundler, and runtime)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (use shadcn components whenever possible)
- **State Management**: React hooks, Context API, or Zustand for client state
- **Data Fetching**:
  - Server Components for initial data loading
  - TanStack Query (React Query) for client-side data fetching and caching
  - Next.js API Routes for backend logic

## Development Guidelines

### Code Style & Architecture

1. **Functional & Data-Oriented Approach**
   - Prefer functional components and hooks over class components
   - Use pure functions and immutable data structures
   - Favor data transformations over object mutations
   - Avoid OOP patterns - prefer composition over inheritance
   - Think in terms of data pipelines and transformations

2. **Next.js App Router Patterns**
   - **Server Components by default** - only use 'use client' when necessary
   - Use Server Components for data fetching and static content
   - Use Client Components for interactivity (filters, search, user input)
   - Leverage Server Actions for mutations when appropriate
   - Keep server and client boundaries clear

3. **Component Structure**
   - Keep components small and focused (single responsibility)
   - Separate Server Components (data fetching) from Client Components (interactivity)
   - Use custom hooks for reusable client-side logic
   - Co-locate related files (component + styles + tests)

4. **TypeScript Best Practices**
   - Define explicit types for all props, state, and API responses
   - Use type inference where appropriate
   - Avoid `any` type - use `unknown` if type is truly unknown
   - Create shared types in a `types/` or `lib/types/` directory
   - Use Zod or similar for runtime validation of API responses

5. **shadcn/ui Components**
   - Always check if a shadcn component exists before creating custom UI
   - Customize shadcn components through Tailwind classes
   - Follow shadcn patterns for form handling and validation
   - Most shadcn components are Client Components

### Build & Testing

- **Build Verification**: Run `bun run build` after each significant change to ensure TypeScript compilation succeeds
- **Development**: Use `bun run dev` for hot-reload development
- **Type Checking**: Run `bun run lint` or use `tsc --noEmit` to ensure no TypeScript errors
- **Package Management**: Use `bun add` for dependencies, `bun add -d` for dev dependencies
- **Bun Runtime**: Leverage Bun's speed for fast installs and builds

### File Organization

Next.js App Router structure:

```
app/
├── api/              # API Routes (server-side endpoints)
│   ├── papers/       # Paper fetching endpoints
│   └── subjects/     # Subject/field management
├── feed/             # Feed page route
├── layout.tsx        # Root layout
├── page.tsx          # Home page
└── globals.css       # Global styles

components/
├── ui/               # shadcn components
├── feed/             # Feed-related components (mark as 'use client' if interactive)
├── filters/          # Filter components (likely Client Components)
└── layout/           # Layout components

lib/
├── api/              # API client functions and fetchers
├── utils.ts          # Utility functions (cn, formatters, etc.)
└── types.ts          # TypeScript type definitions

hooks/                # Custom React hooks (client-side only)
```

## Data Sources

Research paper data will be fetched from open APIs such as:
- **arXiv API** (preprints across physics, CS, math, etc.)
- **PubMed Central** (biomedical and life sciences)
- **Crossref** (DOI metadata, citations)
- **Semantic Scholar API** (citations, impact, paper recommendations)
- **OpenAlex** (comprehensive academic data, open access)

### API Integration Strategy

- **Use Next.js API Routes** (`app/api/*`) to proxy external API calls
  - Keeps API keys secure (not exposed to client)
  - Implements rate limiting and request caching
  - Aggregates data from multiple sources
  - Transforms API responses into unified format

- **Caching Strategy**
  - Use Next.js cache functions for server-side caching
  - Implement time-based revalidation (ISR) for paper feeds
  - Use TanStack Query for client-side caching
  - Consider Redis or similar for production caching

## Future Enhancements

- User authentication and personalized feeds
- Email notifications for new papers in selected subjects
- Social features (share, discuss papers)
- AI-powered paper recommendations
- Paper reading list and notes
- Integration with reference managers (Zotero, Mendeley)

## Notes for Claude

- Prioritize clean, maintainable code over clever solutions
- Ask clarifying questions if requirements are ambiguous
- Suggest improvements to UX/UI when appropriate
- Keep accessibility in mind (ARIA labels, keyboard navigation)
- Always verify builds compile successfully
