import { useState, useEffect } from 'react';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../utils/db';
import { Link, useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { EditForm } from '../components/EditForm';

const ContactDetail = () => {
  const [contact, setContact] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch contact details from Firestore when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      const contactDocRef = doc(db, "contacts", id);
      const contactSnapshot = await getDoc(contactDocRef);
      if (contactSnapshot.exists()) {
        setContact({ ...contactSnapshot.data(), id: contactSnapshot.id });
      } else {
        alert('Contact not found');
        console.error("No such document!");
      }
    };
    fetchContact();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const confirmDelete = "Are you sure you want to delete this contact?";
    if (confirm(confirmDelete)) {
      try {
        const contactDocRef = doc(db, "contacts", id);
        await deleteDoc(contactDocRef);
        alert("Contact deleted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error deleting contact: ", error);
        alert("Failed to delete contact. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (formData) => {
    try {
      const contactDocRef = doc(db, "contacts", id);
      await updateDoc(contactDocRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      });
      setContact(formData); // Update local state
      setIsEditing(false);
      alert('Contact updated successfully!');
    } catch (error) {
      console.error("Error updating contact: ", error);
      alert("Failed to update contact. Please try again.");
    }
  };

  return (
    <div className="contact-detail">
      {!isEditing ? (
        // View Mode
        <>
          <h1>{`${contact.lastName}, ${contact.firstName}`}</h1>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <div className="button-group">
            <button onClick={handleEdit} className="edit-btn">Edit</button>
            <button onClick={handleDelete}>Delete Contact</button>
            <Link to="/" className="back-link">Back to Contacts</Link>
          </div>
        </>
      ) : (
        // Edit Mode - Use EditForm component
        <EditForm 
          contact={contact}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default ContactDetail;