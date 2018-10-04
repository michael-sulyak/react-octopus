import { block } from 'react-rambo'
import { getCore } from '../../coreConfig'


export const UserListBlock = block({
    name: 'UserList',
    initialState: {
        loading: false,
        value: null,
    },
    reducer: {
        start: (state, action) => ({
            ...state,
            loading: true,
        }),
        finish: (state, action) => ({
            ...state,
            loading: false,
            value: action.payload,
        }),
    },
    methods: {
        get: (params) => (dispatch, getState) => {
            const req = getCore().req
            dispatch('start')

            return req.get('/users', params).then((data) => {
                dispatch('finish', data.json.data)
            })
        },
    },
})
