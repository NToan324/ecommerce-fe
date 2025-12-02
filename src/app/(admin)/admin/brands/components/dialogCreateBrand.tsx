'ues client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { toastError } from '@components/toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import { IoIosClose } from 'react-icons/io'
import { MdOutlineCloudUpload } from 'react-icons/md'
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
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useBrand from '@/hooks/useBrand'
import useUpload from '@/hooks/useUpload'
import brandSchema from '@/schemas/brand.schema'
import { avatarPreviewType } from '@/types/common.type'
import { convertByteToMB } from '@/utils/helpers'

interface DialogCreateBrandProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function DialogCreateBrand({ open, setOpen }: DialogCreateBrandProps) {
  const form = useForm<z.infer<typeof brandSchema.createBrand>>({
    resolver: zodResolver(brandSchema.createBrand),
    defaultValues: {
      brand_name: '',
      brand_image: {
        url: '',
        public_id: '',
      },
    },
  })

  const [avatarPreview, setAvatarPreview] = useState<avatarPreviewType | null>(null)
  const { mutate: createBrand, isPending: isPendingcreateBrand } = useBrand.createBrand({
    onClose: () => {
      setAvatarPreview(null)
      form.reset()
      setOpen(false)
    },
  })
  const { mutateAsync: uploadBrandImage, isPending: isPendingUploadImage } = useUpload.uploadImage()

  const onDrop = useCallback(
    (acceptFile: File[]) => {
      if (acceptFile && acceptFile.length > 0) {
        setAvatarPreview({
          src: URL.createObjectURL(acceptFile[0]),
          name: acceptFile[0].name,
          size: acceptFile[0].size,
          file: acceptFile[0],
        })
        form.setValue('brand_image.url', acceptFile[0].name)
      } else {
        toastError('Please select an image file less than 2 MB in size')
      }
    },
    [form]
  )

  const removeFile = () => {
    setAvatarPreview(null)
    form.setValue('brand_image.url', '')
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

  const handleSubmit = async (data: z.infer<typeof brandSchema.createBrand>) => {
    if (!avatarPreview?.file) {
      toastError('Please upload a brand image')
      return
    }
    const formData = new FormData()
    formData.append('file', avatarPreview.file)
    const { data: imageUrl } = await uploadBrandImage(formData)
    if (imageUrl) {
      const url = imageUrl.url
      const public_id = imageUrl.public_id
      const payload = {
        brand_name: data.brand_name,
        brand_image: {
          url,
          public_id,
        },
      }
      createBrand(payload)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTrigger asChild>
            <Button type="button" className="w-full h-12 bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl">
              <GoPlus size={20} strokeWidth={1} />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Brand</DialogTitle>
              <DialogDescription>Enter a new brand for your inventory, then hit Save.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
              <div className="flex flex-col w-full justify-center items-center gap-4">
                <FormField
                  control={form.control}
                  name="brand_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative w-full">
                        <FormControl>
                          <FloatingInput
                            {...field}
                            id="brand_name"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
                          />
                        </FormControl>
                        <FloatingLabel htmlFor="brand_name">Name</FloatingLabel>
                      </div>
                      {form.formState.errors.brand_name && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.brand_name.message}</p>
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
                  name="brand_image.url"
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
                {form.formState.errors.brand_image?.url && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.brand_image.url.message}</p>
                )}
                {avatarPreview && (
                  <>
                    <div className="h-px w-full bg-gray-300"></div>
                    <div className="flex w-full items-center justify-between gap-3 rounded-[12px] border border-[#E7E7E7] p-4">
                      <div className="flex items-center justify-start gap-2">
                        <div className="relative overflow-hidden w-[120px] max-w-[120px] h-[120px] border border-blue-primary rounded-[20px]">
                          <Image
                            src={avatarPreview.src || '/images/default_product_image.png'}
                            alt="product image"
                            fill
                            objectFit="contain"
                          />
                        </div>
                        <div className="flex flex-col items-start justify-between">
                          <h5 className="line-clamp-2 text-sm font-semibold text-[#6D6D6D]">
                            {form.getValues('brand_image.url') || avatarPreview.name || 'default.jpg'}
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
                disabled={isPendingcreateBrand || isPendingUploadImage}
                type="submit"
                className="w-full float-end max-w-[100px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Create
                {isPendingcreateBrand || (isPendingUploadImage && <Loading />)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
