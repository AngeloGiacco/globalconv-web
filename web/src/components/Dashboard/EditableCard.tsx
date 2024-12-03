import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils' // Utility for conditional classNames

interface EditableCardProps {
  title: string
  content: string
  onSaveForLocale: (newContent: string) => void
  onSaveAcrossLocales: (newContent: string) => void
}

const EditableCard: React.FC<EditableCardProps> = ({
  title,
  content,
  onSaveForLocale,
  onSaveAcrossLocales,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedContent, setEditedContent] = useState<string>(content)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [hasChanges, setHasChanges] = useState<boolean>(false)

  useEffect(() => {
    setEditedContent(content)
    setHasChanges(false)
  }, [content])

  const handleEdit = () => {
    setIsEditing(true)
    setHasChanges(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setEditedContent(newContent)
    setHasChanges(newContent !== content)
  }

  const handleSave = () => {
    setIsDialogOpen(true)
  }

  const handleSaveForLocale = () => {
    onSaveForLocale(editedContent)
    setIsDialogOpen(false)
    setIsEditing(false)
  }

  const handleSaveAcrossLocales = () => {
    onSaveAcrossLocales(editedContent)
    setIsDialogOpen(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(content)
    setIsDialogOpen(false)
    setIsEditing(false)
    setHasChanges(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
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

      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editedContent}
            onChange={handleChange}
            className="resize-none bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg"
            rows={5}
          />
          <div className="flex items-center justify-between">
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
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {content}
        </p>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Changes</DialogTitle>
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

export default EditableCard 