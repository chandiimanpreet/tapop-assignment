import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protector = ({ user }) => {
console.log(user)
    if (user) {
        return <Outlet />
    }
    else {
        return <Navigate to='/signIn' />
    }
}

export default Protector
