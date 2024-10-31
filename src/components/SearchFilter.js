import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    className="border border-gray-300 p-2 rounded w-full"
    placeholder="Search Cameras..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
  />
);

export default SearchFilter;
