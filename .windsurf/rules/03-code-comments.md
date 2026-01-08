---
trigger: always_on
---

# Code Comments

All code must be written **without comments**.

## Rule

- Do not add any comments to the code
- Code should be self-documenting through clear naming conventions
- Use descriptive variable and function names instead of comments
- Keep code simple and readable without explanatory comments

## Examples

### Bad (with comments)

```typescript
const calculateTotal = (items: Item[]) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price; // Add each item price to total
  });
  return total;
};
```

### Good (without comments)

```typescript
const calculateTotal = (items: Item[]) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price;
  });
  return total;
};
```
