import React, { useState, useEffect } from "react";
import useSignUp from "../../hooks/auth/signup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
   const { signUp, signUpResponse } = useSignUp();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [profession, setProfession] = useState(null);
  const [stack, setStack] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [bio, setBio] = useState(null);
  const [step, setStep] = useState(1);
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async () => {
  if (!userName || !password || !confirmPassword) {
    toast.warn("Please fill all the fields 😤");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match! 😵");
    return;
  }

  await signUp({
    username: userName,
    password: password,
    email: email,
    profession: profession,
    stack: stack,
    first_name: firstName,
    last_name: lastName,
    phone: parseInt(phone),
    bio: bio,
  });

  console.log(signUpResponse);
};


  useEffect(() => {
    if (!signUpResponse) return;

    if (signUpResponse === 400) {
      toast.error("You're late — that username is already taken... ❤️‍🩹");
      return;
    } else {
      toast.success("Welcome to the madness, manage your projects here 🧑🏻‍🏭");
      navigate("/"); // ✅ redirect
    }

  }, [signUpResponse, navigate]);

  console.log(signUpResponse);

  return (
    
    <div
      className="row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="col-7 justify-content-center align-items-center">
        <div>
          <p className="display-3">
            <span className="text-secondary" style={{ fontSize: 29 }}>
              Register To
            </span>{" "}
            Slaylist
          </p>
        </div>
        {step === 1 &&  (<>
          <input
            type="text"
            placeholder="Your Profession"
            className="form-control mb-3 w-100"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your skills"
            className="w-100 form-control mb-3"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
          />
           <input
            type="text"
            placeholder="bio"
            className="form-control mb-3 w-100"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          
          
          <button type="button" onClick={() => {
            if (!profession || !stack) {
                toast.warn("please fill all the fields 😤")
                return
            }
            setStep(2)}} className={`w-50  btn btn-${localStorage.getItem("theme") === "dark" ? `light` : `dark`}`}>
            Next
          </button>
        </> ) }
        {step === 2 &&  (
          <>
          <input
            type="text"
            placeholder="first Name"
            className="form-control mb-3 w-100"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-100 form-control mb-3"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="number"
            placeholder="phone Number"
            className="w-100 form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            className="w-100 form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={() => {setStep(1)}} className={`w-25 me-2 btn btn-${localStorage.getItem("theme") === "dark" ? `light` : `dark`}`}>
            Back
          </button>
          <button type="button" onClick={() => {
            if (!firstName || !lastName || !email || !phone) {
                toast.warn("please fill all the fields 😤")
                return
            }
            setStep(3)}} className={`w-25  btn btn-${localStorage.getItem("theme") === "dark" ? `light` : `dark`}`}>
            Next
          </button>
          </>
        ) }
        {step === 3 &&  (
          <>
          <input
            type="text"
            placeholder="username"
            className="form-control mb-3 w-100"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="w-100 form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm password"
            className="w-100 form-control mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
           <button type="button" onClick={() => {setStep(2)}} className={`w-25 me-2 btn btn-${localStorage.getItem("theme") === "dark" ? `light` : `dark`}`}>
            Back
          </button>
          <button type="button" onClick={handleSubmit} className={`w-25 btn btn-${localStorage.getItem("theme") === "dark" ? `light` : `dark`}`}>
            Sign Up
          </button>
          </>
        ) }
        
      
      </div>
    </div>
  );
};

export default Signup;
