import axios from 'axios'
import {
  CreatePortfolioRequest,
  PortfolioWithRelations,
} from '@/types/portfolio'

export class PortfolioService {
  static async getPortfolio(
    id: string,
  ): Promise<{ portfolio: PortfolioWithRelations }> {
    const response = await axios.get(`/api/portfolios/${id}`)
    return response.data
  }

  static async createPortfolio(data: CreatePortfolioRequest) {
    const response = await axios.post('/api/portfolios', data)
    return response.data
  }

  static async deletePortfolio(id: string) {
    const response = await axios.delete(`/api/portfolios/${id}`)
    return response.data
  }
}
