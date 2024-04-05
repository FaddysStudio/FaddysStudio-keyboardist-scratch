#!/usr/bin/env node

import { parse } from 'node:path';

console .log ( parse ( new URL ( import .meta .url ) .pathname ) .dir );
