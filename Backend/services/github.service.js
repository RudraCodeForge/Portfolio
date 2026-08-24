const GITHUB_API = "https://api.github.com/graphql";

const fetchGithubData = async () => {
  const query = `
    query {
      viewer {
        login
        name
        avatarUrl
        bio
        url

        repositories(
          first: 100
          ownerAffiliations: OWNER
        ) {
          totalCount

          nodes {
            name
            url
            description
            updatedAt
            pushedAt
            stargazerCount
            forkCount

            primaryLanguage {
              name
            }
          }
        }

        contributionsCollection {
          totalCommitContributions

          contributionCalendar {
            totalContributions

            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_API, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
      }),
    });

    const result = await response.json();

    // HTTP error
    if (!response.ok) {
      console.error("GitHub API Error:", result);

      throw new Error(result.message || "GitHub API request failed");
    }

    // GraphQL error
    if (result.errors) {
      console.error("GitHub GraphQL Error:", result.errors);

      throw new Error(
        result.errors[0]?.message || "GitHub GraphQL request failed",
      );
    }

    return result.data.viewer;
  } catch (error) {
    console.error("GitHub Service Error:", error);

    throw new Error("Failed to fetch GitHub data");
  }
};

module.exports = {
  fetchGithubData,
};
