import React from 'react'

const MainWrapper:  React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='max-w-[1280px] w-full h-full flex justify-center  mx-auto'>
        {children}
    </div>
  )
}

export default MainWrapper