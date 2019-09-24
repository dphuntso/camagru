import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter.js';

class App extends React.Component {
    render() {
        return (
            <AppRouter />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
