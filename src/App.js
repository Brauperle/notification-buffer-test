import React, {useEffect, useState, useRef} from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import OnlineStatusMock from './OnlineStatusMock';
import './App.css';

/* 
Feel free to edit this all. If you don't need the HoC, go remove it. 
If you wish to save the state somewhere else, go for it. 
Just keep rendering <OnlineStatusMock /> 
*/


const App = () => {

  let inter = useRef("")
  let dropOffBuffer = useRef(false)

  const [isOnline, setIsOnline] = useState(false);
  const [isTrulyOnline, setIsTrulyOnline] = useState(false);

  const updateNotification = bool => {
    NotificationManager.info(bool ? 'Online' : 'Offline');
  }

  return (
    <div className={isOnline ? 'online' : 'offline'}>
      <OnlineStatusMock
        onIsOnlineChange={isOnlineRaw => {
          setIsOnline(isOnlineRaw) // instant

          // User is truly online, online is clicked
          // Nothing should happen
          // Except reset the "Offline" buffer
          if( isTrulyOnline && isOnlineRaw ) {
            dropOffBuffer.current = false
          }

          // User is truly online, offline was "clicked"
          // need to buffer to 2 seconds 
          if( isTrulyOnline && !isOnlineRaw ) {

            dropOffBuffer.current = true
            inter.current = setTimeout(() => {

              if(dropOffBuffer.current) {
                updateNotification(false)
                setIsTrulyOnline(false)
                dropOffBuffer.current = false
              }
            }, 2000)
          } 

          // User is truly offline, online was clicked 
          // need to connect immediatly
          if( !isTrulyOnline && isOnlineRaw ) {
            updateNotification(true)
            setIsTrulyOnline(true)
          }
        }}
      /> 
      {isOnline ? 'Online' : 'Offline'}
      <NotificationContainer />
    </div>
  )
}

export default App;