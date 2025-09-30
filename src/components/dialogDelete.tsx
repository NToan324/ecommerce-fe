import React from 'react'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'

interface DialogDeleteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  name?: string
}

export default function DialogDelete({ open, onOpenChange, name }: DialogDeleteProps) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete {name?.toLowerCase()}</DialogTitle>
            <DialogDescription>Are you sure you want to delete this {name?.toLowerCase()}?</DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row justify-end items-center">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-2xl max-w-[100px]">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full float-end max-w-[100px] bg-red-700 hover:bg-red-600 text-white rounded-2xl"
            >
              Delete
              {/* <Loading /> */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
