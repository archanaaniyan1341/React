export const setUserData = (userData) => {
    return {
        type: "SET_USER_DATA",
        payload: userData
    }
}

export const setGridDefaults = (gridDefaults) => {
    return {
        type: "GRID_SETTINGS",
        payload: gridDefaults
    }
}

export const setLayout = (selectedLayout) => {
    return {
        type: "SELECT_LAYOUT",
        payload: selectedLayout
    }
}
export const setParams = (params) => {
    return {
        type: "SET_PARAMS",
        payload: params
    }
}
export const setSelectedInfo = (params) => {    
    return {
        type: "SET_SELECTED_INFO",
        payload: params
    }
}
export const setExaminationQuestions = (params) => {    
    return {
        type: "SET_EXAMINATION_QUESTIONS",
        payload: params
    }
}