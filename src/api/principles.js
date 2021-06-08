import request from '@/utils/request'

export function getPrinciples() {
  return request({
    url: 'Test/get-test-data?type=principles',
    method: 'get'
  })
}

export function postPrinciples(data) {
    debugger
    return request({
      url: 'Test/post-test-data',
      method: 'post',
      data
    })
  }

  
export function updatePrinciples(data) {
    debugger
    return request({
      url: 'Test/put-test-data',
      method: 'put',
      data
    })
  }

  export function deletePrinciples(id) {
    return request({
      url: 'Test/delete-test-data/'+id,
      method: 'delete'
    })
  }
