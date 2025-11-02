'use client'

import React, { useState } from 'react'
import { DialogCreateCoupon } from '@admin/admin/coupons/components/dialogCreateCoupon'
import UpdateCoupon from '@admin/admin/coupons/components/updateCoupon'
import { HiOutlineTrash } from 'react-icons/hi'

import DialogDelete from '@/components/dialogDelete'
import Loading from '@/components/loading'
import HeaderTitleAdmin from '@/components/ui/headerTitleAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useCategory from '@/hooks/useCategory'
import useCoupon from '@/hooks/useCoupon'
import { Coupon } from '@/types/coupon.type'
import { formatPrice } from '@/utils/helpers'

export default function page() {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<Coupon | null>(null)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const { data: coupons, isPending, isSuccess, isFetching } = useCoupon.getAllCoupons()

  const { mutate: deleteCategory, isPending: isPendingDeleteCategory } = useCategory.deleteCategory({
    onClose: () => {
      setOpenDelete(null)
      setSelectedCoupon(null)
    },
  })

  const handleSelectCoupon = (coupon: Coupon) => {
    if (selectedCoupon?._id === coupon._id) {
      setSelectedCoupon(null)
    } else {
      setSelectedCoupon(coupon)
    }
  }

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id)
  }

  return (
    <div className="space-y-6">
      <HeaderTitleAdmin title="Coupon" />
      <div className="w-full flex justify-end items-center">
        <DialogCreateCoupon open={open} setOpen={setOpen} />
      </div>
      <div className="bg-white p-2 rounded-3xl w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-primary/20 !border-b-0 hover:bg-blue-primary/20">
              <TableHead className="w-[100px] rounded-l-2xl">Number</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Discount Amount</TableHead>
              <TableHead>Usage Count</TableHead>
              <TableHead>Usage Limit</TableHead>
              <TableHead>Orders Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-r-2xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending || isFetching ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <div className="w-full justify-center items-center flex">
                    <Loading color="black" />
                  </div>
                </TableCell>
              </TableRow>
            ) : isSuccess && coupons && coupons.data.data.length > 0 ? (
              coupons.data.data.map((coupon, index) => (
                <React.Fragment key={coupon._id}>
                  <TableRow
                    key={coupon._id}
                    className={`${selectedCoupon?._id === coupon._id ? 'bg-blue-primary/80 hover:bg-blue-primary/80' : ''} cursor-pointer`}
                    onClick={() => handleSelectCoupon(coupon)}
                  >
                    <TableCell className="rounded-l-2xl">{index + 1}</TableCell>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>{formatPrice(coupon.discount_amount)}</TableCell>
                    <TableCell>{coupon.usage_count}</TableCell>
                    <TableCell>{coupon.usage_limit}</TableCell>
                    <TableCell>{coupon.orders_used}</TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <p
                          className={`${coupon.isActive ? 'bg-complete text-complete-foreground' : 'bg-error text-error-foreground'} text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 text-center px-2 py-1 w-[60px] md:w-[110px]`}
                        >
                          {coupon.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-primary rounded-r-2xl underline cursor-pointer">
                      <div className="w-full flex justify-center items-center">
                        <HiOutlineTrash
                          size={24}
                          title={`Delete ${coupon.code}`}
                          className="text-black hover:text-red-700 cursor-pointer transition-all duration-300"
                          strokeWidth={1.5}
                          onClick={() => {
                            setOpenDelete(coupon)
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Update Brand*/}
                  <TableRow>
                    <TableCell colSpan={8} className="p-0">
                      <div
                        className={`transition-all bg-white duration-500 ease-in-out space-y-6 ${
                          selectedCoupon?._id === coupon._id ? 'p-4' : 'hidden'
                        }`}
                      >
                        <div className="w-full flex justify-center items-center">
                          <h3 className="text-2xl font-bold text-center whitespace-pre-line max-w-[50%]">
                            {coupon.code}
                          </h3>
                        </div>
                        <UpdateCoupon coupon={coupon} />
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DialogDelete
          open={!!openDelete}
          onOpenChange={() => setOpenDelete(null)}
          name={openDelete?.code || ''}
          handleDelete={handleDeleteCategory}
          id={openDelete?._id || ''}
          isPending={isPendingDeleteCategory}
        />
      </div>
    </div>
  )
}
