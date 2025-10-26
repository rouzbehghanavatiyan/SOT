import { ReactNode } from "react";

export interface Category {
  id: string | number;
  name: string;
  icon?: string;
  label?: string;
}

export interface TalentModeProps {
  iconMap?: Record<string, ReactNode>;
  categories?: any[];
  isCategoryDisabled?: (category: any) => boolean;
  handleAcceptCategory?: (category: any) => void;
  isLoading?: boolean;
  defaultIcon?: ReactNode;
  containerClass?: string;
  itemClass?: string;
  textClass?: string;
  disabledItemClass?: string;
  disabledTextClass?: string;
}

export interface CategoryItem {
  id: string | number;
  name: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
}
