import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import useValidationField from "../hooks/useValidationField";
import {FetchNotesAddAction} from "./actions/notesActions";
import {CircularProgress} from '@material-ui/core'

const AddNotes = props => {
    const { funcFetchNotedAdd, loadingAdd } = props;
    const [title, setTitle] = useState('');
    const [prevState, setPrevState] = useState(null);
    const [isValidTitle, validationMessageTitle] = useValidationField({
        value: title,
        required: true,
        length: 45
    });
    const [content, setContent] = useState('');
    const [isValidContent, validationMessageContent] = useValidationField({
        value: content,
        required: true,
        length: 70
    });

    useEffect(() => {
        console.log(loadingAdd, prevState);
        if (loadingAdd === true){
            setPrevState(loadingAdd);
        }
        if(loadingAdd === false && prevState === true){
            props.history.push('/notes/index');
        }
    }, [loadingAdd, prevState]);

    const handleSubmit = ev => {
        ev.preventDefault();
        funcFetchNotedAdd({title, content});
        console.log(title, content);
    };

    const handleCancelar = ev => {
        ev.preventDefault();
        props.history.push('/notes/index')
    };

    const isValidForm = isValidTitle && isValidContent;

    return <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="title" className={`small ${!isValidTitle ? "text-danger" : "" }`}>Title:</label>
            <input
                id="content"
                className={`"form-control form-control-sm form-control ${!isValidTitle ? "border-danger" : "" } "`}
                required
                value={title}
                onChange={e=>setTitle(e.target.value)}
            />
            {!isValidTitle && <span className="small text-danger">Error: {validationMessageTitle}</span>}
        </div>
        <div className="form-group">
            <label htmlFor="title" className={`small ${!isValidContent ? "text-danger" : "" }`}>Content:</label>
            <textarea
                id="content"
                className={`form-control form-control-sm ${!isValidContent ? "border-danger" : ""}`}
                value={content}
                onChange={e=>setContent(e.target.value)}
                rows={5}
                maxLength={70}
                style={{resize: 'none'}}
            />
            <div className="small text-info">{`Max caracteres: (150,${content.length})`}</div>
            {!isValidContent && <span className="small text-danger clearfix">Error: {validationMessageContent}</span>}
        </div>
        <div className="dropdown-divider" />
        <div className="float-sm-right row">
            <button className="btn btn-sm btn-secondary" onClick={handleCancelar}>cancelar</button>
            <button disabled={!isValidForm} className="btn btn-sm btn-primary" ><span>save
                {loadingAdd && <CircularProgress size={12}/>}</span>
            </button>
        </div>
    </form>
};

const mapStateToProps = state => {
    return {
        loadingAdd: state.NotesReducer.loadingAdd
    }
};

const mapDispatchToProps = dispatch => {
    return {
        funcFetchNotedAdd: (data)=>dispatch(FetchNotesAddAction(data))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNotes);