import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/StatCard.module.css";

const StatCard = ({ stat }) => (
  <article className={Styles.card}>
    <div className={Styles.cardTop}>
      <div className={Styles.icon}>
        <DashboardIcon name={stat.icon} />
      </div>
      <span className={Styles.more}>•••</span>
    </div>
    <div className={Styles.cardBottom}>
      <strong>{stat.value}</strong>
      <div>
        <span>{stat.label}</span>
        <em className={Styles[stat.tone]}>{stat.trend}</em>
      </div>
    </div>
  </article>
);

export default StatCard;
