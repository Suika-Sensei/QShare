import { Icon, FilledIconButton } from "material-react";
import { useState } from "react";
import "./ThemeSelector.css";

export default function ThemeSelector() {
  const [theme, setTheme] = useState(document.body.className || "light");

  const handleThemeChange = (theme: "light" | "dark") => {
    setTheme(theme);

    // Удаляем все классы тем
    document.body.classList.remove("light", "dark");

    // Добавляем новый класс темы
    document.body.classList.add(theme);
  };
  if (theme == "light") {
    return (
      <FilledIconButton
        className="theme-selector-button"
        onClick={() => handleThemeChange("dark")}
      >
        <Icon name="dark_mode" />
      </FilledIconButton>
    );
  } else if (theme == "dark") {
    return (
      <FilledIconButton
        className="theme-selector-button"
        onClick={() => handleThemeChange("light")}
      >
        <Icon name="light_mode" />
      </FilledIconButton>
    );
  }
}
