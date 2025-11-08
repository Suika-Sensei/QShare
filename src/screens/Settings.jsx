import { useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState(document.body.className || "light");

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);

    // Удаляем все классы тем
    document.body.classList.remove(
      "light",
      "dark",
      "light-medium-contrast",
      "dark-medium-contrast",
      "light-high-contrast",
      "dark-high-contrast"
    );

    // Добавляем новый класс темы
    document.body.classList.add(newTheme);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Настройки</h1>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Внешний вид</h2>

        <md-filled-select
          label="Тема оформления"
          value={theme}
          onInput={handleThemeChange}
          className="theme-select"
        >
          <md-select-option value="light">
            <div slot="headline">Светлая</div>
          </md-select-option>
          <md-select-option value="dark">
            <div slot="headline">Темная</div>
          </md-select-option>
          <md-select-option value="light-medium-contrast">
            <div slot="headline">Светлая (средний контраст)</div>
          </md-select-option>
          <md-select-option value="dark-medium-contrast">
            <div slot="headline">Темная (средний контраст)</div>
          </md-select-option>
          <md-select-option value="light-high-contrast">
            <div slot="headline">Светлая (высокий контраст)</div>
          </md-select-option>
          <md-select-option value="dark-high-contrast">
            <div slot="headline">Темная (высокий контраст)</div>
          </md-select-option>
        </md-filled-select>
      </div>

      <md-divider></md-divider>

      <div className="settings-section">
        <h2 className="section-title">О приложении</h2>
        <div className="about-info">
          <p className="info-text">QShare.js v0.1.0</p>
          <p className="info-text">
            Приложение для обмена контактами через QR-коды
          </p>
        </div>
      </div>
    </div>
  );
}
