---
trigger: always_on
---

# Component Guidelines

## Container Usage

Always use MUI `Container` component for layout containers instead of manually setting max-width, margins, and padding.

**Good:**

```tsx
import { Container } from '@mui/material';

<Container maxWidth="lg">{children}</Container>;
```

**Bad:**

```tsx
<Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>{children}</Box>
```

## Color Usage

Use MUI color tokens as string values in `sx` prop instead of hardcoded colors or theme object access.

**Good:**

```tsx
<Box sx={{ backgroundColor: 'primary.main' }} />
<Box sx={{ color: 'common.white' }} />
<Box sx={{ color: 'text.primary' }} />
```

**Bad:**

```tsx
<Box sx={{ backgroundColor: '#223A78' }} />
<Box sx={{ color: '#ffffff' }} />

const theme = useTheme();
<Box sx={{ backgroundColor: theme.palette.primary.main }} />
<Box sx={{ color: theme.customColors.white }} />
```

## Client Component Directive

Add `'use client'` directive at the top of files when:

- Using React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, etc.)
- Using custom hooks (`useTranslations`, `useForm`, etc.)
- Using browser APIs (`window`, `document`, `localStorage`, etc.)
- Using event handlers (`onClick`, `onChange`, etc.)

**Good:**

```tsx
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  const t = useTranslations();

  return <div>{t('hello')}</div>;
}
```

**Good (Server Component):**

```tsx
import { Box, Container } from '@mui/material';

export default function MyComponent() {
  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <Container>
        <div>Content</div>
      </Container>
    </Box>
  );
}
```

**Bad:**

```tsx
import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  return <div>{count}</div>;
}
```
