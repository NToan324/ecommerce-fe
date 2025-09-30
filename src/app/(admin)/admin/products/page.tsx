'use client'

import React, { useState } from 'react'
import UpdateProduct from '@admin/admin/products/components/updateProduct'
import { HiOutlineTrash } from 'react-icons/hi'

import DialogDelete from '@/components/dialogDelete'
import PaginationCustom from '@/components/paginationCustom'
import HeaderTitleAdmin from '@/components/ui/headerTitleAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { products } from '@/mockup/product'
import { Product } from '@/types/product.type'
import { formatPrice } from '@/utils/helpers'

export default function page() {
  const [openDelete, setOpenDelete] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const hanldeSelectProduct = (product: Product) => {
    if (selectedProduct?.productId === product.productId) {
      setSelectedProduct(null)
    } else {
      setSelectedProduct(product)
    }
  }
  return (
    <div>
      <HeaderTitleAdmin title="Products" />
      <div className="bg-white p-2 rounded-3xl w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-primary/20 !border-b-0 hover:bg-blue-primary/20">
              <TableHead className="w-[100px] rounded-l-2xl">Number</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="md:max-w-[200px] max-w-[50px] truncate">Product</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-r-2xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <React.Fragment key={product.productId}>
                {/* Row chính */}
                <TableRow
                  className={`${selectedProduct?.productId === product.productId ? 'bg-blue-primary/80 hover:bg-blue-primary/80' : ''} cursor-pointer`}
                  onClick={() => hanldeSelectProduct(product)}
                >
                  <TableCell className="rounded-l-2xl">{index + 1}</TableCell>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="block md:max-w-[400px] max-w-[80px] truncate">{product.product}</TableCell>
                  <TableCell>{formatPrice(product.unitPrice)}</TableCell>
                  <TableCell>{product.discount}%</TableCell>
                  <TableCell>{formatPrice(product.totalPrice)}</TableCell>
                  <TableCell>{product.currentStock}</TableCell>
                  <TableCell className="flex justify-center items-center">
                    <p className="text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 bg-complete text-center text-complete-foreground px-2 py-1 w-[60px] md:w-[110px]">
                      Active
                    </p>
                  </TableCell>
                  <TableCell className="text-blue-primary rounded-r-2xl underline cursor-pointer">
                    <div className="w-full flex justify-center items-center">
                      <HiOutlineTrash
                        size={24}
                        title={`Delete ${product.product}`}
                        className="text-black hover:text-red-700 cursor-pointer transition-all duration-300"
                        strokeWidth={1.5}
                        onClick={(e) => {
                          e.stopPropagation() // tránh click xoá lại trigger select
                          setOpenDelete(product.product)
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>

                {/* Update Product*/}
                <TableRow>
                  <TableCell colSpan={10} className="p-0">
                    <div
                      className={`transition-all bg-white duration-500 ease-in-out overflow-hidden space-y-6 ${
                        selectedProduct?.productId === product.productId ? 'max-h-[1000px] p-4' : 'max-h-0 p-0'
                      }`}
                    >
                      <div className="">
                        <h3 className="text-4xl font-bold">{product.product}</h3>
                      </div>
                      <UpdateProduct data={product} />
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <PaginationCustom />
        <DialogDelete open={!!openDelete} onOpenChange={() => setOpenDelete(null)} name={openDelete || ''} />
      </div>
    </div>
  )
}
