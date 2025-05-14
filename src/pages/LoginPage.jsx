import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../css/login.css";


class LoginPageSequence{
  static EMAIL = new LoginPageSequence("email");
  static OPTIONALDETAILS = new LoginPageSequence("optDetails");
  static HOME = new LoginPageSequence("home");

  constructor(type){
    this.type = type;
  }

  getType(){
    return this.type;
  }

}

export default function LoginPage() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState("");
  const [profileType, setProfileType] = useState(false);
  const [currPage, setCurrPage] = useState(LoginPageSequence.EMAIL);

  useEffect(() => {
    console.log("curr page is:", currPage);
  }, [currPage]);  

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("login result:", result, result.user);
      setUser(result.user);
      // const user = result.user;
      switchPage();
      // navigate("/");
    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  const switchPage = () => {
    switch (currPage) {
      case LoginPageSequence.EMAIL:
        setCurrPage(LoginPageSequence.OPTIONALDETAILS);
        break;

      case LoginPageSequence.OPTIONALDETAILS:
        navigate("/");
        break;
    

      default:
        setCurrPage(LoginPageSequence.EMAIL);
        break;
    }
  }

  const renderPageContent = () => {
    switch (currPage) {
      case LoginPageSequence.EMAIL:
        return (
            <div className="container-fluid py-5 h-100" style={{width: "100%", height:"100%"}}>
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                    <div className="card-body p-5 text-center">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{maxWidth: "25%"}} alt="logo" />
                        <h3 className="mt-1 mb-2 pb-1">Community Talks</h3>
                        <h5 className="mt-1 mb-4 pb-1">Getting Involved in Evanston's Community </h5>
                      </div>

                      <h4 className="mb-3">Sign Up</h4>
                      <form>
                        <div data-mdb-input-init className="form-outline mb-3">
                          <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder="Email"/>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="password" placeholder="Password" id="typePasswordX-2" className="form-control form-control-lg" />
                        </div>

                        <div className="form-check d-flex justify-content-start mb-4">
                          <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                          <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                        </div>

                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                      </form>

                      <hr className="my-2"/>

                      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor: "#dd4b39"}}
                        onClick={handleLogin}>
                          <i className="fab fa-google me-2"></i> Sign up with Google
                      </button>
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );

      case LoginPageSequence.OPTIONALDETAILS:
        return (
          <div className="container-fluid py-5 h-100" style={{width: "100%", height:"100%"}}>
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                    <div className="card-body p-5 text-center">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{maxWidth: "25%"}} alt="logo" />
                        <h3 className="mt-1 mb-2 pb-1">Community Talks</h3>
                        <h5 className="mt-1 mb-4 pb-1">Getting Involved in Evanston's Community </h5>
                      </div>

                      <h4 className="mb-3">Sign Up</h4>
                      <form>
                        <div data-mdb-input-init className="form-outline mb-3">
                          <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder="Email"/>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="password" placeholder="Password" id="typePasswordX-2" className="form-control form-control-lg" />
                        </div>

                        {/* <div>
                          <p>Are you a...</p>
                          <input type="radio" name="prof_type" value="member">Community Member</input>
                          <input type="radio" name="prof_type" value="leader">Community Leader</input>
                        </div> */}

                      </form>

                      <hr className="my-2"/>
                      <div className="form-check d-flex justify-content-start mb-4">
                          <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                          <label className="form-check-label" htmlFor="form1Example3"> Data preferences used to inform community interests </label>
                        </div>

                      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" onClick={switchPage}>
                          Go to Home
                      </button>
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    
      case LoginPageSequence.PROFILETYPE:
        return (
          <div>
            <h2>PROF TYPE</h2>
          </div>
        )
        break;

      default:
        switchPage();
        break;
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width:"100vw", boxSizing: "border-box",padding: "auto", alignContent:"center", justifyContent:"center",backgroundColor: "#508bfc" }}>
      {renderPageContent()}
    </div>
  );

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
