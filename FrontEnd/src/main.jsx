import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import User_Login from './pages/user/User_Login';
import User_Signup from './pages/user/User_Signup';
import { GoogleOAuthProvider } from "@react-oauth/google"
import NotFoundPage from './pages/NotFound.jsx';
import User_Dashboard from './pages/user/User_Dashboard.jsx';
import Course from './pages/Course.jsx';
import Home from './pages/Home.jsx';
import Summarizer from './pages/Summarizer.jsx';


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/user/login" element={<User_Login />} />
      <Route path="/user/signup" element={<User_Signup />} />
      <Route path="/user/dashboard" element={<User_Dashboard />} />
      <Route path="/course/:id" element={<Course />} />
      <Route path="/user/summarize" element={<Summarizer />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </GoogleOAuthProvider>
)
