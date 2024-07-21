import './App.css';
// import { Body } from './components/Body/Body';
import { Editor } from './components/Editor/Editor';
import { Header } from './components/Header/Header';
import { v4 as uuidV4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <Router>
      <div>
        <Header />
        {/* <Body /> */}
        <Routes>
          <Route path='/' element={<Navigate to={`/documents/${uuidV4()}`} replace />} />

          <Route path='/documents/:id' element={<Editor />} />
        </Routes>
      </div>
    </Router>
  );
};
