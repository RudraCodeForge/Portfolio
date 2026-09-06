import { useEffect, useState } from "react";
import DashboardIcon from "./DashboardIcon";
import { applyTheme, themes } from "../data/themeData";
import api from "../Services/api.service";
import Styles from "../Styles/ThemeSettings.module.css";

const getInitialTheme = () =>
  themes.find((theme) => theme.id === localStorage.getItem("adminTheme")) ||
  themes[0];

const ThemeSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState(getInitialTheme);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveState, setSaveState] = useState("saved");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const response = await api.get("/theme");
        const remoteTheme = themes.find(
          (theme) => theme.id === response.data.theme?.themeId,
        );
        if (remoteTheme) setSelectedTheme(remoteTheme);
      } catch (error) {
        console.error("Theme load failed:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    applyTheme(selectedTheme);
    localStorage.setItem("adminTheme", selectedTheme.id);
    const saveTheme = async () => {
      setSaveState("saving");
      try {
        await api.put("/theme", {
          themeId: selectedTheme.id,
          name: selectedTheme.name,
          variables: selectedTheme.variables,
        });
        setSaveState("saved");
      } catch (error) {
        console.error("Theme save failed:", error);
        setSaveState("error");
      }
    };

    saveTheme();
  }, [isLoaded, selectedTheme]);

  return (
    <section className={Styles.panel}>
      <div className={Styles.header}>
        <div>
          <p className={Styles.eyebrow}>Appearance</p>
          <h2>Workspace themes</h2>
          <p className={Styles.description}>
            Choose a visual direction for your admin workspace.
          </p>
        </div>
        <div className={Styles.currentTheme}>
          <span>Active</span>
          <strong>{selectedTheme.name}</strong>
          <small>
            {saveState === "saving"
              ? "Saving..."
              : saveState === "error"
                ? "Save failed"
                : "Synced"}
          </small>
        </div>
      </div>

      <div className={Styles.themeGrid}>
        {themes.map((theme) => (
          <button
            type="button"
            key={theme.id}
            className={`${Styles.themeCard} ${
              selectedTheme.id === theme.id ? Styles.selected : ""
            }`}
            onClick={() => setSelectedTheme(theme)}
            aria-pressed={selectedTheme.id === theme.id}
          >
            <span className={Styles.swatches}>
              {theme.colors.map((color) => (
                <i key={color} style={{ backgroundColor: color }} />
              ))}
            </span>
            <span className={Styles.themeCopy}>
              <strong>{theme.name}</strong>
              <small>{theme.description}</small>
            </span>
            <span className={Styles.check}>
              {selectedTheme.id === theme.id && <DashboardIcon name="shield" />}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ThemeSettings;
