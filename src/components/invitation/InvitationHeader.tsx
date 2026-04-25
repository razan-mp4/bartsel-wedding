'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  showBack?: boolean
  backHref?: string
  onOpenMenu?: () => void
  visible?: boolean
}

export default function InvitationHeader({
  showBack = false,
  backHref = '#',
  onOpenMenu,
  visible = true,
}: Props) {
  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
      style={{
        top: 0,
      }}
    >
      {/* This covers the Telegram/Safari floating top gap */}
      <div
        className="absolute left-0 right-0 bg-[#f3efe8]/92 backdrop-blur-md"
        style={{
          top: '-120px',
          height: '120px',
        }}
      />

      <div className="relative border-b border-[#d8d0c3] bg-[#f3efe8]/92 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 md:px-5">
          <div className="flex h-[68px] items-center justify-between">
            <div className="flex w-12 items-center justify-start">
              {showBack ? (
                <Link
                  href={backHref}
                  className="flex items-center justify-center text-[#6f7f57]"
                  aria-label="Back"
                >
                  <ChevronLeft className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.8} />
                </Link>
              ) : null}
            </div>

            <div className="flex w-12 items-center justify-end">
              <button
                type="button"
                onClick={onOpenMenu}
                className="text-[36px] leading-none text-[#6f7f57]"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}