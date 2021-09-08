const setExaminationQuestionReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_EXAMINATION_QUESTIONS":
            return action.payload;
        default: 
            return state;
    }
}

export default setExaminationQuestionReducer;