import axios from "axios";

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_GET_USERS = 'FETCH_GET_USERS';
export const FETCH_CREATE_USER = 'FETCH_CREATE_USER';
export const FETCH_UPDATE_USER = 'FETCH_UPDATE_USER';
export const FETCH_DELETE_USER = 'FETCH_DELETE_USER';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const TOGGLE_FORM_MODAL = 'TOGGLE_FORM_MODAL';
export const TOGGLE_ALERT_MODAL = 'TOGGLE_ALERT_MODAL';
export const TOGGLE_DIALOG_MODAL = 'TOGGLE_DIALOG_MODAL';

function fetchRequest() {
    return {
        type: FETCH_REQUEST,
    }
}

function fetchGetUsers(users) {
    return {
        type: FETCH_GET_USERS,
        payload: users
    }
}

function fetchCreateUser(user) {
    return {
        type: FETCH_CREATE_USER,
        payload: user
    }
}

function fetchUpdateUser(user) {
    return {
        type: FETCH_UPDATE_USER,
        payload: user
    }
}

function fetchDeleteUser(user) {
    return {
        type: FETCH_DELETE_USER,
        payload: user
    }
}

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

export function toggleFormModal(show,user) {
    return {
        type: TOGGLE_FORM_MODAL,
        payload: {show,user}
    }
}

export function toggleAlertModal(show, isSuccess) {
    return {
        type: TOGGLE_ALERT_MODAL,
        payload: {show, isSuccess}
    }
}

export function toggleDialogModal(show, user) {
    return {
        type: TOGGLE_DIALOG_MODAL,
        payload: {show, user}
    }
}

export const fetchGetAllUsers = async (dispatch) => {
    dispatch(fetchRequest())
    axios.get('http://localhost:5000/api/users')
        .then(r => {
            dispatch(fetchGetUsers(r.data))
        })
        .catch(e => {
            dispatch(fetchFailure(e.message))
        })
}

export const fetchPostCreateUser = async (dispatch, form) => {
    dispatch(fetchRequest())
    axios.post('http://localhost:5000/api/users', form)
        .then(r => {
            dispatch(fetchCreateUser(r.data))
            dispatch(toggleAlertModal(true, true))
        })
        .catch(e => {
            dispatch(fetchFailure(e.message))
            dispatch(toggleAlertModal(true, false))
        })
}

export const fetchPutUpdateUser = async (dispatch, form, id) => {
    dispatch(fetchRequest())
    axios.put('http://localhost:5000/api/users/'+id, form)
        .then(r => {

            dispatch(fetchUpdateUser(r.data))
            dispatch(toggleAlertModal(true, true))
        })
        .catch(e => {
            dispatch(fetchFailure(e.message))
            dispatch(toggleAlertModal(true, false))
        })
}


export const fetchRequestDeleteUser = async (dispatch, id) => {
    dispatch(fetchRequest())
    axios.delete('http://localhost:5000/api/users/'+id)
        .then(r => {
            dispatch(fetchDeleteUser(r.data))
            dispatch(toggleAlertModal(true, true))
        })
        .catch(e => {
            dispatch(fetchFailure(e.message))
            dispatch(toggleAlertModal(true, false))
        })
}
