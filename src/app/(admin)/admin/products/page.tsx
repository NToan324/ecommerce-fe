'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DialogCreateProduct } from '@admin/admin/products/components/dialogCreateProduct'
import UpdateProduct from '@admin/admin/products/components/updateProduct'
import { HiOutlineTrash } from 'react-icons/hi'

import DialogDelete from '@/components/dialogDelete'
import Loading from '@/components/loading'
import PaginationCustom from '@/components/paginationCustom'
import HeaderTitleAdmin from '@/components/ui/headerTitleAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useBrand from '@/hooks/useBrand'
import useCategory from '@/hooks/useCategory'
import { useDebounce } from '@/hooks/useDebounce'
import useProduct from '@/hooks/useProduct'
import { useBrandStore } from '@/stores/brand.store'
import { useCategoryStore } from '@/stores/category.store'
import { useProductStore } from '@/stores/product.store'
import { Product } from '@/types/product.type'

export default function page() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<Product | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState('')
  const debounce = useDebounce(search, 500)

  const page = useProductStore((state) => state.page)
  const limit = useProductStore((state) => state.limit)
  const totalPages = useProductStore((state) => state.totalPages)
  const setTotalPages = useProductStore((state) => state.setTotalPages)
  const setPage = useProductStore((state) => state.setPage)
  const setName = useProductStore((state) => state.setName)
  const setLimit = useProductStore((state) => state.setLimit)

  const setLimitCategory = useCategoryStore((state) => state.setLimit)
  const setLimitBrand = useBrandStore((state) => state.setLimit)
  const setPageCategory = useCategoryStore((state) => state.setPage)
  const setPageBrand = useBrandStore((state) => state.setPage)

  const categoryState = useCategoryStore()
  const brandsState = useBrandStore()

  const { data: categories, isSuccess: isSuccessCategories } = useCategory.getAllCategories()
  const { data: brands, isSuccess: isSuccessBrands } = useBrand.getAllBrands()
  const { data: products, isPending, isSuccess, isFetching } = useProduct.getAllProducts()
  const { mutate: deleteProduct, isPending: isPendingDeleteProduct } = useProduct.deleteProduct({
    onClose: () => {
      setOpenDelete(null)
      setSelectedProduct(null)
    },
  })

  useEffect(() => {
    setLimitCategory(1000)
    setLimitBrand(1000)
    setPageCategory(1)
    setPageBrand(1)
    setLimit(10)
  }, [setLimitBrand, setLimitCategory, setPageCategory, setPageBrand, setLimit])

  useEffect(() => {
    if (isSuccessCategories && categories.data.categories.length > 0) {
      categoryState.setCategories(categories.data.categories)
    }
    if (isSuccessBrands && brands.data.brands.length > 0) {
      brandsState.setbrands(brands.data.brands)
    }
  }, [isSuccessBrands, isSuccessCategories])

  const handleSelectProduct = (product: Product) => {
    if (selectedProduct?._id === product._id) {
      setSelectedProduct(null)
    } else {
      setSelectedProduct(product)
    }
  }

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
  }

  const handleOnPageChange = (page: number) => {
    setPage(page)
    router.replace(`/admin/products?page=${page}&limit=${limit}`)
  }

  useEffect(() => {
    if (isSuccess && products.data.totalPages) {
      setTotalPages(products.data.totalPages)
    }
  }, [isSuccess, products])

  useEffect(() => {
    if (debounce.trim().length > 2) {
      setName(debounce.trim())
    } else {
      setName('')
    }
  }, [debounce])

  return (
    <div className="space-y-6">
      <HeaderTitleAdmin title="Product" search={search} setSearch={setSearch} />
      <div className="w-full flex justify-end items-center">
        <DialogCreateProduct open={open} setOpen={setOpen} />
      </div>
      <div className="bg-white p-2 rounded-3xl w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-primary/20 !border-b-0 hover:bg-blue-primary/20">
              <TableHead className="w-[100px] rounded-l-2xl">Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-r-2xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending || isFetching ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  <div className="w-full justify-center items-center flex">
                    <Loading color="black" />
                  </div>
                </TableCell>
              </TableRow>
            ) : isSuccess && products && products.data.data.length > 0 ? (
              products.data.data.map((product, index) => (
                <React.Fragment key={product._id}>
                  {/* Row chính */}
                  <TableRow
                    className={`${selectedProduct?._id === product._id ? 'bg-blue-primary/80 hover:bg-blue-primary/80' : ''} cursor-pointer`}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <TableCell className="rounded-l-2xl">{index + 1}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="whitespace-pre-line line-clamp-2">{product.product_name}</div>
                    </TableCell>
                    <TableCell>{product.brand_name}</TableCell>
                    <TableCell>{product.category_name}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-center items-center">
                        <div className="relative w-[80px] h-[80px]">
                          <Image src={product.product_image.url} alt={product.product_name} fill objectFit="contain" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <p
                          className={`${product.isActive ? 'bg-complete text-complete-foreground' : 'bg-error text-error-foreground'} text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 text-center px-2 py-1 w-[60px] md:w-[110px]`}
                        >
                          {product.isActive ? 'Active' : 'Disabled'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-primary rounded-r-2xl underline cursor-pointer">
                      <div className="w-full flex justify-center items-center">
                        <HiOutlineTrash
                          size={24}
                          title={`Delete ${product.product_name}`}
                          className="text-black hover:text-red-700 cursor-pointer transition-all duration-300"
                          strokeWidth={1.5}
                          onClick={() => {
                            setOpenDelete(product)
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Update Product*/}
                  <TableRow>
                    <TableCell colSpan={10} className="p-0">
                      <div
                        className={`transition-all bg-white duration-500 ease-in-out space-y-6 ${
                          selectedProduct?._id === product._id ? 'p-4' : 'hidden'
                        }`}
                      >
                        <div className="w-full flex justify-center items-center">
                          <h3 className="text-2xl font-bold text-center whitespace-pre-line max-w-[50%]">
                            {product.product_name}
                          </h3>
                        </div>
                        <UpdateProduct
                          data={{
                            product: product,
                            categories: isSuccessCategories && categories ? categories?.data.categories : [],
                            brands: isSuccessBrands && brands ? brands.data.brands : [],
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DialogDelete
          open={!!openDelete}
          onOpenChange={() => setOpenDelete(null)}
          name={openDelete?.product_name || ''}
          handleDelete={(id: string) => handleDeleteProduct(id)}
          id={openDelete?._id || ''}
          isPending={isPendingDeleteProduct}
        />
      </div>
      <PaginationCustom
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(page) => handleOnPageChange(page)}
        hidden={totalPages <= 1}
      />
    </div>
  )
}
