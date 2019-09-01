import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../components/UI/Spinner/Spinner';
import SemanticWords from '../../components/SemanticWords/SemanticWords';
import { languageCode } from '../../components/LanguageCode/languageCode';
import styles from './SearchFields.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchFields extends Component {

    state = {
        word: '',
        semanticData: null,
        loading: false,
        showWords: null,
        unfoundWord: false,
        error: false,
        emptyArry: false,
        language: languageCode
    }

    axiosHandler = () => {
        this.setState({ loading: true, showWords: null });
        const word = this.state.word;
        const language = this.state.language.value;
        const endpoint = '/lexicon/' + language + '/' + word
        const apiKey = '?additionalFields=SEMANTICALLY_SIMILAR_WORDS&apiKey=3acdef1f01cbceb88b132158abd466da&polarizeWord=false';
        const url = endpoint + apiKey;

        axios.get(url)
            .then(response => {
                const wordArrOne = [];
                for (let element in response.data) {
                    if (element === 'semanticallySimilarWords')
                        wordArrOne.push(response.data[element])
                }
                const wordArrTwo = wordArrOne[0];
                // console.log(response.data);
                this.setState({
                    semanticData: wordArrTwo,
                    loading: false,
                    showWords: this.state.word,
                    unfoundWord: false,
                    error: false
                });

                if (response.data.semanticallySimilarWords.length === 0) {
                    this.setState({ unfoundWord: true, showWords: null, error: false });
                }

                if (response.data.semanticallySimilarWords.length === undefined) {
                    this.setState({ emptyArry: true });
                }
            })
            .catch(
                error => {
                    // console.log(error);
                    this.setState({ error: true, loading: false });
                }
            );
    }

    inputChangeHandler = (event) => {
        const inWord = event.target.value;
        this.setState({ word: inWord });
    }

    selectChangeHandler = (event) => {
        const updatedLang = {
            ...this.state.language,
            value: event.target.value
        };

        this.setState({ language: updatedLang });
    }

    render() {
        let wordInput = (
            <div className={styles.Wrap}>
                <div className={styles.Search}>
                    <select
                        className={styles.SelectBox}
                        value={this.state.language.value}
                        onChange={(event) => this.selectChangeHandler(event)}>
                        {this.state.language.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>

                    <input
                        className={styles.SearchTerm}
                        type="text" placeholder="Search"
                        onChange={this.inputChangeHandler} />
                    <button
                        className={styles.SearchButton}
                        onClick={this.axiosHandler}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </div>
        );

        let loading = this.state.loading ? <Spinner /> : null;
        let words;

        if (this.state.semanticData) {
            words = (
                <div>
                    <SemanticWords words={this.state.semanticData} unfoundWord={this.state.unfoundWord} />
                </div>
            );
        }

        if (this.state.error && this.state.emptyArry) {
            words = <h3>Network Error. Please check the url.</h3>
        }

        if (this.state.unfoundWord) {
            words = <p>Text was not found.</p>
        }

        return (
            <div>
                <div>
                    <h2 style={{ textAlign: 'center', color: '#00B4CC' }}>SEMANTICALLY SIMILAR WORDS</h2>
                </div>
                <div className={styles.SearchFields}>
                    {wordInput}
                    <h2 style={{ color: '#595959' }}>{this.state.showWords}</h2>
                    {loading}
                    {this.state.showWords !== '' ? words : <p>Input field is empty.</p>}
                </div>
            </div>
        );
    }
}

export default SearchFields;