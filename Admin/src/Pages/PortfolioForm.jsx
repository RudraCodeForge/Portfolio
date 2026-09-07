import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import Styles from "../Styles/PortfolioForm.module.css";
import { sectionViews } from "../data/dashboardData";
import { createProject, updateProject } from "../Services/Project.service";
import {
  createEducation,
  updateEducation,
} from "../Services/education.service";
import {
  createExperience as createExperienceResource,
  updateExperience as updateExperienceResource,
} from "../Services/experience.service";
import { createSkill, updateSkill } from "../Services/skills.service";

const formFields = {
  projects: [
    ["Title", "Project title"],
    ["Category", "Category"],
    ["ProjectImage", "Image URL"],
    ["LiveLink", "Live link"],
    ["TechStack", "Technologies (comma separated)"],
    ["Description", "Description", "textarea"],
    ["Note", "Note", "textarea"],
  ],
  experience: [
    ["Role", "Role"],
    ["Company", "Company"],
    ["Location", "Location"],
    ["Period", "Period"],
    ["Skills", "Skills (comma separated)"],
    ["Description", "Description", "textarea"],
  ],
  education: [
    ["Course", "Course"],
    ["College", "College"],
    ["Period", "Period"],
    ["Desc", "Description", "textarea"],
  ],
  skills: [
    ["Name", "Skill category"],
    ["Icon", "Icon"],
    ["Skills", "Skills data (JSON)", "textarea"],
  ],
};

const sectionNames = {
  projects: "Projects",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
};

const editableSections = new Set(Object.keys(formFields));

const getInitialValue = (field, item) => {
  const value = item?.[field];
  if (Array.isArray(value)) {
    return field === "Skills" &&
      value.some((entry) => typeof entry === "object")
      ? JSON.stringify(value, null, 2)
      : value.join(", ");
  }
  return value || "";
};

const PortfolioForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { section, id } = useParams();
  const sectionName = sectionNames[section];
  const isEdit = Boolean(id);
  const item = location.state?.item;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initialData = {};
    (formFields[section] || []).forEach(([field]) => {
      initialData[field] = getInitialValue(field, item);
    });
    setFormData(initialData);
  }, [item, section]);

  if (!sectionName || !formFields[section]) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resourceActions = {
      projects: { create: createProject, update: updateProject },
      education: { create: createEducation, update: updateEducation },
      experience: {
        create: createExperienceResource,
        update: updateExperienceResource,
      },
      skills: { create: createSkill, update: updateSkill },
    }[section];

    if (resourceActions) {
      try {
        setSubmitError("");
        setIsSubmitting(true);
        if (isEdit) {
          await resourceActions.update(id, formData);
        } else {
          await resourceActions.create(formData);
        }
        navigate("/dashboard");
      } catch (error) {
        setSubmitError(
          error.message ||
            `Unable to ${isEdit ? "update" : "create"} ${sectionName.toLowerCase()}.`,
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    console.log("Portfolio form submitted:", {
      mode: isEdit ? "edit" : "create",
      section: sectionName,
      id: id || null,
      data: formData,
    });
  };

  return (
    <div className={Styles.page}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={sectionName}
        onSelect={(selectedSection) => {
          const selectedPath = selectedSection.toLowerCase();
          navigate(
            editableSections.has(selectedPath)
              ? `/dashboard/${selectedPath}/new`
              : "/dashboard",
          );
        }}
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
          sectionTitle={sectionName}
        />
        <main className={Styles.content}>
          <section className={Styles.panel}>
            <div className={Styles.header}>
              <div>
                <p className={Styles.eyebrow}>
                  {isEdit ? `Edit ${sectionName}` : `New ${sectionName}`}
                </p>
                <h1>{isEdit ? `Edit ${sectionName}` : `Add ${sectionName}`}</h1>
                {isEdit && <p className={Styles.id}>ID: {id}</p>}
              </div>
              <button
                type="button"
                className={Styles.cancelButton}
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
            <form className={Styles.form} onSubmit={handleSubmit}>
              {(formFields[section] || []).map(([field, label, type]) => (
                <label className={Styles.field} key={field}>
                  <span>{label}</span>
                  {type === "textarea" ? (
                    <textarea
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      rows={4}
                    />
                  ) : (
                    <input
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                    />
                  )}
                </label>
              ))}
              {submitError && <p className={Styles.error}>{submitError}</p>}
              <button type="submit" className={Styles.submitButton}>
                {isSubmitting
                  ? isEdit
                    ? `Updating ${sectionName.toLowerCase()}...`
                    : `Creating ${sectionName.toLowerCase()}...`
                  : isEdit
                    ? "Submit changes"
                    : `Create ${sectionName}`}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PortfolioForm;
