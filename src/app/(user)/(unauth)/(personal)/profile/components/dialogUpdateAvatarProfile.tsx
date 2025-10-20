'ues client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { toastError } from '@components/toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { IoIosCamera, IoIosClose } from 'react-icons/io'
import { MdOutlineCloudUpload } from 'react-icons/md'
import z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormField, FormItem } from '@/components/ui/form'
import useUpload from '@/hooks/useUpload'
import useUser from '@/hooks/useUser'
import profileSchema from '@/schemas/profile.schema'
import { avatarPreviewType, Image as ImageType } from '@/types/common.type'
import { convertByteToMB } from '@/utils/helpers'

interface DialogCreateCategoryProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: ImageType
}

export function DialogUpdateAvatarProfile({ open, setOpen, data }: DialogCreateCategoryProps) {
  const form = useForm<z.infer<typeof profileSchema.changeAvatar>>({
    resolver: zodResolver(profileSchema.changeAvatar),
    defaultValues: {
      avatar: { url: '', public_id: '' },
    },
  })

  const [avatarPreview, setAvatarPreview] = useState<avatarPreviewType | null>(null)

  const { mutate: updateProfile, isPending: isPendingUpdateProfile } = useUser.updateProfile({
    onClose: () => {
      setOpen(false)
    },
  })
  const { mutateAsync: uploadCategoryImage, isPending: isPendingUploadImage } = useUpload.uploadImage()

  useEffect(() => {
    if (data && data.url) {
      form.setValue('avatar.url', data.url)
    }
  }, [data, form])

  const onDrop = useCallback(
    (acceptFile: File[]) => {
      if (acceptFile && acceptFile.length > 0) {
        setAvatarPreview({
          src: URL.createObjectURL(acceptFile[0]),
          name: acceptFile[0].name,
          size: acceptFile[0].size,
          file: acceptFile[0],
        })
        form.setValue('avatar.url', acceptFile[0].name)
      } else {
        toastError('Please select an image file less than 2 MB in size')
      }
    },
    [form]
  )

  const removeFile = () => {
    setAvatarPreview(null)
    form.setValue('avatar.url', '')
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: 2 * 1024 * 1024,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
    },
  })

  const handleSubmit = async () => {
    if (!avatarPreview?.file) {
      toastError('Please upload an image from your device')
      return
    }
    const formData = new FormData()
    formData.append('file', avatarPreview.file)
    const { data: imageUrl } = await uploadCategoryImage(formData)
    if (imageUrl) {
      const url = imageUrl.url
      const public_id = imageUrl.public_id
      const payload = {
        avatar: { url, public_id },
      }
      updateProfile(payload)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="group w-6 h-6 md:w-8 md:h-8 flex justify-center items-center rounded-full hover:bg-blue-tertiary/50 bg-blue-tertiary/60 backdrop-blur-lg"
            >
              <IoIosCamera className="md:size-5 size-3 group-hover:scale-110 transition-transform duration-200" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Change Avatar</DialogTitle>
            </DialogHeader>
            <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
              <div className="flex flex-col w-full justify-start items-start gap-4">
                <div className="flex flex-col w-full gap-2">
                  <p className="text-sm font-medium text-[#6D6D6D]">You can select up to 1 file</p>
                </div>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={() => (
                    <FormItem className="w-full space-y-2">
                      <div
                        {...getRootProps()}
                        className="border-shade-1 flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[8px] border border-dashed p-2"
                      >
                        <MdOutlineCloudUpload className="text-shade-1" size={36} />
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p className="text-center">Drag and drop your file here</p>
                        ) : (
                          <p className="text-center text-sm">
                            Drag and drop your file here or click{' '}
                            <span className="text-blue-tertiary">Select file to upload</span>{' '}
                          </p>
                        )}
                        <p className="text-sm text-[#A1A1A1]">The maximum file size is 2 MB.</p>
                      </div>
                    </FormItem>
                  )}
                />

                <p className="text-sm font-medium text-[#6D6D6D]">Supported formats: .jpg, .png, .svg.</p>
                {form.formState.errors.avatar?.url && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.avatar.url.message}</p>
                )}
                {avatarPreview && (
                  <>
                    <div className="h-px w-full bg-gray-300"></div>
                    <div className="flex w-full items-center justify-between gap-3 rounded-[12px] border border-[#E7E7E7] p-4">
                      <div className="flex items-center justify-start gap-2">
                        <div className="relative overflow-hidden w-[120px] max-w-[120px] h-[120px] border border-blue-primary rounded-[20px]">
                          <Image
                            src={avatarPreview.src || '/images/laptop.png'}
                            alt="product image"
                            fill
                            objectFit="contain"
                          />
                        </div>
                        <div className="flex flex-col items-start justify-between">
                          <h5 className="line-clamp-2 text-sm font-semibold text-[#6D6D6D]">
                            {form.getValues('avatar.url') || avatarPreview.name || 'default.jpg'}
                          </h5>
                          <p className="text-xs text-[#A1A1A1]">
                            {avatarPreview.size ? convertByteToMB(avatarPreview.size) || 0 : 0} mb
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#E4E4E4]"
                        onClick={removeFile}
                      >
                        <IoIosClose size={20} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <DialogFooter className="flex flex-row justify-end items-center">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-2xl max-w-[100px]"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isPendingUpdateProfile || isPendingUploadImage}
                type="submit"
                className="w-full float-end max-w-[150px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Update Avatar
                {isPendingUpdateProfile || (isPendingUploadImage && <Loading />)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
