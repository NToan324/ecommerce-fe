'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import UpdateBrand from '@admin/admin/brands/components/updateBrand'
import { HiOutlineTrash } from 'react-icons/hi'

import { DialogCreateBrand } from '@/app/(admin)/admin/brands/components/dialogCreateBrand'
import DialogDelete from '@/components/dialogDelete'
import Loading from '@/components/loading'
import PaginationCustom from '@/components/paginationCustom'
import HeaderTitleAdmin from '@/components/ui/headerTitleAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useBrand from '@/hooks/useBrand'
import { useDebounce } from '@/hooks/useDebounce'
import { useBrandStore } from '@/stores/brand.store'
import { Brand } from '@/types/brand.type'

export default function page() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<Brand | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const page = useBrandStore((state) => state.page)
  const limit = useBrandStore((state) => state.limit)
  const totalPages = useBrandStore((state) => state.totalPages)
  const setPage = useBrandStore((state) => state.setPage)
  const setTotalPages = useBrandStore((state) => state.setTotalPages)
  const setName = useBrandStore((state) => state.setName)

  const [search, setSearch] = useState('')
  const debounce = useDebounce(search, 500)

  const { data: brands, isPending, isSuccess, isFetching } = useBrand.getAllBrands()

  const { mutate: deleteBrand, isPending: isPendingDeleteBrand } = useBrand.deleteBrand({
    onClose: () => {
      setOpenDelete(null)
      setSelectedBrand(null)
    },
  })

  const handleSelectBrand = (brand: Brand) => {
    if (selectedBrand?._id === brand._id) {
      setSelectedBrand(null)
    } else {
      setSelectedBrand(brand)
    }
  }

  const handleDeleteBrand = (id: string) => {
    deleteBrand(id)
  }

  const handleOnPageChange = (page: number) => {
    setPage(page)
    router.replace(`/admin/brands?page=${page}&limit=${limit}`)
  }

  useEffect(() => {
    if (brands) {
      setTotalPages(brands.data.totalPage)
      setPage(brands.data.page)
    }
  }, [brands, setTotalPages, setPage])

  useEffect(() => {
    if (isSuccess && brands.data.totalPage) {
      setTotalPages(brands.data.totalPage)
      setPage(brands.data.page)
    }
  }, [isSuccess, brands])

  useEffect(() => {
    if (debounce.trim().length > 2) {
      setName(debounce.trim())
    } else {
      setName('')
    }
  }, [debounce])

  return (
    <div className="space-y-6">
      <HeaderTitleAdmin title="Brand" search={search} setSearch={setSearch} />
      <div className="w-full flex justify-end items-center">
        <DialogCreateBrand open={open} setOpen={setOpen} />
      </div>
      <div className="bg-white p-2 rounded-3xl w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-primary/20 !border-b-0 hover:bg-blue-primary/20">
              <TableHead className="w-[100px] rounded-l-2xl">Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-r-2xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending || isFetching ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="w-full justify-center items-center flex">
                    <Loading color="black" />
                  </div>
                </TableCell>
              </TableRow>
            ) : isSuccess && brands && brands.data.brands.length > 0 ? (
              brands.data.brands.map((brand, index) => (
                <React.Fragment key={brand._id}>
                  <TableRow
                    key={brand._id}
                    className={`${selectedBrand?._id === brand._id ? 'bg-blue-primary/80 hover:bg-blue-primary/80' : ''} cursor-pointer`}
                    onClick={() => handleSelectBrand(brand)}
                  >
                    <TableCell className="rounded-l-2xl">{index + 1}</TableCell>
                    <TableCell>{brand.brand_name}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-center items-center">
                        <div className="relative w-[80px] h-[80px]">
                          <Image
                            src={brand.brand_image.url || '/images/default_product_image.png'}
                            alt={brand.brand_name}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <p
                          className={`${brand.isActive ? 'bg-complete text-complete-foreground' : 'bg-error text-error-foreground'} text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 text-center px-2 py-1 w-[60px] md:w-[110px]`}
                        >
                          {brand.isActive ? 'Active' : 'Disable'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-primary rounded-r-2xl underline cursor-pointer">
                      <div className="w-full flex justify-center items-center">
                        <HiOutlineTrash
                          size={24}
                          title={`Delete ${brand.brand_name}`}
                          className="text-black hover:text-red-700 cursor-pointer transition-all duration-300"
                          strokeWidth={1.5}
                          onClick={() => {
                            setOpenDelete(brand)
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Update Brand*/}
                  <TableRow>
                    <TableCell colSpan={10} className="p-0">
                      <div
                        className={`transition-all bg-white duration-500 ease-in-out space-y-6 ${
                          selectedBrand?._id === brand._id ? 'p-4' : 'hidden'
                        }`}
                      >
                        <div className="w-full flex justify-center items-center">
                          <h3 className="text-2xl font-bold text-center whitespace-pre-line max-w-[50%]">
                            {brand.brand_name}
                          </h3>
                        </div>
                        <UpdateBrand brand={brand} />
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DialogDelete
          open={!!openDelete}
          onOpenChange={() => setOpenDelete(null)}
          name={openDelete?.brand_name || ''}
          handleDelete={handleDeleteBrand}
          id={openDelete?._id || ''}
          isPending={isPendingDeleteBrand}
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
