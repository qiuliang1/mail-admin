// import React from "react";
import { useRecoilValue } from "recoil";
import { getSettingValue } from "@/store/setting.recoil";

export function GetSettingFn(param) {
    const val = useRecoilValue(getSettingValue(param));
    return val
}