'use client'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

type Props = {
  name: string,
  image: string,
  label: string,
  className: string
  nextauthProvider: 'google' | 'github',
}

function NetworkAuthButton({
  className, image, label, name, nextauthProvider
}: Props) {
  return (
    <button
      onClick={() => signIn(nextauthProvider, {callbackUrl: DEFAULT_LOGIN_REDIRECT})}
      className={`px-3 py-2 rounded-md flex-1 flex justify-center gap-2 items-center ${className} hover:brightness-95 text-foreground`} >
      <Image src={image} alt={`${name} icon`} width={20} height={20} />
      {label}
    </button>
  )
}

export default NetworkAuthButton