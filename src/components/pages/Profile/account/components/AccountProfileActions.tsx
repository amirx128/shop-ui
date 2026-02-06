import { Box } from '@mui/material';
import Button from '@/components/ui/Button';

interface AccountProfileActionsProps {
  formId: string;
  saveLabel: string;
  cancelLabel: string;
}

export default function AccountProfileActions({
  formId,
  saveLabel,
  cancelLabel,
}: AccountProfileActionsProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button type="submit" form={formId} variant="solid" sx={{ flex: 1 }}>
        {saveLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        sx={{ flex: 1, color: 'text.primary' }}
      >
        {cancelLabel}
      </Button>
    </Box>
  );
}
