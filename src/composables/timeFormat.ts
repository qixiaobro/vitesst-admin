/*
 * @Author: qixiaobro
 * @Date: 2022-05-25 16:59:35
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-25 17:00:48
 * @Description:  时间格式化
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */

/**
 * @description: 时间戳转YYYY-MM-DD HH:mm:ss
 * @param {number} timeStamp
 * @return {*}
 */
export const timeStampToDate = (timeStamp: number) => {
  const date = new Date(timeStamp)
  const Y = `${date.getFullYear()}-`
  const M = `${date.getMonth() + 1 < 10
    ? `0${date.getMonth() + 1}`
    : date.getMonth() + 1}-`
  const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${Y + M + D} ${h}:${m}:${s}`
}
