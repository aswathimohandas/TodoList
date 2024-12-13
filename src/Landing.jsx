import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center container-fluid bg-primary' style={{height:'100vh'}}>
        <div className='w-50 justify-content-center align-items-center p-5 text-center'>
            <h1 className='m-2 text-info'>Todos</h1>
            <Link className='btn btn-danger' to={'/home'}>Let's Go</Link>
        </div>

    </div>
    </>
  )
}

export default Landing
