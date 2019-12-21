import React, {useState} from 'react';
import {match} from "minimatch";

export const ContextPagination = React.createContext();

export default ({children}) => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);

    const handleValues = (name, value) => {
        if(value.toString().match(/^(\d)+$/) != null) {
            if (name === 'page') {
                setPage(value)
            } else if (limit === 'limit') {
                setLimit(value)
            } else if (name === 'total') {
                setTotal(value)
            }
        }
    };

    return <ContextPagination.Provider value={{
        page: page,
        limit: limit,
        total: total,
        handleValues: handleValues
    }}>
        {children}
    </ContextPagination.Provider>
}