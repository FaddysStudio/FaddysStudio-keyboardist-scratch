import Scenarist from '@faddys/scenarist';
import { writeFile } from 'node:fs/promises';

export default await Scenarist ( new class Sequencer {

constructor () {

const [ response, code ] = process .argv .slice ( 2 );
const key = String .fromCharCode ( parseInt ( code ) );

Object .assign ( this, { response, key } );

}

async $_producer ( $ ) {

try {

const { resolution } = await $ ( this .key );

await writeFile ( this .response, resolution );

} catch ( _ ) {

process .exitCode = -1;

}

}

$_director ( $, key ) {

if ( isNaN ( key = parseInt ( key ) ) || key < 1 || key > 9 )
throw -1;

return 'i "synthesizer" 0 1 69 100';

}

} );
