import Form from '../components/LoginForm'
import logo from '../assets/logo.png'
import { User } from '../types';
import AuthanticationError from '../error';
import { toast } from 'react-toastify';

const Login = () => {

  const handleSubmit = (email: string, password: string) => {
    fetch("https://auth.lokal.se/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if(res.status === 401){
        throw new AuthanticationError();
      }
      return res.json();
    })
    .then((data: User) => {
      window.location.href = "/";
    }).catch(err => {
      if(err instanceof AuthanticationError){
        toast("Wrong email or password", {type: "error"});
      }
    });
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex bg-gray-900 lg:w-1/2 items-center justify-center">
        <Form handleSubmit={handleSubmit}/>
      </div>
      <div className="select-none pointer-events-none blur-sm hidden w-1/2 bg-gray-900 h-full lg:flex justify-center items-center">
          <img alt="VibeVault" className="w-48 h-48" src={logo}></img>
      </div>
    </div>
  )
}

export default Login