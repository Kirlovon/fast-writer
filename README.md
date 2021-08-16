# Deno FastWriter ✒
Fast & Safe file writing for [Deno](https://deno.land/)!

This utility has no dependencies, and is made to speed up overwriting the same file. It writes the last provided data only when previous data has been written. Also, the writing is **atomic**, so main file will not be corrupted in case of an emergency process exiting.

> This library is heavily inspired by [steno](https://github.com/typicode/steno) made by [typicode](https://github.com/typicode). FastWriter uses same optimization techniques, but made specifically for Deno.

<br>

## Example
```typescript
import { FastWriter } from 'https://deno.land/x/fastwriter/mod.ts'

// Initialize writer
const writer = new FastWriter('./my-file.txt');

// Write data using this method
writer.write('Super-fast writing!');
```

<br>

## Benchmarks
| Operations | FastWriter   | writeTextFile | writeTextFile _(Without `await`)_ |
| ---------- | ------------ | ------------- | -------------------------------   |
| 1,000      | **< 1ms**    | 1724ms        | 12ms                              |
| 10,000     | **3ms**      | 26372ms       | 89ms                              |
| 100,000    | **16ms**     | ∞             | 922ms                             |

_You can run `benchmark.ts` to check it by yourself!_

<br>

## License
MIT _(see [LICENSE](https://github.com/Kirlovon/FastWriter/blob/master/LICENSE) file)_