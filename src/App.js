import './App.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';
import {useState, useEffect} from 'react';
import api from './api';
function App() {
  const [chatList, setChatList] = useState([]);//lista de pessoas com quem ja conversaste
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);//Pessoa que esta logada
  const [showNewChat, setShowNewChat] = useState(false);//Faz a lista de contatos aparecer/desaparecer
  useEffect(()=>{
    if (user !== null) {
      let unsub = api.onChatList(user, setChatList);
      return unsub;
    }
  },[user]);
  const handleNewChat = () => {
    setShowNewChat(true);
  }

  const handleLoginData = async (u) => {//Recebendo o parametro que foi passado la no Login.js
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await api.addUser(newUser);
    setUser(newUser);
  }

  if (user === null) {//Quando ninguem esta logado e null
    return (<Login onReceive={handleLoginData}/>);
  }

  return (
        <div className="app-window">
          <div className="sidebar">
          <NewChat show={showNewChat} setShow={setShowNewChat} user={user} chatlist={chatList}/>
            <header>
              <img className="header--avatar" src={user.avatar} alt=""/>

              <div className="header--buttons">
                <div className="header--btn">
                    <DonutLargeIcon style={{color: '#919191'}}/>
                </div>

                <div className="header--btn" onClick={handleNewChat}>
                    <ChatIcon style={{color: '#919191'}}/>
                </div>

                 <div className="header--btn">
                    <MoreVertIcon style={{color: '#919191'}}/>
                </div>
                
              </div>
            </header>

            <div className="search">
              <div className="search--input">
                <SearchIcon fontSize="small" style={{color: '#919191'}}/>
                <input type="search" placeholder="Procurar ou comecar uma nova conversa" />
              </div>
            </div>

             <div className="chatlist">
                {chatList.map((item, key)=>(
                    <ChatListItem key={key} active={activeChat.chatId === chatList[key].chatId} 
                    onClick={()=>setActiveChat(chatList[key])} data={item}/>
                  ))}
            </div>

          </div>

          <div className="contentarea">
            {activeChat.chatId !== undefined &&
              <ChatWindow user={user} data={activeChat}/>
            }

            {activeChat.chatId === undefined &&
              <ChatIntro />
            }
          </div>
        </div>
  );
}

export default App;
