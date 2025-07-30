import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 second timeout
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const API = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Login failed');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error setting up login request.');
      }
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Registration failed');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error setting up registration request.');
      }
    }
  },

  verifyToken: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      return { error: 'Token verification failed' };
    }
  },

  getPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        headers: getAuthHeader(),
        params: {
          _: Date.now() // Cache buster
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error || 'Failed to fetch posts';
        if (error.response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error setting up posts request.');
      }
    }
  },

  createPost: async (content, userId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts`,
        { content, userId },
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Failed to create post');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error setting up create post request.');
      }
    }
  },

  likePost: async (postId, userId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts/${postId}/like`,
        { userId },
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Failed to like post');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error setting up like request.');
      }
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return Promise.resolve();
  }
};

export default API;