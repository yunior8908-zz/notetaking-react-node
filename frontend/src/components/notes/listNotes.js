import React from 'react';
import {connect} from "react-redux";
import CardNote from "./cardNote";

const ListNotes = props => {
    const {notes = [], loadingNotes} = props;
    return <>
        {loadingNotes ?
            <div>...</div> :
            <div className="row row-notes-list">
                {notes.map(note => {
                    return <CardNote key={note._id} note={note}/>
            })}</div>
        }
    </>
};

const mapStateToProps = state => {
    return {
        loadingNotes: state.NotesReducer.loadingList,
        notes: state.NotesReducer.notes
    }
};

export default connect(
    mapStateToProps
)(ListNotes);