
import React from 'react';

interface SearchResult {
  name: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="search-results absolute w-full mt-2 bg-white border rounded shadow-lg z-10">
      <h3 className="font-bold mb-2 p-2 border-b">Search Results:</h3>
      <ul>
        {results.map((item, index) => (
          <li key={index} className="p-2 hover:bg-gray-100">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
