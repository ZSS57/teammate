

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Set up Supabase client
const supabaseUrl = 'https://flvbyhxdhiqyqqqmbsgf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdmJ5aHhkaGlxeXFxcW1ic2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NzY1MzIsImV4cCI6MjA0NjI1MjUzMn0.Ltx8x9s0MBK2TnHEQmpJP-Er6vPQOldI5vywqOXDP-U';
const supabase = createClient(supabaseUrl, supabaseKey);

// Main App Component
const App = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [newCrewmate, setNewCrewmate] = useState({ name: '', school: '', color: '' });

  useEffect(() => {
    fetchCrewmates();
  }, []);

  // Fetch crewmates from Supabase
  async function fetchCrewmates() {
    const { data, error } = await supabase.from('crewmates').select('*');
    if (error) {
      console.error('Error fetching crewmates:', error);
    } else {
      setCrewmates(data);
    }
  }

  // Add or update crewmate
  async function addCrewmate() {
    if (!newCrewmate.name || !newCrewmate.school || !newCrewmate.color) {
      alert('Please fill out all fields before creating or updating a team.');
      return;
    }

    if (newCrewmate.id) {
      await updateCrewmate(newCrewmate);
    } else {
      const { data, error } = await supabase.from('crewmates').insert([newCrewmate]);
      if (error) {
        console.error('Error adding team:', error);
        alert('Failed to create a team. Please try again.');
      } else {
        alert('Team created successfully!');
        fetchCrewmates();
        setNewCrewmate({ name: '', school: '', color: '' });
      }
    }
  }

  // Update crewmate
  async function updateCrewmate(updatedCrewmate) {
    const { error } = await supabase
      .from('crewmates')
      .update(updatedCrewmate)
      .eq('id', updatedCrewmate.id);
    if (error) {
      console.error('Error updating team:', error);
    } else {
      alert('Team updated successfully!');
      fetchCrewmates();
      setNewCrewmate({ name: '', school: '', color: '' });
    }
  }

  // Delete crewmate
  async function deleteCrewmate(id) {
    const { error } = await supabase.from('crewmates').delete().eq('id', id);
    if (error) {
      console.error('Error deleting Team:', error);
    } else {
      setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
      alert('Team deleted successfully!');
    }
  }

  return (
    <Router>
      <div>
        <nav className="button-group">
          <Link to="/">Home</Link>
          <Link to="/create">Create a Team!</Link>
          <Link to="/gallery">Team Gallery</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={
              <CreateCrewmate
                newCrewmate={newCrewmate}
                setNewCrewmate={setNewCrewmate}
                addCrewmate={addCrewmate}
                crewmates={crewmates}
                isEditing={false}
              />
            }
          />
          <Route
            path="/create/:id"
            element={
              <CreateCrewmate
                newCrewmate={newCrewmate}
                setNewCrewmate={setNewCrewmate}
                addCrewmate={addCrewmate}
                crewmates={crewmates}
                isEditing={true}
              />
            }
          />
          <Route path="/gallery" element={<Gallery crewmates={crewmates} deleteCrewmate={deleteCrewmate} />} />
          <Route path="/team/:id" element={<TeamDetails crewmates={crewmates} />} />
        </Routes>
      </div>
    </Router>
  );
};

// Home Component
const Home = () => (
  <div>
    <h1>Welcome to the Teammate Creator</h1>
    <img src="./badminton_gym.jpg" alt="Badminton in Gym" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
  </div>
);

// Create or Edit Crewmate Component
const CreateCrewmate = ({ newCrewmate, setNewCrewmate, addCrewmate, crewmates, isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing && id) {
      const crewmateToEdit = crewmates.find((c) => c.id === parseInt(id, 10));
      if (crewmateToEdit) {
        setNewCrewmate(crewmateToEdit);
      }
    } else {
      // Reset form when creating a new crewmate
      setNewCrewmate({ name: '', school: '', color: '' });
    }
  }, [id, isEditing, crewmates, setNewCrewmate]);



  return (
    <div>
      <h1>{isEditing ? 'Edit Crewmate' : 'Create a New Crewmate'}</h1>
      <input
        type="text"
        placeholder="Name"
        value={newCrewmate.name || ''}
        onChange={(e) => setNewCrewmate({ ...newCrewmate, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="School"
        value={newCrewmate.school || ''}
        onChange={(e) => setNewCrewmate({ ...newCrewmate, school: e.target.value })}
      />
      <select
        value={newCrewmate.color || ''}
        onChange={(e) => setNewCrewmate({ ...newCrewmate, color: e.target.value })}
      >
        <option value="">Select Color</option>
        <option value="Red">Red</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
        <option value="Purple">Purple</option>
        <option value="Yellow">Yellow</option>
        <option value="Orange">Orange</option>
        <option value="Pink">Pink</option>
        <option value="Rainbow">Rainbow</option>
      </select>
      <button
        onClick={() => {
          addCrewmate();
          navigate('/gallery'); // Navigate back to the gallery after adding/updating
        }}
      >
        {isEditing ? 'Update Crewmate' : 'Create Crewmate'}
      </button>
    </div>
  );
};

// Gallery Component
const Gallery = ({ crewmates, deleteCrewmate }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Crewmate Gallery</h1>
      <div className="gallery-container">
        {crewmates.length === 0 ? (
          <p>No crewmates yet. Create one!</p>
        ) : (
          crewmates.map((crewmate) => (
            <div key={crewmate.id} className="team-container">
              <h3>{crewmate.name}</h3>
              <p>School: {crewmate.school}</p>
              <p>Color: {crewmate.color}</p>
              <Link to={`/team/${crewmate.id}`}>View Details</Link>
              {/* Updated Edit Button */}
              <button
                onClick={() => {
                  navigate(`/create/${crewmate.id}`);
                }}
                className="edit-button"
              >
                Edit
              </button>
              <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// TeamDetails Component
const TeamDetails = ({ crewmates }) => {
  const { id } = useParams();
  const crewmate = crewmates.find((c) => c.id === parseInt(id, 10));

  if (!crewmate) return <p>Team not found</p>;

  return (
    <div>
      <h1>Team Name: {crewmate.name}</h1>
      <p>School: {crewmate.school}</p>
      <p>Color: {crewmate.color}</p>
      <p>Wow, this team is from {crewmate.school}, let us look forward to their performance!</p>
      <Link to="/gallery">Back to Gallery</Link>
    </div>
  );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
