import React, { useState } from "react"

//import GoogleSvg from "../assets/GoogleSvg"

const Form = ({ handleSubmit }: { handleSubmit: (email: string, password: string) => void }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
  return (
    <div className="text-white px-12 py-20 rounded-xl bg-gray-850">
        <h1 className="text-5xl font-semibold">Welcome</h1>
        <p className="font-medium text-lg mt-4">Please enter your account information</p>
        <div className="mt-8">
            <div>
                <label className="text-lg font-medium">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 rounded-md mt-1 border-2 border-gray-850 bg-gray-900 hover:border-blue-600 hover:duration-300 transition-colors ease-in-out"
                    type="text"
                    placeholder="example@website.com"
                />
            </div>
            <div className="mt-4">
                <label className="text-lg font-medium">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 rounded-md mt-1 border-2 border-gray-850 bg-gray-900 hover:border-blue-600 hover:duration-300 transition-colors ease-in-out"
                    type="password"
                    placeholder="*********"
                />
            </div>
            <div className="flex flex-row justify-between items-center mt-4">
                <div>
                    <input
                        type="checkbox"
                        id="remember"
                    />
                    <label className="ml-2 font-medium text-base" htmlFor="remember">Remember me</label>
                </div>
                <button className="font-medium text-base text-blue-600">Forgot password</button>
            </div>

            <div className="mt-8 flex flex-col gap-y-4">
                <button onClick={() => handleSubmit(email ,password)} className="active:scale-[.98] transition-transform bg-blue-600 p-3 text-lg font-bold rounded-md">Sign in</button>
{
/*
                <button className="active:scale-[.98] transition-transform flex flex-row p-1 items-center justify-center bg-slate-50 text-black rounded-md">
                    <GoogleSvg />
                    <p className="pl-4">Sign in with Google</p>
                </button>
*/
}
            </div>
            <div className="mt-8 flex flex-row items-center justify-center">
                <p className="font-medium text-base mr-2">Dont have an account?</p>
                <button className="text-blue-500">Sign up</button>
            </div>
        </div>
    </div>
  )
}

export default Form