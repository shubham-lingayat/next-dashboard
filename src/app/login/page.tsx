"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent full page reload

    try {
      console.log("Login process started");
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login Success", response.data);
      toast.success("Login Success");
      router.push("/profile"); // rediect after success
    } catch (err: unknown) {
      let message = "Not able to login";
      if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="flex justify-center py-5 text-5xl">
        <h1>{loading ? "Processing..." : "Login Form"}</h1>
      </div>
      <div className="flex flex-col pt-5">
        <form className="flex flex-col gap-2" onSubmit={onLogin}>
          <label htmlFor="username_01">Username: </label>
          <input
            id="username_01"
            className="px-3 py-2 rounded-sm"
            placeholder="Enter Username"
            type="text"
            value={user.username}
            onChange={(event) =>
              setUser({ ...user, username: event.target.value })
            }
          />

          <label htmlFor="password_01"> Password: </label>
          <input
            id="password_01"
            className="px-3 py-2 rounded-sm"
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
          <button type="submit" disabled={buttonDisabled}>
            Submit
          </button>
        </form>

        <Link href="/signup" className="mt-3 text-blue-500 underline">
          Visit Signup Page
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
