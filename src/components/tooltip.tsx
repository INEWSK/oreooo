"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { FaExclamationCircle } from "react-icons/fa";

export default function TooltipComponent({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button type="button" className="tooltip-trigger" aria-label={label}>
            <FaExclamationCircle aria-hidden />
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="bottom"
          align="end"
          sideOffset={4}
          className="z-50 overflow-hidden rounded-md border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-sm text-white shadow-md"
        >
          {children}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
