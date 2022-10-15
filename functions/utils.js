export function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

export const formatInviteName = (nameArray) => {
  const { length } = nameArray
  if (length < 1) return ''
  if (length === 1) return nameArray[0]
  if (length === 2) return `${nameArray[0]} and ${nameArray[1]}`
  if (length === 3) return `${nameArray[0]}, ${nameArray[1]} and ${nameArray[2]}`
  if (length === 4) return `${nameArray[0]}, ${nameArray[1]}, ${nameArray[2]} and ${nameArray[3]}`
  return 'Unknown'
}