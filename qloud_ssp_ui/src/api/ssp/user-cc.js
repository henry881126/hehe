import request from '@/utils/request'
import setting from '../../settings'

export function queryUserList(data) {
  const bridgeUrl = setting.sspBridgeUrl ? setting.sspBridgeUrl:""
  return request({
    url: '/http/jsonService/queryUserListByOrgId',
    method: 'post',
    data
  })
}

