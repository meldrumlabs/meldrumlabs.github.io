'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/20/solid'

export function AnnouncementBanner({
  message = "Enya — A Builder's Best Friend",
  linkText = "Learn more",
  linkHref = "/blog/enya",
  badge = "New",
  dismissible = true
}) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-meldrum-green-600/10 via-meldrum-blue-600/10 to-meldrum-green-600/10 px-6 py-2.5 sm:px-3.5 border-b border-meldrum-green-500/20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,transparent,rgba(142,192,124,0.05),transparent)] animate-[shimmer_3s_infinite]" />

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full">
        <p className="text-sm leading-6 text-zinc-300">
          {badge && (
            <span className="inline-flex items-center rounded-full bg-meldrum-green-500/20 px-2 py-0.5 text-xs font-semibold text-meldrum-green-400 ring-1 ring-inset ring-meldrum-green-500/30 mr-2">
              {badge}
            </span>
          )}
          <span>{message}</span>
          {linkHref && (
            <Link
              href={linkHref}
              className="ml-2 font-semibold text-meldrum-green-400 hover:text-meldrum-green-300 transition-colors"
            >
              {linkText}
              <span aria-hidden="true" className="ml-1">&rarr;</span>
            </Link>
          )}
        </p>
      </div>

      {dismissible && (
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="-m-1.5 p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
