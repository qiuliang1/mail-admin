import { atom, selectorFamily } from "recoil"

export const projectSetting = atom({
    key: "project",
    default: {
        "showSettingButton": true,
        "showDarkModeToggle": true,
        "settingButtonPosition": "auto",
        "permissionMode": "ROUTE_MAPPING",
        "permissionCacheType": 1,
        "sessionTimeoutProcessing": 0,
        "themeColor": "#1677ff",
        "grayMode": false,
        "colorWeak": false,
        "fullContent": false,
        "contentMode": "full",
        "showLogo": true,
        "showFooter": false,
        "headerSetting": {
            "bgColor": "#ffffff",
            "fixed": true,
            "show": true,
            "theme": "dark",
            "useLockPage": true,
            "showFullScreen": true,
            "showDoc": true,
            "showNotice": true,
            "showSearch": true
        },
        "menuSetting": {
            "bgColor": "#001529",
            "fixed": true,
            "collapsed": false,
            "siderHidden": false,
            "collapsedShowTitle": false,
            "canDrag": false,
            "show": true,
            "hidden": false,
            "menuWidth": 210,
            "mode": "inline",
            "type": "sidebar",
            "theme": "dark",
            "topMenuAlign": "center",
            "trigger": "HEADER",
            "accordion": true,
            "closeMixSidebarOnChange": false,
            "mixSideTrigger": "click",
            "mixSideFixed": false,
            "split": false
        },
        "multiTabsSetting": {
            "cache": false,
            "show": true,
            "canDrag": true,
            "showQuick": true,
            "showRedo": true,
            "showFold": true
        },
        "transitionSetting": {
            "enable": true,
            "basicTransition": "fade-slide",
            "openPageLoading": true,
            "openNProgress": false
        },
        "openKeepAlive": true,
        "lockTime": 1,
        "showBreadCrumb": true,
        "showBreadCrumbIcon": false,
        "useErrorHandle": false,
        "useOpenBackTop": true,
        "canEmbedIFramePage": true,
        "closeMessageOnSwitch": true,
        "removeAllHttpPending": false
    }
})

// export const 

export const getSettingValue = selectorFamily({
    key: "getSettingValue",
    get: (attr) => ({get}) => {
        const settingValue = get(projectSetting)
        const [attrf, attrc] = attr.split(".")
        const value = attrc ? settingValue[attrf][attrc] : settingValue[attrf]
        return value
    }
})

export const getSettingValues = selectorFamily({
    key: "getSettingValue",
    get: (attr) => ({get}) => {
        const settingValue = get(projectSetting)
        
        const values = []
        attr.map(v => {
            const [attrf, attrc] = v.split(".")
            const value = attrc ? settingValue[attrf][attrc] : settingValue[attrf]
            values.push(value)
        })
        return values
    }
})
