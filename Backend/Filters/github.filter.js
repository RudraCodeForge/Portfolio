const formatGithubData = (githubData) => {
  const { login, avatarUrl, url, contributionsCollection } = githubData;

  const calendar = contributionsCollection.contributionCalendar;

  // Flatten all weeks into one array of days
  const allDays = calendar.weeks.flatMap((week) => week.contributionDays);

  // Last 30 days
  const today = new Date();

  const last30Days = allDays.filter((day) => {
    const dayDate = new Date(`${day.date}T00:00:00`);
    const diffInDays = (today - dayDate) / (1000 * 60 * 60 * 24);

    return diffInDays >= 0 && diffInDays < 30;
  });

  // Last 30 days total contributions
  const last30DaysContributions = last30Days.reduce(
    (total, day) => total + day.contributionCount,
    0,
  );

  // Latest contribution/update day
  const lastUpdated = allDays
    .filter((day) => day.contributionCount > 0)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return {
    username: login,

    profileImage: avatarUrl,

    githubUrl: url,

    totalContributions: calendar.totalContributions,

    totalCommits: contributionsCollection.totalCommitContributions,

    last30Days: {
      totalContributions: last30DaysContributions,

      days: last30Days,
    },

    lastUpdated: lastUpdated
      ? {
          date: lastUpdated.date,
          contributionCount: lastUpdated.contributionCount,
        }
      : null,
  };
};

module.exports = {
  formatGithubData,
};
