export type ApiResponseData<T = any> = {
  ok: boolean
  message: string
  data: T
  meta?: {
    all: boolean
    page: number
    rowsPerPage: number
    totalObtained: number
    total: number
  }
};

export type ApiResponse<T = any> = {
  ok: boolean
  message: string
  error?: string
  data?: T
};


export type DefaultFilterValues = {
  all: boolean
  page: number
  rowsPerPage: number
  order: 'asc' | 'desc'
}