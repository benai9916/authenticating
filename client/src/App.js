
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reservation from "./pages/Reservation";
import Layout from './components/Layout'
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

const PrivateRoute = ({ children }) => {
  let signInvalidUser = localStorage.getItem('isValid')
  return signInvalidUser ? (<><Layout> {children} </Layout> </>) : <Navigate to="/signin" />;
}

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
        <Route path="/reservation" element={<PrivateRoute><Reservation /> </PrivateRoute>} />
        <Route path="/" element={<Navigate to="/reservation" />} />
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
