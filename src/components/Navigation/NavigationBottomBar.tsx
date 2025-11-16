import React, { useState, useEffect, useRef } from "react";
import type { NavigationBottomBarProps } from "./types";
import { NavigationBar, NavigationTab } from "material-react";

export default function NavigationBottomBar(props: NavigationBottomBarProps) {
  const { items, activeId, onChange } = props;
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const navBarRef = useRef<any>(null);

  // Используем activeId если он передан, иначе внутренний стейт
  const activeTab = activeId !== undefined ? activeId : internalActiveTab;

  // Синхронизируем activeIndex с веб-компонентом
  useEffect(() => {
    if (navBarRef.current && navBarRef.current.activeIndex !== activeTab) {
      navBarRef.current.activeIndex = activeTab;
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    // Обновляем внутренний стейт
    setInternalActiveTab(index);

    // Вызываем onChange если он передан
    if (onChange && items[index]) {
      onChange(items[index].id, items[index]);
    }
  };

  const ActiveScreen = items[activeTab]?.screen as any;

  return (
    <div className="app-container">
      <div className="content-container">
        {ActiveScreen ? React.createElement(ActiveScreen) : null}
      </div>

      <div
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          backgroundColor: "var(--md-sys-color-surface)",
        }}
      >
        <NavigationBar ref={navBarRef} activeIndex={activeTab}>
          {items.map((item, index) => {
            const inactiveIcon = item.iconInactive || item.icon;
            const activeIcon = item.iconActive || item.icon;

            return (
              <NavigationTab
                key={item.id}
                label={item.label}
                onClick={() => handleTabClick(index)}
              >
                {inactiveIcon &&
                  React.isValidElement(inactiveIcon) &&
                  React.cloneElement(inactiveIcon, {
                    slot: "inactive-icon",
                  } as any)}
                {activeIcon &&
                  React.isValidElement(activeIcon) &&
                  React.cloneElement(activeIcon, { slot: "active-icon" } as any)}
              </NavigationTab>
            );
          })}
        </NavigationBar>
      </div>
    </div>
  );
}
