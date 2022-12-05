import { LinkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Tooltip, Button } from '@mantine/core'

/**
 * Copy Link Button
 */

const ShareButton = () => {
  const [copied, setcopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setcopied(false)
    }, 250)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className='flex flex-row items-center'>
      <Tooltip
        label={copied ? 'Copied!' : 'Copy link'}
        color='black'
        withArrow
        arrowPosition='center'
      >
        <Button
          variant='outline'
          className='border-none rounded px-2.5 py-1 flex flex-row items-center gap-2'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setcopied(true)
          }}
        >
          <div className=''>
            {copied ? (
              <CheckIcon className='w-5 h-5 text-green-500' />
            ) : (
              <LinkIcon className='w-5 h-5 text-black' />
            )}
          </div>
        </Button>
      </Tooltip>
    </div>
  )
}

export default ShareButton
