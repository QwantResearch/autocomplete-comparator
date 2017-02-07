import React, { Component } from 'react';
import AutocompletesConfig from '../containers/AutocompletesConfig'
import AutocompleteComparator from '../containers/AutocompleteComparator'
import Navbar from '../components/Navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <AutocompletesConfig />
            <AutocompleteComparator />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
