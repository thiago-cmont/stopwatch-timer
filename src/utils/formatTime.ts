import {FormatType} from './types/utilsTypes';

function formatTimeString(time: number, format: FormatType = 'HH:MM:SS:MSMS') {
  let ms = time % 1000;
  let msString = String(ms);
  if (ms < 10) {
    msString = `00${ms}`;
  } else if (ms < 100) {
    msString = `0${ms}`;
  }

  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(time / 60000);
  let hours = Math.floor(time / 3600000);
  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;
  let secondsString = String(seconds);
  let minutesString = String(minutes);
  let hoursString = String(hours);
  let formattedString;
  let separator = format.substring(2, 3) === '.' ? '.' : ':';
  let showMs = format.length >= 9;
  let msDecimalCases;
  switch (format.length) {
    case 11:
      msDecimalCases = 1;
      break;
    case 13:
      msDecimalCases = 2;
      break;
    case 15:
      msDecimalCases = 3;
      break;
    default:
      msDecimalCases = 0;
  }
  if (showMs) {
    formattedString =
      `${hours >= 10 ? hoursString : '0' + hoursString}` +
      separator +
      `${minutes >= 10 ? minutesString : '0' + minutesString}` +
      separator +
      `${seconds >= 10 ? secondsString : '0' + secondsString}` +
      separator +
      `${msString.substring(0, msDecimalCases)}`;
  } else {
    formattedString =
      `${hours >= 10 ? hoursString : '0' + hoursString}` +
      separator +
      `${minutes >= 10 ? minutesString : '0' + minutesString}` +
      separator +
      `${seconds >= 10 ? secondsString : '0' + secondsString}`;
  }

  return formattedString;
}

export {formatTimeString};
