'ues client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { toastError } from '@components/toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { useFieldArray, useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import { HiOutlineTrash } from 'react-icons/hi2'
import { IoIosClose } from 'react-icons/io'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { NumericFormat } from 'react-number-format'
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
import { Input } from '@/components/ui/input'
import { STATUS_FORM } from '@/constant'
import useProduct from '@/hooks/useProduct'
import useUpload from '@/hooks/useUpload'
import productSchema from '@/schemas/product.schema'
import { avatarPreviewType, Image as ImageType } from '@/types/common.type'
import { ProductVariant } from '@/types/product.type'
import { convertByteToMB } from '@/utils/helpers'

interface DialogCreateProductVariantProps {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  disableButton?: boolean
  productVariant?: ProductVariant
}

export function DialogCreateProductVariant({
  open,
  setOpen,
  id,
  title = 'Create product variant',
  productVariant,
  disableButton = false,
}: DialogCreateProductVariantProps) {
  const form = useForm<z.infer<typeof productSchema.createProductVariant>>({
    resolver: zodResolver(productSchema.createProductVariant),
    defaultValues: {
      product_id: id,
      variant_name: '',
      variant_description: '',
      attributes: [
        {
          key: '',
          value: '',
        },
      ],
      original_price: 0,
      price: 0,
      quantity: 1,
      discount: 0,
      images: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attributes',
  })

  const [statusForm, setStatusForm] = useState<STATUS_FORM>(STATUS_FORM.CREATE)
  const [avatarPreview, setAvatarPreview] = useState<avatarPreviewType[]>([])

  const { mutate: createProductVariant, isPending: isPendingCreateProductVariant } = useProduct.createProductVariant({
    onClose: () => {
      setOpen(false)
      form.reset()
      setAvatarPreview([])
    },
  })
  const { mutate: updateProductVariant, isPending: isPendingUpdateProductVariant } =
    useProduct.updateProductVariantById({
      onClose: () => {
        setOpen(false)
        form.reset()
        setAvatarPreview([])
      },
    })

  useEffect(() => {
    if (productVariant) {
      const attributes = Object.entries(productVariant.attributes || {}).map(([key, value]) => ({ key, value }))
      form.reset({
        product_id: productVariant.product_id,
        variant_name: productVariant.variant_name,
        variant_description: productVariant.variant_description,
        attributes: attributes,
        original_price: productVariant.original_price,
        price: productVariant.price,
        quantity: productVariant.quantity,
        discount: productVariant.discount ? productVariant.discount * 100 : 0,
        images: productVariant.images,
      })

      setAvatarPreview(
        productVariant.images.map((image) => ({
          src: image.url,
          name: image.public_id || '',
          size: 0,
        }))
      )

      setStatusForm(STATUS_FORM.UPDATE)
    }
  }, [productVariant, form, setStatusForm])

  const { mutateAsync: uploadProductImage, isPending: isPendingUploadProductImage } = useUpload.uploadMultipleImages()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length === 0) {
        toastError('Please select an image file less than 2 MB in size')
        return
      }

      const newPreviews = acceptedFiles.map((file) => ({
        src: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file,
      }))

      setAvatarPreview((prev) => [...prev, ...newPreviews])

      for (let index = 0; index < avatarPreview.length; index++) {
        form.setValue(`images.${index}.url`, avatarPreview[index].name)
      }
    },
    [form]
  )

  const removeFile = (id: string) => {
    const filterData = avatarPreview.filter((image) => image.src !== id)
    setAvatarPreview(filterData)
    for (let index = 0; index < filterData.length; index++) {
      form.setValue(`images.${index}.url`, filterData[index].name)
    }
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

  const handleSubmit = async (data: z.infer<typeof productSchema.createProductVariant>) => {
    if (!data.product_id) return toastError('Product ID is required')
    if (avatarPreview.length < 3) return toastError('Please upload at least 3 product images')

    const attributes = Object.fromEntries((data.attributes || []).filter((a) => a.key).map((a) => [a.key, a.value]))

    // Xác định loại ảnh
    const files = avatarPreview.filter((f) => f.file).map((f) => f.file as File)
    const urls = avatarPreview
      .filter((f) => !f.file)
      .map((f) => {
        return { url: f.src, public_id: f.name }
      })

    // Nếu có ảnh mới thì upload
    let imageUrls: ImageType[] = []
    if (files.length) {
      const res = await uploadProductImage(files)
      imageUrls = res.data || []
    }

    const payload = {
      product_id: data.product_id,
      variant_name: data.variant_name,
      variant_description: data.variant_description,
      attributes,
      original_price: data.original_price,
      price: data.price,
      quantity: data.quantity,
      discount: data.discount ? data.discount / 100 : 0,
      images: [...urls, ...imageUrls],
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { product_id, ...rest } = payload

    switch (statusForm) {
      case STATUS_FORM.CREATE:
        createProductVariant(payload)
        break
      case STATUS_FORM.UPDATE:
        if (!productVariant?._id) {
          toastError('Product variant ID is required')
          return
        }
        updateProductVariant({ id: productVariant._id, payload: rest })
        break
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {!disableButton && (
            <DialogTrigger asChild>
              <Button type="button" className="w-full h-12 bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl">
                <GoPlus size={20} strokeWidth={1} />
                {title}
              </Button>
            </DialogTrigger>
          )}

          <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Variant</DialogTitle>
              <DialogDescription>Enter a product variant for your inventory, then hit Save.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
              <div className="grid grid-cols-2 items-start w-full gap-4">
                <div className="col-span-2">
                  <h3 className="text-base font-bold">General</h3>
                </div>
                <FormField
                  control={form.control}
                  name="variant_name"
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
                      {form.formState.errors.variant_name && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.variant_name.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="variant_description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            {...field}
                            id="variant_description"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
                          />
                          <FloatingLabel htmlFor="variant_description">Description</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.variant_description && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.variant_description.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="original_price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <NumericFormat
                            value={field.value}
                            thousandSeparator=","
                            suffix=" VND"
                            customInput={Input}
                            onValueChange={(values) => {
                              field.onChange(values.floatValue)
                            }}
                            isAllowed={(values) => {
                              const { floatValue } = values
                              return floatValue === undefined || floatValue >= 0
                            }}
                            className="h-12 rounded-[20px]"
                            placeholder="Enter the original price"
                            id="original_price"
                          />
                          <FloatingLabel htmlFor="original_price">Original Price</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.original_price && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.original_price.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <NumericFormat
                            value={field.value}
                            thousandSeparator=","
                            suffix=" VND"
                            customInput={Input}
                            onValueChange={(values) => {
                              field.onChange(values.floatValue)
                            }}
                            isAllowed={(values) => {
                              const { floatValue } = values
                              return floatValue === undefined || floatValue >= 0
                            }}
                            className="h-12 rounded-[20px]"
                            placeholder="Enter the price"
                            id="price"
                          />
                          <FloatingLabel htmlFor="price">Price</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.price && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.price.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            type="number"
                            id="quantity"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
                            min={1}
                            onChange={(e) => {
                              field.onChange(Number(e.target.value))
                            }}
                          />
                          <FloatingLabel htmlFor="quantity">Quantity</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.quantity && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.quantity.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <NumericFormat
                            value={field.value}
                            thousandSeparator=","
                            suffix=" %"
                            customInput={Input}
                            onValueChange={(values) => {
                              field.onChange(values.floatValue)
                            }}
                            isAllowed={(values) => {
                              const { floatValue } = values
                              return floatValue === undefined || (floatValue >= 0 && floatValue <= 50)
                            }}
                            className="h-12 rounded-[20px]"
                            placeholder="Enter the discount"
                            id="discount"
                          />
                          <FloatingLabel htmlFor="discount">Discount</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.discount && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.discount.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <div className="w-full flex flex-col justify-start items-center gap-4 col-span-2">
                  <div className="flex justify-start items-center gap-4 w-full">
                    <h3 className="text-base font-bold">Attribute</h3>
                    <Button
                      type="button"
                      variant={'default'}
                      className="rounded-2xl bg-blue-secondary hover:bg-blue-secondary/90"
                      onClick={() => {
                        append({ key: '', value: '' })
                      }}
                    >
                      <GoPlus size={20} strokeWidth={1} />
                      Add
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div className="flex justify-between items-center gap-4 w-full" key={index}>
                      {/* Attribute Key Input */}
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.key`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <div className="relative w-full">
                                <FloatingInput {...field} id={`key-${index}`} className="h-12 rounded-[20px] w-full" />
                                <FloatingLabel htmlFor={`key-${index}`}>Key</FloatingLabel>
                              </div>
                            </FormControl>
                            {form.formState.errors.attributes?.[index]?.key?.message && (
                              <p className="text-red-500 text-sm mt-2">
                                {(form.formState.errors.attributes?.[index].key.message as string) || ''}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      {/* Attribute Value Input */}
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <div className="relative w-full">
                                <FloatingInput
                                  {...field}
                                  id={`value-${index}`}
                                  className="h-12 rounded-[20px] w-full"
                                />
                                <FloatingLabel htmlFor={`value-${index}`}>Value</FloatingLabel>
                              </div>
                            </FormControl>
                            {form.formState.errors.attributes?.[index]?.value?.message && (
                              <p className="text-red-500 text-sm mt-2">
                                {(form.formState.errors.attributes?.[index]?.value?.message as string) || ''}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-center items-center">
                        <HiOutlineTrash
                          size={24}
                          className="text-black hover:text-red-700 cursor-pointer transition-all duration-300"
                          strokeWidth={1.5}
                          onClick={() => remove(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col w-full justify-start items-start gap-4">
                <div className="flex flex-col w-full gap-2">
                  <h3 className="text-base font-bold">Image</h3>
                  <p className="text-sm font-medium text-[#6D6D6D]">You can select minimum 3 file</p>
                </div>
                <FormField
                  control={form.control}
                  name="images"
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
                {form.formState.errors.images && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.images.message}</p>
                )}
                <div className="grid grid-cols-3 w-full gap-4">
                  {avatarPreview &&
                    avatarPreview.map((image, index) => {
                      return (
                        <div key={image.src + index}>
                          {/* <div className="h-px w-full bg-gray-300"></div> */}
                          <div className="flex w-full flex-col items-center justify-between gap-3 rounded-[12px] border border-[#E7E7E7] p-4">
                            <div className="relative overflow-hidden w-full h-[120px] border border-blue-primary rounded-[12px]">
                              <Image
                                src={image.src || '/images/laptop.png'}
                                alt="product image"
                                fill
                                objectFit="cover"
                              />
                            </div>
                            <div className="flex items-center justify-start gap-2 w-full">
                              <div className="flex flex-col items-start justify-between">
                                <h5 className="line-clamp-1 text-sm font-semibold break-all text-[#6D6D6D]">
                                  {form.getValues(`images.${index}.url`) || image.name || 'default.jpg'}
                                </h5>
                                <p className="text-xs text-[#A1A1A1]">
                                  {image.size ? convertByteToMB(image.size) || 0 : 0} mb
                                </p>
                              </div>
                              <div
                                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#E4E4E4]"
                                onClick={() => {
                                  removeFile(image.src)
                                }}
                              >
                                <IoIosClose size={20} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
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
                disabled={isPendingUploadProductImage || isPendingCreateProductVariant || isPendingUpdateProductVariant}
                type="submit"
                className="w-full float-end max-w-[100px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
                onClick={form.handleSubmit(handleSubmit)}
              >
                {statusForm === STATUS_FORM.CREATE ? 'Create' : 'Update'}
                {isPendingCreateProductVariant ||
                  isPendingUpdateProductVariant ||
                  (isPendingUploadProductImage && <Loading />)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
