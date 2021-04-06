import {fetchGetAllUsers} from "./redux/actions";
import {connect} from "react-redux";
import {useEffect} from "react";
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import ControlPanel from "./components/ControlPanel";
import {AlertModal, DialogModal, ErrorModal, FormModal, LoadingModal} from "./components/Modals";

function App({getUsers}) {

    useEffect(() => getUsers(), [getUsers])
    return (
        <>
            <div className="App">
                <Navbar/>
                <ControlPanel/>
                <Table/>
            </div>
            <FormModal/>
            <AlertModal/>
            <DialogModal/>
            <LoadingModal/>
            <ErrorModal/>
        </>
    );
}

const mapStateToProps = state => state.users

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => fetchGetAllUsers(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
