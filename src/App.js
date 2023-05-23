import { Menu } from './Components/Menu';
import { BlogPage } from './Pages/BlogPage';
import { BlogPost } from './Pages/BlogPost';
import { ErrorPage } from './Pages/ErrorPage';
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
import { LogoutPage } from './Pages/LogoutPage';
import { ProfilePage } from './Pages/ProfilePage';
import { AuthProvider, AuthRoute, roles } from './common/auth'
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Menu />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/blog' element={<BlogPage />} >
              <Route path=':slug' element={<BlogPost />} />
            </Route>
            <Route
              path='/blog/edit/:slug'
              element={
                <AuthRoute roles={[roles.admin, roles.editor]}>
                  <BlogPost />
                </AuthRoute>
              } />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/logout'
              element={
                <AuthRoute>
                  <LogoutPage />
                </AuthRoute>
              }
            />
            <Route
              path='/profile/:username'
              element={
                <AuthRoute>
                  <ProfilePage />
                </AuthRoute>
              }
            />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='*' element={<p>Not found</p>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
