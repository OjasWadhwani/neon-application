import React from 'react';
import { useQuery } from 'react-query';
import { Document, Page } from 'react-pdf';
import HyperlinkComponent from './hyperlink';

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// This function fetches the resume data from your GraphQL endpoint
const fetchResume = async () => {
    const response = await fetch(process.env.REACT_APP_HASURA_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query: `
                query GetResume {
                    files(where: {type: {_eq: "resume"}}) {
                        file_path
                    }
                }
            `,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch resume data');
    }

    return response.json();
};

const ResumeViewer = () => {
    // Using the useQuery hook to fetch resume data
    const { isLoading, isError, data, error } = useQuery('resume', fetchResume);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const resumeFilePath = data?.data?.files?.[0]?.file_path;

    return (
        <div className="resume-container">
            <h1>Resume</h1>
            <HyperlinkComponent url={resumeFilePath}>
                <Document
                    file={resumeFilePath}
                    onLoadSuccess={() => console.log('Resume loaded successfully!')}
                    onLoadError={(error) => console.error('Failed to load PDF:', error)}
                >
                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
            </HyperlinkComponent>

        </div>
    );
};

export default ResumeViewer;
