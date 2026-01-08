---
trigger: always_on
---
# UI Rules

## Theme Configuration

The project uses a custom MUI theme defined in `src/lib/mui/theme.ts` with the following specifications:

### Color Palette

- **Primary**: `#223A78` (main), `#4a5e91` (light), `#172954` (dark)
- **Secondary**: `#ff7543` (main), `#ff916b` (light), `#cc5a33` (dark)
- **Background**: `#fefefe` (default), `#ffffff` (paper)
- **Text**: `#52526b` (primary), `#3f3f46` (secondary), `#a1a1aa` (disabled)
- **Divider**: `#d4d4d8`
- **Custom Colors**: `#71717A` (caption), `#a1a1aa` (gray400), `#ffffff` (white)

### Typography

- **Font Family**: Inter, Roboto, Helvetica, Arial, sans-serif
- **Headings**: H1 (2rem), H2 (1.75rem), H3 (1.5rem), H4 (1.25rem), H5 (1.1rem), H6 (1rem)
- **Subtitles**: Subtitle1 (1rem), Subtitle2 (0.875rem)
- **Body**: Body1 (1rem), Body2 (0.875rem)
- **Caption**: 0.75rem

### Component Styling

- **Buttons**: 8px border radius, no text transformation
- **Text Fields**: Custom border colors with hover and focus states
- **Paper**: 1px solid border with `#d4d4d8`

## Mobile First Design

The application must be designed with a **mobile-first approach**:

- Start by designing for mobile devices
- Use responsive breakpoints for tablets and desktops
- Ensure all components are touch-friendly
- Test layouts on mobile screens first, then scale up

## Usage

Always use the theme colors and typography from the MUI theme configuration. Do not hardcode colors or font sizes in components unless absolutely necessary.
