const formatGithubData = (githubData) => {
  const { login, avatarUrl, url, contributionsCollection, repositories } =
    githubData;

  const calendar = contributionsCollection.contributionCalendar;

  const allDays = calendar.weeks.flatMap((week) => week.contributionDays);

  const today = new Date();

  const last30Days = allDays.filter((day) => {
    const dayDate = new Date(`${day.date}T00:00:00`);

    const diffInDays = (today - dayDate) / (1000 * 60 * 60 * 24);

    return diffInDays >= 0 && diffInDays < 30;
  });

  const last30DaysContributions = last30Days.reduce(
    (total, day) => total + day.contributionCount,
    0,
  );

  const lastUpdated = allDays
    .filter((day) => day.contributionCount > 0)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const latestRepositories =
    repositories?.nodes?.map((repository) => ({
      name: repository.name,
      url: repository.url,
      primaryLanguage: repository.primaryLanguage?.name || "Open source",
      stargazerCount: repository.stargazerCount,
      updatedAt: repository.updatedAt,
    })) || [];

  return {
    username: login,

    profileImage: avatarUrl,

    githubUrl: url,

    totalContributions: calendar.totalContributions,

    totalCommits: contributionsCollection.totalCommitContributions,

    last30Days: {
      totalContributions: last30DaysContributions,

      days: last30Days.map((day) => ({
        date: day.date,
        contributionCount: day.contributionCount,
        contributionLevel: day.contributionLevel,
      })),
    },

    lastUpdated: lastUpdated
      ? {
          date: lastUpdated.date,
          contributionCount: lastUpdated.contributionCount,
        }
      : null,

    repositories: latestRepositories,
  };
};

module.exports = {
  formatGithubData,
};
