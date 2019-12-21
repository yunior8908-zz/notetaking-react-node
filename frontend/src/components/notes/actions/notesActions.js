import {ApiRequest} from '../../../apiRequest'
import {SetMessageAlertAction} from "../../messageAlert/actions/CustomMessageAlertAction";

const fetchNotes = () => {
    return {
        type: 'FETCH_NOTES_LIST'
    }
};

const fetchNotesSuccess = data => {
  return {
      type: 'FETCH_NOTES_LIST_SUCCESS',
      notes: data.notes,
      total: data.total
  }
};

export const FetchNotesListAction = (params) => async dispatch =>{
    dispatch(fetchNotes());
    try {
        let urlSearchParams = new URLSearchParams();
       // urlSearchParams.set("probando", "yunior");
        Object.keys(params).map(p => {
            if(params[p] instanceof Object) {
                if(params[p].hasOwnProperty("value") && params[p]["value"] !== undefined && params[p]["value"] !== null && params[p]["value"] !== ''){
                    Object.keys(params[p]).map(pp => {
                       urlSearchParams.set(`${p}_${pp}`, params[p][pp]);
                    });
                }
            }else {
                urlSearchParams.set(p, params[p]);
            }
        });

        const hasParams = [...urlSearchParams.entries()].length > 0;
        const queryString = hasParams ? `?${urlSearchParams.toString()}`: '';
        const response = await ApiRequest.get(`/notes${queryString}`);
        dispatch(fetchNotesSuccess(response.data));
    }catch (e) {
        dispatch(SetMessageAlertAction(e.response.data.message, 'danger'));
        throw new Error(e);
    }
};

const fetchNotesAdd = () => {
    return {
        type: 'FETCH_NOTES_ADD'
    }
};

const fetchNotesAddSuccess = note => {
    return {
        type: 'FETCH_NOTES_ADD_SUCCESS',
        note: note
    }
};

export const FetchNotesAddAction = data => async dispatch => {
  dispatch(fetchNotesAdd());
  try {
      const response = await ApiRequest.post(`/notes`, {
          ...data
      });
      dispatch(fetchNotesAddSuccess(response.data.note));
      dispatch(SetMessageAlertAction("Nota adicionada con exito.", 'success'));
  }catch (e) {
      dispatch(SetMessageAlertAction(`Error: ${e.message}`, 'danger'));
      throw new Error(e);
  }
};


const selectNote = () => {
    return {
        type: 'SELECT_NOTE'
    }
};

const selectNoteFormArraySuccess = id => {
    return {
        type: 'SELECT_NOTE_FROM_ARRAY_SUCCESS',
        note: id
    }
};

const selectNoteFormServerSuccess = note => {
    return {
        type: 'SELECT_NOTE_FROM_SERVER_SUCCESS',
        note: note
    }
};

export const SelectNoteAction = id => async (dispatch, getState) => {
    const notesEmpty = getState().NotesReducer.notes.length;
    dispatch(selectNote());
    if(notesEmpty > 0){
        dispatch(selectNoteFormArraySuccess(id));
    }else {
        try{
            const response = await ApiRequest.get(`/notes/${id}`);
            dispatch(selectNoteFormServerSuccess(response.data.note));
        }catch (e) {
            dispatch(SetMessageAlertAction(`Error: ${e.message}`, 'danger'));
            throw new Error(e);
        }
    }
};

const fetchNotesEdit = () => {
    return {
        type: 'FETCH_NOTES_EDIT'
    }
};

const fetchNotesEditSuccess = note => {
    return {
        type: 'FETCH_NOTES_EDIT_SUCCESS',
        note: note
    }
};

export const FetchNotesEdit = (id, data) => async dispatch => {
    dispatch(fetchNotesEdit());
    try {
        const response = await ApiRequest.put(`/notes/${id}`, {
            ...data
        });
        console.log("EditNotesAction", id, response);
        dispatch(fetchNotesEditSuccess(response.data.note));
    }catch (e) {
        dispatch(SetMessageAlertAction(`Error: ${e.message}`, 'danger'));
        throw new Error(e);
    }
};

const fetchNotesDelete = () => {
    return {
        type: 'FETCH_NOTES_DELETE'
    }
};

const fetchNotesDeleteSuccess = note => {
    return {
        type: 'FETCH_NOTES_DELETE_SUCCESS',
        note: note
    }
};

export const FetchNotesDelete = id => async dispatch => {
    dispatch(fetchNotesDelete());
    try {
        const response = await ApiRequest.delete(`/notes/${id}`);
        dispatch(fetchNotesDeleteSuccess(response.data.note));
    }catch (e) {
        dispatch(SetMessageAlertAction(`Error: ${e.message}`, 'danger'));
        throw new Error(e);
    }
};