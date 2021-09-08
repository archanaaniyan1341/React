const loggedReducer = (state = { isLogged: false, role: null, layout: null}, action) => {
    switch(action.type) {
        case "SET_USER_DATA":
            let userData = {
                isLogged: true,
                role: action.payload.role,
                layout: action.payload.layout
            };
            localStorage.setItem("userRole", action.payload.role);
            return userData;
        default: 
            return state;
    }
}

export default loggedReducer;