import MenuApp from '@/components/MenuApp'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function PanelLayout({children}: Props) {
  return (
    <div className='w-full flex overflow-hidden'>
      <MenuApp />
      <div className='w-full max-h-[calc(100dvh_-_80px)] p-5 overflow-auto'>
        {children}
      </div>
    </div>
  )
}

export default PanelLayout