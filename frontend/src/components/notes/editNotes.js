import React, {useEffect, useLayoutEffect, useState} from 'react';
import {connect} from "react-redux";
import useValidationField from "../hooks/useValidationField";
import {CircularProgress} from "@material-ui/core";
import {FetchNotesEdit, SelectNoteAction} from "./actions/notesActions";

const EditNotes = props => {
    const { funcSelectNote, noteSelected, funcFetchNotesEdit, loadingEdit } = props;
    const [id, setId] = useState('');
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

    useEffect(()=>{
        const {id} = props.match.params;
        funcSelectNote(id);
    },[]);

    useLayoutEffect(() => {
        if(noteSelected !== undefined && noteSelected !== null && Object.keys(noteSelected).length > 0){
            setId(noteSelected._id);
            setTitle(noteSelected.title);
            setContent(noteSelected.content);
        }
    },[noteSelected]);

    useEffect(() => {
        if (loadingEdit === true){
            setPrevState(loadingEdit);
        }
        if(loadingEdit === false && prevState === true){
            props.history.push('/notes/index');
        }
    }, [loadingEdit, prevState]);

    const handleSubmit = ev => {
        ev.preventDefault();
        funcFetchNotesEdit(id,{title, content});
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
                {loadingEdit && <CircularProgress size={12}/>}</span>
            </button>
        </div>
    </form>
};

const mapStateToProps = state=>{
    return {
        noteSelected: state.NotesReducer.note,
        loadingEdit: state.NotesReducer.loadingEdit
    }
};

const mapDispatchToProps = dispatch => {
  return {
      funcSelectNote: (id)=>dispatch(SelectNoteAction(id)),
      funcFetchNotesEdit: (id, data)=>dispatch(FetchNotesEdit(id, data))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditNotes);