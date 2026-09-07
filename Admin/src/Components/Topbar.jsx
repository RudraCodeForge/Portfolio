import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/Topbar.module.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMessages } from "../Store/messageSlice";
import { GetAdminMessages } from "../Services/message.service";

const Topbar = ({ onMenuClick, sectionTitle, portfolioData }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const unreadCount = messages.filter((message) => !message.isRead).length;
  const searchBoxRef = useRef(null);

  const searchResults = (() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    const results = [];
    const addPortfolioResults = (section, items, fields) => {
      (items || []).forEach((item) => {
        const searchableText = fields
          .flatMap((field) => {
            const value = item[field];
            if (!Array.isArray(value)) return [value || ""];
            return value.map((entry) =>
              typeof entry === "object"
                ? Object.values(entry).join(" ")
                : entry,
            );
          })
          .join(" ")
          .toLowerCase();

        if (searchableText.includes(query)) {
          results.push({
            id: `${section}-${item._id}`,
            title: item[fields[0]] || "Untitled",
            detail: item[fields[1]] || section,
            section,
            path: `/dashboard?section=${section}`,
          });
        }
      });
    };

    addPortfolioResults("Projects", portfolioData?.Projects, [
      "Title",
      "Category",
      "Description",
      "TechStack",
    ]);
    addPortfolioResults("Experience", portfolioData?.Experience, [
      "Role",
      "Company",
      "Location",
      "Description",
    ]);
    addPortfolioResults("Education", portfolioData?.Education, [
      "Course",
      "College",
      "Period",
      "Desc",
    ]);
    addPortfolioResults("Skills", portfolioData?.Skills, ["Name", "Icon"]);

    messages.forEach((message) => {
      const searchableText = [
        message.name,
        message.email,
        message.subject,
        message.message,
      ]
        .join(" ")
        .toLowerCase();

      if (searchableText.includes(query)) {
        results.push({
          id: `message-${message.id}`,
          title: message.subject || "Contact message",
          detail: message.name || message.email,
          section: "Messages",
          path: `/message/${message.id}`,
        });
      }
    });

    return results.slice(0, 8);
  })();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await GetAdminMessages();
        dispatch(setMessages(data.messages || []));
      } catch (error) {
        console.error("Error fetching notification messages:", error);
      }
    };

    loadMessages();
  }, [dispatch]);

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
    if (searchResults[0]) {
      navigate(searchResults[0].path);
      setSearchTerm("");
      setIsSearchOpen(false);
    }
  };

  const handleNotificationsClick = async () => {
    let currentUnreadCount = unreadCount;

    try {
      const data = await GetAdminMessages();
      const latestMessages = data.messages || [];
      currentUnreadCount = latestMessages.filter(
        (message) => !message.isRead,
      ).length;
      dispatch(setMessages(latestMessages));
    } catch (error) {
      console.error("Error refreshing notification messages:", error);
    }

    toast(
      currentUnreadCount === 0
        ? "You are all caught up."
        : `You have ${currentUnreadCount} new message${currentUnreadCount === 1 ? "" : "s"}.`,
    );
    localStorage.setItem("activeDashboardSection", "Messages");
    navigate("/dashboard?section=Messages");
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
              {searchTerm.trim() && (
                <div className={Styles.searchResults}>
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <button
                        type="button"
                        className={Styles.searchResult}
                        key={result.id}
                        onClick={() => {
                          navigate(result.path);
                          setSearchTerm("");
                          setIsSearchOpen(false);
                        }}
                      >
                        <strong>{result.title}</strong>
                        <span>
                          {result.section} · {result.detail}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className={Styles.noResults}>No matching results</p>
                  )}
                </div>
              )}
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
          onClick={handleNotificationsClick}
        >
          <DashboardIcon name="bell" />
          {unreadCount > 0 && <i />}
        </button>
        <div className={Styles.divider} />
        <button
          type="button"
          className={Styles.userMenu}
          onClick={() => navigate("/profile")}
          aria-label="Open profile settings"
        >
          <div className={Styles.avatar}>PD</div>
          <strong>Prince Daksh</strong>
          <span>⌄</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
