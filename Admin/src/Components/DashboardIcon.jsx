import Styles from "../Styles/DashboardIcon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBars,
  faBell,
  faBriefcase,
  faCircle,
  faCode,
  faEnvelope,
  faGear,
  faGraduationCap,
  faMagnifyingGlass,
  faRightFromBracket,
  faShieldHalved,
  faTableCellsLarge,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  grid: faTableCellsLarge,
  briefcase: faBriefcase,
  pulse: faWaveSquare,
  education: faGraduationCap,
  code: faCode,
  mail: faEnvelope,
  settings: faGear,
  search: faMagnifyingGlass,
  bell: faBell,
  arrow: faArrowUpRightFromSquare,
  menu: faBars,
  logout: faRightFromBracket,
  shield: faShieldHalved,
};

const DashboardIcon = ({ name, className = "" }) => (
  <span className={`${Styles.icon} ${className}`} aria-hidden="true">
    <FontAwesomeIcon icon={icons[name] || faCircle} />
  </span>
);

export default DashboardIcon;
