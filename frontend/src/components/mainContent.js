import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IndexNotes from './notes/indexNotes';
import AddNotes from './notes/addNotes';
import EditNotes from './notes/editNotes';
import DeleteNotes from "./notes/deleteNotes";

const MainContent = props => {
    return <div className="container main-content">
        <Switch>
            <Route exact path="/" component={()=><div>home</div>}/>
            <Route exact path="/notes/index" component={IndexNotes}/>
            <Route exact path="/notes/add" component={AddNotes}/>
            <Route exact path="/notes/edit/:id" component={EditNotes}/>
            <Route exact path="/notes/delete/:id" component={DeleteNotes}/>
            <Route component={()=><div>404</div>}/>
        </Switch>
    </div>
};

export default MainContent;