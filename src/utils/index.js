/**
 * 根据时间戳返回距当前时间的距离
 * @param {*} dateTimeStamp 时间戳
 */
export function getDateByTime(dateTimeStamp) {
  let result;
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  // let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12)
      result = "" + parseInt(monthC) + "月前";
    else {
      result = "" + parseInt(monthC / 12) + "年前";
    }
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}
/**
 * 防抖 eg.当持续触发某事件时， 一定时间间隔内没有再触发事件时
 * 事件处理函数才会执行一次， 如果设定的时间间隔到来之前， 又一次触发了事件， 就重新开始延时。
 * @param { String } fn 函数名(挂载到this)
 * @param { Number } delay 延时
 */
export function debounce(fn, delay) {
  let timeout = null;
  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this[fn]();
    }, delay);
  };
}
/**
 * 节流 eg.当持续触发事件时， 有规律的每隔一个时间间隔执行一次事件处理函数。
 * @param { String } fn 函数名(挂载到this)
 * @param { Number } delay 延时
 */
export function throttle(fn, delay) {
  let prev = Date.now()
  return function() {
    let now = Date.now()
    if (now - prev > delay) {
      this[fn]();
      prev = Date.now()
    }
  }
}