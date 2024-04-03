import React from 'react';

const HyperlinkComponent = ({ url, children }) => {
    const handleClick = (event) => {
        event.preventDefault(); // Prevents the default behavior of the anchor tag
        window.open(url, '_blank'); // Opens the URL in a new tab
    };

    return (
        <a href={url} onClick={handleClick}>
            {children}
        </a>
    );
};

export default HyperlinkComponent;