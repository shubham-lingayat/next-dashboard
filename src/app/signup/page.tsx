"use client";
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {axios} from "axios";

const SignupPage = () =>{

    const [user, setUser] = React.useState({
        email:"",
        password:""
    });

    return(
        <div className="flex flex-col items-center h-screen justify-center">
            <div className="flex justify-center py-5 text-5xl">
                <h1>Signup Form</h1>
            </div>
            <div className="flex flex-col pt-5">
                <form className="flex flex-col gap-2">
                    <label htmlFor="email_add">Email Address: </label>
                    <input id="email_add" className="px-3 py-2 rounded-sm" placeholder="Email Address" type="email" value={user.email} onChange={(event)=> setUser({...user, email:event.target.value})} />
                    <label htmlFor="password">Password: </label>
                    <input id="password" className="px-3 py-2 rounded-sm" placeholder="Password" type="password" value={user.password} onChange={(event)=> setUser({...user, password:event.target.value})} />
                    <button type="submit">Submit</button>
                </form>
                <Link href="/login">Vist Login Page</Link>
            </div>
        </div>
    )
}

export default SignupPage;