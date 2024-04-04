import React from 'react';
import ResumeViewer from './resume';
import CoverViewer from './cover';
import neon from './neon.svg';
import './App.css';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="tooltip">
          {/* <span className="tooltiptext">I hope I don't get sued for this logo</span> */}
          <div className="title"><div className=''><img src={neon} className="neon-logo" alt="neon" /></div><div className='me'> 🤝 &nbsp; <a href="https://www.linkedin.com/in/ojas-wadhwani-99a14315a/"> Ojas</a></div></div>
        </div>
        <div className="description">
          <p>
            Dear Hiring Team,
          </p>
          <p>
            I am submitting my application for the <a href="https://boards.greenhouse.io/neondatabase/jobs/5132407004">Fullstack Engineer (Growth Team) position</a> at Neon. While I have previously engaged with Neon at work, this opportunity marks my formal introduction to the company.
            My skill set encompasses proficiency in <b>React, GraphQL, and Go</b>, alongside practical experience with writing queries in <b>BigQuery</b> and <b>Postgres</b> databases.
          </p>
          <p>
            The development of this application represents a culmination of my efforts, leveraging the tools and technologies I have honed during my tenure at Growth team at Hasura. Through integration between <b>Vercel, Hasura, and Neon</b>, I have crafted a comprehensive full stack application.
            Functionality-wise, the application employs <a href="https://vercel.com/integrations/hasura">Vercel-Hasura integration</a>, coupled with <a href="https://hasura.io/docs/latest/databases/postgres/neon/">Hasura-Neon integration</a> <b>both of the projects I was a part of at Hasura</b>.
            It dynamically fetches PDF documents stored within a Google Cloud Storage bucket via links managed in a Neon Postgres database connected through Hasura.
            The frontend, hosted on Vercel, interacts with the GraphQL API provided by Hasura, utilizing <a href="https://tanstack.com/query/latest/docs/framework/react/overview">react-query</a> for efficient data fetching and <a href="https://react-pdf.org/">react-pdf</a> for elegant document display.
          </p>
          <p>Warm regards, Ojas. <div className="source"><a href="https://github.com/OjasWadhwani/neon-application">source code</a></div></p>

        </div>
        <div className='application'>
          <ResumeViewer />
          <CoverViewer />
        </div>
      </header >
    </div >
  );
};

export default App;
