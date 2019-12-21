import React, {useContext, useEffect} from 'react';
import {connect} from "react-redux";
import {FetchNotesListAction} from "./actions/notesActions";
import ListNotes from "./listNotes";
import SearchNote from "./searchNote";
import PaginationProvider, {ContextPagination} from '../customPagination/contextPagination';
import CustomPagination from "../customPagination/customPaginations";

const IndexNotes = props => {
    const {funcFetchNotesList, total} = props;
    const {page, limit, total: totalPagination, handleValues} = useContext(ContextPagination);

    console.log("total on [indexNotes.js]", total);

    useEffect(()=> {
        funcFetchNotesList({});
    },[]);

    useEffect(() => {
        handleValues('total', total);
    }, [total]);

    useEffect(() => {
        funcFetchNotesList({page: page, limit: limit});
    }, [page, limit]);

    const handleSearch = value => {
        funcFetchNotesList({page: 0, limit: 5, title: {value: value, operator: 'contain'}});
    };

    return <>
            <SearchNote onSearch={handleSearch}/>
            <ListNotes/>
            <CustomPagination/>
        </>
};



const IndexNotesWithPaginationContext = props => {
    return <>
        <PaginationProvider>
            <IndexNotes {...props}/>
        </PaginationProvider>
    </>
};

const mapStateToProps = state => {
    return {
        total: state.NotesReducer.total
    }
};

const mapDispatchToProps = dispatch => {
    return {
        funcFetchNotesList: (params) => dispatch(FetchNotesListAction(params))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexNotesWithPaginationContext);