import React, { useRef, useState, useEffect } from 'react';
import TextMessage from './TextMessage';
import PDFMessage from './PDFMessage';
import AudioMessage from './AudioMessage';
import axios from 'axios'
import {useParams} from 'react-router-dom'
function UserChatFrame() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [getting, setGetting] = useState(false);
  const {type} = useParams();
  useEffect(()=>{
    setGetting(true);
    let fetchData = async ()=>{
        if(type==='general'){
            await axios.get('http://localhost:3030/filteredMessages/208x1a05a0@khitguntur.ac.in').then((result) => {
              setMessages(result.data);
              setGetting(false);
            })
        }else if(type==='events'){
            await axios.get('http://localhost:3030/filteredMessagesEvents/208x1a05a0@khitguntur.ac.in').then((result) => {
              setMessages(result.data);
              setGetting(false);
            })
        }
    }
    fetchData();
  },[type]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  


  return (
    <div className='h-full w-full'>
      {!getting && (
        <div className='h-full white w-full relative p-5 items-center flex-col gap-4 overflow-scroll pb-12'>
          {messages.map((mssg, index) => (
            <div key={index}>
              {mssg.type === 'text' && <TextMessage mssg={mssg} />}
              {mssg.type === 'pdf' && <PDFMessage mssg={mssg} />}
              {mssg.type === 'audio' && <AudioMessage mssg={mssg} />}
            </div>
          ))}
        </div>
      )}
      {getting && <div className=''>getting please wait</div>}
    </div>
  );
}

export default UserChatFrame;
