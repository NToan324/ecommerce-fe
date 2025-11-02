'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import UpdateCategory from '@admin/admin/categories/components/updateCategory'
import { HiOutlineTrash } from 'react-icons/hi'

import { DialogCreateCategory } from '@/app/(admin)/admin/categories/components/dialogCreateCategory'
import DialogDelete from '@/components/dialogDelete'
import Loading from '@/components/loading'
import HeaderTitleAdmin from '@/components/ui/headerTitleAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useCategory from '@/hooks/useCategory'
import { Category } from '@/types/category.type'

export default function page() {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<Category | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const { data: categories, isPending, isSuccess, isFetching } = useCategory.getAllCategories()

  const { mutate: deleteCategory, isPending: isPendingDeleteCategory } = useCategory.deleteCategory({
    onClose: () => {
      setOpenDelete(null)
      setSelectedCategory(null)
    },
  })

  const handleSelectCategory = (category: Category) => {
    if (selectedCategory?._id === category._id) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
    }
  }

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id)
  }

  return (
    <div className="space-y-6">
      <HeaderTitleAdmin title="Category" />
      <div className="w-full flex justify-end items-center">
        <DialogCreateCategory open={open} setOpen={setOpen} />
      </div>
      <div className="bg-white p-2 rounded-3xl w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-primary/20 !border-b-0 hover:bg-blue-primary/20">
              <TableHead className="w-[100px] rounded-l-2xl">Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-r-2xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending || isFetching ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="w-full justify-center items-center flex">
                    <Loading color="black" />
                  </div>
                </TableCell>
              </TableRow>
            ) : isSuccess && categories && categories.data.categories.length > 0 ? (
              categories.data.categories.map((category, index) => (
                <React.Fragment key={category._id}>
                  <TableRow
                    key={category._id}
                    className={`${selectedCategory?._id === category._id ? 'bg-blue-primary/80 hover:bg-blue-primary/80' : ''} cursor-pointer`}
                    onClick={() => handleSelectCategory(category)}
                  >
                    <TableCell className="rounded-l-2xl">{index + 1}</TableCell>
                    <TableCell>{category.category_name}</TableCell>
                    <TableCell>{category.category_description}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-center items-center">
                        <div className="relative w-[80px] h-[80px]">
                          <Image
                            src={category.category_image.url}
                            alt={category.category_name}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <p
                          className={`${category.isActive ? 'bg-complete text-complete-foreground' : 'bg-error text-error-foreground'} text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 text-center px-2 py-1 w-[60px] md:w-[110px]`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-primary rounded-r-2xl underline cursor-pointer">
                      <div className="w-full flex justify-center items-center">
                        <HiOutlineTrash
                          size={24}
                          title={`Delete ${category.category_name}`}
                          className="text-black hover:text-red-700 cursor-pointer transition-all duration-300"
                          strokeWidth={1.5}
                          onClick={() => {
                            setOpenDelete(category)
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
                          selectedCategory?._id === category._id ? 'p-4' : 'hidden'
                        }`}
                      >
                        <div className="w-full flex justify-center items-center">
                          <h3 className="text-2xl font-bold text-center whitespace-pre-line max-w-[50%]">
                            {category.category_name}
                          </h3>
                        </div>
                        <UpdateCategory category={category} />
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
          name={openDelete?.category_name || ''}
          handleDelete={handleDeleteCategory}
          id={openDelete?._id || ''}
          isPending={isPendingDeleteCategory}
        />
      </div>
    </div>
  )
}
