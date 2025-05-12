import React from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
        navigate("/");
    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  return (
    <div >
      <div>
        <div>
          <h2 >Login with Google</h2>
          <button onClick={handleLogin}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
            />
            Sign in with Google
          </button>
        </div>


      </div>
    </div>
  );
}
