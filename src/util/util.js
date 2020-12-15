export default {
  getToken() {
    return sessionStorage.getItem('token');
  },
  /**日期格式化v0 */
  formatDate(res) {
    let date = new Date(res);
    let year = date.getFullYear(),
      mouth =
      date.getMonth() + 1 < 10 ?
      `0${date.getMonth() + 1}` :
      date.getMonth() + 1,
      day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return year + "-" + mouth + "-" + day + " " + hour + ":" + minute;
  },
  /**日期格式化v1 */
  formatDateV1(res) {
    let date = new Date(res);
    let year = date.getFullYear(),
      mouth =
      date.getMonth() + 1 < 10 ?
      `0${date.getMonth() + 1}` :
      date.getMonth() + 1,
      day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return year + "-" + mouth + "-" + day;
  },
  /**日期格式化v2 */
  formatDateV2(res) {
    let testDate = new Date(res);
    let oldDate = new Date(`${testDate.getFullYear()}-${testDate.getUTCMonth() + 1}-${testDate.getUTCDate()} ${testDate.getHours()}:${testDate.getUTCMinutes()}`);
    let nowDate = new Date();
    if ((nowDate.getTime() / 1000 - oldDate.getTime() / 1000) < 0) {
      return `未知时间`;
    }
    if ((nowDate.getTime() / 1000 - oldDate.getTime() / 1000) >= 0 && (nowDate.getTime() / 1000 - oldDate.getTime() / 1000) <= 5 * 60) {
      return `刚刚`;
    }
    if ((nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) > 5 && (nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) <= 60) {
      return `${Math.round(nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60)}分钟前`;
    }
    if ((nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) > 60 && (nowDate.getTime() / 1000 / 60 - oldDate.getTime() / 1000 / 60) <= 60 * 24) {
      return `${Math.round(nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60)}小时前`;
    }
    if ((nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60) > 24 && (nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60) <= 3 * 24) {
      return `${Math.round(nowDate.getTime() / 1000 / 60 / 60 / 24 - oldDate.getTime() / 1000 / 60 / 60 / 24)}天前`;
    }
    if ((nowDate.getTime() / 1000 / 60 / 60 - oldDate.getTime() / 1000 / 60 / 60) > 3 * 24) {
      return this.formatDate(res);
    }
  },
  /**对应星期几 */
  getRightDay(date) {
    let week = {
      0: '星期日',
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六'
    };
    return week[date.getDay()];
  },
  /**年级格式化 */
  formatGrade(res) {
    let grade = {
      1: '大一',
      2: '大二',
      3: '大三',
      4: '大四'
    }
    return grade[res];
  },
  /**性别回馈 */
  formatSex(res) {
    return res === 'M' ? '男生' : '女生';
  },
  /**参数筛选，为空则不传 */
  checkParams(val) {
    let params = {};
    for (let i in val) {
      if (typeof (val[i]) === "number" && val[i] != null) {
        params[i] = val[i];
      }
      if (typeof (val[i]) === "string") {
        if (val[i].split(" ").join("").length > 0) {
          params[i] = val[i];
        }
      }
    }
    return params;
  },
}
