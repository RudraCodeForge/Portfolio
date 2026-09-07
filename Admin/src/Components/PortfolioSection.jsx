import Styles from "../Styles/PortfolioSection.module.css";

const getSectionItems = (section, data) => {
  if (!data) return [];

  if (section === "Skills") {
    return (data.Skills || []).map((category) => ({
      ...category,
      title: category.Name,
      subtitle: `${category.Skills?.length || 0} skills`,
      description: category.Skills?.map(
        (skill) =>
          `${skill.SkillName} (${skill.Level || `${skill.Percentage}%`})`,
      ).join("  |  "),
    }));
  }

  return (data[section] || []).map((item) => {
    if (section === "Projects") {
      return {
        ...item,
        title: item.Title,
        subtitle: item.Category,
        description: item.Description,
        meta: item.TechStack?.join(", "),
      };
    }

    if (section === "Experience") {
      return {
        ...item,
        title: item.Role,
        subtitle: `${item.Company} · ${item.Location}`,
        description: item.Description,
        meta: item.Period,
      };
    }

    return {
      ...item,
      title: item.Course,
      subtitle: item.College,
      description: item.Desc,
      meta: item.Period,
    };
  });
};

const PortfolioSection = ({
  section,
  data,
  isLoading,
  error,
  actionLabel,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const items = getSectionItems(section, data);

  return (
    <section className={Styles.panel}>
      <div className={Styles.header}>
        <div>
          <p className={Styles.eyebrow}>Portfolio data</p>
          <h2>{section}</h2>
          <p className={Styles.description}>
            Manage {section.toLowerCase()} fetched from your portfolio.
          </p>
        </div>
        {actionLabel && (
          <button type="button" className={Styles.addButton} onClick={onAdd}>
            <span aria-hidden="true">+</span> {actionLabel}
          </button>
        )}
      </div>

      {isLoading ? (
        <p className={Styles.state}>Loading portfolio data...</p>
      ) : error ? (
        <p className={`${Styles.state} ${Styles.error}`}>{error}</p>
      ) : items.length === 0 ? (
        <p className={Styles.state}>No {section.toLowerCase()} found.</p>
      ) : (
        <div className={Styles.list}>
          {items.map((item) => (
            <article className={Styles.card} key={item._id || item.title}>
              <div className={Styles.cardContent}>
                <div className={Styles.cardHeading}>
                  <h3>{item.title || "Untitled"}</h3>
                  {item.meta && <span>{item.meta}</span>}
                </div>
                {item.subtitle && (
                  <p className={Styles.subtitle}>{item.subtitle}</p>
                )}
                {item.description && (
                  <p className={Styles.description}>{item.description}</p>
                )}
              </div>
              <div className={Styles.actions}>
                <button type="button" onClick={() => onEdit(section, item)}>
                  Edit
                </button>
                <button
                  type="button"
                  className={Styles.deleteButton}
                  onClick={() => onDelete(section, item)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
