---
trigger: always_on
---

# Forms

All forms in this project must use **React Hook Form** for form management and **Zod** for validation.

## Rules

- Use React Hook Form for all form state management
- Use Zod schemas for form validation
- Integrate Zod validation with React Hook Form using the `zodResolver`

## Usage

### Basic Setup

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Best Practices

- Define Zod schemas separately when possible for reusability
- Use TypeScript types inferred from Zod schemas
- Handle form errors appropriately
- Keep validation logic in Zod schemas, not in components
