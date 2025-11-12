import { useState } from "react";
import { Link } from "react-router-dom";
import { limitWords } from "../services/bookService";


async function getData(jsonUrl) {
  try{
    const response = await fetch(jsonUrl);
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  }catch(error){
    console.error(error.message);
  }
}

const ReadingListPage = () => {
  const penguin = "https://wincyysh.github.io/book-static-api/data/penguin.json";
  const goodreads = "https://wincyysh.github.io/book-static-api/data/goodreads.json";
  const nytimes = "https://wincyysh.github.io/book-static-api/data/nytimes.json";
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);
  const handleClick = async (jsonUrl)=>{
    const data = await getData(jsonUrl);
    if(!data){
      setError(`Failed to load the reading list: ${error}`);
      setBooks(null);
      return;
    }
    setBooks(data);
    setError(null);
  };

  return(
    <div className="publisher">
      <div id="publisher-title">
        <h2> Curious about what publishers recommend? </h2>
        <p>
          Here, you can explore collections of books curated by different publishers. <br/>
          Each list reflects their unique vision — from timeless classics to new discoveries. <br/>
          Click a publisher to see their featured titles and start your reading journey.<br/>
        </p>
      </div>
      <div className="button">
        <div>
          <button onClick={()=>handleClick(nytimes)}>nytimes</button>
          <button onClick={()=>handleClick(penguin)}>penguin</button>
          <button onClick={()=>handleClick(goodreads)}>goodreads</button>
        </div>       
      </div>

      
      {error && <p className="errors">{error}</p>}
      { books && books.length > 0 && (
        <div className="book-list">
        {books.map((book)=>(
          <div className="book-card">
            <div className="book-info">
              <div className="book-title">
                <h2>{book.title}</h2>
              </div>
              <div className="book-authors">
                <h6>{book.authors}</h6>                
              </div>
              <div className="book-description">
                <p>{limitWords(book.description, 50)}</p>
              </div>
            </div>
            <div className="book-img">
              <a href={book.link} target="_blank" rel="noreferrer">
                {book.cover ? (<img src={book.cover}/>
              ) : (
              <img className="book-cover-placeholder-thumbnail" src="https://placehold.co/295x400?text=No+Image+Available" />
              )}
              </a>
            </div>            

          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingListPage;