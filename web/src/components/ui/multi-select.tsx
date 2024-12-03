import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'

interface Option {
  value: string
  label: string
  icon?: React.ComponentType<any>
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, value, onChange, placeholder = 'Select options...' }: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const selected = value.map(val => options.find(opt => opt.value === val)!).filter(Boolean)

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(val => val !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  const handleRemove = (optionValue: string) => {
    onChange(value.filter(val => val !== optionValue))
  }

  return (
    <div className="relative">
      <div
        className="relative w-full border border-gray-200 rounded-lg min-h-[38px] p-1 flex flex-wrap gap-1 cursor-text"
        onClick={() => setOpen(true)}
      >
        {selected.length === 0 && (
          <div className="px-2 py-1 text-gray-500">{placeholder}</div>
        )}
        {selected.map(option => (
          <Badge
            key={option.value}
            variant="secondary"
            className="flex items-center gap-1 pr-1"
          >
            {option.icon && <option.icon className="w-3 h-3" />}
            {option.label}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRemove(option.value)
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleRemove(option.value)
              }}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
      <Command className={`absolute z-50 w-full top-full mt-1 rounded-lg border shadow-md bg-white ${open ? '' : 'hidden'}`}>
        <CommandInput placeholder="Search..." className="border-none focus:ring-0" />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="max-h-64 overflow-auto">
          {options.map(option => (
            <CommandItem
              key={option.value}
              onSelect={() => handleSelect(option.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {option.icon && <option.icon className="w-4 h-4" />}
              {option.label}
              <Check
                className={`ml-auto h-4 w-4 ${
                  value.includes(option.value) ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  )
}