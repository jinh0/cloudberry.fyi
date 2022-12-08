import { LinkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Tooltip, Button } from '@mantine/core'

/**
 * Copy Link Button
 */

const ShareButton = () => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 275)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className='flex flex-row items-center ml-2'>
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
            setCopied(true)
          }}
        >
          <div className=''>
            {copied ? (
              <CheckIcon className='w-5 h-5 text-green-700' />
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
