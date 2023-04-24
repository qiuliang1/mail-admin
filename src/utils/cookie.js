
export const setCookie = (cName, value, expiredays = 86400e3) => {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
        cName +
        "=" +
        encodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
};

export const getCookie = (key) => {
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
            start = start + key.length + 1;
            var end = document.cookie.indexOf(";", start);
            if (end === -1) end = document.cookie.length;
            return decodeURIComponent(document.cookie.substring(start, end));
        }
    }
    return "";
};