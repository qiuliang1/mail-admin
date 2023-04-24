import http from '@/utils/http-axios'
const bread = 'yc/sys'

const Api = {
  LOGIN: `${bread}/login`,
  LOGOUT: `${bread}/logout`,

  AUTH_TREE: `${bread}/auth/tree`,
  AUTH_MODIFY: `${bread}/auth/modify`,
  AUTH_INSERT: `${bread}/auth/insert`,

  ROLE_LIST: `${bread}/role/list`,
  ROLE_INSERT: `${bread}/role/insert`,
  ROLE_MODIFY: `${bread}/role/modify`,
  ROLEAUTH_GETAUTH: `${bread}/roleAuth/getAuths`,
  ROLEAUTH_INSERT: `${bread}/roleAuth/insert`,
  ROLE_SELECT: `${bread}/role/select`,
  ROLE_DELETE: `${bread}/role/delete`,

  USER_TREE: `${bread}/user/tree`,
  USER_LIST: `${bread}/user/list`,
  USER_REGISTER: `${bread}/user/register`,
  USER_MODIFY: `${bread}/user/modify`,
  USER_SETROLE: `${bread}/user/setRole`,
  USER_CHECK: `${bread}/user/check/`,
  USER_SETHEAD: `${bread}/user/setHead`,
  USER_DELETE: `${bread}/user/delete`,

  CATE_TREE: `${bread}/cate/tree`,
  CATE_INSERT: `${bread}/cate/insert`,
  CATE_MODIFY: `${bread}/cate/modify`,
  CATE_SORT: `${bread}/cate/sort`,

  EXPINFO_LIST: `${bread}/expInfo/list`,
  EXPINFO_MODIFY: `${bread}/expInfo/modify`,
  EXPINFO_INSERT: `${bread}/expInfo/insert`,
  EXPINFO_SELECT: `${bread}/expInfo/select`,

  COS_VIEW: `${bread}/cos/view`,
  COS_DELETE: `${bread}/cos/delete`,
  ATL_DELETE: `${bread}/atl/delete`
}

export const loginApi = param => http('post', Api.LOGIN, param)
export const logoutApi = param => http('get', Api.LOGOUT, param)
// 权限管理
export const authTree = param => http('get', Api.AUTH_TREE, param)
export const authModify = param => http('post', Api.AUTH_MODIFY, param)
export const authInsert = param => http('post', Api.AUTH_INSERT, param)
// 用户管理
export const userTree = param => http('get', Api.USER_TREE, param)
export const userList = param => http('post', Api.USER_LIST, param)
export const userRegister = param => http('post', Api.USER_REGISTER, param)
export const userModify = param => http('post', Api.USER_MODIFY, param)
export const userSetRole = param => http('post', Api.USER_SETROLE, param)
export const userCheck = param => http('get', Api.USER_CHECK + param, {})
export const userSetHead = param => http('put', Api.USER_SETHEAD, param)
export const userDelete = param => http('delete', `${Api.ROLE_DELETE}/${param}`, {})
// 角色管理
export const roleList = param => http('post', Api.ROLE_LIST, param)
export const roleInsert = param => http('post', Api.ROLE_INSERT, param)
export const roleModify = param => http('post', Api.ROLE_MODIFY, param)
export const roleAuthInsert = param => http('post', Api.ROLEAUTH_INSERT, param)
export const roleAuthGetAuth = param => http('get', Api.ROLEAUTH_GETAUTH, param)
export const roleSelect = param => http('get', Api.ROLE_SELECT, param)
export const roleDelete = param => http('delete', `${Api.USER_DELETE}/${param}`, {})
// 分类管理
export const cateTree = param => http('get', Api.CATE_TREE, param)
export const cateInsert = param => http('post', Api.CATE_INSERT, param)
export const cateModify = param => http('post', Api.CATE_MODIFY, param)
export const cateSort = param => http('post', Api.CATE_SORT, param)
// 物流管理
export const expInfoList = param => http('post', Api.EXPINFO_LIST, param)
export const expInfoModify = param => http('post', Api.EXPINFO_MODIFY, param)
export const expInfoInsert = param => http('post', Api.EXPINFO_INSERT, param)
export const expInfoSelect = param => http('get', Api.EXPINFO_SELECT, param)
// 公共接口
export const cosView = param => http('get', Api.COS_VIEW, param) // 文件预览(默认签名60min)
export const cosDelete = param => http('delete', Api.COS_DELETE, param) // 删除文件
export const altDelete = param => http('delete', Api.ATL_DELETE, param) // 删除文件记录
