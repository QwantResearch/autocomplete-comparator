import React, { Component } from 'react';
import AutocompleteComparator from '../containers/AutocompleteComparator'
import Navbar from '../components/Navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <AutocompleteComparator />
      </div>
    );
  }
}

export default App;
