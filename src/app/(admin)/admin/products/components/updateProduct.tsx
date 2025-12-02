'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { DialogCreateProductVariant } from '@admin/admin/products/components/dialogCreateProductVariant'
import { toastError } from '@components/toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { HiOutlineTrash } from 'react-icons/hi2'
import { IoIosClose } from 'react-icons/io'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { NumericFormat } from 'react-number-format'
import z from 'zod'

import { Combobox } from '@/components/comboBox'
import DialogDelete from '@/components/dialogDelete'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import useProduct from '@/hooks/useProduct'
import useUpload from '@/hooks/useUpload'
import productSchema from '@/schemas/product.schema'
import { Brand } from '@/types/brand.type'
import { Category } from '@/types/category.type'
import { avatarPreviewType } from '@/types/common.type'
import { CreateProduct, Product, ProductVariant } from '@/types/product.type'
import { convertByteToMB } from '@/utils/helpers'

interface UpdateProductProps {
  data: {
    product: Product
    categories: Category[]
    brands: Brand[]
  }
}
export default function UpdateProduct(props: UpdateProductProps) {
  const { product, categories, brands } = props.data
  const form = useForm<z.infer<typeof productSchema.updateProduct>>({
    resolver: zodResolver(productSchema.updateProduct),
    defaultValues: {
      product_name: product.product_name,
      brand_id: product.brand_id,
      category_id: product.category_id,
      product_image: product.product_image,
      isActive: product.isActive,
    },
  })

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<ProductVariant | null>(null)
  const [updateProductVariant, setUpdateProductVariant] = useState<ProductVariant | null>(null)

  const [viewProductVariants, setViewProductVariants] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<avatarPreviewType | null>(null)
  const productImageUrl = form.watch('product_image.url')
  const { mutate: updateProduct, isPending: isPendingUpdateProduct } = useProduct.updateProductById()
  const { mutateAsync: uploadProductImage, isPending: isPendingUploadProductImage } = useUpload.uploadImage()
  const { data: productVariants, isLoading: isLoadingProductVariants } = useProduct.getProductVariantsByProductId(
    product._id,
    viewProductVariants
  )
  const { mutate: deleteProduct, isPending: isPendingDeleteProduct } = useProduct.deleteProductVariant(
    {
      onClose: () => {
        setOpenDelete(null)
      },
    },
    product._id
  )

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
        toastError('Please select an image file less than 2 MB in size')
      }
    },
    [form]
  )

  const removeFile = () => {
    setAvatarPreview(null)
    form.setValue('product_image.url', product.product_image.url || '')
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

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
  }

  const handleSubmit = async (data: z.infer<typeof productSchema.updateProduct>) => {
    // Nếu có hình ảnh
    let payload: Partial<CreateProduct> = {}
    if (!avatarPreview?.file && data.product_image.url && data.product_image.url !== '') {
      payload = {
        isActive: data.isActive,
        product_name: data.product_name,
        category_id: data.category_id,
        brand_id: data.brand_id,
      }
    }
    if (avatarPreview?.file) {
      const formData = new FormData()
      formData.append('file', avatarPreview.file)
      const { data: imageUrl } = await uploadProductImage(formData)
      if (imageUrl) {
        const url = imageUrl.url
        const public_id = imageUrl.public_id
        payload = {
          isActive: data.isActive,
          product_name: data.product_name,
          category_id: data.category_id,
          brand_id: data.brand_id,
          product_image: {
            url,
            public_id,
          },
        }
      }
    }
    updateProduct({ id: product._id, payload: payload })
  }

  const handleError = () => {
    toastError('Please fill in all required fields')
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, handleError)}
          className="w-full flex flex-col gap-6 p-4 rounded-2xl border"
        >
          <div className="gap-8 w-full flex-col flex justify-start items-center">
            <div className="w-full gap-4 flex justify-end items-center">
              <Button
                disabled={isPendingUpdateProduct || isPendingUploadProductImage}
                type="submit"
                className=" h-12  bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl"
              >
                Update product
                {(isPendingUpdateProduct || isPendingUploadProductImage) && <Loading />}
              </Button>
            </div>
            <div className="w-full grid grid-cols-2 gap-8">
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
                          className="h-16 rounded-[20px] w-full"
                          value={field.value}
                        />
                        <FloatingLabel htmlFor="name">Product Name</FloatingLabel>
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
                        data={categories.map((item) => {
                          return {
                            id: item._id,
                            name: item.category_name,
                            status: item.isActive,
                          }
                        })}
                        selectedData={
                          form.getValues('category_id')
                            ? categories
                                .filter((category) => category._id === form.getValues('category_id'))
                                .map((item) => {
                                  return {
                                    id: item._id,
                                    name: item.category_name,
                                    status: item.isActive,
                                  }
                                })
                            : []
                        }
                        index={0}
                        handleOnChange={(value) => {
                          field.onChange(value)
                        }}
                        titleTrigger="Category"
                        className="!h-16"
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
                        data={brands.map((item) => {
                          return {
                            id: item._id,
                            name: item.brand_name,
                            status: item.isActive,
                          }
                        })}
                        selectedData={
                          form.getValues('brand_id')
                            ? brands
                                .filter((category) => category._id === form.getValues('brand_id'))
                                .map((item) => {
                                  return {
                                    id: item._id,
                                    name: item.brand_name,
                                    status: item.isActive,
                                  }
                                })
                            : []
                        }
                        index={0}
                        handleOnChange={(value) => {
                          field.onChange(value)
                        }}
                        titleTrigger="Brand"
                        className="!h-16"
                      />
                    </FormControl>
                    {form.formState.errors.brand_id && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.brand_id.message}</p>
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
                  src={avatarPreview?.src || productImageUrl || '/images/default_product_image.png'}
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
                        <div className="relative overflow-hidden w-[120px] max-w-[120px] h-[85px] border border-blue-primary rounded-[12px]">
                          <Image
                            src={avatarPreview.src || '/images/default_product_image.png'}
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
          </div>
        </form>
      </Form>
      <div className="w-full flex justify-center items-center">
        <h3 className="text-2xl font-bold text-center whitespace-pre-line max-w-[50%]">Product Variants</h3>
      </div>
      {/* Danh sách các biến thể sản phẩm */}
      <div className="flex justify-between items-center gap-8 w-full flex-col p-4 rounded-2xl border">
        <div className="grid grid-cols-2 items-start w-full gap-4">
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Button
              disabled={isLoadingProductVariants}
              variant={'outline'}
              className="h-12 rounded-2xl"
              onClick={() => setViewProductVariants(!viewProductVariants)}
            >
              View Product Variant
              {isLoadingProductVariants && <Loading />}
            </Button>
            <DialogCreateProductVariant open={open} setOpen={setOpen} id={product._id} />
          </div>

          {isLoadingProductVariants ? (
            <div className="col-span-2 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            productVariants &&
            productVariants.data.data.length > 0 &&
            productVariants.data.data.map((productVariant) => {
              return (
                <div className="w-full col-span-2 grid-cols-2 grid gap-4" key={productVariant._id}>
                  <div className="col-span-2">
                    <h3 className="text-xl font-bold">{productVariant.variant_name}</h3>
                  </div>
                  <div className="col-span-2 flex justify-between items-center gap-2">
                    <h3 className="text-base font-bold">General</h3>
                    <div className="flex justify-end items-center gap-4">
                      <Button
                        type="button"
                        className="w-full max-w-[150px] h-12 bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl"
                        onClick={() => {
                          setUpdateProductVariant(productVariant)
                        }}
                      >
                        Update Variant
                      </Button>
                      <Button
                        onClick={() => {
                          setOpenDelete(productVariant)
                        }}
                        type="button"
                        className=" h-12 w-12  bg-red-600 hover:bg-red-700 rounded-2xl"
                      >
                        <HiOutlineTrash
                          size={24}
                          title={`Delete ${product.product_name}`}
                          className="text-white cursor-pointer transition-all duration-300"
                          strokeWidth={1.5}
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <FloatingInput
                      id="name"
                      className="h-12 rounded-[20px] w-full"
                      value={productVariant.variant_name}
                      disabled
                    />
                    <FloatingLabel htmlFor="name">Name</FloatingLabel>
                  </div>
                  <div className="relative w-full">
                    <FloatingInput
                      id="variant_description"
                      className="h-12 rounded-[20px] w-full"
                      value={productVariant.variant_description}
                      disabled
                    />
                    <FloatingLabel htmlFor="variant_description">Description</FloatingLabel>
                  </div>
                  <div className="relative w-full">
                    <NumericFormat
                      thousandSeparator=","
                      suffix=" VND"
                      disabled
                      customInput={Input}
                      isAllowed={(values) => {
                        const { floatValue } = values
                        return floatValue === undefined || floatValue >= 0
                      }}
                      value={productVariant.original_price}
                      className="h-12 rounded-[20px]"
                      placeholder="Enter the original price"
                      id="original_price"
                    />
                    <FloatingLabel htmlFor="original_price">Original Price</FloatingLabel>
                  </div>
                  <div className="relative w-full">
                    <NumericFormat
                      thousandSeparator=","
                      disabled
                      suffix=" VND"
                      customInput={Input}
                      isAllowed={(values) => {
                        const { floatValue } = values
                        return floatValue === undefined || floatValue >= 0
                      }}
                      value={productVariant.price}
                      className="h-12 rounded-[20px]"
                      placeholder="Enter the price"
                      id="price"
                    />
                    <FloatingLabel htmlFor="price">Price</FloatingLabel>
                  </div>
                  <div className="relative w-full">
                    <FloatingInput
                      value={productVariant.quantity}
                      disabled
                      type="number"
                      id="quantity"
                      className="h-12 rounded-[20px] w-full"
                      min={1}
                    />
                    <FloatingLabel htmlFor="quantity">Quantity</FloatingLabel>
                  </div>
                  <div className="relative w-full">
                    <NumericFormat
                      value={productVariant.discount ? productVariant.discount * 100 : 0}
                      thousandSeparator=","
                      suffix=" %"
                      disabled
                      customInput={Input}
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
                  <div className="col-span-2 flex justify-start items-start gap-2">
                    <h3 className="text-base font-bold">Attribute</h3>
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    {Object.entries(productVariant.attributes).map(([key, value], index) => (
                      <div className="flex justify-between items-center gap-4 w-full" key={key}>
                        {/* Attribute Key Input */}
                        <div className="relative w-full">
                          <FloatingInput
                            value={key}
                            id={`key-${index}`}
                            className="h-12 rounded-[20px] w-full"
                            disabled
                          />
                          <FloatingLabel htmlFor={`key-${index}`}>Key</FloatingLabel>
                        </div>
                        {/* Attribute Value Input */}
                        <div className="relative w-full">
                          <FloatingInput
                            value={value}
                            id={`value-${index}`}
                            className="h-12 rounded-[20px] w-full"
                            disabled
                          />
                          <FloatingLabel htmlFor={`value-${index}`}>Value</FloatingLabel>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-2 flex justify-start items-start gap-2">
                    <h3 className="text-base font-bold">Image</h3>
                  </div>
                  <div className="flex flex-col w-full justify-start items-start gap-4 col-span-2">
                    <div className="grid grid-cols-3 w-full gap-4">
                      {productVariant.images &&
                        productVariant.images.map((image, index) => {
                          return (
                            <div key={image.url + index}>
                              <div className="flex w-full flex-col items-center justify-between gap-3 rounded-[12px] border border-[#E7E7E7] p-4">
                                <div className="relative overflow-hidden w-full h-[280px] border border-blue-primary rounded-[12px]">
                                  <Image
                                    src={image.url || '/images/default_product_image.png'}
                                    alt="product image"
                                    fill
                                    objectFit="cover"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
      {/* Dialog update product variant */}
      {productVariants && productVariants.data.data.length > 0 && (
        <DialogCreateProductVariant
          open={updateProductVariant !== null}
          setOpen={() => setUpdateProductVariant(null)}
          id={product._id}
          productVariant={updateProductVariant || undefined}
          disableButton={true}
        />
      )}
      <DialogDelete
        open={!!openDelete}
        onOpenChange={() => setOpenDelete(null)}
        name={openDelete?.variant_name || ''}
        handleDelete={(id: string) => handleDeleteProduct(id)}
        id={openDelete?._id || ''}
        isPending={isPendingDeleteProduct}
      />
    </div>
  )
}
