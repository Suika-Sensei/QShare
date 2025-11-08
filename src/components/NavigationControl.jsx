import { useState } from "react";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import NavigationBottomBar from "./Navigation/NavigationBottomBar";
import { Icon } from "material-react";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: <Icon name="home" />,
    iconActive: <Icon name="home" filled />,
    iconInactive: <Icon name="home" />,
    href: "/",
    badge: "1",
    disabled: false,
    screen: Home,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Icon name="settings" />,
    iconActive: <Icon name="settings" filled />,
    iconInactive: <Icon name="settings" />,
    href: "/settings",
    badge: "2",
    disabled: false,
    screen: Settings,
  },
];

export default function NavigationControl() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (id) => {
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
