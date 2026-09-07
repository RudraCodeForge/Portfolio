import Styles from "../Styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import StatCard from "../Components/StatCard";
import ActivityFeed from "../Components/ActivityFeed";
import QuickActions from "../Components/QuickActions";
import MessageList from "../Components/MessageList";
import ThemeSettings from "../Components/ThemeSettings";
import PortfolioSection from "../Components/PortfolioSection";
import { useSelector } from "react-redux";
import { sectionViews } from "../data/dashboardData";
import { applyTheme, themes } from "../data/themeData";
import { getPortfolio } from "../Services/Dashboard.service";
import { deleteProject } from "../Services/Project.service";
import { deleteEducation } from "../Services/education.service";
import { deleteExperience } from "../Services/experience.service";
import { deleteSkill } from "../Services/skills.service";
import { getRecentActivities } from "../Services/activity.service";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
  const [portfolioError, setPortfolioError] = useState("");
  const [activities, setActivities] = useState([]);
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("activeDashboardSection");
    return sectionViews[savedSection] ? savedSection : "Dashboard";
  });
  const activeView = sectionViews[activeSection];
  const isDashboard = activeSection === "Dashboard";
  const messages = useSelector((state) => state.messages);
  const sectionAction = {
    Projects: "Add new project",
    Experience: "Add experience",
    Education: "Add education",
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

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await getRecentActivities();
        setActivities(response.activities || []);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    loadActivities();

    const refreshOnFocus = () => {
      if (document.visibilityState === "visible") loadActivities();
    };
    const refreshInterval = window.setInterval(loadActivities, 10000);

    document.addEventListener("visibilitychange", refreshOnFocus);

    return () => {
      window.clearInterval(refreshInterval);
      document.removeEventListener("visibilitychange", refreshOnFocus);
    };
  }, []);

  useEffect(() => {
    const requestedSection = new URLSearchParams(location.search).get(
      "section",
    );
    if (requestedSection && sectionViews[requestedSection]) {
      setActiveSection(requestedSection);
      localStorage.setItem("activeDashboardSection", requestedSection);
    }
  }, [location.search]);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setIsPortfolioLoading(true);
        setPortfolioData(await getPortfolio());
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setPortfolioError(error.message || "Unable to load portfolio data.");
      } finally {
        setIsPortfolioLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  const handleSectionSelect = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeDashboardSection", section);
  };

  const handleEdit = (section, item) => {
    const sectionPath = section.toLowerCase();
    navigate(`/dashboard/${sectionPath}/edit/${item._id}`, {
      state: { item },
    });
  };

  const handleDelete = async (section, item) => {
    if (!item._id) return;

    const deleteActions = {
      Projects: deleteProject,
      Experience: deleteExperience,
      Education: deleteEducation,
      Skills: deleteSkill,
    };
    const deleteAction = deleteActions[section];
    if (!deleteAction) return;

    try {
      await deleteAction(item._id);
      setPortfolioData((current) => ({
        ...current,
        [section]: current[section].filter((entry) => entry._id !== item._id),
      }));
    } catch (error) {
      setPortfolioError(error.message || "Unable to delete project.");
    }
  };

  const handleAdd = () => {
    navigate(`/dashboard/${activeSection.toLowerCase()}/new`);
  };

  const handleQuickAction = (action) => {
    const sectionByLabel = {
      "Add Project": "projects",
      "Add Experience": "experience",
      "Add Education": "education",
      "Add Skill": "skills",
    };
    const section = sectionByLabel[action.label];
    if (section) navigate(`/dashboard/${section}/new`);
  };

  const liveStats = portfolioData?.stats?.map((stat, index) => ({
    ...stat,
    trend: index === 3 ? "Live from backend" : "Live from portfolio",
    icon: activeView.stats[index]?.icon || "grid",
    tone: index === 3 ? "warning" : "success",
  }));

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
          portfolioData={portfolioData}
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
                <button
                  type="button"
                  className={Styles.addButton}
                  onClick={() => navigate("/dashboard/projects/new")}
                >
                  <span aria-hidden="true">+</span> Add new project
                </button>
              </section>

              <section className={Styles.stats} aria-label="Portfolio overview">
                {(liveStats || activeView.stats).map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </section>

              <section className={Styles.lowerGrid}>
                <ActivityFeed activities={activities} />
                <QuickActions
                  actions={activeView.actions}
                  onAction={handleQuickAction}
                />
              </section>
            </>
          ) : activeSection === "Messages" ? (
            <MessageList messages={messages} />
          ) : activeSection === "Settings" ? (
            <ThemeSettings />
          ) : (
            <PortfolioSection
              section={activeSection}
              data={portfolioData}
              isLoading={isPortfolioLoading}
              error={portfolioError}
              actionLabel={sectionAction}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
