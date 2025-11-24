import { Icon, FilledIconButton } from "material-react";
import React, { useState, useRef, useEffect } from "react";
import { LazyStore } from "@tauri-apps/plugin-store";
import "./ThemeSelector.css";

type ThemeSelectorProps = {
  style?: React.CSSProperties;
  className?: string;
};

const THEME_KEY = "theme";

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ style, className }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<LazyStore | null>(null);

  // Загрузка сохранённой темы при монтировании
  useEffect(() => {
    const initTheme = async () => {
      storeRef.current = new LazyStore("settings.json");
      const savedTheme = await storeRef.current.get<"light" | "dark">(THEME_KEY);
      const initialTheme = savedTheme || "light";

      setTheme(initialTheme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(initialTheme);
    };
    initTheme();
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    if (isAnimating) return;

    const button = buttonRef.current;
    const overlay = overlayRef.current;

    if (!button || !overlay) {
      // Fallback без анимации
      setTheme(newTheme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(newTheme);

      // Сохраняем тему
      if (storeRef.current) {
        storeRef.current.set(THEME_KEY, newTheme);
        storeRef.current.save();
      }
      return;
    }

    setIsAnimating(true);

    // Получаем позицию кнопки
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Вычисляем максимальный радиус для покрытия всего экрана
    const maxRadius = Math.sqrt(
      Math.max(x, window.innerWidth - x) ** 2 +
        Math.max(y, window.innerHeight - y) ** 2
    );

    // Устанавливаем цвет оверлея (цвет новой темы)
    // Временно применяем новую тему чтобы получить её цвета
    const tempDiv = document.createElement("div");
    tempDiv.className = newTheme;
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);
    const newBgColor = getComputedStyle(tempDiv).getPropertyValue(
      "--md-sys-color-background"
    );
    document.body.removeChild(tempDiv);

    overlay.style.background = newBgColor;
    overlay.style.left = `${x}px`;
    overlay.style.top = `${y}px`;
    overlay.style.width = "0px";
    overlay.style.height = "0px";
    overlay.style.opacity = "1";
    overlay.style.transform = "translate(-50%, -50%) scale(0)";

    // Запускаем анимацию
    requestAnimationFrame(() => {
      overlay.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      overlay.style.transform = `translate(-50%, -50%) scale(1)`;
      overlay.style.width = `${maxRadius * 2}px`;
      overlay.style.height = `${maxRadius * 2}px`;
    });

    // Меняем тему в середине анимации
    setTimeout(() => {
      setTheme(newTheme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(newTheme);

      // Сохраняем тему
      if (storeRef.current) {
        storeRef.current.set(THEME_KEY, newTheme);
        storeRef.current.save();
      }
    }, 300);

    // Скрываем оверлей после завершения
    setTimeout(() => {
      overlay.style.transition = "opacity 0.2s ease";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.transform = "translate(-50%, -50%) scale(0)";
        overlay.style.transition = "";
        setIsAnimating(false);
      }, 200);
    }, 600);
  };

  return (
    <>
      {/* Overlay для анимации заполнения */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
        }}
      />
      <FilledIconButton
        ref={buttonRef}
        style={style}
        className={`theme-selector-button ${className || ""}`}
        onClick={() => handleThemeChange(theme === "light" ? "dark" : "light")}
      >
        <Icon
          name={theme === "light" ? "light_mode" : "dark_mode"}
          style={{
            color: "var(--md-sys-color-on-primary-container)",
          }}
        />
      </FilledIconButton>
    </>
  );
};

export default ThemeSelector;
