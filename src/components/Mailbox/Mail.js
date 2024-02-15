import React from 'react'

const Mail = ({mail,closemail}) => {
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center my-2 border-bottom py-2'>
        <span className='mx-4 fw-bold fs-6 text-decoration-none' onClick={closemail} style={{cursor:'pointer'}}>🢀 Back</span>
      </div>
      <div className='mx-5 p-2 border'>
        <div className='border-bottom py-2 fw-bold'>{mail.subject}</div>
        <div className='d-flex flex-column border-bottom py-2'>
          <div className='fw-bold'>{mail.from}</div>
          <div>{mail.to}</div>
        </div>
        <div className='p-2' dangerouslySetInnerHTML={{__html:mail.message}}></div>
      </div>
    </div>
  )
}

export default Mail