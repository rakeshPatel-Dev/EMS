import React from 'react'
import LoginPage from './pages/LoginPage'
import EmployeePage from './pages/EmployeePage'
import AdminPage from './pages/AdminPage'
import { ToastContainer } from 'react-toastify'
import { seedTasks } from './database/seedData'
import TaskList from './components/FetchData'

const App = () => {
  return (
    <div>
      <ToastContainer />

      <LoginPage />
      {/* <EmployeePage /> */}
      {/* <AdminPage /> */}
      {/* <button
        onClick={seedTasks}
        className=' px-4 py-2 bg-green-200'>
        Add data
      </button> */}
      {/* <TaskList /> */}

    </div>
  )
}

export default App
