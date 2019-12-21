const initialStateNotesReducer = {
    loadingList: false,
    loadingAdd: false,
    loadingEdit: false,
    loadingDelete: false,
    loadingSelect: false,
    notes: [],
    total: 0,
    note: {}
};

export const NotesReducer = (state=initialStateNotesReducer, action) => {
    switch (action.type) {
        case 'FETCH_NOTES_LIST':
            return {
                ...state, loadingList: true
            };
        case 'FETCH_NOTES_LIST_SUCCESS':
            return {
            ...state, loadingList: false, notes: action.notes, total: action.total
        };
        case 'FETCH_NOTES_ADD':
            return {
                ...state, loadingAdd: true
            };
        case 'FETCH_NOTES_ADD_SUCCESS':
            return {
                ...state, loadingAdd: false, notes: [...state.notes, action.note], total: state.total + 1
            };
        case 'FETCH_NOTES_EDIT':
            return {
                ...state, loadingEdit: true
            };
        case 'FETCH_NOTES_EDIT_SUCCESS':
            return {
                ...state, loadingEdit: false, notes: state.notes.map(note => {
                    const noteEdited = action.note;
                    return note._id === noteEdited._id ? noteEdited : note;
                })
            };
        case 'FETCH_NOTES_DELETE':
            return {
                ...state, loadingDelete: true
            };
        case 'FETCH_NOTES_DELETE_SUCCESS':
            return {
                ...state, loadingDelete: false, notes: state.notes.filter(note => note._id !== action.note), total: state.total - 1
            };
        case 'SELECT_NOTE': {
            return {
                ...state, loadingSelect: true
            };
        }
        case 'SELECT_NOTE_FROM_ARRAY_SUCCESS': {
            return {
                ...state, note: state.notes.find(nt => nt._id === action.note), loadingSelect: false
            };
        }
        case 'SELECT_NOTE_FROM_SERVER_SUCCESS': {
            return {
                ...state, note: action.note, loadingSelect: false
            };
        }
        default: {
            return state;
        }
    }
};