import { SET_USER, REMOVE_USER } from "../types";

export const setUser = (profile, accessKey, refreshKey) => {
  return {
    type: SET_USER,
    payload: {
        profile,
        accessKey,
        refreshKey
    }
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
