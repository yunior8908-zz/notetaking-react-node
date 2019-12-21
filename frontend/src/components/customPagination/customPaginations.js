import React, {useContext, useState} from 'react';
import {ContextPagination} from "./contextPagination";

const CustomPagination = props => {
    const {visibles = 7 } = props;
    const {total, page, limit, handleValues} = useContext(ContextPagination);
    const [start, setStart] = useState(0);

    const pages = Math.ceil(total/limit);
    const range = Array(pages).fill('', start, start + visibles);

    const handleClick = (name, value) => {
        let n = name;
        let v = value;

        if(name === "prev" && value === "<"){
            n = "page";
            v = page - 1;

            console.info("prev", page, start, visibles);

            if(page === start){
                setStart(page - visibles);
            }

        }else if(name === "next" && value === ">"){
            n = "page";
            v = page + 1;

            if(page + 2 === start + visibles + 1){
                setStart(page + 1);
            }
        }
        handleValues(n, v);
    };

    return <>{total > 0 && (
        <div>
            <div className="btn-group">
                <button
                    disabled={page === 0}
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleClick('prev', '<')}
                >{`<`}</button>
                {range.map((_, index) => (
                    <button
                        key={index}
                        className={`btn btn-sm btn-outline-primary ${index === page ? "active" : ""}`}
                        onClick={() => handleClick('page', index)}>{index + 1}</button>
                ))}
                <button
                    disabled={page + 1 === pages}
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleClick('next', '>')}
                >{`>`}</button>
            </div>
            <span className="text-info text-sm-center">{`${page + 1}/${range.length} pages`}</span>
        </div>
    )}

    </>
};

export default CustomPagination;