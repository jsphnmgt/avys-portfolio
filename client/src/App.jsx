import { useState } from 'react';
import ProfessionalSide from './components/ProfessionalSide/ProfessionalSide';
// import PersonalRoom from './components/PersonalRoom/PersonalRoom';

function App() {
  const [mode, setMode] = useState('professional');

  return (
    <div className="app" data-mode={mode}>
      {mode === 'professional' ? (
        <ProfessionalSide />
      ) : (
        <p>Personal side coming soon</p>
        // <PersonalRoom />
      )}

      <button onClick={() => setMode(mode === 'professional' ? 'personal' : 'professional')}>
        Switch to {mode === 'professional' ? 'Personal' : 'Professional'} Mode
      </button>
    </div>
  );
}

export default App;