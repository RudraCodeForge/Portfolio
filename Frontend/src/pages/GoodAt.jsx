import Styles from "../styles/GoodAt.module.css";
import GoodAtCard from "../Components/GoodAtCard";
import { GoodAtData } from "../data/GoodAtData";

const GoodAt = () => {
  return (
    <section className={Styles.goodAtSection}>
      <div className={Styles.goodAtInner}>
        <div className={Styles.sectionLabel}>
          <span>06</span>
          <span className={Styles.labelLine} />
          <span>WHAT I DO</span>
        </div>
        <h2 className={Styles.heading}>
          Good work is a<span>team sport.</span>
        </h2>
        <div className={Styles.goodAtGrid}>
          {GoodAtData.map((item) => (
            <GoodAtCard key={item.Title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default GoodAt;
