'use client'
import useAuthCheck from '@/hooks/useAuthCheck'
import React from 'react'

const Page = () => {
  useAuthCheck();
  return (
    <div>this is Extra Management page over here...</div>
  )
}

export default Page