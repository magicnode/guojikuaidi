import request from '../utils/request'
import { address as addressApi } from '@/api'

export async function sendquery (params) {
  return request({
    url: addressApi.senddetail,
    method: 'get',
    data: params,
    auth: true
  })
}

export async function pickupquery (params) {
  return request({
    url: addressApi.pickupdetail,
    method: 'get',
    data: params,
    auth: true
  })
}
