import { useState } from 'react';
import { Link } from 'react-router';
import { collection, addDoc } from 'firebase/firestore';
import db from '../utils/db';
import { useNavigate } from 'react-router';

export default function AddContact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add a new contact to the Firestore collection
            const contactsCollectionRef = collection(db, "contacts");
            const docRef = await addDoc(contactsCollectionRef, formData);
            // Redirect to the new contact's detail page
            navigate(`/contact/${docRef.id}`);
        } catch (error) {
            console.error("Error adding contact: ", error);
            alert("Failed to add contact. Please try again.");
        }
    }

    return (
        <div className="form-container">
        <h2>Add New Contact</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Contact</button>
        </form>
        </div>
    )
}