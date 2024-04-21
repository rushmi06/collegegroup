import React, { useRef, useState, useEffect } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { AudioRecorder } from 'react-audio-voice-recorder';
import TextMessage from './TextMessage';
import PDFMessage from './PDFMessage';
import AudioMessage from './AudioMessage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
function AdminSendFrame() {
  const [message, setMessage] = useState('');
  const messageRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  let fetchData = async ()=>{
    await axios.get('http://localhost:3030/messages').then((result) => {
      setMessages(result.data);
    })
  }
  useEffect(()=>{
    fetchData();
  },[]);
  const messageDeleted = ()=>{
    fetchData();
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPDF = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const upload = (e) => {
    setUploading(true);
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageRef = ref(storage, 'pdf/' + selectedFile.name);
      const uploadTask = uploadBytesResumable(imageRef, selectedFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.error('Error uploading image:', error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
            send('pdf', imageUrl,selectedFile.name);
            setUploading(false);
            scrollToPDF(); // Scroll to the uploaded PDF
          });
        }
      );
    } else {
      alert('Please select a PDF to upload.');
      setUploading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = async (type, body, title) => {
    if (messageRef.current && message.length === 0 && type !== 'pdf') return;
    if(!JSON.parse(localStorage.getItem('recievers'))){
      toast.error("Please set the recievers");
      return;
    }
    const newMessage = {
      type: type,
      title:title,
      body: body,
      date: (new Date()).toISOString(),
      sender: localStorage.getItem("adminEmail"),
      receivers: JSON.parse(localStorage.getItem('recievers'))
    };
    setMessages([...messages, newMessage]);
    setMessage('');
    if (messageRef.current) {
      messageRef.current.focus();
    }
    await axios.post('http://localhost:3030/messages',newMessage);
    fetchData();
  };
  

  const clear = async() => {
    await axios.delete('http://localhost:3030/messages').then((result) => {
      toast.success("Successfully deleted all messages");
    }).catch((err) => {
      toast.error("Error while deleting");
    });
    setMessages([]);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      send('text', message);
    }
  };
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    console.log(audio)
    console.log(url);
    audio.controls = true;
    document.body.appendChild(audio);
  };
  
  return (
    <div className='h-full w-full'>
    <ToastContainer />
      {!uploading && (
        <div className='h-full white w-full relative p-5 items-center flex-col gap-4 overflow-scroll pb-12'>
          {messages.map((mssg, index) => (
            <div key={index}>
              {mssg.type === 'text' && <TextMessage mssg={mssg} messageDeleted={messageDeleted}/>}
              {mssg.type === 'pdf' && <PDFMessage mssg={mssg} messageDeleted={messageDeleted}/>}
              {mssg.type === 'audio' && <AudioMessage mssg={mssg} />}
            </div>
          ))}
          <div ref={messagesEndRef} />
          <div className='fixed bottom-3 mx-auto blue w-7/12 flex items-center rounded-md justify-around'>
            <label htmlFor='hospitalGSTFile' className='hover:cursor-pointer blue text-white flex justify-center items-center rounded-md'>
              <div className='text-xl text-black'>
                <FaPaperclip />
              </div>
              <input type='file' id='hospitalGSTFile' onChange={upload} name='hospitalGSTFile' className='hidden' accept='.pdf' />
            </label>

            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={handleKeyDown}
              ref={messageRef}
              type='text'
              className='p-2 bg-transparent w-9/12 focus:outline-none'
              placeholder='Enter message'
            />
            <div className='text-xl text-black p-2'>
              <AudioRecorder 
                  onRecordingComplete={addAudioElement}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }} 
                  downloadOnSavePress={true}
                  downloadFileExtension="webm"
                />
            </div>
            <div onClick={() => send('text', message)} className='text-md hover:cursor-pointer hover:bg-white p-1 rounded-md hover:text-black'>
              SEND
            </div>
          </div>
          <div onClick={clear} className='fixed right-5 top-[12vh] bg-red-600 p-2 text-white rounded-md hover:cursor-pointer'>
            Clear Chat
          </div>
        </div>
      )}
      {uploading && <div className=''>Uploading please wait</div>}
      
    </div>
  );
}

export default AdminSendFrame;
