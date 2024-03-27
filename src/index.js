import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN_SECRET,
  },
});

client
  .query({
    query: gql`
      query TestQuery {
        files(where: {type: {_eq: "resume"}}) {
          file_path
        }
      }
    `,
  })
  .then((result) => console.log(result.data.files[0].file_path));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
