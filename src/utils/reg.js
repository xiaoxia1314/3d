// 电话
var regPhone = /^1[34578][0-9]{9}$/
// ip
var IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
export default {
    install(Vue) {
        // 电话号码的验证
        Vue.prototype.VerifyPhone = function (rule, phone, callback) {
            if (!phone) {
                return callback(new Error('手机号不能为空'))
            } else {
                // phone = phone.replace(Vue.prototype.$regs.regSpace, '')
            }
            if (!regPhone.test(phone)) {
                return callback(new Error('请输入有效手机号'))
            } else {
                callback()
            }
        }
        // ip的验证
        Vue.prototype.VerifyIP = function (rule, ip, callback) {
            if (!ip) {
                callback(new Error('ip不能为空'))
            } else {
                if (!IP.test(ip)) {
                    callback(new Error('请输入正确的IP地址'))
                } else {
                    callback()
                }
            }
        }
        // 年龄
        Vue.prototype.validateAge = (rule, value, callback) => {
            let reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;//年龄是1-120之间有效
            if(!value){
                callback([new Error('年龄输入不合法')]);
            }else{
                if (!reg.test(value)) {
                    callback([new Error('年龄输入不合法')]);
                } else {
                    callback();
                }
            }
        }
    }


}