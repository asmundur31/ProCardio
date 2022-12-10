/**
 * Function that fixes the format on recording
 */
export function formatRecording(rec) {
  rec.recording.experiment.duration = (rec.recording.experiment.duration/1000)+'s';
  rec.recording.experiment.startTime = formatDate(rec.recording.experiment.startTime);
  rec.recording.experiment.endTime = formatDate(rec.recording.experiment.endTime);
  return rec;
}

/**
 * Function that takes a date and formats it to pretty date
 */
function formatDate(date) {
  var d = new Date(date);
  var datestring = parseInt(d.getFullYear()) >= 10 ? d.getFullYear() : '0'+d.getFullYear();
  datestring += '-';
  datestring += parseInt(d.getMonth()+1) >= 10 ? (d.getMonth()+1) : '0'+(d.getMonth()+1);
  datestring += '-';
  datestring += parseInt(d.getDate()) >= 10 ? d.getDate() : '0'+d.getDate();
  datestring += ' ';
  datestring += parseInt(d.getHours()) >= 10 ? d.getHours() : '0'+d.getHours();
  datestring += ':';
  datestring += parseInt(d.getMinutes()) >= 10 ? d.getMinutes() : '0'+d.getMinutes();
  datestring += ':';
  datestring += parseInt(d.getSeconds()) >= 10 ? d.getSeconds() : '0'+d.getSeconds();
  return datestring;
}
