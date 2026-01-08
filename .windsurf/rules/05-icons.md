---
trigger: always_on
---

# Icons

All icons must be from **MUI (Material UI) icons library**.

## Rule

- Use only MUI icons for all icon needs
- Import icons from `@mui/icons-material`
- Do not use any other icon libraries (Lucide, Heroicons, etc.)

## Usage

### Importing Icons

```typescript
import { Home, Settings, User, Search } from '@mui/icons-material';
```

### Using Icons

```typescript
<Home />
<Settings fontSize="small" />
<User color="primary" />
<Search sx={{ fontSize: 24 }} />
```

## Available Icon Props

- `fontSize`: 'inherit' | 'small' | 'medium' | 'large'
- `color`: 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
- `sx`: Custom styles using the sx prop

## Examples

```typescript
import { ArrowForward, CheckCircle, Delete, Edit } from '@mui/icons-material';

<ArrowForward />
<CheckCircle color="success" />
<Delete color="error" />
<Edit fontSize="small" />
```

Always prefer MUI icons over SVG files or other icon libraries.
