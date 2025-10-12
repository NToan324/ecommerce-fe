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

import { Combobox } from '@/components/comboBox'
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
import useProduct from '@/hooks/useProduct'
import useUpload from '@/hooks/useUpload'
import productSchema from '@/schemas/product.schema'
import { useBrandStore } from '@/stores/brand.store'
import { useCategoryStore } from '@/stores/category.store'
import { avatarPreviewType } from '@/types/common.type'
import { convertByteToMB } from '@/utils/helpers'

interface DialogCreateProductProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function DialogCreateProduct({ open, setOpen }: DialogCreateProductProps) {
  const form = useForm<z.infer<typeof productSchema.createProduct>>({
    resolver: zodResolver(productSchema.createProduct),
    defaultValues: {
      product_name: '',
      brand_id: '',
      category_id: '',
      product_image: {
        url: '',
        public_id: '',
      },
    },
  })

  const [avatarPreview, setAvatarPreview] = useState<avatarPreviewType | null>(null)
  const { mutate: createProduct, isPending: isPendingCreateProduct } = useProduct.createProduct({
    onClose: () => {
      setOpen(false)
      form.reset()
      setAvatarPreview(null)
    },
  })

  const categories = useCategoryStore((state) => state.categories)
  const brands = useBrandStore((state) => state.brands)

  const { mutateAsync: uploadProductImage, isPending: isPendingUploadProductImage } = useUpload.uploadImage()

  const onDrop = useCallback(
    (acceptFile: File[]) => {
      if (acceptFile && acceptFile.length > 0) {
        setAvatarPreview({
          src: URL.createObjectURL(acceptFile[0]),
          name: acceptFile[0].name,
          size: acceptFile[0].size,
          file: acceptFile[0],
        })
        form.setValue('product_image.url', acceptFile[0].name)
      } else {
        toast.error('Please select an image file less than 2 MB in size')
      }
    },
    [form]
  )

  const removeFile = () => {
    setAvatarPreview(null)
    form.setValue('product_image.url', '')
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

  const handleSubmit = async (data: z.infer<typeof productSchema.createProduct>) => {
    if (!avatarPreview?.file) {
      toast.error('Please upload a product image')
      return
    }
    const formData = new FormData()
    formData.append('file', avatarPreview.file)
    const { data: imageUrl } = await uploadProductImage(formData)
    if (imageUrl) {
      const url = imageUrl.url
      const public_id = imageUrl.public_id
      const payload = {
        product_name: data.product_name,
        category_id: data.category_id,
        brand_id: data.brand_id,
        product_image: {
          url,
          public_id,
        },
      }
      createProduct(payload)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTrigger asChild>
            <Button type="button" className="w-full h-12 bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl">
              <GoPlus size={20} strokeWidth={1} />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product</DialogTitle>
              <DialogDescription>Enter a new product for your inventory, then hit Save.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
              <div className="flex flex-col w-full justify-center items-center gap-4">
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            {...field}
                            id="name"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
                          />
                          <FloatingLabel htmlFor="name">Name</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.product_name && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.product_name.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Combobox
                          data={
                            categories.length > 0
                              ? categories.map((item) => {
                                  return {
                                    id: item._id,
                                    name: item.category_name,
                                    status: item.isActive,
                                  }
                                })
                              : []
                          }
                          selectedData={
                            form.getValues('category_id')
                              ? [
                                  {
                                    id: form.getValues('category_id'),
                                    name:
                                      categories.find((category) => category._id === form.getValues('category_id'))
                                        ?.category_name || '',
                                    status:
                                      categories.find((category) => category._id === form.getValues('category_id'))
                                        ?.isActive || false,
                                  },
                                ]
                              : []
                          }
                          index={0}
                          handleOnChange={(value) => {
                            field.onChange(value)
                          }}
                          titleTrigger="Category"
                        />
                      </FormControl>
                      {form.formState.errors.category_id && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.category_id.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Combobox
                          data={
                            brands.length > 0
                              ? brands.map((item) => {
                                  return {
                                    id: item._id,
                                    name: item.brand_name,
                                    status: item.isActive,
                                  }
                                })
                              : []
                          }
                          selectedData={
                            form.getValues('brand_id')
                              ? [
                                  {
                                    id: form.getValues('brand_id'),
                                    name:
                                      brands.find((brand) => brand._id === form.getValues('brand_id'))?.brand_name ||
                                      '',
                                    status:
                                      brands.find((brand) => brand._id === form.getValues('brand_id'))?.isActive ||
                                      false,
                                  },
                                ]
                              : []
                          }
                          index={0}
                          handleOnChange={(value) => {
                            field.onChange(value)
                          }}
                          titleTrigger="Brand"
                        />
                      </FormControl>
                      {form.formState.errors.brand_id && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.brand_id.message}</p>
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
                  name="product_image.url"
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
                {form.formState.errors.product_image?.url && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.product_image.url.message}</p>
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
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col items-start justify-between">
                          <h5 className="line-clamp-2 text-sm font-semibold text-[#6D6D6D]">
                            {form.getValues('product_image.url') || avatarPreview.name || 'default.jpg'}
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
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isPendingUploadProductImage || isPendingCreateProduct}
                type="submit"
                className="w-full float-end max-w-[100px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Create
                {isPendingCreateProduct || (isPendingUploadProductImage && <Loading />)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
