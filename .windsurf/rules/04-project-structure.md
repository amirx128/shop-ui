---
trigger: always_on
---

# Project Structure

The project follows a specific directory structure. All files must be placed in their designated directories.

## Directory Structure

### `/components/pages`

- Contains page-specific components
- Each page component should be placed in this directory
- Examples: `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`

### `/components/ui`

- Contains reusable UI components
- Examples: `Button.tsx`, `Input.tsx`, `Card.tsx`, `Modal.tsx`
- These are generic components that can be used across the application

### `/components/features`

- Contains layout and feature components
- Header, footer, and layout components go here
- Examples: `Header.tsx`, `Footer.tsx`, `Layout.tsx`, `Sidebar.tsx`

### `/hooks`

- Contains custom React hooks
- Reusable hooks for common functionality
- Examples: `useAuth.ts`, `useLocalStorage.ts`, `useMediaQuery.ts`

### `/lib/mui`

- Contains MUI configuration
- Theme configuration and MUI-related utilities
- Examples: `theme.ts`, `registry.ts`

### `/lib/reactQuery`

- Contains React Query configuration
- Query client setup and providers
- Examples: `queryClient.ts`, `QueryProvider.tsx`

### `/lib/redux`

- Contains Redux configuration
- Store setup, reducers, and slices
- Examples: `store.ts`, `authSlice.ts`, `userSlice.ts`

### `/lib/toastify`

- Contains Toastify configuration
- Toast notification setup
- Examples: `toastConfig.ts`, `ToastProvider.tsx`

### `/lib/utils`

- Contains utility functions
- Helper functions and utilities
- Examples: `formatDate.ts`, `formatCurrency.ts`, `validation.ts`

### `/messages/[locale]`

- Contains translation JSON files
- i18n translations for different locales
- Examples: `en.json`, `fa.json`, `ar.json`

## Rules

- Always place files in their correct directory according to their purpose
- Do not create new directories without proper justification
- Follow the naming conventions for each directory type
- Keep related files together in their designated directories
