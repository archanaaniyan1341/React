const setSelectedInfoReducer = (state = 0, action) => {
    switch(action.type) {
        case "SET_SELECTED_INFO":
            return action.payload;
        default: 
            return state;
    }
}

export default setSelectedInfoReducer;