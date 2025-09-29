import { useQuery } from '@tanstack/react-query'

import authService from '@/services/auth.service'

export const useGetAllToDos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => authService.getTodos(),
  })
}
