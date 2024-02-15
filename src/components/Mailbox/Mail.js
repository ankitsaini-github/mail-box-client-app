import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Mail = (props) => {
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center my-2 border-bottom py-2'>
        <Link className='mx-4 fw-bold fs-6 text-decoration-none' to={'/inbox'}>🢀 Back</Link>
      </div>
      <div className='mx-5 p-2 border'>
        <div className='border-bottom py-2 fw-bold'>Subject</div>
        <div className='d-flex flex-column border-bottom py-2'>
          <div className='fw-bold'>from</div>
          <div>to</div>
        </div>
        <div className='p-2'>message</div>
      </div>
    </div>
  )
}

export default Mail