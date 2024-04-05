import command from '@faddys/keyboardist/command';
import { parse } from 'node:path';

export default {

$_producer () {

command ( 'mkdir -p ~/.keyboardist/bank' );

},

async $_director ( $, path, kit ) {

const { output: [ type ] } = await command ( `file --brief --mime-type ${ path }` );

if ( typeof type === 'string' && ! type .startsWith ( 'audio/' ) )
throw Error ( `${ path } is not an audio file` );


await command ( `mkdir -p ~/.keyboardist/bank/${ kit }` );

const link = `~/.keyboardist/bank/${ kit }/${ Date .now () }${ parse ( path ) .ext }`;

await command ( `ln -sr ${ path } ${ link }` );

await command ( `aplay ${ link }` );

}

};