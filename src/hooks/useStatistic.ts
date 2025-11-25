import { useQuery } from '@tanstack/react-query'

import statisticService from '@/services/statistic.service'
import { useStatisticStore } from '@/stores/statistic.store'

class UseStatistic {
  getStatisticOverview = () => {
    return useQuery({
      queryKey: ['statisticOverview'],
      queryFn: () => statisticService.getStatisticOverview(),
    })
  }

  getStatisticAdvanced = () => {
    const fromDate = useStatisticStore((state) => state.fromDate)
    const toDate = useStatisticStore((state) => state.toDate)
    const interval = useStatisticStore((state) => state.interval)
    const params = { from_date: fromDate, to_date: toDate, interval }
    return useQuery({
      queryKey: ['statisticAdvanced', params],
      queryFn: () => statisticService.getStatisticAdvanced(params),
    })
  }
}

const useStatistic = new UseStatistic()

export default useStatistic
