import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/Topbar.module.css";
import { useEffect, useRef, useState } from "react";

const Topbar = ({ onMenuClick, sectionTitle }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchBoxRef.current?.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Dashboard search:", searchTerm);
  };

  return (
    <header className={Styles.topbar}>
      <button
        className={Styles.menuButton}
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <DashboardIcon name="menu" />
      </button>
      <div className={Styles.heading}>
        <div className={Styles.titleRow}>
          <h1>{sectionTitle}</h1>
          <span>Overview</span>
        </div>
        <p>
          Admin <b>/</b> {sectionTitle}
        </p>
      </div>
      <div className={Styles.actions}>
        <div
          ref={searchBoxRef}
          className={`${Styles.searchBox} ${isSearchOpen ? Styles.open : ""}`}
        >
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit}>
              <input
                className={Styles.searchInput}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setIsSearchOpen(false);
                }}
                placeholder="Search..."
                aria-label="Search dashboard"
                autoFocus
              />
            </form>
          ) : (
            <button
              className={Styles.iconButton}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <DashboardIcon name="search" />
            </button>
          )}
        </div>
        <button
          className={`${Styles.iconButton} ${Styles.notificationButton}`}
          aria-label="Notifications"
        >
          <DashboardIcon name="bell" />
          <i />
        </button>
        <div className={Styles.divider} />
        <div className={Styles.userMenu}>
          <div className={Styles.avatar}>PD</div>
          <strong>Prince Daksh</strong>
          <span>⌄</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
