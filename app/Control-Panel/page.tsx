'use client'
import useAuthCheck from '@/hooks/useAuthCheck'
import React from 'react'

const page = () => {
  useAuthCheck();
  return (
    <div>this is Control page over here...</div>
  )
}

export default page