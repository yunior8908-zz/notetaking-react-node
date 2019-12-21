import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {FetchNotesDelete, SelectNoteAction} from "./actions/notesActions";
import {CircularProgress} from "@material-ui/core";


const DeleteNotes = props => {
    const {funcSelectNote, noteSelected, loadingNote, funcFetchNotesDelete, loadingDelete} = props;
    const [prevState, setPrevState] = useState(null);
    const {id} = props.match.params;

    useEffect(() => {
        funcSelectNote(id);
    }, [id]);

    useEffect(() => {
        if (loadingDelete === true){
            setPrevState(loadingDelete);
        }
        if(loadingDelete === false && prevState === true){
            props.history.push('/notes/index');
        }
    }, [loadingDelete, prevState]);

    const handleCancel = e => {
        e.preventDefault();
        props.history.push("/notes/index");
    };

    const handleDelete = e => {
        e.preventDefault();
        console.log(noteSelected)
        if(noteSelected._id) {
            funcFetchNotesDelete(noteSelected._id);
        }
    };

    return <>
        <div className="border border-danger" style={{maxWidth: 400, maxHeight: 100, margin: '0 auto', padding: '3px'}}>
            <p className="small text-danger"> Esta seguro que desea eliminar la nota: {noteSelected.title} con fecha {new Date(noteSelected.date).toLocaleString()}
            </p>
        </div>
        <div className="dropdown-divider"/>
        <div className="float-right">
            <button className="btn btn-sm btn-secondary" onClick={handleCancel}>cancel</button>
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>delete
                {loadingDelete && <CircularProgress size={12}/>}
            </button>
        </div>
    </>

};

const mapStateToProps = state => {
    return {
        noteSelected: state.NotesReducer.note,
        loadingDelete: state.NotesReducer.loadingDelete,
        loadingNote: state.NotesReducer.loadingSelect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        funcSelectNote: (id) => dispatch(SelectNoteAction(id)),
        funcFetchNotesDelete: (id) => dispatch(FetchNotesDelete(id)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteNotes);