'use client'
import useAuthCheck from '@/hooks/useAuthCheck'
import React from 'react'

const page = () => {
  useAuthCheck();
  return (
    <div>this is nothing but Id Management page!</div>
  )
}

export default page