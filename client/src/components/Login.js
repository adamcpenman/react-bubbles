import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const emptyForm = { 
  username: '',
  password:''
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [info, setInfo] = useState(emptyForm)

  const handleChange = e => {
    setInfo ({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post('api/login', info)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        setInfo(emptyForm)
        props.history.push('/bubbles')
      })
      .catch(error => console.log(error, "Login Error"))
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="username"
          placeholder="Username"
          value={info.username}
          onChange={handleChange}
          />
          <input 
          type="password"
          name="password"
          placeholder="Password"
          value={info.password}
          onChange={handleChange}
          />
          <button type="submit">Login</button>
      </form>

    </>
  );
};

export default Login;
