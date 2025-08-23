import React from 'react'


const ErrorDisplay = ({error}: {error: string | undefined}) => {
  return (
    <p className='text-red-500 ml-3'> {error} </p>
  )
}

export default ErrorDisplay
