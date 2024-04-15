import { API } from "@/utils";

export const getMetadata = async (topicId) => {
  return await API.get(`/api/metadata/topic/${topicId}`);
};
