import Image from 'next/image'
import React from 'react'

export const Logo = () => {
  return (

    <Image
      className='w-full'
      src="/logo.svg"
      alt="Logo CashTracker"
      width={0}
      height={0}
      priority
    />

  )
}
