import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface WidgetSettings {
  call_to_action: string
  listening: string
  speaking: string
  start_call: string
  end_call: string
}

interface WidgetSettingsCardProps {
  settings: WidgetSettings
  onSaveForLocale: (newSettings: WidgetSettings) => void
  onSaveAcrossLocales: (newSettings: WidgetSettings) => void
}

const WidgetSettingsCard: React.FC<WidgetSettingsCardProps> = ({
  settings,
  onSaveForLocale,
  onSaveAcrossLocales,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedSettings, setEditedSettings] = useState<WidgetSettings>(settings)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [hasChanges, setHasChanges] = useState<boolean>(false)

  useEffect(() => {
    setEditedSettings(settings)
    setHasChanges(false)
  }, [settings])

  const handleEdit = () => {
    setIsEditing(true)
    setHasChanges(false)
  }

  const handleChange = (field: keyof WidgetSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = { ...editedSettings, [field]: e.target.value }
    setEditedSettings(newSettings)
    setHasChanges(JSON.stringify(newSettings) !== JSON.stringify(settings))
  }

  const handleSave = () => {
    setIsDialogOpen(true)
  }

  const handleSaveForLocale = () => {
    onSaveForLocale(editedSettings)
    setIsDialogOpen(false)
    setIsEditing(false)
  }

  const handleSaveAcrossLocales = () => {
    onSaveAcrossLocales(editedSettings)
    setIsDialogOpen(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedSettings(settings)
    setIsDialogOpen(false)
    setIsEditing(false)
    setHasChanges(false)
  }

  const fields = [
    { key: 'call_to_action', label: 'Call to Action Button' },
    { key: 'listening', label: 'Listening Status' },
    { key: 'speaking', label: 'Speaking Status' },
    { key: 'start_call', label: 'Start Call Message' },
    { key: 'end_call', label: 'End Call Message' },
  ] as const

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Widget Settings
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Customize the widget interface text
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            Edit
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
            {isEditing ? (
              <Input
                value={editedSettings[key] || ''}
                onChange={handleChange(key)}
                className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {settings[key] || '(Not set)'}
              </p>
            )}
          </div>
        ))}

        {isEditing && (
          <div className="flex items-center justify-between pt-4">
            {hasChanges && (
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Unsaved changes
              </div>
            )}
            <div className={cn("flex gap-2", !hasChanges && "ml-auto")}>
              <Button 
                variant="ghost" 
                onClick={handleCancel}
                size="sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!hasChanges}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Widget Settings</DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose how you'd like to save your changes
            </p>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={handleSaveForLocale}
            >
              This language only
            </Button>
            <Button 
              onClick={handleSaveAcrossLocales}
              className="bg-blue-600 hover:bg-blue-700"
            >
              All languages
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WidgetSettingsCard 