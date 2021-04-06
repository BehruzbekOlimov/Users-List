import React from 'react';
import {connect} from "react-redux";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {toggleDialogModal, toggleFormModal} from "../redux/actions";

function Table({users,showFormModal,showDialogModal}) {
    return (
        <div className="container w-100 overflow-auto">
            {users.length ?
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Control</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user,index)=>{
                        return <TableRow key={user._id}
                                         user={user}
                                         showFormModal={showFormModal}
                                         showDialogModal={showDialogModal}
                                         index={index+1}/>
                    })
                }
                </tbody>
            </table>:
                <h3 className="text-center">
                    {!users.loading && 'Users List Empty!'}
                </h3>
                    }
        </div>
    );
}

const TableRow = ({user, index, showFormModal, showDialogModal}) => {
    return (
        <>
        <tr>
            <th scope="row">{index}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>
                <div className="d-flex justify-content-between">
                    <button onClick={()=>showFormModal(user)} className="btn btn-outline-warning mr-2">
                        <AiFillEdit />
                    </button>
                    <button onClick={()=>showDialogModal(user)} className="btn btn-outline-danger">
                        <AiFillDelete />
                    </button>
                </div>
            </td>
        </tr>
        </>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users.users
    }
}
const mapDispatchToProps = dispatch => {
    return {
        showFormModal: (user) => dispatch(toggleFormModal(true,user)),
        showDialogModal: (user) => dispatch(toggleDialogModal(true,user)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Table);
