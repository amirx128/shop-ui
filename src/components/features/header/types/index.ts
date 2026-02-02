export interface HeaderProps {
  onSearch?: (value: string) => void;
  onNotificationClick?: () => void;
  mode?: 'primary' | 'secondary';
}
