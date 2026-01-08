---
trigger: always_on
---

# Components

All pages and layouts should be **Server Components** by default. Use `"use client"` only when absolutely necessary.

## Rules

- Pages and layouts must be Server Components
- Avoid using `"use client"` directive unless necessary
- When `"use client"` is required, optimize performance using `useMemo` and `useCallback`

## Server Components (Default)

```typescript
export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
```

## Client Components (When Needed)

```typescript
'use client';

import { useState, useMemo, useCallback } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const doubledCount = useMemo(() => {
    return count * 2;
  }, [count]);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubledCount}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};
```

## When to Use Client Components

- Interactive features (onClick, onChange, etc.)
- Browser APIs (window, document, localStorage)
- State management hooks (useState, useEffect, useReducer)
- Custom hooks that use browser APIs

## Performance Optimization

When using `"use client"`:

- Use `useMemo` for expensive computations
- Use `useCallback` for functions passed to child components
- Avoid unnecessary re-renders by memoizing values and callbacks
- Keep client components as small as possible
