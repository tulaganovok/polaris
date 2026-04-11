'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)

  const handleBlocking = async () => {
    setIsLoading(true)
    await fetch('/api/demo/blocking', { method: 'POST' })
    setIsLoading(false)
  }

  const handleBackground = async () => {
    setIsLoading2(true)
    await fetch('/api/demo/background', { method: 'POST' })
    setIsLoading2(false)
  }

  return (
    <div className='p-8 space-x-4'>
      <Button onClick={handleBlocking} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Blocking'}
      </Button>

      <Button onClick={handleBackground} disabled={isLoading2}>
        {isLoading2 ? 'Loading...' : 'Background'}
      </Button>
    </div>
  )
}
