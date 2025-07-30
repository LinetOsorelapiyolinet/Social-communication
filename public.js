// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import API from './utils/api';
// // Get data
// axios.get('http://localhost:5000/login')
//  .then(response => console.log(response.data))
//  .catch(error => console.error(error));

// // Post data
// axios.post('http://localhost:5000/signup', { data: 'value' })
//   .then(response => console.log(response.data));
// import './index.css'; // Assuming your CSS file is named index.css
// import './App.css';
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check if the user is authenticated (e.g., token exists in localStorage)
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   return (
//     <Router>
//       <div className="bg-gray-100 min-h-screen">
//         {isAuthenticated && <Navbar />}
//         <div className="max-w-4xl mx-auto mt-6">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? <Navigate to="/home" /> : <Auth setIsAuthenticated={setIsAuthenticated} />
//               }
//             />
//             <Route
//               path="/home"
//               element={isAuthenticated ? <Home /> : <Navigate to="/" />}
//             />
//             <Route
//               path="/profile"
//               element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
//             />
//             <Route
//               path="/messages"
//               element={isAuthenticated ? <Messages /> : <Navigate to="/" />}
//             />
//             {/* Catch-all route for any undefined paths */}
//             <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId'); // Also remove userId on logout
//     navigate('/');
//     window.location.reload(); // Force a full page reload to reset state
//   };

//   return (
//     <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-blue-600">SocialApp</h1>
//       <div className="flex items-center space-x-4">
//         <button onClick={() => navigate('/home')} className="text-gray-600 hover:text-blue-600">Home</button>
//         <button onClick={() => navigate('/profile')} className="text-gray-600 hover:text-blue-600">Profile</button>
//         <button onClick={() => navigate('/messages')} className="text-gray-600 hover:text-blue-600">Messages</button>
//         <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">Logout</button>
//       </div>
//     </div>
//   );
// }

// function Auth({ setIsAuthenticated }) {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Login' : 'Signup'}</h1>
//       {isLogin ? <LoginForm setIsAuthenticated={setIsAuthenticated} /> : <SignupForm />}
//       <button
//         onClick={toggleForm}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         {isLogin ? 'Switch to Signup' : 'Switch to Login'}
//       </button>
//     </div>
//   );
// }

// function LoginForm({ setIsAuthenticated }) {
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(`${API_BASE}/auth/login`, {
//       email: e.target.email.value,
//       password: e.target.password.value
//     });
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('userId', response.data.userId);
//     setIsAuthenticated(true);
//     navigate('/home');
//   } catch (error) {
//     console.error('Login error:', error);
//     alert(error.response?.data?.error || 'Login failed');
//   }
// };


//   return (
//     <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
//       <div className="mb-4">
//         <label className="block text-gray-700">Email:</label>
//         <input
//           type="email"
//           name="email"
//           required
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password:</label>
//         <input
//           type="password"
//           name="password"
//           required
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//       >
//         Login
//       </button>
//     </form>
//   );
// }

// function SignupForm() {
//  const handleSignup = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(`${API_BASE}/auth/register`, {
//       email: e.target.email.value,
//       username: e.target.username.value,
//       password: e.target.password.value
//     });
//     alert(response.data.message);
//   } catch (error) {
//     console.error('Signup error:', error);
//     alert(error.response?.data?.error || 'Signup failed');
//   }
// };
//   return (
//     <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
//       <div className="mb-4">
//         <label className="block text-gray-700">Email:</label>
//         <input
//           type="email"
//           name="email"
//           required
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Username:</label>
//         <input
//           type="text"
//           name="username"
//           required
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password:</label>
//         <input
//           type="password"
//           name="password"
//           required
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//       >
//         Signup
//       </button>
//     </form>
//   );
// }

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Fetch posts including user details (username)
//         const response = await axios.get('http://localhost:5000/posts');
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleCreatePost = async () => {
//     if (!newPost.trim()) {
//       alert('Post content cannot be empty.');
//       return;
//     }

//     try {
//       const userIdFromStorage = localStorage.getItem('userId'); // Retrieve from localStorage
//       if (!userIdFromStorage) {
//         alert('User is not logged in. Please log in to create a post.');
//         console.error('userId is missing in localStorage');
//         return;
//       }

//       // *** CRITICAL FIX: Ensure userId is sent as a number if your backend expects it ***
//       // Though parseInt happens on backend, sending it as a proper number string is good practice.
//       const userId = parseInt(userIdFromStorage, 10);
//       if (isNaN(userId)) {
//           alert('Invalid User ID found. Please log in again.');
//           console.error('Parsed userId is NaN:', userIdFromStorage);
//           return;
//       }

//       console.log('Sending post data:', { userId, content: newPost });

//       const response = await axios.post('http://localhost:5000/posts', { content: newPost, userId });
//       console.log('Post created successfully:', response.data);

//       setNewPost('');
//       // Re-fetch all posts to update the feed with the new post
//       const updatedPostsResponse = await axios.get('http://localhost:5000/posts');
//       setPosts(updatedPostsResponse.data);
//     } catch (error) {
//       console.error('Error creating post:', error.response?.data || error.message);
//       alert(error.response?.data?.error || 'An error occurred while creating the post.');
//     }
//   };

//   return (
//     <div>
//       <CreatePost newPost={newPost} setNewPost={setNewPost} handleCreatePost={handleCreatePost} />
//       <Stories />
//       <Feed posts={posts} setPosts={setPosts} />
//     </div>
//   );
// }

// function CreatePost({ newPost, setNewPost, handleCreatePost }) {
//   return (
//     <div className="bg-white p-4 rounded shadow-md mb-6">
//       <textarea
//         value={newPost}
//         onChange={(e) => setNewPost(e.target.value)}
//         className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         placeholder="What's on your mind?"
//         rows="3" // Added for better UX
//       ></textarea>
//       <button
//         onClick={handleCreatePost}
//         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Post
//       </button>
//     </div>
//   );
// }

// function Stories() {
//   const stories = [
//     { id: 1, name: 'Lizy Liz', image: 'https://via.placeholder.com/100' },
//     { id: 2, name: 'Manchester City', image: 'https://via.placeholder.com/100' },
//     { id: 3, name: 'Thee Jeff', image: 'https://via.placeholder.com/100' },
//   ];

//   return (
//     <div className="flex space-x-4 overflow-x-auto mb-6 p-2 bg-white rounded shadow-md">
//       {stories.map((story) => (
//         <div key={story.id} className="flex-shrink-0 w-24">
//           <img
//             src={story.image}
//             alt={story.name}
//             className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover" // Added object-cover
//           />
//           <p className="text-center text-sm mt-2 font-medium">{story.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// function Feed({ posts, setPosts }) {
//   const userId = localStorage.getItem('userId');
//   const [expandedComments, setExpandedComments] = useState({}); // Track expanded comments for each post

//   const handleLike = async (postId) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/posts/${postId}/like`, { userId });
//       const updatedPost = posts.map((post) =>
//         post.id === postId ? { ...post, likes: response.data.likes } : post
//       );
//       setPosts(updatedPost); // Update the posts state with the new likes count
//     } catch (error) {
//       console.error('Error liking post:', error);
//       alert('An error occurred while liking the post.');
//     }
//   };

//   const handleComment = async (postId, comment) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/posts/${postId}/comment`, {
//         userId: parseInt(userId, 10),
//         content: comment,
//       });
//       const updatedPost = posts.map((post) =>
//         post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
//       );
//       setPosts(updatedPost); // Update the posts state with the new comment
//     } catch (error) {
//       console.error('Error commenting on post:', error);
//       alert('An error occurred while commenting on the post.');
//     }
//   };

//   const handleViewComments = async (postId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/posts/${postId}/comments`);
//       setExpandedComments((prev) => ({ ...prev, [postId]: response.data })); // Expand comments for the post
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//       alert('An error occurred while fetching comments.');
//     }
//   };

//   if (!posts || posts.length === 0) {
//     return <div className="text-center py-8 text-gray-500">No posts to display yet.</div>;
//   }

//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id} className="bg-white p-4 rounded shadow-md mb-4">
//           <div className="flex items-center mb-2">
//             <img
//               src="https://via.placeholder.com/40" // Placeholder, ideally fetch user's actual avatar
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full mr-3 object-cover"
//             />
//             <p className="font-bold">{post.user ? post.user.username : 'Unknown User'}</p>
//           </div>
//           <p className="text-gray-800 leading-relaxed">{post.content}</p>
//           <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
//             <button
//               onClick={() => handleLike(post.id)}
//               className="flex items-center hover:text-blue-600 transition-colors duration-200"
//             >
//               Like ({post.likes || 0})
//             </button>
//             <button
//               onClick={() => {
//                 const comment = prompt('Enter your comment:');
//                 if (comment) handleComment(post.id, comment);
//               }}
//               className="flex items-center hover:text-blue-600 transition-colors duration-200"
//             >
//               Comment ({post.comments?.length || 0})
//             </button>
//             <button
//               onClick={() => handleViewComments(post.id)}
//               className="flex items-center hover:text-blue-600 transition-colors duration-200"
//             >
//               View Comments
//             </button>
//           </div>
//           <p className="text-xs text-gray-400 mt-2">{new Date(post.createdAt).toLocaleString()}</p>

//           {/* Display comments below the post */}
//           {expandedComments[post.id] && (
//             <div className="mt-4 bg-gray-100 p-4 rounded shadow-inner">
//               <h3 className="text-sm font-bold mb-2">Comments:</h3>
//               {expandedComments[post.id].map((comment) => (
//                 <div key={comment.id} className="mb-2">
//                   <p className="text-sm">
//                     <span className="font-bold">{comment.user.username}:</span> {comment.content}
//                   </p>
//                   <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// function Profile() {
//   const [profile, setProfile] = useState(null); // Initialize as null to differentiate from empty object
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [bio, setBio] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get logged-in user ID
//   const loggedInUserId = localStorage.getItem('userId');
//   const userId = loggedInUserId ? parseInt(loggedInUserId, 10) : null;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!userId) {
//         setError('User ID not found. Please log in.');
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.get(`http://localhost:5000/profile/${userId}`);
//         setProfile(response.data);
//         setBio(response.data.bio || '');
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError(err.response?.data?.error || 'Failed to fetch profile.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [userId]); // Depend on userId

//   const handleUploadPhoto = async () => {
//     if (!avatarFile) {
//       alert('Please select a file to upload.');
//       return;
//     }
//     if (!userId) {
//       alert('User is not logged in.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('userId', userId); // *** Use dynamic userId ***
//     formData.append('avatar', avatarFile);

//     try {
//       const response = await axios.post('http://localhost:5000/profile/photo', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setProfile(response.data);
//       setAvatarFile(null);
//       alert('Profile photo uploaded successfully!');
//     } catch (err) {
//       console.error('Error uploading photo:', err);
//       alert(err.response?.data?.error || 'An error occurred while uploading the photo.');
//     }
//   };

//   const handleUpdateBio = async () => {
//     if (!bio.trim()) {
//       alert('Bio cannot be empty.');
//       return;
//     }
//     if (!userId) {
//       alert('User is not logged in.');
//       return;
//     }

//     try {
//       const response = await axios.put('http://localhost:5000/profile/bio', {
//         userId: userId, // *** Use dynamic userId ***
//         bio,
//       });
//       setProfile(response.data);
//       alert('Bio updated successfully!');
//     } catch (err) {
//       console.error('Error updating bio:', err);
//       alert(err.response?.data?.error || 'An error occurred while updating the bio.');
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading profile...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
//   if (!profile) return <div className="text-center py-8 text-gray-500">Profile data not available.</div>;


//   return (
//     <div className="mt-8 bg-white p-6 rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4 border-b pb-2">User Profile: {profile.username}</h2>
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold mb-2">Profile Photo</h3>
//         {/* Assuming avatarUrl is directly on the user object in your backend's profile route */}
//         {profile.avatarUrl ? (
//           <img src={`http://localhost:5000${profile.avatarUrl}`} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-blue-400" />
//         ) : (
//           <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-sm">
//             <span>No Photo</span>
//           </div>
//         )}
//         <input
//           type="file"
//           onChange={(e) => setAvatarFile(e.target.files[0])}
//           className="mt-4 block"
//         />
//         <button
//           onClick={handleUploadPhoto}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           disabled={!avatarFile}
//         >
//           Upload Photo
//         </button>
//       </div>
//       <div className="mt-4">
//         <h3 className="text-xl font-semibold mb-2">Bio</h3>
//         <textarea
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//           placeholder="Write something about yourself..."
//           rows="4"
//         ></textarea>
//         <button
//           onClick={handleUpdateBio}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           disabled={!bio.trim()}
//         >
//           Update Bio
//         </button>
//       </div>
//       {/* Display user's posts on their profile */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-2 border-b pb-2">Your Posts</h3>
//         {profile.posts && profile.posts.length > 0 ? (
//           <Feed posts={profile.posts} setPosts={() => {}} />
//         ) : (
//           <p className="text-gray-500">No posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function Messages() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [receiverIdInput, setReceiverIdInput] = useState(''); // Input field state
//   const [currentReceiverId, setCurrentReceiverId] = useState(null); // Actual ID used for fetching
//   const [messageError, setMessageError] = useState(null);

//   // Get logged-in user ID
//   const loggedInUserId = localStorage.getItem('userId');
//   const userId = loggedInUserId ? parseInt(loggedInUserId, 10) : null;

//   useEffect(() => {
//     const fetchMessages = async () => {
//       setMessageError(null); // Clear previous errors
//       if (!userId) {
//         setMessageError('Your User ID is missing. Please log in.');
//         return;
//       }
//       if (!currentReceiverId) {
//         // setMessageError('Please enter a receiver ID to view messages.');
//         setMessages([]); // Clear messages if no receiver selected
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/messages/${userId}/${currentReceiverId}`);
//         setMessages(response.data);
//       } catch (err) {
//         console.error('Error fetching messages:', err);
//         setMessageError(err.response?.data?.error || 'Error fetching messages.');
//       }
//     };

//     fetchMessages();
//   }, [userId, currentReceiverId]); // Re-fetch when userId or currentReceiverId changes

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) {
//       alert('Message cannot be empty.');
//       return;
//     }
//     if (!userId) {
//       alert('Your User ID is missing. Please log in.');
//       return;
//     }
//     if (!currentReceiverId) {
//       alert('Please select a user to send a message to.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/messages', {
//         senderId: userId, // *** Use dynamic userId ***
//         receiverId: currentReceiverId, // Use the selected receiver ID
//         content: newMessage,
//       });
//       // Add the new message to the state and clear input
//       setMessages((prevMessages) => [...prevMessages, response.data]);
//       setNewMessage('');
//       setMessageError(null);
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setMessageError(err.response?.data?.error || 'An error occurred while sending the message.');
//     }
//   };

//   return (
//     <div className="mt-8 bg-white p-6 rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4 border-b pb-2">Messages</h2>
//       {messageError && <div className="text-red-500 mb-4">{messageError}</div>}
//       <div className="mb-4">
//         <label className="block text-gray-700 font-medium mb-1">Select User (Enter ID):</label>
//         <input
//           type="number" // Use type="number" for ID input
//           placeholder="Enter receiver's user ID"
//           value={receiverIdInput}
//           onChange={(e) => setReceiverIdInput(e.target.value)}
//           onBlur={() => setCurrentReceiverId(parseInt(receiverIdInput, 10) || null)} // Set receiver when input loses focus
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//         {currentReceiverId && <p className="text-sm text-gray-500 mt-1">Chatting with User ID: {currentReceiverId}</p>}
//       </div>
//       <div className="bg-gray-50 p-4 rounded shadow-inner mb-6 h-64 overflow-y-auto flex flex-col-reverse">
//         {messages.slice().reverse().map((message) => ( // Reverse for chat-like display
//           <div
//             key={message.id}
//             className={`mb-2 p-2 rounded max-w-[75%] ${
//               message.senderId === userId ? 'bg-blue-100 self-end text-right' : 'bg-gray-100 self-start text-left'
//             }`}
//           >
//             <span className="font-semibold text-xs text-gray-600">{message.senderId === userId ? 'You' : `User ${message.senderId}`}:</span>
//             <p className="text-gray-800">{message.content}</p>
//             <span className="text-xs text-gray-400 block mt-1">{new Date(message.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//         {messages.length === 0 && !currentReceiverId && (
//           <p className="text-center text-gray-400 mt-auto mb-auto">Enter a user ID to start chatting.</p>
//         )}
//          {messages.length === 0 && currentReceiverId && (
//           <p className="text-center text-gray-400 mt-auto mb-auto">Start a conversation!</p>
//         )}
//       </div>
//       <textarea
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         placeholder="Type your message..."
//         rows="2"
//       ></textarea>
//       <button
//         onClick={handleSendMessage}
//         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//         disabled={!newMessage.trim() || !currentReceiverId}
//       >
//         Send
//       </button>
//     </div>
//   );
// }

// export default App;
