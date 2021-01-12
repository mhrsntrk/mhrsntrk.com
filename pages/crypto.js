import React, { Component } from 'react';
import SearchBar from '@/components/SearchBar';
import CryptoTable from '@/components/CryptoTable';
import Container from '@/components/Container';

class Crypto extends Component {
  state = {
    searchTerm: '',
    chosenCryptoName: 'Bitcoin',
    chosenCryptoSymbol: 'BTC'
  };

  // the term entered into 'searchBar' component
  handleSearchTerm = (searchTerm) => {
    this.setState({ searchTerm: searchTerm });
  };

  // when 'news' arrow is clicked for a crypto asset, change 'chosenCryptoName' state
  handleChosenCryptoName = (chosenCryptoName) => {
    this.setState({ chosenCryptoName: chosenCryptoName });
  };

  // when 'news' arrow is clicked for a crypto asset, change 'chosenCryptoSymbol' state
  handleChosenCryptoSymbol = (chosenCryptoSymbol) => {
    this.setState({ chosenCryptoSymbol: chosenCryptoSymbol });
  };

  render() {
    return (
      <Container>
        <SearchBar
          searchTerm={this.state.searchTerm}
          handleSearchTerm={this.handleSearchTerm}
        />
        <CryptoTable
          searchTerm={this.state.searchTerm}
          handleChosenCryptoName={this.handleChosenCryptoName}
          handleChosenCryptoSymbol={this.handleChosenCryptoSymbol}
        />
      </Container>
    );
  }
}

export default Crypto;
