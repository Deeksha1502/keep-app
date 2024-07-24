import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';
import { io } from 'socket.io-client';
import Quill from 'quill';
import html2pdf from 'html2pdf.js';

export const Editor = () => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const SAVE_DURATION_MS = 2000;

  console.log(documentId);

  useEffect(() => {
    const s = io('http://localhost:3001', {
      transports: ['websocket'],
    });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    console.log('setting up..');

    socket.once('load-document', (document) => {
      console.log('document loaded', document);

      quill.setContents(document);
      quill.enable();
      console.log('quill editor enabled');
    });
    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      const contents = quill.getContents();
      console.log('saving documents', contents);
      socket.emit('save-documents', contents);
    }, SAVE_DURATION_MS);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, SAVE_DURATION_MS]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, { theme: 'snow' });
    q.disable();
    q.setText('Loading..');
    setQuill(q);
  }, []);

  const handleSavePDF = () => {
    const saveContent = document.querySelector('.ql-editor');
    if (saveContent) {
      const opt = {
        margin: 1,
        filename: `document_${documentId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().from(saveContent).set(opt).save();
    }
  };

  return (
    <div className='editor-container'>
      <div className='container' ref={wrapperRef}></div>
      <button onClick={handleSavePDF} className='save-pdf-button'>
        Save as pdf
      </button>
    </div>
  );
};
