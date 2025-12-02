'use client'

import { useEffect, useState } from 'react'

import DialogOrderDetails from '@/app/(admin)/admin/orders/components/DialogOrderDetails'
import Loading from '@/components/loading'
import PaginationCustom from '@/components/paginationCustom'
import HeaderTitleAdmin from '@/components/ui/headerTitleAdmin'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ORDER_STATUS } from '@/constant'
import useOrder from '@/hooks/useOrder'
import { useOrderUserStore } from '@/stores/order.store'
import { Order } from '@/types/order.type'
import { convertStringToDate, formatPrice } from '@/utils/helpers'

export default function Page() {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState<Order | null>(null)

  const page = useOrderUserStore((s) => s.page)
  const totalPages = useOrderUserStore((s) => s.totalPages)
  const setPage = useOrderUserStore((s) => s.setPage)
  const setTotalPages = useOrderUserStore((s) => s.setTotalPages)

  const { data: orders, isSuccess, isPending } = useOrder.getAllOrdersByAdmin()
  const { mutate: updateStatus } = useOrder.updateOrderStatus()

  useEffect(() => {
    if (isSuccess && orders.data.totalPages) {
      setTotalPages(orders.data.totalPages)
    }
  }, [isSuccess])

  const handleUpdateStatus = (id: string, status: ORDER_STATUS) => {
    updateStatus({ id, status })
  }

  return (
    <div className="space-y-6">
      <HeaderTitleAdmin title="Orders" search={search} setSearch={setSearch} />

      <div className="bg-white p-2 rounded-3xl w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-primary/20 hover:bg-blue-primary/20">
              <TableHead>Number</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Loyalty Used</TableHead>
              <TableHead>Loyalty Earned</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : orders?.data && orders.data?.data?.length > 0 ? (
              orders.data.data.map((order: Order, index: number) => (
                <TableRow key={order._id} onClick={() => setOpen(order)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.user_name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{formatPrice(order.total_amount)}</TableCell>
                  <TableCell>{order.loyalty_points_used.toLocaleString('vi-VN')}</TableCell>
                  <TableCell>{order.loyalty_points_earned.toLocaleString('vi-VN')}</TableCell>

                  {/* STATUS SELECT */}
                  <TableCell>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value: ORDER_STATUS) => handleUpdateStatus(order._id, value)}
                    >
                      <SelectTrigger className="w-[140px] capitalize">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ORDER_STATUS.PENDING}>Pending</SelectItem>
                        <SelectItem value={ORDER_STATUS.SHIPPING}>Shipping</SelectItem>
                        <SelectItem value={ORDER_STATUS.DELIVERED}>Delivered</SelectItem>
                        <SelectItem value={ORDER_STATUS.CANCELLED}>Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>{convertStringToDate(order.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationCustom
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
        hidden={totalPages <= 1}
      />
      {open && <DialogOrderDetails order={open} open={!!open} setOpen={() => setOpen(null)} />}
    </div>
  )
}
