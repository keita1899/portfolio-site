import axios from 'axios'
import { CreatePortfolioRequest } from '@/types/portfolio'

export class PortfolioService {
  static async createPortfolio(data: CreatePortfolioRequest) {
    const response = await axios.post('/api/portfolios', data)
    return response.data
  }
}
