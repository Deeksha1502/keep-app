import './App.css';

import { Editor } from './components/Editor/Editor';

import { Header } from './components/Header/Header';
import { v4 as uuidV4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Sidenav } from './components/Sidenav';
import { CreateNewDoc } from './components/NewDocList/CreateNewDoc';
import { useEffect, useState } from 'react';

export const App = () => {
  const [editorVisible, setEditorVisible] = useState(true);
  const navigate = useNavigate;

  useEffect(() => {
    const handleNewDoc = (newDocId) => {
      setEditorVisible(true);
      navigate(`/documents/${newDocId}`);
    };

    window.handleNewDoc = handleNewDoc;
    return () => {
      delete window.handleNewDoc;
    };
  }, [navigate]);

  return (
    <Router>
      <div className='flex'>
        <Sidenav />

        <div className='flex-grow'>
          <Header />

          <CreateNewDoc setEditorVisible={setEditorVisible} />

          <Routes>
            <Route path='/' element={<Navigate to={`/documents/${uuidV4()}`} replace />} />

            <Route path='/documents/:id' element={<Editor />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
