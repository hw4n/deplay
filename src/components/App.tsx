import Sidebar from './Sidebar'
import Chat from './Chat'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Settings from './Settings';

function App() {
  const [chatData, setChatData] = useState<any[]>([]);
  const [decryptionKey, setDecryptionKey] = useState<string>('');

  useEffect(() => {
    axios.get('https://dapi.hwan.me/chats').then((res) => {
      setChatData(res.data)
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Chat data={chatData} decryptionKey={decryptionKey} />} />
        <Route path="/settings" element={<Settings keySetter={setDecryptionKey} />} />
      </Routes>
    </div>
  )
}

export default App
