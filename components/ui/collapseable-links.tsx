'use client'

import { useState } from 'react'
import PrefetchLink from './prefetch-link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type SidebarItem = {
  label: string
  href: string
  icon?: React.ReactNode
}

type SidebarCollapseGroupProps = {
  label: string
  icon?: React.ReactNode
  items: SidebarItem[]
  sidebarExpanded: boolean
}

export default function SidebarCollapseGroup({
  label,
  icon,
  items,
  sidebarExpanded,
}: SidebarCollapseGroupProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full">
      {/* Group Header */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={cn(
          "flex w-full items-center gap-3 rounded px-2 py-2 text-sm transition-colors hover:bg-gray-100",
          !sidebarExpanded && "justify-center"
        )}
      >
        {icon}
        {sidebarExpanded && (
          <>
            <span className="flex-1 text-left">{label}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                open && "rotate-180"
              )}
            />
          </>
        )}
      </button>

      {/* Items */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open && sidebarExpanded ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="ml-8 flex flex-col gap-1 py-1">
          {items.map(item => (
            <PrefetchLink
              key={item.href}
              href={item.href}
              className="rounded px-2 py-1.5 text-sm hover:bg-gray-100"
            >
              {item.label}
            </PrefetchLink>
          ))}
        </div>
      </div>
    </div>
  )
}
