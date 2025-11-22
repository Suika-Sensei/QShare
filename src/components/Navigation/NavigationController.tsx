import { useState } from "react";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import NavigationBottomBar from "./NavigationBottomBar";
import { Icon } from "material-react";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: <Icon name="home" />,
    iconActive: <Icon name="home" filled />,
    iconInactive: <Icon name="home" />,
    href: "/",
    screen: Home,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Icon name="settings" />,
    iconActive: <Icon name="settings" filled />,
    iconInactive: <Icon name="settings" />,
    href: "/settings",
    screen: Settings,
  },
];

export default function NavigationController() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (id: string) => {
    // Находим индекс элемента по id
    const newIndex = NAV_ITEMS.findIndex((item) => item.id === id);
    if (newIndex !== -1) {
      setActiveTab(newIndex);
    }
  };

  return (
    <NavigationBottomBar
      items={NAV_ITEMS}
      activeId={activeTab}
      onChange={handleTabChange}
    />
  );
}
