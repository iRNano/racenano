# Packages Overview

This directory contains shared packages for the monorepo.

## @repo/schemas

Zod schemas for data validation. Defines the base data structures used across the application.

### Exports
- `Event`, `EventSchema`, `EventPreset` - Event/race data structures
- `Organizer`, `OrganizerSchema` - Organizer data structures
- `Racer`, `RacerSchema` - Racer/participant data structures

### Usage
```typescript
import { EventSchema, Event } from '@repo/schemas';
```

## @repo/types

TypeScript types derived from schemas. Re-exports types and schemas for easy consumption.

### Exports
- All types from `@repo/schemas`
- All schemas from `@repo/schemas`

### Usage
```typescript
import type { Event, Organizer } from '@repo/types';
import { EventSchema } from '@repo/types';
```

## @repo/mock

Mock data layer for development and testing. Provides mock data that matches the schema types.

### Exports
- `mockRaces`, `getRaceById`, `getRacesByOrganizer`, `getAllRaces` - Race mock data
- `mockOrganizers`, `getOrganizerById`, `getAllOrganizers` - Organizer mock data
- `mockEvents`, `getEventById`, `getEventsByOrganizer`, `getAllEvents` - Event mock data
- Extended types: `Race`, `ExtendedOrganizer`

### Usage
```typescript
import { getAllRaces, getRaceById } from '@repo/mock';
import type { Race, ExtendedOrganizer } from '@repo/mock';
```

## Package Structure

All packages follow the Turbo repo conventions:
- Each package has its own `package.json`
- TypeScript configuration extends `@repo/typescript-config`
- ESLint configuration uses `@repo/eslint-config`
- Packages are linked via workspace dependencies

## Adding New Packages

1. Create a new directory in `packages/`
2. Add `package.json` with name `@repo/<package-name>`
3. Add `tsconfig.json` extending the base config
4. Add the package to workspace dependencies in consuming packages
5. Run `npm install` to link packages

