import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import Styles from "../styles/Github.module.css";

const GITHUB_USERNAME = "RudraCodeForge";
const EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`;
const REFRESH_INTERVAL = 5 * 60 * 1000;

const eventWeight = (event) => {
  if (event.type === "PushEvent")
    return Math.min(event.payload.commits?.length || 1, 4);
  if (event.type === "PullRequestEvent" || event.type === "IssuesEvent")
    return 3;
  if (event.type === "CreateEvent" || event.type === "PullRequestReviewEvent")
    return 2;
  return 1;
};

const formatEvent = (event) => {
  if (event.type === "PushEvent")
    return `${event.payload.commits?.length || 1} commit(s)`;
  if (event.type === "PullRequestEvent")
    return `pull request ${event.payload.action}`;
  if (event.type === "IssuesEvent") return `issue ${event.payload.action}`;
  if (event.type === "WatchEvent") return "starred a repository";
  if (event.type === "CreateEvent") return `created ${event.payload.ref_type}`;
  return event.type.replace("Event", "");
};

const getDayKey = (date) => date.toISOString().slice(0, 10);

const Github = () => {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadEvents = async () => {
      try {
        setStatus("loading");
        const response = await fetch(EVENTS_URL, { signal: controller.signal });
        if (!response.ok)
          throw new Error(`GitHub responded with ${response.status}`);
        setEvents(await response.json());
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

  const activityDays = useMemo(() => {
    const today = new Date();
    const days = Array.from({ length: 84 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (83 - index));
      return { date, key: getDayKey(date), weight: 0 };
    });
    const byDay = new Map(days.map((day) => [day.key, day]));
    events.forEach((event) => {
      const day = byDay.get(getDayKey(new Date(event.created_at)));
      if (day) day.weight = Math.min(day.weight + eventWeight(event), 4);
    });
    return days;
  }, [events]);

  const repositories = useMemo(() => {
    const seen = new Set();
    return events
      .filter((event) => {
        const repository = event.repo?.name;
        if (!repository || seen.has(repository)) return false;
        seen.add(repository);
        return true;
      })
      .slice(0, 2);
  }, [events]);

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
                ? `${events.length} recent public events`
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
                  className={`${Styles[`level${day.weight}`]}`}
                  title={`${day.key}: ${day.weight} activity`}
                  key={day.key}
                />
              ))}
            </div>
          )}
          <div className={Styles.repositoryList}>
            {repositories.map((event) => (
              <a
                className={Styles.repositoryCard}
                href={`https://github.com/${event.repo.name}`}
                target="_blank"
                rel="noreferrer"
                key={event.repo.name}
              >
                <FontAwesomeIcon icon={faCodeBranch} />
                <span>
                  <b>{event.repo.name.split("/").pop()}</b>
                  <small>
                    {event.actor?.display_login || GITHUB_USERNAME} ·{" "}
                    {formatEvent(event)}
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
