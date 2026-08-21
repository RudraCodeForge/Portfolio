import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faGlobe,
  faLayerGroup,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "../styles/GoodAt.module.css";

const iconByType = {
  globe: faGlobe,
  layers: faLayerGroup,
  terminal: faTerminal,
  cloud: faCloud,
};

const GoodAtCard = ({ item }) => (
  <article className={Styles.goodAtCard}>
    <FontAwesomeIcon
      className={Styles.cardIcon}
      icon={iconByType[item.Icon] ?? faGlobe}
      aria-hidden="true"
    />
    <h3>{item.Title}</h3>
    <p>{item.Description}</p>
    <span className={Styles.cardArrow} aria-hidden="true">
      ↗
    </span>
  </article>
);

export default GoodAtCard;
