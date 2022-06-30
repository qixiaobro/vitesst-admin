import type { Table } from './interface'

/**
 * @description table 页面操作方法封装
 * @param apiUrl 获取表格数据 ApiUrl(必传)
 * @param initParam 获取数据初始化参数(不必传，默认为{})
 * @param isPageable 是否有分页(不必传，默认为true)
 * @param tableRef 当前表格的DOM(不必传，默认为“”)
 * @param TimeKeys 需要处理的时间字段(不必传，默认为[])
 * */
export const useTable = (apiUrl: (params: any) => Promise<any>, TimeKeys: any = [], initParam: any = {}, isPageable = true) => {
  const state = reactive<Table.TableStateProps>({
    // 表格数据
    tableData: [],
    // 是否展开更多搜索框
    searchShow: false,
    // 分页数据
    pageable: {
      // 当前页数
      page: 1,
      // 每页显示条数
      limit: 10,
      // 总条数
      count: 0,
      size: [
        10,
        50,
        100,
        200,
        500,
      ],
    },
    loading: false,
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    initSearchParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {},
  })

  /**
   * @description 分页查询数据(只包括分页和表格字段排序,其他排序方式可自行配置)
   * */
  const pageParam = computed({
    get: () => {
      return {
        page: state.pageable.page,
        limit: state.pageable.limit,
      }
    },
    set: () => {
    },
  })

  //   /**
  //  * @description 更新分页信息
  //  * @param resPageable 后台返回的分页数据
  //  * @return void
  //  * */
  //   const updatePageable = (resPageable: Table.Pageable) => {
  //     Object.assign(state.pageable, resPageable)
  //   }

  /**
 * @description 更新查询参数
 * @param resPageable 后台返回的分页数据
 * @return void
 * */
  const updatedTotalParam = () => {
    state.totalParam = {}
    const nowSearchParam: Record<string, any> = {}
    // 防止手动清空输入框携带参数（可以自定义查询参数前缀）
    for (const key in state.searchParam) {
      // * 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0)
        nowSearchParam[key] = state.searchParam[key]
    }

    // 处理时间查询参数，判断查询参数是否是数组，是数组且不为空则拼接成字符串，否则置为''
    if (TimeKeys && TimeKeys.length > 0) {
      for (const key in TimeKeys) {
        if (Array.isArray(state.searchParam[TimeKeys[key]]) && state.searchParam[TimeKeys[key]].length > 0)
          nowSearchParam[TimeKeys[key]] = state.searchParam[TimeKeys[key]].join('-')

        else
          delete nowSearchParam[TimeKeys[key]]
      }
    }

    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
  }

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async () => {
    try {
      // 更新查询参数
      updatedTotalParam()
      Object.assign(state.totalParam, initParam)
      state.loading = true
      const { data } = await apiUrl(state.totalParam)
      state.loading = false
      state.tableData = isPageable ? data.list : data
      // 解构后台返回的分页数据(如果有分页更新分页信息)
      const { count } = data
      // isPageable && updatePageable({ count })
      state.pageable.count = count
    }
    catch (error) {
      state.loading = false
    }
  }

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    state.pageable.page = 1
    getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.page = 1
    state.searchParam = {}
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(state.initSearchParam).forEach((key) => {
      state.searchParam[key] = state.initSearchParam[key]
    })
    getTableList()
  }

  /**
   * @description 每页条数改变
   * @param val 当前条数
   * @return void
   * */
  const handleSizeChange = (val: number) => {
    state.pageable.page = 1
    state.pageable.limit = val
    getTableList()
  }

  /**
   * @description 当前页改变
   * @param val 当前页
   * @return void
   * */
  const handleCurrentChange = (val: number) => {
    state.pageable.page = val
    getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  }
}

/**
 * @description: 表格数据单个删除或者批量删除表格数据
 * @param apiUrl 删除接口地址 (必填)
 * @param search 重新从第一页开始查询
 * @return {*}
 */
export const useTableDelete = (apiUrl: (params: any) => Promise<any>, search?: () => void) => {
  /**
   * @description: 批量删除
   * @return {*}
   */
  const handleMulitDelete = (multipleSelection: []) => {
    if (multipleSelection.length === 0) {
      ElMessage.warning('请选择要删除的数据')
      return
    }
    ElMessageBox.confirm(
      `确定要删除这${multipleSelection.length}条数据吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(async () => {
        // 从multipleSelection提取id数组
        const ids = multipleSelection.map((item: any) => item.id)
        // 发送请求
        const { msg } = await apiUrl({ ids })
        ElMessage.success(msg)
        search && search()
      })
  }

  /**
   * @description: 单个删除
   * @return {*}
   */
  const handleDelete = async (id: number) => {
    ElMessageBox.confirm(
      '确定要删除该数据吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(async () => {
        // 发送请求
        const ids = [id]
        const { msg } = await apiUrl({ ids })
        ElMessage.success(msg)
        search && search()
      })
  }

  return {
    handleMulitDelete,
    handleDelete,
  }
}

/**
 * @description: 表格切换状态
 * @param apiUrl 切换状态接口地址 (必填)
 * @param getTableList 刷新当前页表格数据方法 (必填)
 * @return {*}
 */
export const useToggleStatus = (apiUrl: (params: any) => Promise<any>, getTableList: () => void) => {
  /**
   * @description: 切换状态
   * @param id 当前行id (必填)
   * @param status 当前状态 (必填)
   * @return {*}
   */
  const handleToggleStatus = async (id: number, status: number) => {
    // 发送请求
    const { msg } = await apiUrl({ id, status })
    getTableList()
    ElMessage.success(msg)
  }

  return {
    handleToggleStatus,
  }
}
