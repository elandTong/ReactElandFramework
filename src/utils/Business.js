/*
 * @Author: Eland.Tong
 * @Date: 2020-07-29 17:12:09
 * @LastEditTime: 2020-08-19 15:25:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ReactElandFramework/src/utils/Business.js
 */

import CryptoJS from 'crypto-js'

class Business {
    static default_aeskey = 'wsx~3319dee^1688' // 默认 aes key

    static encryptBase64(txt, key = this.default_aeskey) { // 加密
        let srcs = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(txt))

        let en = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString()

        return en
    }

    static decryptBase64(txt, key = this.default_aeskey) { // 解密
        return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(this.decrypt(txt, key)))
    }

    static encrypt(txt, key = this.default_aeskey) { // 加密
        let srcs = CryptoJS.enc.Utf8.parse(txt)

        let en = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString()

        return encodeURIComponent(en)
    }

    static decrypt(txt, key = this.default_aeskey) { // 解密
        let decrypt = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })

        return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    }
}

export default Business
