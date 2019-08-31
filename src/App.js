import React, { Component } from 'react';

import './App.css';
import Layout from './containers/Layout/Layout';
import SearchFields from './containers/SearchFields/SearchFields';

class App extends Component {  
  render() {
    return (
      <div className="App">
        <Layout>
          <SearchFields />
        </Layout>
      </div>
    );
  }
}

export default App;
