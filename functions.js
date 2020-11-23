function convertEpoch(epoch, citytimezone) {
  let convertedTime;
  let date = new Date(0);
  date.setUTCSeconds(epoch);
  let year = date.toLocaleString('default', { year: 'numeric', timeZone: citytimezone });
  let month = date.toLocaleString('default', { month: 'long', timeZone: citytimezone });
  let monthDate = date.toLocaleString('default', { day: '2-digit', timeZone: citytimezone });
  let dayOfTheWeek = date.toLocaleString('default', { weekday: 'long', timeZone: citytimezone });
  let hour = date.toLocaleString('default', { hour: '2-digit', timeZone: citytimezone });
  let minutes = date.toLocaleString('default', { minute: '2-digit', timeZone: citytimezone });
  let timezone = date.toLocaleString('default', { timeZoneName: 'short', timeZone: citytimezone });
  let firstTen = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
  let ampm;
  if (monthDate.startsWith(0)) {
    monthDate = monthDate.slice(1);
  }
  // replace below with ternary operator
  if (hour.includes('PM')) {
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }
  hour = hour.replace(/\D/g, '');
  if (hour.startsWith(0)) {
    hour = hour.slice(1);
  }
  if (minutes.length === 1) {
    minutes = firstTen[minutes];
  }
  timezone = timezone.slice(timezone.length - 3);
  convertedTime = `${dayOfTheWeek}, ${month} ${monthDate}, ${year}, at ${hour}:${minutes} ${ampm} ${timezone}`;
  return convertedTime;
}

function convertEpochToClock(epoch, citytimezone, showSeconds) {
  let convertedTime;
  let date = new Date(0);
  date.setUTCSeconds(epoch);
  let hour = date.toLocaleString('default', { hour: '2-digit', timeZone: citytimezone });
  let minutes = date.toLocaleString('default', { minute: '2-digit', timeZone: citytimezone });
  let firstTen = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
  let seconds = '';
  let ampm;
  // replace below with ternary operator
  if (hour.includes('PM')) {
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }
  hour = hour.replace(/\D/g, '');
  if (hour.startsWith(0)) {
    hour = hour.slice(1);
  }
  if (minutes.length === 1) {
    minutes = firstTen[minutes];
  }
  if (showSeconds) {
    if (seconds.length === 1) {
      seconds = `:${firstTen[date.getSeconds()]}`
    } else {
      seconds = `:${date.getSeconds()}`;
    }
  }
  convertedTime = `${hour}:${minutes}${seconds} ${ampm}`;
  return convertedTime;
}

module.exports.convertEpoch = convertEpoch;
module.exports.convertEpochToClock = convertEpochToClock;
