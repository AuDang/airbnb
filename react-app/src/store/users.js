const LOAD_USERS= '/users/LOAD_USERS'
const ADD_USER= 'users/LOAD_USER'

const loadUsers = users => (
    {
        type: LOAD_USERS,
        users
    }
)

export const loadUser = user => (
    {
        type: ADD_USER,
        user
    }
)

export const getUsers = () => async dispatch => {
    const res = await fetch('/api/users/')
    if (res.ok) {
        const users = await res.json()
        dispatch(loadUsers(users))
    }
    return res
}

const userReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USERS: {
            newState = {...state};
            action.users.users.forEach(user => newState[user.id] = user);
            return newState
        }
        case ADD_USER: {
            newState = { ...state };
            newState[action.user.id] = action.user
            return newState
        }
        default:
            return state
    }
}

export default userReducer