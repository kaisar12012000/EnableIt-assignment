import React, { useEffect, useState } from 'react';
import './App.css';

const API_ENDPOINT: string = "https://give-me-users-forever.vercel.app/api/users/:pageId/next";

function App() {
  const [users, setUsers] = useState([]);
  const [pageId, setPageId] = useState("0");
  const [isLoading, setIsLoading] = useState(false)

  const getUsers = async (id: string) => {
    setIsLoading(true)
    const url: string = API_ENDPOINT.replace(":pageId", id);

    await fetch(url).then(res => res.json()).then(resData => {
      setUsers(resData?.users);
      setIsLoading(false)
    });

  }

  useEffect(() => {
    getUsers(pageId);
    // console.log(users)
  }, [pageId])

  return (
    <div className="App">
      <div className='App-header'>
        <div className='header'>
          <button className={pageId === "0" ? "btn-disabled" : 'btn-active'} onClick={() => setPageId(state => (parseInt(state) > 0) ? ""+(parseInt(state) - 1) : "0")}>Prev</button>
          <button className='btn-active' onClick={() => setPageId(state => ""+(parseInt(state) + 1))}>Next</button>
          {/* {pageId} */}
        </div>
        <center>
          <h3>
            Page no: {parseInt(pageId) + 1}
          </h3>
        </center>
        {isLoading ? <center>
          <div className='loader'>
            <span id="dot1" className='dot'></span>
            <span id="dot2" className='dot'></span>
            <span id="dot3" className='dot'></span>
            <span id="dot4" className='dot'></span>
          </div>
        </center> : <div className='users'>
          {users.map(user => {
            const {ID, JobTitle, EmailAddress, FirstNameLastName, Email, Phone, Company} = user;
            return (
              <div className='user'>
                <p className='data'>ID: {ID}</p>
                <p className='data'>Name: {FirstNameLastName}</p>
                <p className='data'>Company Name: {Company}</p>
                <p className='data'>Position: {JobTitle}</p>
                <p className='data'>Email Address: {EmailAddress}</p>
                <p className='data'>Email: {Email}</p>
                <p className='data'>Phone Number: {Phone}</p>
              </div>
            )
          })}
        </div>}
      </div>
    </div>
  );
}

export default App;
