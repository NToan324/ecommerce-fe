import React from 'react'
import { useRouter } from 'next/navigation'

import PaginationCustom from '@/components/paginationCustom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ORDER_STATUS_COLOR } from '@/constant'
import { useOrderUserStore } from '@/stores/order.store'
import { formatPrice } from '@/utils/helpers'

interface OrderTableProps {
  selectedStatus: string
}
export default function OrderTable({ selectedStatus }: OrderTableProps) {
  const orders = useOrderUserStore((state) => state.orders)
  const page = useOrderUserStore((state) => state.page)
  const limit = useOrderUserStore((state) => state.limit)
  const setPage = useOrderUserStore((state) => state.setPage)
  const totalPages = useOrderUserStore((state) => state.totalPages)

  const handlePageChange = (page: number) => {
    setPage(page)
    router.replace(`/orders?page=${page}&limit=${limit}`)
  }

  const router = useRouter()
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-primary/20 !border-b-0">
            <TableHead className="w-[100px] rounded-l-2xl">Order ID</TableHead>
            <TableHead className="md:max-w-[200px] max-w-[50px] truncate">Products</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="rounded-r-2xl">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const isSelectedStatus = order.status === selectedStatus
            const status = ORDER_STATUS_COLOR[order.status]
            const orderCode = 'ORD' + order._id.slice(-4).toUpperCase()
            return isSelectedStatus ? (
              <TableRow onClick={() => router.push(`/orders/${order._id}`)} className="cursor-pointer" key={order._id}>
                <TableCell>{orderCode}</TableCell>
                <TableCell className="md:max-w-[400px] max-w-[80px] truncate">
                  {order.items.map((product) => product.product_variant_name).join(', ')}
                </TableCell>
                <TableCell>{formatPrice(order.total_amount)}</TableCell>
                <TableCell className="flex justify-center items-center">
                  <p
                    className={`text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 ${status.className} text-center px-2 py-1 w-[60px] md:w-[110px]`}
                  >
                    {status.label}
                  </p>
                </TableCell>
              </TableRow>
            ) : null
          })}
        </TableBody>
      </Table>
      <PaginationCustom currentPage={page} totalPages={totalPages} onPageChange={(page) => handlePageChange(page)} />
    </div>
  )
}
