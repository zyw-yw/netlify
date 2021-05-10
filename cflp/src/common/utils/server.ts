import { BASE_URL, MAPBOX_TOKEN } from "../constants";
import axios from "axios";

// export function getTopBanners() {
//   return request({
//     url: "/banner",
//   });
// }

const request = axios.create({
  baseURL: BASE_URL,
});

// const BASE_URL =
//   "https://api.mapbox.com/directions/v5/mapbox/walking";

// 做一层封装
export const getPathDirections = (startCo: any, endCo: any) => {
  return request({
    method: "get",
    url: `${startCo.longitude},${startCo.latitude};${endCo.longitude},${endCo.latitude}`,
    params: {
      geometries: "geojson",
      access_token: MAPBOX_TOKEN,
    },
  });
};

export const getUserInfo = async (username: string, password: string) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://qctz2d.fn.thelarkcloud.com/login",
      params: {
        username: username,
        password: password,
      },
    });
    return res.data;
  } catch (e) {
    return {};
  }
};
