import { useState } from "react";
import { limitWords, handleSearch } from "../services/bookService";
/**
 * Handle users book search requirement
 * and turn string into machine reable query parameter
 * @name App = () =>
 * @param {Type} searchInput, setSearchInput - book name input from user
 * @param {Type} books, setBooks - get an array of books user request
 * @param {Type} error, setError - error message if fail to find books or fetch api
 * @returns {innerHTML} form ask user book name
 * @returns {HTML} display search result
 */
const SearchPage = () => {
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [books, setBooks] = useState(null);

  return(
    <div id="search-container">
      <div id="search-tips">
        <h2> Advanced Search </h2>
      </div>

      <div id="search-bar">
        <form onSubmit={ (e)=> handleSearch(e, searchType, searchInput, setError, setBooks) }>
          <select
            id="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="intitle:">title</option>
            <option value="inauthor:">author</option>
            <option value="isbn:">isbn</option>
            <option value="subject:">subject</option>
            <option value="inpublisher:">publisher</option>
          </select>
          <input
            type="search"
            id="searchInput"
            placeholder="Books, Authors, ISBN ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="errors">
        {error && <p>{error}</p>}
      </div>
      {books && books.length > 0 && (
        <div className="book-list">
        {books.map((book)=>(
          <div className="book" key={book.id}>
            <div className="book-column">
              <div className="book-title">
                <h2>{book.volumeInfo.title}</h2>
              </div>
              <div className="book-authors">
                <h6>{book.volumeInfo.authors? (book.volumeInfo.authors) : ("No authors")}</h6>
              </div>
              <div className="book-description">
                <p>{limitWords(book.volumeInfo.description, 40)}</p>
              </div>
            </div>                        
            <div className="book-img">
              {book.volumeInfo.imageLinks?.thumbnail?(
                <img src={book.volumeInfo.imageLinks.thumbnail} />
              ) : (
                <img className="book-cover-placeholder-thumbnail" src={'/book.svg'} />
              )}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;