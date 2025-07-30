import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import API from './utils/api';
import './index.css';
import './App.css';

// ErrorBoundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong. Please try again.
          <details className="mt-2 text-sm">
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Navbar Component
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">SocialApp</h1>
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/home')} className="text-gray-600 hover:text-blue-600">Home</button>
        <button onClick={() => navigate('/profile')} className="text-gray-600 hover:text-blue-600">Profile</button>
        <button onClick={() => navigate('/messages')} className="text-gray-600 hover:text-blue-600">Messages</button>
        <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">Logout</button>
      </div>
    </div>
  );
}

// CreatePost Component
function CreatePost({ newPost, setNewPost, handleCreatePost, disabled }) {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="What's on your mind?"
        rows="3"
      />
      <button
        onClick={handleCreatePost}
        disabled={disabled}
        className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Post
      </button>
    </div>
  );
}

// Stories Component
function Stories() {
  const stories = [
    { id: 1, name: 'User 1', image: 'https://picsum.photos/100/100?random=1' },
    { id: 2, name: 'User 2', image: 'https://picsum.photos/100/100?random=2' },
    { id: 3, name: 'User 3', image: 'https://picsum.photos/100/100?random=3' },
    { id: 4, name: 'User 4', image: 'https://picsum.photos/100/100?random=4' },
    { id: 5, name: 'User 5', image: 'https://picsum.photos/100/100?random=5' },
  ];

  const fallbackImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

  return (
    <div className="flex space-x-4 overflow-x-auto mb-6 p-4 bg-white rounded shadow-md scrollbar-hide">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center flex-shrink-0 w-20">
          <div className="relative w-16 h-16 rounded-full border-2 border-pink-500 p-0.5">
            <img
              src={story.image}
              alt={story.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <p className="text-center text-xs mt-2 font-medium truncate w-full">
            {story.name}
          </p>
        </div>
      ))}
    </div>
  );
}

// Feed Component
function Feed({ posts, setPosts }) {
  const [likeError, setLikeError] = useState(null);
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleLike = async (postId) => {
    if (!postId || isProcessing) {
      console.error('Invalid postId or already processing:', postId);
      return;
    }
    
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found');
      setLikeError('Please log in to like posts');
      return;
    }

    setIsProcessing(true);
    setLoadingPostId(postId);
    setLikeError(null);

    try {
      const response = await API.likePost(postId, userId);

      if (!response) {
        throw new Error('No response received from server');
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId ? { 
              ...post, 
              likeCount: response.data.likeCount,
              isLiked: response.data.liked 
            } : post
          )
        );
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Like error:', error);
      setLikeError(error.message || 'Failed to like post. Please try again.');
      
      if (error.response?.status === 401 || error.message.includes('Session expired') || error.message.includes('token') || error.message.includes('Authentication')) {
        await API.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      }
    } finally {
      setLoadingPostId(null);
      setIsProcessing(false);
    }
  };

  if (!Array.isArray(posts)) {
    console.error('Posts is not an array:', posts);
    return <div className="text-red-500 p-4">Error: Invalid posts data format</div>;
  }

  return (
    <div>
      {likeError && (
        <div className="text-red-500 p-2 mb-2 bg-red-50 rounded">
          {likeError}
        </div>
      )}
      
      {posts.map((post) => {
        if (!post || typeof post !== 'object' || !post.id) {
          console.error('Invalid post:', post);
          return null;
        }

        const postContent = post.content || '';
        const username = post.author?.username || 'Unknown User';
        const likeCount = post.likeCount || 0;
        const isLiked = post.isLiked || false;
        const avatar = post.author?.avatar || 'https://picsum.photos/40/40';

        return (
          <div key={post.id} className="bg-white p-4 rounded shadow-md mb-4">
            <div className="flex items-center mb-2">
              <img
                src={avatar}
                alt={username}
                className="w-10 h-10 rounded-full mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
                }}
              />
              <p className="font-bold">{username}</p>
            </div>
            <p className="text-gray-800">{postContent}</p>
            <button 
              onClick={() => handleLike(post.id)}
              disabled={loadingPostId === post.id || isProcessing}
              className={`mt-2 ${isLiked ? 'text-red-500' : 'text-blue-500'} ${loadingPostId === post.id ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loadingPostId === post.id ? 'Processing...' : `Like (${likeCount})`}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// Profile Component
function Profile() {
  return <div className="bg-white p-6 rounded shadow-md">Profile Page</div>;
}

// Messages Component
function Messages() {
  return <div className="bg-white p-6 rounded shadow-md">Messages Page</div>;
}

// Home Component
function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime < 5000) {
      return;
    }
    
    setIsLoading(true);
    setLastFetchTime(now);
    
    try {
      const response = await API.getPosts();
      
      if (!response) {
        throw new Error('No response received from server');
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (Array.isArray(response?.data)) {
        setPosts(response.data);
        setError(null);
      } else {
        throw new Error('Invalid posts data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message || 'Failed to load posts');
      setPosts([]);
      
      if (error.response?.status === 401 || error.message.includes('Session expired') || error.message.includes('token') || error.message.includes('Authentication')) {
        await API.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [lastFetchTime, navigate]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('Please log in to create a post.');
        return;
      }

      setIsLoading(true);
      const response = await API.createPost(newPost, userId);
      
      if (!response) {
        throw new Error('No response received from server');
      }

      if (response.error) {
        throw new Error(response.error);
      }

      setNewPost('');
      await fetchPosts();
      setError(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.message || 'Error creating post');
      
      if (error.response?.status === 401 || error.message.includes('Session expired') || error.message.includes('token') || error.message.includes('Authentication')) {
        await API.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
            <button 
              onClick={fetchPosts}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}
        
        <CreatePost 
          newPost={newPost} 
          setNewPost={setNewPost} 
          handleCreatePost={handleCreatePost} 
          disabled={isLoading}
        />
        
        <Stories />
        
        {isLoading && posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Feed posts={posts} setPosts={setPosts} />
        )}
      </div>
    </ErrorBoundary>
  );
}

// LoginForm Component
function LoginForm({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('session_expired')) {
      setError('Your session has expired. Please log in again.');
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value
      };
      
      const response = await API.login(formData);
      
      if (!response) {
        throw new Error('No response received from server');
      }

      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data?.token) {
        throw new Error('Authentication token not received');
      }
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId || '');
      setIsAuthenticated(true);
      
      const redirectPath = localStorage.getItem('redirectPath') || '/home';
      localStorage.removeItem('redirectPath');
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// SignupForm Component
function SignupForm({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await API.register({
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value
      });

      if (!response) {
        throw new Error('No response received from server');
      }

      if (response.error) {
        throw new Error(response.error);
      }

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Username:</label>
        <input
          type="text"
          name="username"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Creating account...' : 'Signup'}
      </button>
    </form>
  );
}

// Auth Component
function Auth({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Login' : 'Signup'}</h1>
      {isLogin ? (
        <LoginForm setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <SignupForm setIsAuthenticated={setIsAuthenticated} />
      )}
      <button
        onClick={toggleForm}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const verifyAuth = useCallback(async () => {
    setIsCheckingAuth(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      return;
    }
    
    try {
      const response = await API.verifyToken();
      
      if (response?.error) {
        throw new Error(response.error);
      }

      if (response?.data?.isValid) {
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
      
      if (error.response?.status === 401 || error.message.includes('token') || error.message.includes('Authentication')) {
        navigate('/login?session_expired=true');
      }
    } finally {
      setIsCheckingAuth(false);
    }
  }, [navigate]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        verifyAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [verifyAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {isAuthenticated && <Navbar />}
      <div className="max-w-4xl mx-auto mt-6">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <Auth setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <Auth setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/messages"
              element={isAuthenticated ? <Messages /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}

// App Wrapper Component to provide Router context
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;