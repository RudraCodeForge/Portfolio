import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/QuickActions.module.css";

const QuickActions = ({ actions }) => (
  <section className={Styles.panel}>
    <div className={Styles.panelHeader}>
      <div>
        <h2>Quick Actions</h2>
        <p>Manage your portfolio content</p>
      </div>
    </div>
    <div className={Styles.actions}>
      {actions.map((action) => (
        <button
          className={`${Styles.action} ${action.featured ? Styles.featured : ""}`}
          key={action.label}
        >
          <DashboardIcon name={action.icon} />
          <span>{action.label}</span>
          <b>↗</b>
        </button>
      ))}
    </div>
  </section>
);

export default QuickActions;
