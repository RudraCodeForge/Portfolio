import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import api from "../Services/api.service";
import { logout } from "../Store/authSlice";
import { navItems } from "../data/dashboardData";
import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/Sidebar.module.css";

const Sidebar = ({ isOpen, onClose, activeSection, onSelect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unreadCount = useSelector(
    (state) => state.messages.filter((message) => !message.isRead).length,
  );

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      dispatch(logout());
      navigate("/", { replace: true });
    }
  };

  return (
    <aside className={`${Styles.sidebar} ${isOpen ? Styles.open : ""}`}>
      <div className={Styles.brandRow}>
        <div className={Styles.brandMark}>⌘</div>
        <div className={Styles.brandText}>
          <strong>DAKSH</strong>
          <span>ADMIN</span>
        </div>
        <button
          className={Styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <nav className={Styles.navigation} aria-label="Workspace navigation">
        <p className={Styles.navLabel}>Workspace</p>
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              onSelect(item.label);
              onClose();
            }}
            className={`${Styles.navItem} ${activeSection === item.label ? Styles.active : ""}`}
          >
            <DashboardIcon name={item.icon} />
            <span>{item.label}</span>
            {item.label === "Messages" && unreadCount > 0 && (
              <span className={Styles.badge}>{unreadCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className={Styles.bottomArea}>
        <div className={Styles.profileCard}>
          <div className={Styles.avatar}>PD</div>
          <div>
            <strong>Prince Daksh</strong>
            <span>Administrator</span>
          </div>
          <DashboardIcon name="shield" className={Styles.profileShield} />
        </div>
        <button
          type="button"
          className={Styles.logoutButton}
          onClick={handleLogout}
        >
          <DashboardIcon name="logout" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
