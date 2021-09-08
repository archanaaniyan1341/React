import { API_START, API_END, GRID_SETTINGS, FETCH_LAYOUT,  SET_LAYOUT } from "../actions/types";

const gridDefaultsReducer = (
  state = {
    currentBreakpoint: "lg",
    compactType: "horizontal",
    layouts: { lg: [] },
  },
  action
) => {
  switch (action.type) {    
    case GRID_SETTINGS:
      return {
        currentBreakpoint: action.payload.currentBreakpoint || "lg",
        compactType: action.payload.compactType || "horizontal",
        layouts: action.payload.layouts || state.layouts,
      };
    case SET_LAYOUT:
      return { data: action.payload };
    case API_START:
      if (action.payload === FETCH_LAYOUT) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      break;
    case API_END:
      if (action.payload === FETCH_LAYOUT) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      break;
    default:
      return state;
  }
};

export default gridDefaultsReducer;
