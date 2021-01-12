import React, { Component } from "react";
import PropTypes from "prop-types";

class CryptoRows extends Component {
  // spin the crypto symbol, and brighten the text in the row on arrow button hover
  handleArrowHover = (event) => {
    const tickerSymbol = event.target.id;
    const tickerLogo = document.getElementById(
      `crypto-rows__${tickerSymbol}-image`
    );
    const tickerRow = document.getElementById(
      `crypto-rows__${tickerSymbol}-row`
    );
  };

  render() {
    const { searchTerm, tickers } = this.props;

    let tickersToDisplay;

    // render only the tickers with a name or symbol name that match the searchTerm entered into searchBar
    if (searchTerm !== "") {
      const filteredTickers = tickers.filter(
        (ticker) =>
          `${ticker.name} ${ticker.symbol}`
            .toUpperCase()
            .indexOf(searchTerm.toUpperCase()) >= 0
      );
      tickersToDisplay = filteredTickers;
      // else render all 100 ticker rows when nothing is typed into searchBar
    } else {
      tickersToDisplay = tickers;
    }

    return tickersToDisplay.length === 0
      ? null
      : tickersToDisplay.map((ticker) => (
          <tr
            key={ticker.name}
            className="hover:bg-gray-100 border-b border-gray-200 py-10"
            id={`crypto-rows__${ticker.symbol}-row`}
          >
            <td className="px-4 py-4 text-center">{ticker.cmc_rank}</td>
            {/* <td className="px-4 py-4">
              <div className="px-4 py-4">
                <img
                  className="items-center w-10 mr-5"
                  id={`crypto-rows__${ticker.symbol}-image`}
                  src={`https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32%402x/color/${ticker.symbol.toLowerCase()}%402x.png`}
                  alt={ticker.symbol}
                />
                {ticker.name}
              </div>
            </td> */}
            <td className="px-4 py-4 text-center hidden md:block lg:block xl:block">
            {ticker.name}
            </td>
            <td className="px-4 py-4 text-center">
              {ticker.symbol}
            </td>
            <td className="px-4 py-4 text-center">
              ${ticker.quote.USD.price.toFixed(2)}
            </td>
            <td className="px-4 py-4 hidden md:block lg:block xl:block">
              ${ticker.quote.USD.market_cap.toLocaleString()}
            </td>
            {/* render % increase as green text, % decrease as red text*/}
            <td
              className={
                ticker.quote.USD.percent_change_24h < 0
                  ? "text-red-500 px-4 py-4 text-center"
                  : "text-green-500 px-4 py-4 text-center"
              }
            >
              {ticker.quote.USD.percent_change_24h.toFixed(2)}%
            </td>
          </tr>
        ));
  }
}

CryptoRows.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string,
  handleChosenCryptoName: PropTypes.func,
  handleChosenCryptoSymbol: PropTypes.func,
};

export default CryptoRows;
