
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';



// Set up Supabase client
const supabaseUrl = 'https://flvbyhxdhiqyqqqmbsgf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdmJ5aHhkaGlxeXFxcW1ic2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NzY1MzIsImV4cCI6MjA0NjI1MjUzMn0.Ltx8x9s0MBK2TnHEQmpJP-Er6vPQOldI5vywqOXDP-U';
const supabase = createClient(supabaseUrl, supabaseKey);

// // App component
// const App = () => {

//   const [crewmates, setCrewmates] = useState([]);
//   const [newCrewmate, setNewCrewmate] = useState({ name: '', school: '', color: '' });
//   const [view, setView] = useState('home');

//   useEffect(() => {
//     fetchCrewmates();
//   }, []);

//   // Fetch crewmates from Supabase
//   async function fetchCrewmates() {
//     const { data, error } = await supabase.from('crewmates').select('*');
//     if (error) {
//       console.error('Error fetching crewmates:', error);
//     } else {
//       setCrewmates(data);
//     }
//   }

//   // Add new crewmate
//   async function addCrewmate() {
//     if (!newCrewmate.name || !newCrewmate.school || !newCrewmate.color) {
//       alert('Please fill out all fields before creating a team.');
//       return;
//     }

//     if (newCrewmate.id) {
//       await updateCrewmate(newCrewmate);
//       setView('gallery');
//       return;
//     }

//     const { data, error } = await supabase.from('crewmates').insert([{
//       name: newCrewmate.name,
//       school: newCrewmate.school,
//       color: newCrewmate.color
//     }]);
//     if (error) {
//       console.error('Error adding team:', error);
//       alert('Failed to create a team. Please try again.');
//     } else {
//       alert('Team created successfully!');
//       fetchCrewmates();
//       setNewCrewmate({ name: '', school: '', color: '' });
//     }
//   }

//   // Update crewmate
//   async function updateCrewmate(updatedCrewmate) {
//     const { error } = await supabase
//       .from('crewmates')
//       .update(updatedCrewmate)
//       .eq('id', updatedCrewmate.id);
//     if (error) {
//       console.error('Error updating team:', error);
//     } else {
//       fetchCrewmates();
//       alert('Team updated successfully!');
//       setNewCrewmate({ name: '', school: '', color: '' });


//     }
//   }

//   // Delete crewmate
//   async function deleteCrewmate(id) {
//     const { error } = await supabase.from('crewmates').delete().eq('id', id);
//     if (error) {
//       console.error('Error deleting Team:', error);
//     } else {
//       setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
//       alert('Team deleted successfully!');

//     }
//   }

//   // Render different views
//   function renderHome() {
//     return (
//       <div>
//         <h1>Welcome to the Teammate Creator</h1>
//         <img src='./badminton_gym.jpg' alt="Badminton in Gym" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
//         <div className="button-group">
//           <button onClick={() => setView('home')}>Home</button>
//           <button onClick={() => setView('create')}>Create a Team!</button>
//           <button onClick={() => setView('gallery')}>Team Gallery</button>
//         </div>
//       </div>
//     );
//   }

//   function renderCreate() {
//     return (
//       <div>
//         <h1>Create a New Crewmate</h1>
//         <div className="button-group">
//           <button onClick={() => setView('home')}>Home</button>
//           <button onClick={() => setView('create')}>Create a Team!</button>
//           <button onClick={() => setView('gallery')}>Team Gallery</button>
//         </div>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newCrewmate.name}
//           onChange={(e) => setNewCrewmate({ ...newCrewmate, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="School"
//           value={newCrewmate.school}
//           onChange={(e) => setNewCrewmate({ ...newCrewmate, school: e.target.value })}
//         />
//         <select
//           value={newCrewmate.color}
//           onChange={(e) => setNewCrewmate({ ...newCrewmate, color: e.target.value })}
//         >
//           <option value="">Select Color</option>
//           <option value="Red">Red</option>
//           <option value="Green">Green</option>
//           <option value="Blue">Blue</option>
//           <option value="Purple">Purple</option>
//           <option value="Yellow">Yellow</option>
//           <option value="Orange">Orange</option>
//           <option value="Pink">Pink</option>
//           <option value="Rainbow">Rainbow</option>
//         </select>
//         <button onClick={addCrewmate}>Create Crewmate</button>
//       </div>
//     );
//   }

//   function renderGallery() {
//     return (
//       <div>
//         <h1>Crewmate Gallery</h1>
//         <div className="button-group">
//           <button onClick={() => setView('home')}>Home</button>
//           <button onClick={() => setView('create')}>Create a Team!</button>
//           <button onClick={() => setView('gallery')}>Team Gallery</button>
//         </div>
//         <div className="gallery-container">
//         {crewmates.length === 0 ? (
//           <p>No crewmates yet. Create one!</p>
//         ) : (
//           crewmates.map((crewmate) => (
//             <div key={crewmate.id} className="team-container">
//               <h3>{crewmate.name}</h3>
//               <p>School: {crewmate.school} </p>
//               <p>Color: {crewmate.color}</p>
//               <button onClick={() => { setNewCrewmate(crewmate); setView('create'); }}>Edit</button>
//               <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>

//     );
//   }

//   return (
//     <div>
//       {view === 'home' && renderHome()}
//       {view === 'create' && renderCreate()}
//       {view === 'gallery' && renderGallery()}
//     </div>
//   );
// }

// // Render App
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// export default App;


// App component
const App = () => {

  const [crewmates, setCrewmates] = useState([]);
  const [newCrewmate, setNewCrewmate] = useState({ name: '', school: '', color: '' });
  const [view, setView] = useState('home');
  const [selectedCrewmate, setSelectedCrewmate] = useState(null); // Added state for selected crewmate

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

  // Add new crewmate
  async function addCrewmate() {
    if (!newCrewmate.name || !newCrewmate.school || !newCrewmate.color) {
      alert('Please fill out all fields before creating a team.');
      return;
    }

    if (newCrewmate.id) {
      await updateCrewmate(newCrewmate);
      setView('gallery');
      return;
    }

    const { data, error } = await supabase.from('crewmates').insert([{
      name: newCrewmate.name,
      school: newCrewmate.school,
      color: newCrewmate.color
    }]);
    if (error) {
      console.error('Error adding team:', error);
      alert('Failed to create a team. Please try again.');
    } else {
      alert('Team created successfully!');
      fetchCrewmates();
      setNewCrewmate({ name: '', school: '', color: '' });
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
      fetchCrewmates();
      alert('Team updated successfully!');
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

  // Render different views
  function renderHome() {
    return (
      <div>
        <h1>Welcome to the Teammate Creator</h1>
        <img src='./badminton_gym.jpg' alt="Badminton in Gym" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        <div className="button-group">
          <button onClick={() => setView('home')}>Home</button>
          <button onClick={() => setView('create')}>Create a Team!</button>
          <button onClick={() => setView('gallery')}>Team Gallery</button>
        </div>
      </div>
    );
  }

  function renderCreate() {
    return (
      <div>
        <h1>Create a New Crewmate</h1>
        <div className="button-group">
          <button onClick={() => setView('home')}>Home</button>
          <button onClick={() => setView('create')}>Create a Team!</button>
          <button onClick={() => setView('gallery')}>Team Gallery</button>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={newCrewmate.name}
          onChange={(e) => setNewCrewmate({ ...newCrewmate, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="School"
          value={newCrewmate.school}
          onChange={(e) => setNewCrewmate({ ...newCrewmate, school: e.target.value })}
        />
        <select
          value={newCrewmate.color}
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
        <button onClick={addCrewmate}>Create Crewmate</button>
      </div>
    );
  }

  function renderGallery() {
    return (
      <div>
        <h1>Crewmate Gallery</h1>
        <div className="button-group">
          <button onClick={() => setView('home')}>Home</button>
          <button onClick={() => setView('create')}>Create a Team!</button>
          <button onClick={() => setView('gallery')}>Team Gallery</button>
        </div>
        <div className="gallery-container">
          {crewmates.length === 0 ? (
            <p>No crewmates yet. Create one!</p>
          ) : (
            crewmates.map((crewmate) => (
              <div
                key={crewmate.id}
                className="team-container"
                onClick={() => { setSelectedCrewmate(crewmate); setView('details'); }} // Change to set view to "details"
              >
                <h3>{crewmate.name}</h3>
                <p>School: {crewmate.school} </p>
                <p>Color: {crewmate.color}</p>
                <button onClick={(e) => { e.stopPropagation(); setNewCrewmate(crewmate); setView('create'); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); deleteCrewmate(crewmate.id); }}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Render details view
  function renderDetails() {
    if (!selectedCrewmate) return null;

    return (
      <div>
        <h1>Team Name: {selectedCrewmate.name}</h1>
        <h2>Stats:</h2>
        <p>Color: {selectedCrewmate.color}</p>
        <p>School: {selectedCrewmate.school}</p>
        {/* Add the team description */}
        <p className="team-description">
          Wow, this team is from {selectedCrewmate.school}, let us look forward to their performance!
        </p>
        <button onClick={() => setView('gallery')}>Back to Gallery</button>
      </div>
    );
  }

  return (
    <div>
      {view === 'home' && renderHome()}
      {view === 'create' && renderCreate()}
      {view === 'gallery' && renderGallery()}
      {view === 'details' && renderDetails()}
    </div>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
