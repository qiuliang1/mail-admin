import { create } from 'zustand';
import product from "immer"

export const useSystem = create(
    (set) => (
        {
            themeColor: '#1677ff',
            menuSetting: {
                bgColor: '#001529',
                collapsed: false,
                collapsedShowTitle: false,
                menuWidth: 210,
                mode: 'inline',
                type: 'sidebar',
                theme: 'dark'
            },
            headerSetting: {
                bgColor: '#ffffff',
                theme: 'dark',
                useLockPage: true,
                showFullScreen: true,
                showDoc: true,
                showNotice: true
            },
            menuList: [],
            /**
             * @description 根据获取的一级或者二级属性，修改store的值
             */
            setSystemProperty: (prop, val) => set(product(state => {
                if (prop) {
                    const [v1, v2] = prop.split('.')
                    v2 ? state[v1][v2] = val : state[v1] = val
                }
            })),
            setMenuList:(menuList) => set(product(state => {
                state.menuList = menuList
            }))
        }
    )
)