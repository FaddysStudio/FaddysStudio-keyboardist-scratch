import { parse } from 'node:path';

export default class Processor {

async $_producer ( $ ) {

if ( process .argv [ 1 ] !== parse ( new URL ( this .url ) .pathname ) .dir )
return;

try {

await $ ( ... process .argv .slice ( 2 ) );

} catch ( error ) {

console .error ( '#error', error ?.message || error );

process .exitCode = -1;

}

process .on ( 'exit', code => console .error ( '#exit', code ) );

}

};
