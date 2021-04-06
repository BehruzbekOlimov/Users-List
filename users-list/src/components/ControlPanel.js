import React from 'react';
import {BiPlus, BiRefresh} from "react-icons/all";
import {fetchGetAllUsers, toggleFormModal} from "../redux/actions";
import {connect} from "react-redux";

const ControlPanel = ({getUsers, showModalForm}) => {
    return (
        <div className="container py-4">
            <div className="row">
                <div className="col">
                    <button onClick={getUsers} className="btn btn-secondary btn-block">
                        <BiRefresh size={"1.2em"} className="mr-2"/>Refresh
                    </button>
                </div>
                <div className="col">
                    <button onClick={showModalForm} className="btn btn-success btn-block">
                        <BiPlus size={"1.2em"} className="mr-2"/>Create New User
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => fetchGetAllUsers(dispatch),
        showModalForm: () => dispatch(toggleFormModal(true))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlPanel);
