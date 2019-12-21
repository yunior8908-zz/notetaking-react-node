import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './reduxStore';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import NavBar from "./components/navBar";
import MainContent from "./components/mainContent";
import {Provider} from "react-redux";
import ErrorBoundary from "./components/development/errorBoundary";
import CustomMessageAlertComponent from "./components/messageAlert/customMessageAlertComponent";

const App = () => <div className="App">
    <BrowserRouter>
        <NavBar/>
        <CustomMessageAlertComponent />
        <MainContent/>
    </BrowserRouter>
</div>;

ReactDOM.render(<Provider store={store}>
    <ErrorBoundary>
        <App/>
    </ErrorBoundary>
</Provider>, document.getElementById('app'));