import MenuApp from '@/components/MenuApp'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function PanelLayout({children}: Props) {
  return (
    <div className='w-full flex gap-10 overflow-hidden'>
      <MenuApp />
      <main className='w-full min-h-[calc(100dvh_-_80px)] p-5 overflow-auto'>
        {children}
      </main>
    </div>
  )
}

export default PanelLayout