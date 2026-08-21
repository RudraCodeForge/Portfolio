import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import Styles from "../styles/Github.module.css";

const GITHUB_USERNAME = "RudraCodeForge";
const GRAPHQL_URL = "https://api.github.com/graphql";
const REFRESH_INTERVAL = 5 * 60 * 1000;
const contributionClass = {
  NONE: "level0",
  FIRST_QUARTILE: "level1",
  SECOND_QUARTILE: "level2",
  THIRD_QUARTILE: "level3",
  FOURTH_QUARTILE: "level4",
};
const GRAPHQL_QUERY = `
  query GithubActivity($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
      repositories(first: 2, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes { name url primaryLanguage { name } stargazerCount updatedAt }
      }
    }
  }
`;

const Github = () => {
  const [githubData, setGithubData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadEvents = async () => {
      try {
        setStatus("loading");
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (!token) throw new Error("Missing VITE_GITHUB_TOKEN");
        const response = await fetch(GRAPHQL_URL, {
          method: "POST",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GRAPHQL_QUERY,
            variables: { login: GITHUB_USERNAME },
          }),
        });
        if (!response.ok)
          throw new Error(`GitHub responded with ${response.status}`);
        const result = await response.json();
        if (result.errors?.length || !result.data?.user)
          throw new Error("GitHub GraphQL request failed");
        setGithubData(result.data.user);
        setLastUpdated(new Date());
        setStatus("ready");
      } catch (error) {
        if (error.name !== "AbortError") setStatus("error");
      }
    };
    loadEvents();
    const intervalId = window.setInterval(loadEvents, REFRESH_INTERVAL);
    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const activityDays = useMemo(
    () =>
      githubData?.contributionsCollection.contributionCalendar.weeks
        .flatMap((week) => week.contributionDays)
        .slice(-30) || [],
    [githubData],
  );
  const repositories = githubData?.repositories.nodes || [];
  const activityCount = activityDays.reduce(
    (total, day) => total + day.contributionCount,
    0,
  );

  return (
    <section className={Styles.githubSection}>
      <div className={Styles.githubGrid}>
        <div className={Styles.githubIntro}>
          <div className={Styles.sectionLabel}>
            <span>07</span>
            <span className={Styles.labelLine} />
            <span>IN THE OPEN</span>
          </div>
          <div className={Styles.githubTitleRow}>
            <div className={Styles.githubIcon}>
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <div>
              <h2>Building in public.</h2>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
              >
                github.com/{GITHUB_USERNAME}
              </a>
            </div>
          </div>
          <p className={Styles.introCopy}>
            I believe good code gets better when it&apos;s shared. Explore
            open-source experiments, useful tools, and notes from the journey.
          </p>
          <a
            className={Styles.githubButton}
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
          >
            Visit GitHub <span>↗</span>
          </a>
        </div>
        <div className={Styles.activityPanel}>
          <div className={Styles.activityHeader}>
            <p>
              {status === "ready"
                ? `${activityCount.toLocaleString()} contributions in the last 30 days`
                : "Loading GitHub activity..."}
            </p>
            <div className={Styles.legend}>
              <span>Less</span>
              <i className={Styles.level1} />
              <i className={Styles.level2} />
              <i className={Styles.level4} />
              <span>More</span>
            </div>
          </div>
          {status === "error" ? (
            <p className={Styles.errorMessage}>
              GitHub activity is temporarily unavailable. Visit the profile to
              see the latest work.
            </p>
          ) : (
            <div className={Styles.activityGrid}>
              {activityDays.map((day) => (
                <span
                  className={Styles[contributionClass[day.contributionLevel]]}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  data-tooltip={`${new Date(day.date).toLocaleDateString([], { month: "short", day: "numeric" })} · ${day.contributionCount} ${day.contributionCount === 1 ? "contribution" : "contributions"}`}
                  key={day.date}
                  data-level={day.contributionLevel}
                />
              ))}
            </div>
          )}
          <div className={Styles.repositoryList}>
            {repositories.map((repository) => (
              <a
                className={Styles.repositoryCard}
                href={repository.url}
                target="_blank"
                rel="noreferrer"
                key={repository.name}
              >
                <FontAwesomeIcon icon={faCodeBranch} />
                <span>
                  <b>{repository.name}</b>
                  <small>
                    {repository.primaryLanguage?.name || "Open source"} ·{" "}
                    {repository.stargazerCount} stars
                  </small>
                </span>
              </a>
            ))}
          </div>
          {lastUpdated && (
            <small className={Styles.updatedAt}>
              Updated{" "}
              {lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          )}
        </div>
      </div>
    </section>
  );
};

export default Github;
