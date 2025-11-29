import React, { createContext, useState } from 'react'

export const UserContext = createContext();

const Users = ({ children }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const data = { email, setEmail, password, setPassword }


  return (
    <div>
      <UserContext.Provider value={data}>
        {children}

      </UserContext.Provider>
    </div>
  )
}

export default Users
