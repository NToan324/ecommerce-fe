'use client'

import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Combobox } from '@/components/comboBox'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import productSchema from '@/schemas/product.schema'
import { Product } from '@/types/product.type'

interface UpdateProductProps {
  data: Product
}
export default function UpdateProduct({ data }: UpdateProductProps) {
  const form = useForm<z.infer<typeof productSchema.updateProduct>>({
    resolver: zodResolver(productSchema.updateProduct),
    defaultValues: {
      name: data.product,
      category: data.category,
      unitPrice: data.unitPrice,
      description: data.decription || '',
      brand: data.brand || '',
      discount: data.discount,
      quantity: data.currentStock,
      totalPrice: data.totalPrice,
      status: data.status,
    },
  })
  return (
    <Form {...form}>
      <form className="grid grid-cols-[1fr_400] gap-8 w-full items-start">
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative w-full">
                    <FloatingInput {...field} id="name" className="h-12 rounded-[20px] w-full" value={field.value} />
                    <FloatingLabel htmlFor="name">Product Name</FloatingLabel>
                  </div>
                </FormControl>
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.name.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative w-full">
                    <FloatingInput
                      {...field}
                      id="description"
                      className="h-12 rounded-[20px] w-full"
                      value={field.value}
                    />
                    <FloatingLabel htmlFor="description">Description</FloatingLabel>
                  </div>
                </FormControl>
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.description.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Combobox
                    data={[]}
                    selectedData={[]}
                    index={0}
                    handleOnChange={(value) => {
                      field.onChange(value)
                    }}
                    titleTrigger="Category"
                  />
                </FormControl>
                {form.formState.errors.category && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.category.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Combobox
                    data={[]}
                    selectedData={[]}
                    index={0}
                    handleOnChange={(value) => {
                      field.onChange(value)
                    }}
                    titleTrigger="Brand"
                  />
                </FormControl>
                {form.formState.errors.brand && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.brand.message}</p>
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
                      {...field}
                      type="number"
                      id="quantity"
                      className="h-12 rounded-[20px] w-full"
                      value={field.value}
                      min={0}
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
        </div>
        <div className="flex flex-col w-full justify-start items-center gap-4">
          <div className="relative w-full h-[400px] border border-blue-primary rounded-[20px]">
            <Image src="/images/laptop.png" alt="product image" fill objectFit="contain" />
          </div>
          <div className="flex justify-start items-end gap-4 w-full">
            <div className="relative w-full max-w-[120px] h-[90px] border border-blue-primary rounded-[20px]">
              <Image src="/images/laptop.png" alt="product image" fill objectFit="contain" />
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
