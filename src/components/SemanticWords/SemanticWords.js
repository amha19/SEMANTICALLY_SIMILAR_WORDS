import React from 'react';

import styles from './SemanticWords.module.css';

const wordInfoHandler = (word) => {
    window.open('https://en.wikipedia.org/wiki/' + word, '_blank');
}

const semanticWords = props => {
    let words = props.words.map(items => (
        <li key={items.word} onClick={() => wordInfoHandler(items.word)}>{items.word}</li>
    ));

    return (
        <div className={styles.SemanticWords}>
            <ul>
                {words}
            </ul>
        </div>
    );
}

export default semanticWords;