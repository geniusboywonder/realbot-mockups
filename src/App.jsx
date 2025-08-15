import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RealBotPolished from './mockups/RealBotArmy-polishedUI.jsx';
import RealBotWireframe from './mockups/RealBotArmy-ReactWireframe.jsx';
import ModularApp from './components/ModularApp.jsx';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee', fontSize: '14px' }}>
        <Link to="/" className="hover:text-blue-300">Home</Link> |{' '}
        <Link to="/polished" className="hover:text-blue-300">Polished</Link> |{' '}
        <Link to="/wireframe" className="hover:text-blue-300">Wireframe</Link> |{' '}
        <Link to="/modular" className="hover:text-blue-300">Modular</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">RealBot Army UI Mockups</h1>
            <p className="text-gray-600 mb-6">Select a mockup from the navigation above to view.</p>
            <div className="grid grid-cols-1 gap-4">
              <Link to="/polished" className="p-4 border border-gray-300 rounded hover:bg-gray-50">Polished UI (Original)</Link>
              <Link to="/wireframe" className="p-4 border border-gray-300 rounded hover:bg-gray-50">Wireframe</Link>
              <Link to="/modular" className="p-4 border border-gray-300 rounded hover:bg-gray-50">Modular UI (New)</Link>
            </div>
          </div>
        } />
        <Route path="/polished" element={<RealBotPolished />} />
        <Route path="/wireframe" element={<RealBotWireframe />} />
        <Route path="/modular" element={<ModularApp />} />
      </Routes>
    </Router>
  );
}

export default App;
