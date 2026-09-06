import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/ActivityFeed.module.css";

const ActivityFeed = ({ activities }) => (
  <section className={Styles.panel}>
    <div className={Styles.panelHeader}>
      <div>
        <h2>Recent Activity</h2>
        <p>A live feed of changes across your portfolio</p>
      </div>
      <button>
        View all <span>›</span>
      </button>
    </div>
    <div className={Styles.list}>
      {activities.map((activity) => (
        <div className={Styles.activity} key={activity.title}>
          <div className={`${Styles.activityIcon} ${Styles[activity.tone]}`}>
            <DashboardIcon name={activity.icon} />
          </div>
          <div className={Styles.activityCopy}>
            <strong>{activity.title}</strong>
            <span>{activity.description}</span>
          </div>
          <div className={Styles.activityTime}>
            <span>{activity.time}</span>
            <i />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ActivityFeed;
