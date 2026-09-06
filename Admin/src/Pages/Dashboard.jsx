import Styles from "../Styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import StatCard from "../Components/StatCard";
import ActivityFeed from "../Components/ActivityFeed";
import QuickActions from "../Components/QuickActions";
import MessageList from "../Components/MessageList";
import ThemeSettings from "../Components/ThemeSettings";
import { useSelector } from "react-redux";
import { sectionViews } from "../data/dashboardData";
import { applyTheme, themes } from "../data/themeData";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("activeDashboardSection");
    return sectionViews[savedSection] ? savedSection : "Dashboard";
  });
  const activeView = sectionViews[activeSection];
  const isDashboard = activeSection === "Dashboard";
  const messages = useSelector((state) => state.messages);
  const sectionAction = {
    Projects: "Add new project",
    Skills: "Add new skill",
  }[activeSection];
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    const savedTheme = themes.find(
      (theme) => theme.id === localStorage.getItem("adminTheme"),
    );
    applyTheme(savedTheme || themes[0]);
  }, []);

  const handleSectionSelect = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeDashboardSection", section);
  };

  return (
    <div className={Styles.dashboard}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={activeSection}
        onSelect={handleSectionSelect}
      />
      {isSidebarOpen && (
        <button
          className={Styles.backdrop}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <div className={Styles.main}>
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          sectionTitle={activeSection}
        />
        <main className={Styles.content}>
          {isDashboard ? (
            <>
              <section className={Styles.welcome}>
                <div>
                  <p className={Styles.date}>{currentDate}</p>
                  <h2>
                    Welcome back, Prince <span aria-hidden="true">👋</span>
                  </h2>
                  <p>{activeView.subtitle}</p>
                </div>
                <button type="button" className={Styles.addButton}>
                  <span aria-hidden="true">+</span> Add new project
                </button>
              </section>

              <section className={Styles.stats} aria-label="Portfolio overview">
                {activeView.stats.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </section>

              <section className={Styles.lowerGrid}>
                <ActivityFeed activities={activeView.activities} />
                <QuickActions actions={activeView.actions} />
              </section>
            </>
          ) : activeSection === "Messages" ? (
            <MessageList messages={messages} />
          ) : activeSection === "Settings" ? (
            <ThemeSettings />
          ) : (
            <section className={Styles.sectionOnly}>
              <h2>{activeSection}</h2>
              {sectionAction && (
                <button type="button" className={Styles.addButton}>
                  <span aria-hidden="true">+</span> {sectionAction}
                </button>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
