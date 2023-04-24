import UTF8, { parse } from 'crypto-js/enc-utf8'
import { encrypt, decrypt } from 'crypto-js/aes'
import ECB from 'crypto-js/mode-ecb'
import pkcs7 from 'crypto-js/pad-pkcs7'
import Base64 from 'crypto-js/enc-base64'
import pako from 'pako'
const SECRET_KEY = '1234123412341234'
const SECRET_IV = '1234123412341234'

export class AesEncryption {
  constructor (opt = {}) {
    const { key, iv } = opt
    this.key = parse(key ?? SECRET_KEY)
    this.iv = parse(iv ?? SECRET_IV)
  }

  get getOptions () {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv
    }
  }
  /**
   * @description AES 加密
   * @param {string | object} cipherText
   * @returns {string}
   */
  encryptByAES (cipherText) {
    if (typeof cipherText === 'object') {
      try {
        cipherText = JSON.stringify(cipherText)
      } catch (error) {
        console.log('encrypt error:', error)
      }
    }
    return encrypt(cipherText, this.key, this.getOptions).toString()
  }
  /**
   * @description AES 解密
   * @param {string} cipherText
   * @returns {string}
   */
  decryptByAES (cipherText) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}

export class PakoClass {
  zip (data) {
    if (!data) return data
    // 判断数据是否需要转为JSON
    // const dataJson =
    //   typeof data !== 'string' && typeof data !== 'number'
    //     ? JSON.stringify(data)
    //     : data

    // // 使用Base64.encode处理字符编码，兼容中文
    // const str = encryptByBase64(dataJson)
    // let binaryString = pako.gzip(str)
    // let arr = Array.from(binaryString)
    // let s = ''
    // arr.forEach((item, index) => {
    //   s += String.fromCharCode(item)
    // })
    // return window.btoa(s)
    const binaryString = pako.gzip(data, { to: 'string' })
    let v = this.ab2str(binaryString)
    return window.btoa(v)
  }

  unzip (b64Data) {
    var strData = window.atob(b64Data)
    // Convert binary string to character-number array
    var charData = strData.split('').map(function (x) {
      return x.charCodeAt(0)
    })
    // Turn number array into byte-array
    var binData = new Uint8Array(charData)
    // unzip
    var data = pako.inflate(binData)
    // Convert gunzipped byteArray back to ascii string:
    return this.ab2str(data)
  }

  ab2str (buf) {
    var binaryString = ''
    let bytes = new Uint16Array(buf)
    let length = bytes.length
    for (var i = 0; i < length; i++) {
      binaryString += String.fromCharCode(bytes[i])
    }
    return binaryString
  }
}

export function encryptByBase64 (cipherText) {
  return UTF8.parse(cipherText).toString(Base64)
}

export function decodeByBase64 (cipherText) {
  return Base64.parse(cipherText).toString(UTF8)
}
