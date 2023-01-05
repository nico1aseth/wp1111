import { Provider } from 'react-redux'
import {store} from './app/store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/navigationBar';
import MainPage from './container/mainPage';
import LoginPage from './container/loginPage';
import SignUpPage from './container/signUpPage';
import ProfilePage from './container/profilePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/profile' element={<ProfilePage />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
