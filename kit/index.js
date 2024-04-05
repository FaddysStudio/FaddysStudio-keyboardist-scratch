import Scenarist from '@faddys/scenarist';
import command from '@faddys/keyboardist/command';
import { engine, kit as directory } from '@faddys/keyboardist/environment';
import { parse } from 'node:path';

export const scenario = {

$_producer ( $ ) {

if ( process .argv [ 1 ] === parse ( new URL ( import .meta .url ) .pathname ) .dir )
return $ ( ... process .argv .slice ( 2 ) );

},

async $_director ( $, path, kit ) {

const { output: [ type ] } = await command ( `file --brief --mime-type ${ path }` );

if ( typeof type === 'string' && ! type .startsWith ( 'audio/' ) )
throw Error ( `${ path } is not an audio file` );

const link = `${ directory }/${ kit }/${ Date .now () }${ parse ( path ) .ext }`;

await command ( `mkdir -p ${ directory }/${ kit }` );
await command ( `ln -sr ${ path } ${ link }` );
command ( `csound --smacro:sample=${ path } ${ engine }/kit/index.csd` );

console .log ( '#path', path );
console .log ( '#link', link );

}

};

export const $ = await Scenarist ( scenario );
