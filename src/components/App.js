import React, { useState, useEffect } from "react";
import Header from "./Header";
import { v4 as uuid } from "uuid";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import './App.css';
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? 
    []);

    const addContactHandler = (contact) => {
      console.log(contact);
      setContacts([...contacts, { id: uuid(), ...contact }]);
    };     

  
    const removeContactHandler = (id) => {  
      const newContactList = contacts.filter((contact) => { 
        return contact.id !== id;
      });
      setContacts(newContactList);
    };

  useEffect(() => {
     const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
     if (retriveContacts) setContacts(retriveContacts);     

   }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route path= "/" exact
          render={(props) => <ContactList {...props} contacts={contacts} getContactId={removeContactHandler}/> }
          />
          <Route path= "/add" 
          render={(props) => <AddContact {...props} addContactHandler= {addContactHandler} /> }
        />

          <Route path="/contact/:id" component={ContactDetail} />
        </Switch> 
      </Router>
      
          
    </div>
  );
}

export default App;

