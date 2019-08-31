import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../components/UI/Spinner/Spinner';
import SemanticWords from '../../components/SemanticWords/SemanticWords';
import { languageCode } from '../../components/LanguageCode/languageCode';
import styles from './SearchFields.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '../../assets/searchIcon.png';

class SearchFields extends Component {

    state = {
        word: '',
        semanticData: null,
        loading: false,
        showWords: null,
        unfoundWord: false,
        error: false,
        language: languageCode
    }

    // componentDidMount() {
    //     this.setState({ word: null });
    // }

    axiosHandler = () => {
        // 'https://api.gavagai.se/v3/lexicon/en/happiness?apiKey=123ok'
        // https://api.gavagai.se/v3/lexicon/en/predict?additionalFields=SEMANTICALLY_SIMILAR_WORDS&apiKey=3acdef1f01cbceb88b132158abd466da&polarizeWord=false
        // const baseUrl = 'https://api.gavagai.se/v3';
        const word = this.state.word;
        const language = this.state.language.value;
        const endpoint = '/lexicon/' + language + '/' + word
        const apiKey = '?additionalFields=SEMANTICALLY_SIMILAR_WORDS&apiKey=3acdef1f01cbceb88b132158abd466da&polarizeWord=false';
        const url = endpoint + apiKey;

        this.setState({ loading: true, showWords: null });

        axios.get(url)
            .then(response => {
                const wordArrOne = [];
                for (let element in response.data) {
                    if (element === 'semanticallySimilarWords')
                        wordArrOne.push(response.data[element])
                }
                const wordArrTwo = wordArrOne[0];
                console.log(response.data);
                this.setState({
                    semanticData: wordArrTwo,
                    loading: false,
                    showWords: this.state.word,
                    unfoundWord: false,
                    error: false
                });

                if (response.data.semanticallySimilarWords.length === 0) {
                    this.setState({ unfoundWord: true, showWords: null });
                }
            })
            .catch(
                error => {
                    console.log(error);
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
        console.log("frR: ", this.state.language.value);
        let wordInput = (
            <div>
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
                    className={styles.SearchField}
                    type="text" placeholder="here" 
                    onChange={this.inputChangeHandler} />
                <button 
                    className={styles.SearchButton} 
                    onClick={this.axiosHandler}><FontAwesomeIcon icon={faCoffee} /></button>
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

        if (this.state.error) {
            words = <h3>Network Error. Please check the url.</h3>
        }

        return (
            <div className={styles.SearchFields}>
                {wordInput}
                <h2>{this.state.showWords}</h2>
                {loading}
                {this.state.showWords !== '' ? words : <p>Input field is empety.</p> }                
            </div>
        );
    }
}

export default SearchFields;