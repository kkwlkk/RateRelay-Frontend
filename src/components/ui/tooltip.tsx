"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (triggerRef.current) {
      triggerRef.current.dispatchEvent(new Event('mouseenter', { bubbles: true }));
    }
    props.onTouchStart?.(e);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.dispatchEvent(new Event('mouseleave', { bubbles: true }));
      }, 2000);
    }
    props.onTouchEnd?.(e);
  };

  return (
    <TooltipPrimitive.Trigger 
      ref={triggerRef}
      data-slot="tooltip-trigger" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...props} 
    />
  )
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-zinc-800 text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          "select-none",
          className
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }