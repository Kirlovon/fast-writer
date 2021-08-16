import { FastWriter } from './mod.ts';

const NUMBER_OF_WRITES = 100000;

// Default writing
console.time('await Deno.writeTextFile()');
for (let i = 0; i < NUMBER_OF_WRITES; i++) {
    await Deno.writeTextFile('./default-writing-benchmark.txt', 'Data writing №' + i)
}
console.timeEnd('await Deno.writeTextFile()');

// Default writing without await
console.time('Deno.writeTextFile()');
for (let i = 0; i < NUMBER_OF_WRITES; i++) {
    Deno.writeTextFile('./no-await-writing-benchmark.txt', 'Data writing №' + i)
}
console.timeEnd('Deno.writeTextFile()');

// FastWriter writing
console.time('writer.write()');
const writer = new FastWriter('./fast-writing-benchmark.txt');
for (let i = 0; i < NUMBER_OF_WRITES; i++) {
    writer.write('Data writing №' + i);
}
console.timeEnd('writer.write()');