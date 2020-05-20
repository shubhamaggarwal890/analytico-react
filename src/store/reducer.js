const initialState = {
    user: {
        name: "Shubham Aggarwal",
        id: 1
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === 'activity_associated_flows') {
        return {
            ...state,
            associated_flows: {
                activity: action.value
            }
        }
    }
    return state;
}

export default reducer;