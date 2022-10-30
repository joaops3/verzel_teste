import React from 'react'



const Loading = () => {
  return (
    <div className='loading'>
      <div className='loading icon'>
        <img src={"/images/loading.svg"} alt="loading icon" className='icon' />
        <div>Carregando...</div>
      </div>
      
    </div>
  )
}

export default Loading