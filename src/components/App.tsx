import Sidebar from './Sidebar'
import Chat from './Chat'
import axios from 'axios'

import { useEffect, useState } from 'react'

function App() {
  const [chatData, setChatData] = useState<any[]>([]);
  useEffect(() => {
    axios.get('http://localhost:5453/chats').then((res) => {
      setChatData(res.data)
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <Chat data={chatData}/>
    </div>
  )
}

export default App
