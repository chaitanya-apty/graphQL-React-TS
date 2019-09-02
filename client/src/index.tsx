import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import clientPort from './graphclient';

const tsx = (
    <>
        <ApolloProvider client={clientPort}>
            <App />
        </ApolloProvider>
    </>
)

ReactDOM.render(tsx, document.getElementById('root'));
serviceWorker.unregister();
