export interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  key: string;
}

export interface NavbarProps {
  currentPath?: string;
}
