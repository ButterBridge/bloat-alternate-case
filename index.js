const { spawn } = require('child_process');

function alternatingCase(sentence) {
  let transformers = ['toUpperCase', 'toLowerCase'];

  return new Promise(res => {
    const words = sentence.split(' ');

    Promise.all(
      words.map((word, wordIndex) => {
        return new Promise(async resInner => {
          let bitmap = '';
          const switchBitmap = () => {
            bitmap = (
              parseInt(bitmap, 2) ^ parseInt('1'.repeat(word.length), 2)
            ).toString(2);
          };
          const child = spawn('node', ['gen.js', word]);
          child.stdout.on('data', d => {
            bitmap += d.toString().trim();
          });
          child.stdout.on('end', () => {
            const letters = word.split('');
            if (words[wordIndex - 1] && words[wordIndex - 1].length % 2)
              switchBitmap();
            return Promise.all(
              letters.map((letter, letterIndex) => {
                return letter[transformers[bitmap[letterIndex]]]();
              })
            ).then(switchedLetters => {
              resInner(switchedLetters.join(''));
            });
          });
        });
      })
    ).then(casedWords => {
      res(casedWords.join(' '));
    });
  });
}

module.exports = { alternatingCase };
