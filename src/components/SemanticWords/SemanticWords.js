import React from 'react';

import styles from './SemanticWords.module.css';

const semanticWords = (props) => {
    let words = props.words.map(items => (
        <li key={items.word}>{items.word}</li>
    ))

    return (
        <div className={styles.SemanticWords}>
            <ul>
                {words}
            </ul>
        </div>

    );
}

export default semanticWords;