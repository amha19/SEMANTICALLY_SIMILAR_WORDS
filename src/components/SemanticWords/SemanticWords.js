import React from 'react';

const semanticWords = (props) => {
    let words = props.words.map(items => (
        <li key={items.word}><a href="#">{items.word}</a></li>
    ))
    
    if (props.unfoundWord) {
        words = <p>Text was not found.</p>
    }
    return (
        <div>
            <ol>
                {words}
            </ol>
        </div>

    );
}

export default semanticWords;