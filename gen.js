async function* genBitmap(word) {
  for (let i in word) {
    const modI = await new Promise(res => {
      setTimeout(() => {
        res(i % 2);
      }, 10 * i);
    });
    yield modI;
  }
}

(async function serviceBitmap() {
  const wordBitmapGenerator = genBitmap(process.argv[2]);
  let generation = await wordBitmapGenerator.next();
  while (!generation.done) {
    console.log(generation.value);
    generation = await wordBitmapGenerator.next();
  }
})();
