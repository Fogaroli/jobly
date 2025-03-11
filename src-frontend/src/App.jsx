import {Routes, Route, Navigate} from 'react-router-dom'

import './App.css'
import NavBar from './NavBar'
import Homepage from './Homepage'
import CompanyList from './companies/CompanyList'
import CompanyDetails from './companies/CompanyDetails'
import JobList from './jobs/JobList'
import UserProfile from './user/UserProfile'
import LoginForm from './user/LoginForm'
import SignUpForm from './user/SignUpForm'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetails />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  );
}

export default App