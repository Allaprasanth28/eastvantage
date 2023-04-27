import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";

const UseDetails = () => {
 
  const [name, setName] = useLocalStorage({});
  const [mail, setMail] = useLocalStorage({});

  useEffect(() => {
    getProducts();
  }, []);
 const handleClick = () => {
    getProducts();
  };



  const getProducts = async () => {
    await axios.get('https://randomuser.me/api')
      .then(({ data }) => {
        setName(data.results[0].name.first + data.results[0].name.last);
        setMail(data.results[0].email);
      })

    console.log("data ehre ");
  }


  return (
    <div>
       <button className="App-header" onClick={handleClick}>
        Click me
      </button>
      <h2>Results</h2>
      <p>Name : {name} </p>
      <p>Email : {mail}</p>
    </div>

  )
};
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
export default UseDetails;