import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  handleSearchTerm = (event) => {
    const { handleSearchTerm } = this.props;
    handleSearchTerm(event.target.value);
  };

  render() {
    const { handleSearchTerm } = this;
    const { searchTerm } = this.props;

    return (
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto my-2 w-full">
        <div className="relative w-full mb-4">
          <input
            aria-label="Search crypto"
            type="text"
            value={searchTerm}
            onChange={handleSearchTerm}
            placeholder={`filter list by name/symbol`}
            className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
		  <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  handleSearchTerm: PropTypes.func
};

export default SearchBar;
