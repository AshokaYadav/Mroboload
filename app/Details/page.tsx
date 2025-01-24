'use client'
import useAuthCheck from '@/hooks/useAuthCheck'
import React from 'react'

const page = () => {
  useAuthCheck();
  return (
    <div>This is Detail page showing over here...</div>
  )
}

export default page