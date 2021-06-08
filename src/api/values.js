import request from '@/utils/request'

export function getValues() {
  return request({
    url: 'Test/get-test-data?type=values',
    method: 'get'
  })
}

export function postValues(data) {
    return request({
      url: 'Test/post-test-data',
      method: 'post',
      data
    })
  }

  export function updateValues(data) {
    return request({
      url: 'Test/put-test-data',
      method: 'put',
      data
    })
  }

  export function deleteValues(id) {
    return request({
      url: 'Test/delete-test-data/'+id,
      method: 'delete'
    })
  }
