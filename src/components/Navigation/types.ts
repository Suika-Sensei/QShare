import React, { ComponentType, ReactNode } from "react";

export type NavItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  iconActive?: ReactNode;
  iconInactive?: ReactNode;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
  screen: ComponentType;
};

export type NavigationItemProps = {
  item: NavItem;
  active?: boolean;
  onSelect?: (id: string, item: NavItem) => void;
  className?: string;
};

export type NavigationProps = {
  items: NavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onChange?: (id: string, item: NavItem) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  itemClassName?: string;
  renderItem?: (args: {
    item: NavItem;
    active: boolean;
    onSelect?: (id: string, item: NavItem) => void;
  }) => any;
};

export type NavigationBottomBarProps = React.ComponentProps<"div"> & {
  items: NavItem[];
  activeId?: number;
  defaultActiveId?: number;
  onChange?: (id: string, item?: NavItem) => void;
  itemClassName?: string;
  renderItem?: (args: {
    item: NavItem;
    active: boolean;
    onSelect?: (id: string, item: NavItem) => void;
  }) => any;
};
