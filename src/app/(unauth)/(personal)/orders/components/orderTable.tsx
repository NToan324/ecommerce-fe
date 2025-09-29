import React from 'react'
import { useRouter } from 'next/navigation'

import PaginationCustom from '@/components/paginationCustom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/utils/helpers'

export default function OrderTable() {
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
          <TableRow onClick={() => router.push('/orders/INV001')} className="cursor-pointer">
            <TableCell>INV001</TableCell>
            <TableCell className="block md:max-w-[400px] max-w-[80px] truncate">Macbook Air M1</TableCell>
            <TableCell>{formatPrice(7600000)}</TableCell>
            <TableCell className="flex justify-center items-center">
              <p className="text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 bg-confirmed text-center text-confirmed-foreground px-2 py-1 w-[60px] md:w-[110px]">
                Confirmed
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell className="block md:max-w-[400px] max-w-[80px] truncate">Macbook Pro M4 256GB</TableCell>
            <TableCell>{formatPrice(200000)}</TableCell>
            <TableCell className="flex justify-center items-center">
              <p className="text-[clamp(0.5rem,2vw,1rem)] flex justify-center items-center rounded-[10px] h-6 md:h-9 bg-complete text-center text-complete-foreground px-2 py-1 w-[60px] md:w-[110px]">
                Delivery
              </p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <PaginationCustom />
    </div>
  )
}
