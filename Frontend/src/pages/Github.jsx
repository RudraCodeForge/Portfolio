import { useMemo } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

import Styles from "../styles/Github.module.css";

const contributionClass = {
  NONE: "level0",
  FIRST_QUARTILE: "level1",
  SECOND_QUARTILE: "level2",
  THIRD_QUARTILE: "level3",
  FOURTH_QUARTILE: "level4",
};

const Github = () => {
  const githubData = useSelector((state) => state.GithubData?.data);
  const activityDays = useMemo(() => {
    return githubData?.last30Days?.days ?? [];
  }, [githubData]);
  const repositories = githubData?.repositories ?? [];
  const activityCount = githubData?.last30Days?.totalContributions ?? 0;

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
                href={githubData?.githubUrl || "#"}
                target="_blank"
                rel="noreferrer"
              >
                github.com/
                {githubData?.username || "RudraCodeForge"}
              </a>
            </div>
          </div>

          <p className={Styles.introCopy}>
            I believe good code gets better when it&apos;s shared. Explore
            open-source experiments, useful tools, and notes from the journey.
          </p>

          <a
            className={Styles.githubButton}
            href={githubData?.githubUrl || "#"}
            target="_blank"
            rel="noreferrer"
          >
            Visit GitHub <span>↗</span>
          </a>
        </div>

        <div className={Styles.activityPanel}>
          <div className={Styles.activityHeader}>
            <p>
              {activityCount.toLocaleString()} contributions in the last 30 days
            </p>

            <div className={Styles.legend}>
              <span>Less</span>

              <i className={Styles.level1} />
              <i className={Styles.level2} />
              <i className={Styles.level4} />

              <span>More</span>
            </div>
          </div>

          {/* Contribution Grid */}
          <div className={Styles.activityGrid}>
            {activityDays.map((day) => (
              <span
                className={Styles[contributionClass[day.contributionLevel]]}
                title={`${day.date}: ${day.contributionCount} contributions`}
                data-tooltip={`${new Date(day.date).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })} · ${day.contributionCount} ${
                  day.contributionCount === 1 ? "contribution" : "contributions"
                }`}
                key={day.date}
                data-level={day.contributionLevel}
              />
            ))}
          </div>

          {/* Repositories */}
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
                    {repository.primaryLanguage || "Open source"} ·{" "}
                    {repository.stargazerCount} stars
                  </small>
                </span>
              </a>
            ))}
          </div>

          {/* Last Updated */}
          {githubData?.lastUpdated && (
            <small className={Styles.updatedAt}>
              Updated{" "}
              {new Date(githubData.lastUpdated.date).toLocaleDateString([], {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </small>
          )}
        </div>
      </div>
    </section>
  );
};

export default Github;
