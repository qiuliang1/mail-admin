import { create } from 'zustand';
import { loginApi, logoutApi } from '@/api/ums';
// import { setCookie } from '@/utils/cookie';
import { encryptByBase64 } from '@/utils/cipher';

export const useUser = create((set) => ({
    userInfo: null,
    token: null,
    sessionTimeout: false,
    lastUpdateTime: 0,
    login: async ({passwd, ...loginParams}) => {
        passwd = encryptByBase64(passwd)
        const data = await loginApi({...loginParams, passwd})
        console.log('[ data ] >', data)
        try {
            const {data: {token, ...userInfo}} = data
            localStorage.setItem("authToken", token)
            set({userInfo})
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    logout: async () => {
        const data = await logoutApi()
        try {
            localStorage.removeItem("authToken")
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}))