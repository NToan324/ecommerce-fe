import { httpClient as axios } from '@/http'
import { ApiResponse } from '@/http/types/http.response'
import { SearchParams } from '@/types/common.type'
import { StatisticAdvanced, StatisticOverview } from '@/types/statistic.type'

class StatisticService {
  getStatisticOverview = async () => {
    const response = await axios.get<ApiResponse<StatisticOverview>>('/statistic/overview')
    return response.data
  }

  getStatisticAdvanced = async (params: Partial<SearchParams>) => {
    const response = await axios.get<ApiResponse<StatisticAdvanced>>('/statistic/advanced', { params })
    return response.data
  }
}

const statisticService = new StatisticService()
export default statisticService
