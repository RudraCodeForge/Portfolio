import api from "./api.service";

export const getPortfolio = async () => {
  try {
    const response = await api.get("/PortfolioData");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch HeaderData",
      }
    );
  }
};
