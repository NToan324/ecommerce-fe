'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiOutlineTrash } from 'react-icons/hi'

import Loading from '@/components/loading'
import PaginationCustom from '@/components/paginationCustom'
import HeaderTitleAdmin from '@/components/ui/headerTitleAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useUser from '@/hooks/useUser'
import { useUserStore } from '@/stores/user.store'
import { Profile } from '@/types/user.type'

export default function Page() {
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)

  const page = useUserStore((s) => s.page)
  const totalPages = useUserStore((s) => s.totalPages)
  const setPage = useUserStore((s) => s.setPage)
  const setTotalPages = useUserStore((s) => s.setTotalPages)

  const { data: users, isPending, isSuccess } = useUser.getAllUsers()
  console.log('users', users)
  useEffect(() => {
    if (isSuccess) {
      setTotalPages(users.data.totalPages)
    }
  }, [isSuccess])

  const handleSelectUser = (user: Profile) => {
    setSelectedUser((prev) => (prev?._id === user._id ? null : user))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <HeaderTitleAdmin title="User Management" search={search} setSearch={setSearch} />

      <div className="bg-white p-2 rounded-3xl w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-primary/20 hover:bg-blue-primary/20">
              <TableHead className="rounded-l-2xl">Number</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Loyalty</TableHead>
              <TableHead className="rounded-r-2xl">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : users?.data && users.data.users.length > 0 ? (
              users?.data.users.map((user: Profile, index: number) => (
                <React.Fragment key={user._id}>
                  <TableRow
                    onClick={() => handleSelectUser(user)}
                    className={`${selectedUser?._id === user._id ? 'bg-blue-primary/80 text-white' : ''} cursor-pointer`}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={user.avatar?.url || '/default-avatar.png'} alt={user.fullName} fill />
                      </div>
                    </TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '--'}</TableCell>
                    <TableCell>{user.loyalty_points}</TableCell>
                    <TableCell>
                      <HiOutlineTrash className="text-red-600 hover:text-red-800 cursor-pointer" size={20} />
                    </TableCell>
                  </TableRow>

                  {/* expand line */}
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <div className={`${selectedUser?._id === user._id ? 'p-4' : 'hidden'}`}>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">User ID: {user._id}</p>
                          <p className="text-sm text-gray-500">Created: {user.created_at}</p>
                        </div>

                        {/* more future details */}
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No users found.
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
    </div>
  )
}
