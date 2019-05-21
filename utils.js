import zhuyin from 'zhuyin';
import pinyin from 'chinese-to-pinyin';

const convertHanzi = (hanzi) => {
  return zhuyin(pinyin(hanzi)).map(function(word) {
    if (word.indexOf('`')) return word.replace('`', 'ˋ');
    return word;
  }).join(' ');
}

const convert = (str) => {
  return str.replace(/[^\u4E00-\u9FCC]+/g, ' " ')
    .replace(/[\u4E00-\u9FCC]+/g, function(match) {
      return convertHanzi(match);
    }).trim();
}

export default convert;
