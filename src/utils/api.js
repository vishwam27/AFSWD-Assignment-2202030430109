import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
};

export const coursesAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
  getEnrolled: () => api.get('/courses/enrolled'),
  getProgress: (courseId) => api.get(`/courses/${courseId}/progress`),
  updateProgress: (courseId, data) => api.put(`/courses/${courseId}/progress`, data),
};

export const mediaAPI = {
  getAll: (params) => api.get('/media', { params }),
  getById: (id) => api.get(`/media/${id}`),
  getByCategory: (category) => api.get(`/media/category/${category}`),
  trackView: (mediaId) => api.post(`/media/${mediaId}/view`),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getProgress: (timeRange) => api.get('/dashboard/progress', { params: { range: timeRange } }),
  getActivity: () => api.get('/dashboard/activity'),
  getRecommendations: () => api.get('/dashboard/recommendations'),
};

export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  processPayment: (orderId, paymentData) => api.post(`/orders/${orderId}/payment`, paymentData),
};

export default api;
