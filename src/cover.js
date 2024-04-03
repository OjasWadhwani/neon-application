import React from 'react';
import { useQuery } from 'react-query';
import { Document, Page } from 'react-pdf';
import HyperlinkComponent from './hyperlink';

pdfJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js';

// This function fetches the cover letter from your GraphQL endpoint
const fetchCover = async () => {
    const response = await fetch(process.env.REACT_APP_HASURA_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query: `
                query Getcover {
                    files(where: {type: {_eq: "cover"}}) {
                        file_path
                    }
                }
            `,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cover data');
    }

    return response.json();
};

const CoverViewer = () => {
    // Using the useQuery hook to fetch cover data
    const { isLoading, isError, data, error } = useQuery('cover', fetchCover);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const coverFilePath = data?.data?.files?.[0]?.file_path;

    return (
        <div className="cover-container">
            <h1>Cover Letter</h1>
            <HyperlinkComponent url={coverFilePath}>
                <Document
                    file={coverFilePath}
                    onLoadSuccess={() => console.log('cover loaded successfully!')}
                    onLoadError={(error) => console.error('Failed to load PDF:', error)}
                >
                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
            </HyperlinkComponent>
        </div>
    );
};

export default CoverViewer;
