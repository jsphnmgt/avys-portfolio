import { useEffect, useState } from 'react';
import ProfessionalSide from './components/ProfessionalSide/ProfessionalSide';
import PersonalSide from './components/PersonalSide/PersonalSide';

function App() {
  const [isRoomOpen, setIsRoomOpen] = useState(() => window.location.hash === '#room');

  useEffect(() => {
    const updatePage = () => setIsRoomOpen(window.location.hash === '#room');
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  useEffect(() => {
    if (isRoomOpen) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [isRoomOpen]);

  return (
    <main className="app">
      {isRoomOpen ? <PersonalSide /> : <ProfessionalSide />}
    </main>
  );
}

export default App;
