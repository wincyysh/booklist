import { initializeApp } from "firebase/app";
import { onValue, getDatabase, ref, off } from "firebase/database";
import { useState, useEffect } from "react";
import { firebaseConfig } from "../firebaseConfig";

export default function DisplayLive(){
    const [ booklist, setBooklist ] = useState({});
    const firebaseApp = initializeApp(firebaseConfig);
    const bookDB = getDatabase(firebaseApp);

    useEffect(()=>{
        try{
            const bookRef = ref(bookDB, "booklist");
            if(bookDB){
                onValue(bookRef,(snapshot)=>{
                    if(snapshot.exists()){
                        setBooklist(snapshot.val());
                    }else{
                        // console.log("snapshot not exists");
                        setBooklist({});
                    }
                });
                return()=>{
                    // console.log("Turn off realtime database");
                    off(bookRef);
                };
            }else{
                // console.log("bookDB");
                setBooklist({});
                return;
            }
        }catch(error){
            console.error(error);
        }
    }, []);

    return(
        <div id="recommendation-list">
            {Object.keys(booklist).length === 0 ? (
                <h2>Booklist is empty</h2>
            ) : (
                Object.entries(booklist).map(([isbn, book])=>(
                  <div id="recommendation">
                    <div id="recommendation-name">
                      <h4>{book.bookname}</h4>
                    </div>
                    <div id="vote">
                      <h4>{book.vote}</h4>
                    </div>
                  </div>
                ))
            )}
        </div>
    );
}