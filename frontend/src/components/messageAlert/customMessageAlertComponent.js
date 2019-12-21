import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {SetMessageAlertAction} from "./actions/CustomMessageAlertAction";
import IconClose from '@material-ui/icons/Close';

const CustomMessageAlertComponent = props => {
    const {message, messageType, closeMessageAlert} = props;
    const handlerClose = () => {
        closeMessageAlert();
    };

    useEffect(()=>{
        if(message !== '' ) {
            setTimeout(() => {
                closeMessageAlert()
            }, 5000);
        }
    },[message]);

    return <>
        {message && messageType && <div className={`alert-${messageType} border-${messageType}`} style={{padding: 5}}>
            <span className="float-right">
                <IconClose style={{cursor: 'pointer'}} onClick={handlerClose}/>
            </span>
            <div className="container">
                <div className="alert-body">{message}</div>
            </div>
        </div>}
    </>
};

const mapStateToProps = state => {
    return {
        message: state.CustomMessageAlerReducer.message,
        messageType: state.CustomMessageAlerReducer.messageType
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeMessageAlert: ()=> dispatch(SetMessageAlertAction('',''))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomMessageAlertComponent);