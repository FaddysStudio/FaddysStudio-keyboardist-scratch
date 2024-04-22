import { parse } from 'node:path';

const environment = {};

export default environment;

export const engine = environment .engine = parse ( new URL ( import .meta .url ) .pathname ) .dir;
export const directory = environment .directory = '~/.keyboardist';

export const kit = environment .kit = directory + '/kit';
export const sequence = environment .sequence = directory + '/sequence';
