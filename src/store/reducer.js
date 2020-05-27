const initialState = {
    user: {
        name: "Shubham Aggarwal",
        id: 1
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === 'saveuser') {
        return {
            ...state,
            user: {
                name: action.name,
                id: action.id
            }
        }
    }
    return state;
}

export default reducer;