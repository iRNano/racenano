# @repo/mock - Mock Data Layer

This package provides mock data for development and testing. It replaces static data files with a centralized, type-safe mock layer.

## Usage

### Importing Mock Data

```typescript
// Import mock data functions
import { getAllRaces, getRaceById, getRacesByOrganizer } from '@repo/mock';
import { getAllOrganizers, getOrganizerById } from '@repo/mock';
import { getAllEvents, getEventById } from '@repo/mock';

// Import types
import type { Race, ExtendedOrganizer } from '@repo/mock';
```

### Example: Using in a React Component

```typescript
'use client';

import { getAllRaces, getRaceById } from '@repo/mock';
import type { Race } from '@repo/mock';

export default function RacesPage() {
  // Get all races
  const races = getAllRaces();
  
  // Get a specific race
  const race = getRaceById('1');
  
  return (
    <div>
      {races.map((race) => (
        <div key={race.id}>{race.name}</div>
      ))}
    </div>
  );
}
```

### Example: Using in API Routes

```typescript
import { getAllRaces, getRaceById } from '@repo/mock';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    const race = getRaceById(id);
    if (!race) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(race);
  }
  
  const races = getAllRaces();
  return NextResponse.json(races);
}
```

## Available Functions

### Races
- `getAllRaces()` - Get all races
- `getRaceById(id: string)` - Get a race by ID
- `getRacesByOrganizer(organizerId: string)` - Get races for an organizer

### Organizers
- `getAllOrganizers()` - Get all organizers
- `getOrganizerById(id: string)` - Get an organizer by ID

### Events
- `getAllEvents()` - Get all events (base schema)
- `getEventById(id: string)` - Get an event by ID
- `getEventsByOrganizer(organizerId: string)` - Get events for an organizer
- `validateEvent(data: unknown)` - Validate event data against schema

## Types

### Race
Extended race type with additional fields for the app:
- Includes all fields from `Event` schema
- Additional: `type`, `description`, `cover`, `organizer`, `price`, etc.

### ExtendedOrganizer
Extended organizer type with additional fields:
- Includes all fields from `Organizer` schema
- Additional: `image`, `bio`, `fullBio`, `location`, `email`, etc.

## Migration from Static Data

Replace static data arrays with mock functions:

**Before:**
```typescript
const races = [
  { id: 1, name: 'Race 1', ... },
  { id: 2, name: 'Race 2', ... },
];
```

**After:**
```typescript
import { getAllRaces } from '@repo/mock';
const races = getAllRaces();
```

## Future: Database Integration

When ready to connect to a real database, create a new package `@repo/api` or `@repo/db` that provides the same function signatures but fetches from your database instead of mock data.

