import deepTrim from 'deep-trim';
import justTheWords from 'just-the-words';

export function isolateWords(input) {
  // const a1 = slateValue.map((text) => text.children);
  const a1 = input.map((text) => text.children);
  // console.log('isolateWords.js a1: ', a1);

  const a2 = [];

  for (let i = 0; i < a1.length; i++) {
    a2.push(a1[i].map((text) => text.text));
  }

  // console.log('isolateWords.js a2: ', a2);

  const a3 = a2.flat(1);
  // console.log('isolateWords.js a3: ', a3);

  const a4 = deepTrim(a3);
  // console.log('isolateWords.js a4: ', a4);

  const a5 = a4.filter((element) => {
    return element !== '';
  });
  // console.log('isolateWords.js a5: ', a5);

  const a6 = a5.map((word) => word.replace(/[."!]\\/g, '').toLowerCase());
  // console.log('isolateWords.js a6: ', a6);

  const a7 = [];

  for (let i = 0; i < a6.length; i++) {
    a7.push(justTheWords(a6[i]));
  }
  // console.log('isolateWords.js a7: ', a7);

  const a8 = a7.flat(1);
  // console.log('isolateWords.js a8: ', a8);

  return a8;
}
