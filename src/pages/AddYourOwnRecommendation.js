  /* ===== AddYourOwnRecommendation.js ===== */

import { initializeApp } from "firebase/app";
import {get, getDatabase, ref, set, update } from "firebase/database";
const DisplayLive = lazy(()=>import("./DisplayLive"));
import { fetchGoogleBookApi } from "../services/bookService";
import { lazy, useState } from "react";
import { firebaseConfig } from "../firebaseConfig";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const bookDB = getDatabase(firebaseApp);

async function checkBook(e, searchInput){
  // test isbn: 9780747532699 || 978-0-7475-3269-9
  e.preventDefault();
  const result = await fetchGoogleBookApi("isbn:", searchInput);
  if(result && result?.items?.length > 0){
    // console.log("isbn is valid, sucessfully found book")
    return result?.items[0]?.volumeInfo?.title;
  }
  else{
    console.log(" This an error", result);
    return null;
  }
    
}

function readUserData(){ 
  if(bookDB){
    console.log("Accessed to database")
    return bookDB;
  }else{
    console.log("Cannot access database!")
    return null;
  }
}

// Initialize Realtime Database and get a reference to the service
async function writeUserData(isbn, bookName) {
  // console.log("write new data in book list");
  const bookDB = readUserData();
      
  try{
    const cleanISBN = isbn.replace(/[-\s]/g, "");
    const snapshot = await get(ref(bookDB, `booklist/${cleanISBN}`));
    // console.log("create snapshot success");
    if(snapshot.exists()){
      // console.log("snapshot.exists()");
      const currentData = snapshot.val();
      const currentVotes = currentData.vote || 0;
      const newVotes = currentVotes + 1;
      await update(ref(bookDB, `booklist/${cleanISBN}`), { vote: newVotes});
      // console.log("You add a vote to existing book!")
    }else{
      // console.log("else statement");
      // console.log("It is a new book not in the list!");
      await set(ref(bookDB, `booklist/${cleanISBN}`), {
        bookname: bookName,
        vote: 1
      })
      .then(()=> console.log("Thank you for your recommendation! ", bookName))
      .catch((error)=> console.log("Failed to add the book, the isbn exist ", error));
    }
  }catch(error){
    console.error("Invalid ISBN", error);
  };
}

const AddYourOwnRecommendation = () => {
  const [ searchInput, setSearchInput ] = useState("");

  return(
    <div id="add-your-own">
      <div id="recommendation-title">
        <h2>Add Your Own Recommendation</h2>
        <p>
          Show us your favorite book
        </p>
      </div>
      <div id="isbn-form">
        <form onSubmit={async (e)=> {
          const bookName = await checkBook(e, searchInput);
          if(bookName){
            // console.log(bookName);
            await writeUserData(searchInput, bookName);
          }
        }}>
          <input 
            type="text" 
            id="isbn-input" 
            placeholder=" please enter book isbn "
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
          />
          <button type="submit" id="isbn-submit">Submit</button>
        </form>
        <DisplayLive />
      </div>
    </div>
  );
}

export default AddYourOwnRecommendation;