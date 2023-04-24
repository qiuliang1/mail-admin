import http from '@/utils/http-axios'
const bread = '/yc/bus/'
const Api = {
  PRODUCE_LIST: `${bread}produce/list`,
  PRODUCE_INSERT: `${bread}produce/insert`,
  PRODUCE_MODIFY: `${bread}produce/modify`,
  PRODUCE_DELETE: `${bread}produce/delete`,
  PRODUCE_ATLAS: `${bread}produce/atlas/`,

  SPARE_UPLOAD: `${bread}spare/upload`,
  SPARE_INSERT: `${bread}spare/insert`,
  SPARE_MODIFY: `${bread}spare/modify`,
  SPARE_DELETE: `${bread}spare/delete`,
  SPARE_DETAIL: `${bread}spare/detail`,
  SPARE_LIST: `${bread}spare/list`,
  SPARE_ID: `${bread}spare/`
}

export const produceList = param => http('post', Api.PRODUCE_LIST, param)
export const produceInsert = param => http('post', Api.PRODUCE_INSERT, param)
export const produceModify = param => http('post', Api.PRODUCE_MODIFY, param)
export const produceDelete = param =>
  http('delete', `${Api.PRODUCE_DELETE}/${param}`, {})
export const produceAtlas = param =>
  http('get', `${Api.PRODUCE_ATLAS}/${param}`, {})

export const spareUpload = param =>
  http('put', Api.SPARE_UPLOAD, param, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const spareInsert = param => http('post', Api.SPARE_INSERT, param)
export const spareModify = param => http('post', Api.SPARE_MODIFY, param)
export const spareDetail = param => http('post', Api.SPARE_DETAIL, param)
export const spareList = param => http('post', Api.SPARE_LIST, param)
export const spareDelete = param =>
  http('delete', `${Api.SPARE_DELETE}/${param}`, {})
export const spareId = param => http('get', `${Api.SPARE_ID}/${param}`, {})
