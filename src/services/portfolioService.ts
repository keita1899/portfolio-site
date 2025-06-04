import axios from 'axios'
import {
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  PortfolioWithRelations,
} from '@/types/portfolio'

export class PortfolioService {
  // 公開ポートフォリオ一覧を取得（認証不要）
  static async getPortfolios(): Promise<{
    portfolios: PortfolioWithRelations[]
  }> {
    const response = await axios.get('/api/portfolios')
    return response.data
  }

  // 管理画面用：全てのポートフォリオを取得（認証必要）
  static async getAdminPortfolios(): Promise<{
    portfolios: PortfolioWithRelations[]
  }> {
    const response = await axios.get('/api/admin/portfolios')
    return response.data
  }

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

  static async updatePortfolio(id: string, data: UpdatePortfolioRequest) {
    const response = await axios.put(`/api/portfolios/${id}`, data)
    return response.data
  }

  static async deletePortfolio(id: string) {
    const response = await axios.delete(`/api/portfolios/${id}`)
    return response.data
  }
}
