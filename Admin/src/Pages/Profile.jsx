import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Styles from "../Styles/Profile.module.css";
import {
  createAdmin,
  getAdminProfile,
  getHeader,
  updateAdminProfile,
  updateHeader,
} from "../Services/profile.service";

const initialHeader = {
  Email: "",
  Resume: "",
  SocialLinks: {
    Github: "",
    Instagram: "",
    LinkedIn: "",
  },
};

const Profile = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [profileData, setProfileData] = useState({ email: "", password: "" });
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "" });
  const [headerData, setHeaderData] = useState(initialHeader);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileResponse, headerResponse] = await Promise.all([
          getAdminProfile(),
          getHeader(),
        ]);
        setAdmin(profileResponse.admin);
        setProfileData({ email: profileResponse.admin.email, password: "" });
        if (headerResponse.header) setHeaderData(headerResponse.header);
      } catch (loadError) {
        setError(loadError.message || "Unable to load profile data.");
      }
    };

    loadProfile();
  }, []);

  const updateField = (setter) => (event) => {
    const { name, value } = event.target;
    setter((current) => ({ ...current, [name]: value }));
  };

  const updateSocialLink = (event) => {
    const { name, value } = event.target;
    setHeaderData((current) => ({
      ...current,
      SocialLinks: { ...current.SocialLinks, [name]: value },
    }));
  };

  const submit = async (key, action, data, successMessage, reset) => {
    try {
      setSaving(key);
      setError("");
      setMessage("");
      await action(data);
      setMessage(successMessage);
      if (reset) reset();
    } catch (submitError) {
      setError(submitError.message || "Unable to save changes.");
    } finally {
      setSaving("");
    }
  };

  return (
    <div className={Styles.page}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection="Profile"
        onSelect={(section) => {
          setIsSidebarOpen(false);
          if (section === "Dashboard") navigate("/dashboard");
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
          sectionTitle="Profile"
        />
        <main className={Styles.content}>
          <header className={Styles.header}>
            <div>
              <p className={Styles.eyebrow}>Account workspace</p>
              <h1>Profile settings</h1>
              <p>Manage admin access and the public portfolio header.</p>
            </div>
            {admin && <span className={Styles.role}>{admin.role}</span>}
          </header>

          {message && <p className={Styles.success}>{message}</p>}
          {error && <p className={Styles.error}>{error}</p>}

          <section className={Styles.grid}>
            <form
              className={Styles.panel}
              onSubmit={(event) => {
                event.preventDefault();
                submit(
                  "profile",
                  updateAdminProfile,
                  profileData,
                  "Admin profile updated successfully.",
                  () =>
                    setProfileData((current) => ({ ...current, password: "" })),
                );
              }}
            >
              <div className={Styles.panelHeader}>
                <h2>My admin profile</h2>
                <span>Credentials</span>
              </div>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={updateField(setProfileData)}
                  required
                />
              </label>
              <label>
                New password
                <input
                  name="password"
                  type="password"
                  value={profileData.password}
                  onChange={updateField(setProfileData)}
                  minLength={8}
                  placeholder="At least 8 characters"
                  required
                />
              </label>
              <button disabled={saving === "profile"}>
                {saving === "profile" ? "Saving..." : "Update profile"}
              </button>
            </form>

            <form
              className={Styles.panel}
              onSubmit={(event) => {
                event.preventDefault();
                submit(
                  "admin",
                  createAdmin,
                  newAdmin,
                  "New admin created successfully.",
                  () => setNewAdmin({ email: "", password: "" }),
                );
              }}
            >
              <div className={Styles.panelHeader}>
                <h2>Add admin</h2>
                <span>Team access</span>
              </div>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={newAdmin.email}
                  onChange={updateField(setNewAdmin)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={newAdmin.password}
                  onChange={updateField(setNewAdmin)}
                  minLength={8}
                  placeholder="At least 8 characters"
                  required
                />
              </label>
              <button disabled={saving === "admin"}>
                {saving === "admin" ? "Creating..." : "Create admin"}
              </button>
            </form>
          </section>

          <form
            className={`${Styles.panel} ${Styles.headerPanel}`}
            onSubmit={(event) => {
              event.preventDefault();
              submit(
                "header",
                updateHeader,
                headerData,
                "Header data updated successfully.",
              );
            }}
          >
            <div className={Styles.panelHeader}>
              <h2>Portfolio header</h2>
              <span>Public profile links</span>
            </div>
            <div className={Styles.fields}>
              <label>
                Email
                <input
                  name="Email"
                  value={headerData.Email}
                  onChange={updateField(setHeaderData)}
                  required
                />
              </label>
              <label>
                Resume URL
                <input
                  name="Resume"
                  value={headerData.Resume}
                  onChange={updateField(setHeaderData)}
                  required
                />
              </label>
              <label>
                GitHub
                <input
                  name="Github"
                  value={headerData.SocialLinks.Github}
                  onChange={updateSocialLink}
                  required
                />
              </label>
              <label>
                Instagram
                <input
                  name="Instagram"
                  value={headerData.SocialLinks.Instagram}
                  onChange={updateSocialLink}
                  required
                />
              </label>
              <label>
                LinkedIn
                <input
                  name="LinkedIn"
                  value={headerData.SocialLinks.LinkedIn}
                  onChange={updateSocialLink}
                  required
                />
              </label>
            </div>
            <button disabled={saving === "header"}>
              {saving === "header" ? "Saving..." : "Update header"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;
