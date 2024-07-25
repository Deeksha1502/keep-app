import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import './CreateNewDoc.css';

export const CreateNewDoc = ({ setEditorVisible }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const socket = io('http://localhost:3001', {
    transports: ['websocket'],
  });

  useEffect(() => {
    fetchDocuments();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://localhost:3001/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.log('failed to fetch docs', error);
      setIsLoading(false);
    }
  };
  const saveCurrentDocument = () => {
    const quillEditor = document.querySelector('.ql-editor');
    const documentId = window.location.pathname.split('/').pop();
    const content = quillEditor.innerHTML;

    socket.emit('save-document', { documentId, content });
  };

  const handleNewDocument = () => {
    //saveCurrentDocument();
    const newDocId = uuidv4();
    socket.emit('get-document', newDocId);
    socket.once('load-document', (document) => {
      setDocuments((prevDocs) => [...prevDocs, { _id: newDocId, data: document }]);
      const newWindow = window.open(`/documents/${newDocId}`, '_blank');
      newWindow.focus();
      setEditorVisible(true);
      navigate(`/documents/${newDocId}`);
      console.log('this is handle document');
    });
  };

  if (isLoading) {
    return <div>Loading documents...</div>;
  }
  return (
    <div className='container'>
      <h1>My document</h1>
      <button className='new-document-btn' onClick={handleNewDocument}>
        New Document
      </button>

      {documents.length === 0 ? (
        <p></p>
      ) : (
        <ul className='documents'>
          {documents.map((doc) => (
            <li key={doc._id} className='document-item'>
              <a href={`/documents/${doc._id}`} className='document-link'>
                {doc.title || 'Untitled Document'}
              </a>
              <span className='document-preview'>
                {doc.data ? doc.data.substring(0, 30) : 'empty Document'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
