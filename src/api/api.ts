import axios from "axios";

const host = "https://api.wisey.app";
const version = "api/v1";

export const coursesApi = {
  getToken() {
    return axios.get(`${host}/${version}/auth/anonymous?platform=subscriptions`);
  },
  getCourses(token: string) {
    return axios.get(`${host}/${version}/core/preview-courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getCourse(token: string, courseId: string) {
    return axios.get(`${host}/${version}/core/preview-courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
