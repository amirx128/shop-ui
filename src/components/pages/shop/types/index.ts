export interface ShopHeaderItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  disableHover?: boolean;
  onClick?: () => void;
}

export interface ShopHeaderProps {
  items: ShopHeaderItemProps[];
}

export interface ShopBodyProps {
  children: React.ReactNode;
}
