// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/action/userAction";
// // import { setUser } from "../actions/userActions";


// const fallbackImage = "/assets/default-user.png"; // update path

// const NormalSignup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     dispatch(
//       setUser({
//         name,
//         email,
//         password,
//         imageUrl: fallbackImage,
//       })
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default NormalSignup;
