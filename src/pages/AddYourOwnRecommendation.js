import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { fetchGoogleBookApi } from "./SearchPage";
import { useState } from "react";
import { firebaseConfig } from "../firebaseConfig";

const AddYourOwnRecommendation = () => {

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseApp);
    console.log(analytics);
    // Initialize Realtime Database and get a reference to the service
    function writeUserData(book) {
        const bookDB = getDatabase(firebaseApp);
        set(ref(bookDB, "booklist/", book), {
            bookname: book
        })
        .then(()=> console.log("Thank you for your recommendation! ", book))
        .catch((error)=> console.log("Failed to add the book, ", error));
    }

    const [ searchInput, setSearchInput ] = useState("");

    return(
        <div id="add-your-own-recommendation">
            <div id="add-your-own--recommendation-title">
                <h1>Add Your Own Recommendation</h1>
            </div>
            <div id="isbn-form">
                <form>
                    <input 
                        type="text" 
                        id="isbn-input" 
                        placeholder=" please enter book isbn "
                        onChange={(e)=>}
                    />
                    <button id="isbn-submit">Submit</button>
                </form>
            </div>
        </div>
    );

}

export default AddYourOwnRecommendation;