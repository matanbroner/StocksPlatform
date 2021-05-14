import { SET_USER, REMOVE_USER } from "../types";

const INITIAL_STATE = {
  profile: {},
  accessKey: null,
  refreshKey: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        profile: action.payload.profile,
        accessKey: action.payload.accessKey,
        refreshKey: action.payload.refreshKey,
      };

    case REMOVE_USER:
      return {
        ...state,
        profile: {},
        accessKey: null,
        refreshKey: null,
      };

    default:
      return state;
  }
};

export default reducer;
