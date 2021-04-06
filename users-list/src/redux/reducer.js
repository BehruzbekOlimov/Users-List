import {
    FETCH_FAILURE,
    FETCH_REQUEST,
    FETCH_GET_USERS,
    FETCH_CREATE_USER,
    TOGGLE_FORM_MODAL,
    TOGGLE_ALERT_MODAL, FETCH_UPDATE_USER, FETCH_DELETE_USER, TOGGLE_DIALOG_MODAL
} from "./actions";
import {combineReducers} from "redux";

const initialUsersState = {
    loading: false,
    users: [],
    error: ''
}

const initialModalsState = {
    modalFormToggle: false,
    modalDialogToggle: false,
    modalAlertToggle: false,
    formData: null,
    alertData: {
        isSuccess: false,
        text: ''
    }
}

const usersReducer = (state = initialUsersState, action) => {

    switch (action.type) {
        case FETCH_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case FETCH_GET_USERS: {

            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        }
        case FETCH_CREATE_USER: {
            return {
                loading: false,
                users: [...state.users, action.payload],
                error: ''
            }
        }
        case FETCH_UPDATE_USER: {
            const index = state.users.findIndex(({_id}) => _id === action.payload._id)
            state.users[index] = action.payload
            return {
                loading: false,
                users: [...state.users],
                error: ''
            }
        }
        case FETCH_DELETE_USER: {
            const index = state.users.findIndex(({_id}) => _id === action.payload._id)
            state.users.splice(index,1)
            return {
                loading: false,
                users: [...state.users],
                error: ''
            }
        }
        case FETCH_FAILURE: {
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        }
        default:
            return state
    }
}
const modalsReducer = (state = initialModalsState, action) => {
    switch (action.type) {
        case TOGGLE_FORM_MODAL:
            if (!action.payload.user)
            return {
                ...state,
                modalFormToggle: action.payload.show,
                formData: null
            }
            return {
                ...state,
                modalFormToggle: action.payload.show,
                formData: action.payload.user
            }

        case TOGGLE_ALERT_MODAL:
            if (!action.payload.show)
                return {
                    ...state,
                    modalAlertToggle: action.payload.show,
                }
            return {
                ...state,
                modalAlertToggle: action.payload.show,
                alertData: {
                    isSuccess: action.payload.isSuccess
                }
            }

        case TOGGLE_DIALOG_MODAL:
            if (!action.payload.user)
                return {
                    ...state,
                    modalDialogToggle: action.payload.show,
                }
            return {
                ...state,
                modalDialogToggle: action.payload.show,
                formData: action.payload.user
            }

        default:
            return state
    }
}
const reducer = combineReducers({
    users: usersReducer,
    modals: modalsReducer
})
export default reducer
