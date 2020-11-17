import React, { useState, useEffect} from 'react';
import AppRouter from "components/Router";
import {authService} from 'fbase';


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
 
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      setInit(true)
    });
  }, [])
  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj( {
      displayName:user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)});
  }
  
  return (
    <>
    {init ? (
      <AppRouter 
        refreshUser = {refreshUser} 
        isLoggedIn ={Boolean(userObj)} 
        userObj={userObj}
      />) : "Initializing..."}
      <footer style ={{textAlign:"center", margin: '30px 0'}}>
        &copy; YunHo made this for practice. haha Thanks to Nomad Coder. {new Date().getFullYear()}
      </footer>    
    </>
  )
  
}

export default App;
