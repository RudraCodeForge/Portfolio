import api from "./api.service";

export const ContactMe = async (Data) => {
  try {
    const Response = await api.post("/Contact", Data);

    return Response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to send contact message",
      }
    );
  }
};
