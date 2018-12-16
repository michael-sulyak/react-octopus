import { ActionClass, ReducerClass } from 'redux-class-decorators'


class UserListReducer {
    static initialState = {
        loading: false,
        value: null,
    }

    static start(state) {
        return {
            ...state,
            loading: true,
        }
    }

    static finish(state, action) {
        return {
            ...state,
            loading: false,
            value: action.payload,
        }
    }
}

UserListReducer = ReducerClass('UserList')(UserListReducer)


class UserListActions {
    static get(page) {
        return (dispatch) => {
            dispatch({ type: UserListReducer.start })

            global.fetch(`https://reqres.in/api/users?page=${page || 1}`).then(response => (
                response.json()
            )).then(data => {
                dispatch({
                    type: UserListReducer.finish,
                    payload: data.data,
                })
            })
        }
    }
}

UserListActions = ActionClass(UserListActions)

export {
    UserListReducer,
    UserListActions,
}
