# NextJS Terminal Emulator

This is a (albeit WIP) configurable Terminal emulator for React (and by extension NextJS) intended for those wanting to use TypeScript with the package.

## Features (At this time don't expect all of these to be implemented)

- Customizable: Add custom responses, restyle and tweak the terminal to your liking and much more.
- Type Safety: Considering I've added TypeScript support to the project, it should be much easier to use for those who prefer TypeScript.
- A Unix terminal in the browser: Accurately emulate a native Unix terminal in the browser with no setup required.
- Familiar shortcuts: The terminal can keep track of commands and allows the user to recall them at their behest.
- Easy and powerful command system: Execute code from your own application and send the results to the terminal output.
- Async output support: Push output to the terminal at any time, even after a command response has been emitted.
- Unlimited concurrency: Register as many terminals as you like with no risk of input confusion.

## Usage (NextJS App Router Example)

```tsx
'use client';

import { Terminal } from 'nextjs-terminal-emulator';

const customCommands = [
  {
    command: 'echo',
    description: 'Echo the input arguments',
    fn: (args: string[]) => args.join(' ').replaceAll(/'/g, '').replaceAll(/"/g, ''),
  },
  {
    command: 'greet',
    description: 'Greet the user',
    fn: (args: string[]) => `Hello, ${args.join(' ') || 'world'}!`,
  },
  {
    command: 'ls',
    description: 'List directory contents',
    fn: () => {
      return ['file1.txt', 'file2.txt', 'dir1', 'dir2'].join('\n');
    },
  },
];

export default function TerminalComponent() {
  return (
    <div>
      <h1>Terminal Emulator Testing</h1>
      <Terminal customCommands={customCommands} prompt="root@linux:$ " />
    </div>
  );
}
```

## Credits

Credits go to [linuxwillner](https://github.com/linuswillner) for his [react-terminal-emulator](https://github.com/linuswillner/react-terminal-emulator) for giving me the idea to make this.
