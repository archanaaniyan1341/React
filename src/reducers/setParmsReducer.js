const setParamsReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_PARAMS":
            return action.payload;
        default: 
            return state;
    }
}

export default setParamsReducer;