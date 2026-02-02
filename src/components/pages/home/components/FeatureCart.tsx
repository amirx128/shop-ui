import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface FeatureCartProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: 'success' | 'secondary' | 'primary' | 'error';
}

export default function FeatureCart({
  icon,
  title,
  subtitle,
  color,
}: FeatureCartProps) {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '18px',
        padding: '24px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      })}
    >
      <Box
        sx={(theme) => ({
          width: 52,
          height: 52,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha(theme.palette[color].main, 0.12),
          color: theme.palette[color].main,
          flexShrink: 0,
        })}
      >
        {icon}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
