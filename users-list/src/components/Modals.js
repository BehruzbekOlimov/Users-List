import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Form, Formik, Field} from "formik";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchPostCreateUser,
    fetchPutUpdateUser, fetchRequestDeleteUser,
    toggleAlertModal,
    toggleDialogModal,
    toggleFormModal
} from "../redux/actions";

export const FormModal = () => {
    const dispatch = useDispatch()
    const modals = useSelector(({modals}) => modals)
    const {formData, modalFormToggle} = modals


    function handleClose() {
        dispatch(toggleFormModal(false))
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(3, 'Too Short!')
            .max(32, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(3, 'Too Short!')
            .max(32, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    return (
        <>
            <Modal show={modalFormToggle}
                   backdrop="static"
                   keyboard={false}
                   centered
                   style={{backdropFilter: 'blur(3px)'}}
                   onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            formData ?
                                <p>Update user</p> :
                                <p>Create user</p>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Formik
                            initialValues={formData ? {
                                    firstName: formData.firstName,
                                    lastName: formData.lastName,
                                    email: formData.email,
                                    gender: formData.gender
                                }
                                : {firstName: '', lastName: '', email: '', gender: 'male'}}
                            validationSchema={
                                validationSchema
                            }
                            onSubmit={(values, {setSubmitting}) => {
                                handleClose()
                                setSubmitting(false)
                                formData?
                                fetchPutUpdateUser(dispatch, values, formData._id):
                                fetchPostCreateUser(dispatch, values)
                            }}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6 py-2">
                                            <label>
                                                First Name:
                                                <Field type="text" className="form-control" name="firstName"
                                                       placeholder="First Name"/>
                                            </label>
                                            <ErrorMessage name="firstName" className="text-danger" component="div"/>
                                        </div>
                                        <div className="col-md-6 py-2">
                                            <label>
                                                Last Name:
                                                <Field type="text" className="form-control" name="lastName"
                                                       placeholder="Last Name"/>
                                            </label>
                                            <ErrorMessage name="lastName" className="text-danger" component="div"/>
                                        </div>
                                        <div className="col-md-12 py-2">
                                            <label className="w-100">
                                                Email:
                                                <Field type="text" className="form-control w-100" name="email"
                                                       placeholder="Email"/>
                                            </label>
                                            <ErrorMessage name="email" className="text-danger" component="div"/>
                                        </div>
                                    </div>
                                    <div role="group" className="row" aria-labelledby="my-radio-group">
                                        <div className="col-4">
                                            <div id="my-radio-group">Gender:</div>
                                        </div>
                                        <div className="col-4">
                                            <label className="">
                                                <Field className="form-control h-auto" type="radio" name="gender"
                                                       value="male"/>
                                                <span>Male</span>
                                            </label>
                                        </div>
                                        <div className="col-4">
                                            <label className="">
                                                <Field className="form-control h-auto" type="radio" name="gender"
                                                       value="female"/>
                                                <span>Female</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Button variant="secondary" className="btn-block" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </div>
                                        <div className="col-md-6">
                                            <Button variant="primary" className="btn-block" type="submit"
                                                    disabled={isSubmitting}>
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export const AlertModal = () => {
    const dispatch = useDispatch()
    const modals = useSelector(({modals}) => modals)
    const {alertData, modalAlertToggle} = modals

    function handleClose() {
        dispatch(toggleAlertModal(false))
    }

    return (
        <>
            <Modal show={modalAlertToggle} onHide={handleClose} centered style={{backdropFilter: 'blur(2px)'}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            alertData.isSuccess ?
                                <p>Success</p> :
                                <p>Error</p>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className={'alert ' + (alertData.isSuccess ? 'alert-success' : 'alert-danger')}>
                            <h3>{alertData.isSuccess ? 'Successful!' : 'Error!!!'}</h3>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn-block" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export const LoadingModal= () => {
    const show =useSelector(state => state.users.loading)
    return (
        <>
            <Modal show={show} centered style={{backdropFilter: 'blur(5px)'}}>
                <Modal.Body>
                    <div className="container p-5 d-flex align-items-center justify-content-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export const ErrorModal= () => {
    const {error} =useSelector(state => state.users)
    const show = !!error
    return (
        <>
            <Modal show={show} centered style={{backdropFilter: 'blur(5px)'}}>
                <Modal.Body>
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export const DialogModal = () => {
    const dispatch = useDispatch()
    const modals = useSelector(({modals}) => modals)
    const {formData, modalDialogToggle} = modals

    function handleClose() {
        dispatch(toggleDialogModal(false))
    }

    return (
        <>
            <Modal show={modalDialogToggle} onHide={handleClose} centered style={{backdropFilter: 'blur(5px)'}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Delete user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Do you want delete "{formData && formData.firstName} {formData && formData.lastName}" ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Button variant="secondary" className="btn-block" onClick={handleClose}>
                                    No
                                </Button>
                            </div>
                            <div className="col-md-6">
                                <Button variant="danger" className="btn-block" onClick={() => {
                                    handleClose()
                                    fetchRequestDeleteUser(dispatch,formData._id)}}>
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

