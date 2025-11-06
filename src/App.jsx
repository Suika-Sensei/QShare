import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

// Import Material Design 3 components
import "./material";

// Import Material Design 3 themes
import "./styles";

function App() {
  const [name, setName] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [theme, setTheme] = useState("light");

  // Apply theme class to body
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove(
      "light",
      "dark",
      "light-medium-contrast",
      "dark-medium-contrast",
      "light-high-contrast",
      "dark-high-contrast"
    );
    // Add selected theme class
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <main className="max-w-6xl mx-auto p-8">
      <section className="mb-8 p-6 rounded-xl">
        <h2 className="text-йxl font-semibold mb-4">Выбор темы</h2>
        <md-filled-select
          label="Тема"
          value={theme}
          onInput={(e) => setTheme(e.target.value)}
          className="w-full md:w-96"
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
      </section>
    </main>
  );
}

export default App;
