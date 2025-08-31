"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ prevent full page reload

    try {
      console.log("Signup Process Started");
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup Success", response.data);
      toast.success("Signup Success");

      router.push("/login"); // ✅ redirect after success
    } catch (err: unknown) {
      let message = "Not able to signup";
      if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="flex justify-center py-5 text-5xl">
        <h1>{loading ? "Processing..." : "Signup Form"}</h1>
      </div>
      <div className="flex flex-col pt-5">
        <form className="flex flex-col gap-2" onSubmit={onSignup}>
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
          <label htmlFor="email_add">Email Address: </label>
          <input
            id="email_add"
            className="px-3 py-2 rounded-sm"
            placeholder="Email Address"
            type="email"
            value={user.email}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
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
        <Link href="/login" className="mt-3 text-blue-500 underline">
          Visit Login Page
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
