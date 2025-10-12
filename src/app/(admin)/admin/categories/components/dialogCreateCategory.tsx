'ues client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import { IoIosClose } from 'react-icons/io'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { toast } from 'react-toastify'
import z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FloatingInput, FloatingLabel, FloatingTextarea } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useCategory from '@/hooks/useCategory'
import useUpload from '@/hooks/useUpload'
import categorySchema from '@/schemas/category.schema'
import { convertByteToMB } from '@/utils/helpers'

interface DialogCreateCategoryProps {
  open: boolean
  setOpen: (open: boolean) => void
}

interface avatarPreviewType {
  src: string | null
  name: string | null
  size: number | null
  file?: File
}

export function DialogCreateCategory({ open, setOpen }: DialogCreateCategoryProps) {
  const form = useForm<z.infer<typeof categorySchema.createCategory>>({
    resolver: zodResolver(categorySchema.createCategory),
    defaultValues: {
      category_name: '',
      category_description: '',
      category_image: {
        url: '',
        public_id: '',
      },
    },
  })

  const [avatarPreview, setAvatarPreview] = useState<avatarPreviewType | null>(null)
  const { mutate: createCategory, isPending: isPendingcreateCategory } = useCategory.createCategory({
    onClose: () => {
      setAvatarPreview(null)
      form.reset()
      setOpen(false)
    },
  })
  const { mutateAsync: uploadCategoryImage, isPending: isPendingUploadImage } = useUpload.uploadImage()

  const onDrop = useCallback(
    (acceptFile: File[]) => {
      if (acceptFile && acceptFile.length > 0) {
        setAvatarPreview({
          src: URL.createObjectURL(acceptFile[0]),
          name: acceptFile[0].name,
          size: acceptFile[0].size,
          file: acceptFile[0],
        })
        form.setValue('category_image.url', acceptFile[0].name)
      } else {
        toast.error('Please select an image file less than 2 MB in size')
      }
    },
    [form]
  )

  const removeFile = () => {
    setAvatarPreview(null)
    form.setValue('category_image.url', '')
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

  const handleSubmit = async (data: z.infer<typeof categorySchema.createCategory>) => {
    if (!avatarPreview?.file) {
      toast.error('Please upload a category image')
      return
    }
    const formData = new FormData()
    formData.append('file', avatarPreview.file)
    const { data: imageUrl } = await uploadCategoryImage(formData)
    if (imageUrl) {
      const url = imageUrl.url
      const public_id = imageUrl.public_id
      const payload = {
        category_name: data.category_name,
        category_description: data.category_description,
        category_image: {
          url,
          public_id,
        },
      }
      createCategory(payload)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTrigger asChild>
            <Button type="button" className="w-full bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl">
              <GoPlus size={20} strokeWidth={1} />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Category</DialogTitle>
              <DialogDescription>Enter a new category for your inventory, then hit Save.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
              <div className="flex flex-col w-full justify-center items-center gap-4">
                <FormField
                  control={form.control}
                  name="category_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative w-full">
                        <FormControl>
                          <FloatingInput
                            {...field}
                            id="category_name"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
                          />
                        </FormControl>
                        <FloatingLabel htmlFor="category_name">Name</FloatingLabel>
                      </div>
                      {form.formState.errors.category_name && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.category_name.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category_description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative w-full">
                        <FormControl>
                          <FloatingTextarea
                            {...field}
                            id="description"
                            className="h-36 rounded-[20px] w-full resize-none"
                            value={field.value}
                          />
                        </FormControl>
                        <FloatingLabel htmlFor="description" className="peer-placeholder-shown:top-6">
                          Description
                        </FloatingLabel>
                      </div>
                      {form.formState.errors.category_description && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.category_description.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-full justify-start items-start gap-4">
                <div className="flex flex-col w-full gap-2">
                  <h3 className="text-base font-bold">Image</h3>
                  <p className="text-sm font-medium text-[#6D6D6D]">You can select up to 1 file</p>
                </div>
                <FormField
                  control={form.control}
                  name="category_image.url"
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
                {form.formState.errors.category_image?.url && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.category_image.url.message}</p>
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
                            {form.getValues('category_image.url') || avatarPreview.name || 'default.jpg'}
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
                disabled={isPendingcreateCategory || isPendingUploadImage}
                type="submit"
                className="w-full float-end max-w-[100px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Create
                {isPendingcreateCategory || (isPendingUploadImage && <Loading />)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
