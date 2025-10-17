import { useState } from "react";

export async function fetchGoogleBookApi(searchType, para) {
  // async function fetchGoogleBookApi(searchType, para) {
  const basicUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  const url = basicUrl + searchType + para;
  // console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch operation failed ", error);
    return null;
  }
}

export function limitWords(text, wordLimit) {
  if (!text || typeof(text) !== "string") return "No description of the book";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + " ... "
    : text;
}

export async function handleSearch (e, searchType, searchInput, setError, setBooks){
  e.preventDefault();
  const query = searchInput.trim();
  if (!searchType){
    setError("Please select a type!")
    return;
  }
  else if (!query){
    setError("Search cannot be empty!");
    return;
  }
  try{
    const result = await fetchGoogleBookApi(searchType, query);
    if(!result || !result.items){
      setBooks(null);
      setError("Cannot find the Book or author in Google books API.");
    }else{
      setBooks(result.items);
      setError(null);
    }
    
  }catch(error){
    console.error("There is an error: ", error);
    setBooks(null);
    setError(error);
  }

}
