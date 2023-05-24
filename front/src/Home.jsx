import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
    const [ auth, setAuth ] = useState(false)
    const [ name, setName ] = useState('')
    const [ message, setMessage ] = useState('')

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
          if(res.data.Status === "Success") {
            setAuth(true);
            setName(res.data.name);
          }else{
            setMessage(res.data.Message);  
          }
        })
    }, [])

    const handleLogout = () => {
      axios.get('http://localhost:8081/logout')
      .then(res => {
        if(res.data.Status === "Success") {
          location.reload(true);
        }else {
          alert("error")
        }
      }).catch(err => console.log(err))
    }

  return (
    <div>
      {
        auth ?
        <div>
          <h3>You are Authorized *{name}*</h3>
          <Button type="primary" danger onClick={handleLogout}>
              LogOut
          </Button>
        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" type="primary">
              Login
          </Link>
        </div>
      }
    </div>
  )
}

export default Home