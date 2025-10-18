import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { toastError } from '@components/toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { z } from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import useBrand from '@/hooks/useBrand'
import useUpload from '@/hooks/useUpload'
import brandSchema from '@/schemas/brand.schema'
import { Brand, UpdateBrand as UpdateBrandType } from '@/types/brand.type'
import { avatarPreviewType } from '@/types/common.type'
import { convertByteToMB } from '@/utils/helpers'

interface UpdateBrandProps {
  brand: Brand
}

export default function UpdateBrand({ brand }: UpdateBrandProps) {
  const form = useForm<z.infer<typeof brandSchema.updateBrand>>({
    resolver: zodResolver(brandSchema.updateBrand),
    defaultValues: {
      brand_name: '',
      brand_image: {},
      isActive: true,
    },
  })

  const brandImageUrl = form.watch('brand_image.url')

  const [avatarPreview, setAvatarPreview] = useState<avatarPreviewType | null>(null)
  const { mutate: updateBrand, isPending: isPendingUpdateBrand } = useBrand.updateBrand(brand._id)
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
    form.setValue('brand_image.url', brand.brand_image.url || '')
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

  const handleSubmit = async (data: z.infer<typeof brandSchema.updateBrand>) => {
    let payload: Partial<UpdateBrandType> = {
      brand_name: data.brand_name,
      isActive: data.isActive,
    }

    if (avatarPreview?.file) {
      const formData = new FormData()
      formData.append('file', avatarPreview.file)
      const { data: imageUrl } = await uploadBrandImage(formData)
      if (imageUrl) {
        const url = imageUrl.url
        const public_id = imageUrl.public_id
        payload = {
          ...payload,
          brand_image: {
            url,
            public_id,
          },
        }
      }
    }
    updateBrand(payload)
  }

  const handleError = () => {
    toastError('Please fix the errors in the form')
  }

  useEffect(() => {
    if (brand) {
      form.setValue('brand_name', brand.brand_name)
      form.setValue('isActive', brand.isActive)
      form.setValue('brand_image', brand.brand_image || {})

      setAvatarPreview({
        src: brand.brand_image.url,
        name: brand.brand_image.url,
        size: 0,
      })
    }
  }, [])

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, handleError)}
          className="w-full flex flex-col gap-6 p-4 rounded-2xl border"
        >
          <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
            <div className="w-full flex justify-end items-center">
              <Button
                disabled={isPendingUpdateBrand || isPendingUploadImage}
                type="submit"
                className=" h-12  bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl"
              >
                Update brand
                {(isPendingUpdateBrand || isPendingUploadImage) && <Loading />}
              </Button>
            </div>
            <div className="grid grid-cols-2 w-full gap-8">
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
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="w-full flex justify-start items-center gap-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Active</FormLabel>
                    {form.formState.errors.isActive && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.isActive.message}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-8">
              <div className="relative w-full overflow-hidden h-[400px] border border-blue-primary rounded-[12px]">
                <Image
                  src={avatarPreview?.src || brandImageUrl || '/images/laptop.png'}
                  alt="product image"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col flex-1 justify-start items-start gap-4">
                <div className="flex justify-start items-start flex-col w-full gap-2">
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
                      <div className="flex items-center justify-start gap-2 w-full">
                        <div className="relative overflow-hidden w-[120px] max-w-[120px] h-[85px] border border-blue-primary rounded-[12px]">
                          <Image
                            src={avatarPreview.src || '/images/laptop.png'}
                            alt="product image"
                            fill
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col items-start w-full justify-between">
                          <h5 className="line-clamp-2 text-sm font-semibold break-normal max-w-[300px] text-[#6D6D6D]">
                            {form.getValues('brand_image.url') || avatarPreview.name || 'default.jpg'}
                          </h5>
                          <p className="text-xs text-[#A1A1A1]">
                            {avatarPreview.size ? convertByteToMB(avatarPreview.size) || 0 : 0} mb
                          </p>
                        </div>
                        <div
                          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#E4E4E4]"
                          onClick={removeFile}
                        >
                          <IoIosClose size={20} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
