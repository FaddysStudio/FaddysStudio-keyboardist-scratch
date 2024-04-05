import { parse } from 'node:path';

export const engine = parse ( new URL ( import .meta .url ) .pathname ) .dir;
export const directory = '~/.keyboardist';

export const kit = directory + '/kit';
export const sequence = directory + '/sequence';
