// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from 'react-router-dom';

// function App() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
//               <h2>{isLogin ? 'Login' : 'Signup'}</h2>
//               {isLogin ? <LoginForm /> : <SignupForm />}
//               <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
//                 {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
//               </button>
//             </div>
//           }
//         />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');
//   const navigate = useNavigate(); // useNavigate hook

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMsg('');
//     try {
//       const res = await fetch('${API_URL}/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMsg('Login successful!');
//         // Redirect to dashboard after successful login
//         navigate('/dashboard');
//       } else {
//         setMsg(data.message || 'Login failed');
//       }
//     } catch (err) {
//       setMsg('Network error');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         required
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ display: 'block', marginBottom: 10, width: '100%' }}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         required
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ display: 'block', marginBottom: 10, width: '100%' }}
//       />
//       <button type="submit">Login</button>
//       <div style={{ color: 'red', marginTop: 10 }}>{msg}</div>
//     </form>
//   );
// }

// function SignupForm() {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMsg('');
//     try {
//       const res = await fetch('http://localhost:5000/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, username, password }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMsg('Signup successful!');
//       } else {
//         setMsg(data.message || 'Signup failed');
//       }
//     } catch (err) {
//       setMsg('Network error');
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         required
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ display: 'block', marginBottom: 10, width: '100%' }}
//       />
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         required
//         onChange={(e) => setUsername(e.target.value)}
//         style={{ display: 'block', marginBottom: 10, width: '100%' }}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         required
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ display: 'block', marginBottom: 10, width: '100%' }}
//       />
//       <button type="submit">Signup</button>
//       <div style={{ color: 'red', marginTop: 10 }}>{msg}</div>
//     </form>
//   );
// }

// function Dashboard() {
//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
//       <h2>Welcome Guest</h2>
//       <p>You have successfully logged in.</p>
//     </div>
//   );
// }

// export default App;
