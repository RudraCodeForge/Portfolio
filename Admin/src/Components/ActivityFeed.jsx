import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/ActivityFeed.module.css";

const formatActivityTime = (createdAt) => {
  const date = new Date(createdAt);
  const elapsedSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (Number.isNaN(date.getTime())) return "Just now";
  if (elapsedSeconds < 60) return "Just now";
  if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`;
  if (elapsedSeconds < 86400)
    return `${Math.floor(elapsedSeconds / 3600)}h ago`;
  return "Yesterday";
};

const ActivityFeed = ({ activities }) => (
  <section className={Styles.panel}>
    <div className={Styles.panelHeader}>
      <div>
        <h2>Recent Activity</h2>
        <p>A live feed of changes across your portfolio</p>
      </div>
    </div>
    <div className={Styles.list}>
      {activities.length === 0 ? (
        <p className={Styles.emptyState}>
          No recent activity in the last 24 hours.
        </p>
      ) : (
        activities.map((activity) => (
          <div className={Styles.activity} key={activity._id || activity.title}>
            <div className={`${Styles.activityIcon} ${Styles[activity.tone]}`}>
              <DashboardIcon name={activity.icon} />
            </div>
            <div className={Styles.activityCopy}>
              <strong>{activity.title}</strong>
              <span>{activity.description}</span>
            </div>
            <div className={Styles.activityTime}>
              <span>{formatActivityTime(activity.createdAt)}</span>
              <i />
            </div>
          </div>
        ))
      )}
    </div>
  </section>
);

export default ActivityFeed;
