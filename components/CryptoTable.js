import React, { Component } from 'react';
import CryptoRows from './CryptoRows';
import getAllTickers from '@/lib/coinmarketcap';
import sortStringData from '../helpers/sortStringData';
import sortNumberData from '../helpers/sortNumberData';
import PropTypes from 'prop-types';

class CryptoTable extends Component {
  state = {
    tickers: []
  };

  async componentDidMount() {
    const tickers = await getAllTickers();

    this.setState({
      tickers: tickers
    });
  }

  sortStringData = (event) => {
    const { tickers } = this.state;
    const headerName = event.target.value;
    let sortedTickers;

    if (event.target.checked === true) {
      sortedTickers = tickers.sort(sortStringData(headerName));
    } else {
      // sort column descending on second click
      sortedTickers = tickers.sort(sortStringData(headerName, 'desc'));
    }

    this.setState({
      tickers: sortedTickers
    });
  };

  sortNumberData = (event) => {
    const { tickers } = this.state;
    const headerName = event.target.value;
    let sortedTickers;

    if (event.target.checked === true) {
      sortedTickers = sortNumberData(tickers, headerName);
    } else {
      // sort the columb smallest to largest on second click
      sortedTickers = sortNumberData(tickers, headerName).reverse();
    }

    this.setState({
      tickers: sortedTickers
    });
  };

  render() {
    const { tickers } = this.state;
    const { sortStringData, sortNumberData } = this;
    const {
      searchTerm,
      handleChosenCryptoName,
      handleChosenCryptoSymbol
    } = this.props;

    return tickers.length === 0 ? (
      <h1 className="text-gray-600 dark:text-gray-400 text-xl text-center p-20">
        ...Loading
      </h1>
    ) : (
      <div className="w-full flex justify-start md:justify-center lg:justify-center xl:justify-center px-2 mt-2 pb-10 overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr className="rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
              <th className="px-4 py-2 bg-gray-200 dark:bg-gray-800">
                <label className="">
                  #
                  {/* <br />
                  <i className="material-icons crypto-table__sorting-arrows rotate-90">
                    compare_arrows
                  </i>
                  <input
                    type="checkbox"
                    className="crypto-table__checkbox"
                    value="rank"
                    onClick={sortNumberData}
                  /> */}
                </label>
              </th>
              {/* <th className="px-4 py-2 bg-gray-200 dark:bg-gray-800">
                <label className="crypto-table__header-text">
                  NAME
                  <br />
                  <i className="material-icons crypto-table__sorting-arrows rotate-90">
                    compare_arrows
                  </i>
                  <input
                    type="checkbox"
                    className="crypto-table__checkbox"
                    value="name"
                    onClick={sortStringData}
                  />
                </label>
              </th> */}
              <th className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hidden sm:block md:block lg:block xl:block">
                <label className="">NAME</label>
              </th>
              <th className="px-4 py-2 bg-gray-200 dark:bg-gray-800">
                <label className="">
                  SYMBOL
                  {/* <br />
                  <i className="material-icons crypto-table__sorting-arrows rotate-90">
                    compare_arrows
                  </i>
                  <input
                    type="checkbox"
                    className="crypto-table__checkbox"
                    value="symbol"
                    onClick={sortStringData}
                  /> */}
                </label>
              </th>
              <th className="px-4 py-2 bg-gray-200 dark:bg-gray-800">
                <label className="">
                  PRICE
                  {/* <br />
                  <i className="material-icons crypto-table__sorting-arrows rotate-90">
                    compare_arrows
                  </i>
                  <input
                    type="checkbox"
                    className="crypto-table__checkbox"
                    value="price_usd"
                    onClick={sortNumberData}
                  /> */}
                </label>
              </th>
              <th className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hidden sm:block md:block lg:block xl:block">
                <label className="">
                  MARKET CAP
                  {/* <br />
                  <i className="material-icons crypto-table__sorting-arrows rotate-90">
                    compare_arrows
                  </i>
                  <input
                    type="checkbox"
                    className="crypto-table__checkbox"
                    value="market_cap_usd"
                    onClick={sortNumberData}
                  /> */}
                </label>
              </th>
              <th className="px-4 py-2 bg-gray-200 dark:bg-gray-800">
                <label className="">
                  CHANGE
                  {/* <br />
                  <i className="material-icons crypto-table__sorting-arrows rotate-90">
                    compare_arrows
                  </i>
                  <input
                    type="checkbox"
                    className="crypto-table__checkbox"
                    value="percent_change_24h"
                    onClick={sortNumberData}
                  /> */}
                </label>
              </th>
            </tr>
          </thead>

          <tbody className="text-sm font-normal text-gray-600 dark:text-gray-400">
            <CryptoRows
              tickers={tickers}
              searchTerm={searchTerm}
              handleChosenCryptoName={handleChosenCryptoName}
              handleChosenCryptoSymbol={handleChosenCryptoSymbol}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

CryptoTable.propTypes = {
  searchTerm: PropTypes.string,
  handleChosenCryptoSymbol: PropTypes.func,
  handleChosenCryptoName: PropTypes.func
};

export default CryptoTable;
