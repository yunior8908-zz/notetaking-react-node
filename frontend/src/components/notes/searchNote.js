import React, {useEffect, useRef, useState} from 'react';
import {useDebounce} from "../hooks/useDebounce";
import {CircularProgress} from "@material-ui/core";

const DELAY = 800;

const SearchNote = props => {
    const {onSearch} = props;
    const [searchByTitle, setSearchByTitle] = useState('');
    const searchByTitleDebounce = useDebounce(searchByTitle, DELAY);
    const [searching, setSearching] = useState(false);
    let searByTitleRef = useRef();

    useEffect(()=>{
        searByTitleRef.current.focus();
    },[searByTitleRef]);

    useEffect(()=> {
        onSearch(searchByTitleDebounce);
        setSearching(false);
    }, [searchByTitleDebounce]);

    const handleSearch = e => {
        const value = e.target.value;
        setSearchByTitle(value);
        setSearching(true);
    };

    return <div className="form-search input-group input-group-sm mb-3">
        <input
            className="form-control"
            value={searchByTitle}
            onChange={handleSearch}
            ref={searByTitleRef}
            placeholder="search by title"
        />

        <div className="input-group-append">
            <span className="input-group-text">
                <span>
                    {searching ? <CircularProgress size={12}/> : "search"}
                </span>
            </span>
        </div>
    </div>
};

export default SearchNote;