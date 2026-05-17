const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'pacto_live_demo';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Reputation API
  async getReputation(wallet: string) {
    return this.request(`/api/v1/reputation/${wallet}`);
  }

  async getReputationScore(wallet: string) {
    return this.request(`/api/v1/reputation/${wallet}/score`);
  }

  async checkReputationBatch(wallets: string[]) {
    return this.request('/api/v1/reputation/check', {
      method: 'POST',
      body: JSON.stringify({ wallets }),
    });
  }

  // Transactions API
  async getTransaction(txHash: string) {
    return this.request(`/api/v1/transactions/${txHash}`);
  }

  async getPymeTransactions(wallet: string) {
    return this.request(`/api/v1/transactions/pyme/${wallet}`);
  }

  // Institutions API
  async getInstitutionStats() {
    return this.request('/api/v1/institutions/stats');
  }

  async getInstitutionPymes() {
    return this.request('/api/v1/institutions/pymes');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL, API_KEY);
export default apiClient;
