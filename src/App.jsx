// import Image from "next/image"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FileText, Circle} from "lucide-react"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import ClassRoom from "./pages/ClassRoom"
import Home from "./pages/Home"
import LoginPage from "./pages/Login"
import SignupPage from "./pages/SignUp"
import ManagerDashboard from "./pages/ManagerDashboard";
// import { Button } from "@/components/ui/button"



export default function App() {
  
  const PrivateRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    console.log(user.role);
    if (!token) return <Navigate to="/" />
    
  
    try {
      // const decoded = jwt_decode(token)
      if (role && user.role !== role) {
        return <Navigate to="/unauthorized" />
      }
      return children;
    } catch (err) {
      return <Navigate to="/" />
    }
  }
  
  
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/home" 
          element={
            <PrivateRoute role="student">
              <Home />
            </PrivateRoute>
          } 
        />
        
        <Route
          path="/classroom"
          element={
            <PrivateRoute role="student">
              <ClassRoom />
            </PrivateRoute>
          }
        />

        <Route
          path="/manager-dashboard"
          element={
            <PrivateRoute role="manager">
              <ManagerDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router>
    </div>
    
  )
}
