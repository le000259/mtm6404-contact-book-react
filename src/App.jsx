import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../utils/db'; 
import { Link } from 'react-router';
import './App.css'

export default function App() {

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch contacts from Firestore when the component mounts
  useEffect(() => {
    const getContacts = async () => {
      // Reference to the contacts collection in Firestore
      const contactsCollectionRef = collection(db, "contacts");
      // Get all documents from the contacts collection
      const contactSnapshot = await getDocs(contactsCollectionRef);
      const contactsData = contactSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // Sort contacts alphabetically by last name
      const sortedContacts = contactsData.sort((a, b) => 
        a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
      );
      setContacts(sortedContacts);
    };
    getContacts();
  }, []);

  // Filter contacts based on search term - calculated during render
  const filteredContacts = searchTerm 
    ? contacts.filter(contact => 
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : contacts;

  return (
    <div className="App">
      <h1>Contacts Book</h1>

      {/* Search input to filter contacts */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <Link to="/add" className="create-link">Create New Contact</Link>

      {/* Display the list of contacts */}
      <div className="contacts-list">
        {filteredContacts.map((contact, index) => (
          <div key={contact.id} className="contact-item">
            <span className="contact-number">{index + 1}.</span>
            <Link to={`/contact/${contact.id}`} className="contact-link">
              {`${contact.lastName}, ${contact.firstName}`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
