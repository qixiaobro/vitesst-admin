export namespace Table {
  export interface Pageable {
    page: number
    limit: number
    count: number
  }
  export interface TableStateProps {
    tableData: any[]
    searchShow: boolean
    pageable: Pageable
    loading: boolean
    searchParam: Record<string, any>
    initSearchParam: Record<string, any>
    totalParam: Record<string, any>
    icon?: Record<string, any>
  }
}
