import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="publishers">
      <button onClick={()=>handleClick(penguin)}>publishers penguin</button>
      {error && <p>{error}</p>}
      { books && books.length > 0 && (
        <div className="book-list">
        {books.map(
          (book)=>(
            <div id="book">
              <h2>{book.title}</h2>
              <a href={book.link} target="_blank" rel="noreferrer">
                {book.cover?(<img src={book.cover}/>) : (<img className="book-cover-placeholder-thumbnail" src={'/book.svg'} />)}
              </a>
              <h6>{book.authors}</h6>
              <p>{book.description}</p>
            </div>
          )
        )}
        </div>
      )}
    </div>
  );
};

export default ReadingListPage;