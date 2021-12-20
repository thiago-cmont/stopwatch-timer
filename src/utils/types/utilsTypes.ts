const Formats = {
  'HH:MM': 'HH:MM',
  'HH:MM:SS': 'HH:MM:SS',
  'HH:MM:SS:MSMSMS': 'HH:MM:SS:MSMSMS',
  'HH:MM:SS:MSMS': 'HH:MM:SS:MSMS',
  'HH:MM:SS:MS': 'HH:MM:SS:MS',
  'HH.MM': 'HH.MM',
  'HH.MM.SS': 'HH.MM.SS',
  'HH.MM.SS.MSMSMS': 'HH.MM.SS.MSMSMS',
  'HH.MM.SS.MSMS': 'HH.MM.SS.MSMS',
  'HH.MM.SS.MS': 'HH.MM.SS.MS',
};
export type FormatType = keyof typeof Formats;
