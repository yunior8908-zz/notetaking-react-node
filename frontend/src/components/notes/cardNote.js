import React from 'react';
import {NavLink} from "react-router-dom";

const CardNote = props => {
    const {note} = props;
    return <div key={note._id} className="card card-note">
        <div className="card-header">{note.title}</div>
        <div className="card-body">
            {note.content}
        </div>
        <div className="card-footer">
            <div className="float-right">
                <NavLink className="btn btn-sm btn-primary float-right" to={`/notes/edit/${note._id}`}>Edit</NavLink>
                <NavLink className="btn btn-sm btn-danger float-right" to={`/notes/delete/${note._id}`}>Delete</NavLink>
            </div>
        </div>
    </div>;
};
export default CardNote;