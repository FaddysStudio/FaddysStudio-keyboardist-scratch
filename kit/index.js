import Scenarist from '@faddys/scenarist';
import command from '@faddys/keyboardist/command';
import { engine, kit } from '@faddys/keyboardist/environment';
import { parse } from 'node:path';
import { createHash } from 'node:crypto';

export const scenario = {

$_producer ( $ ) {

if ( process .argv [ 1 ] === parse ( new URL ( import .meta .url ) .pathname ) .dir )
return $ ( ... process .argv .slice ( 2 ) );

},

async $_director ( $, name, file ) {

const { output: [ type ] } = await command ( `file --brief --mime-type ${ file }` );

if ( typeof type === 'string' && ! type .startsWith ( 'audio/' ) )
throw Error ( `${ file } is not an audio file` );

let { dir: path, base, ext: extension } = parse ( file );

path = ( await command ( `cd ./${ path }; pwd` ) ) .output;

const hash = createHash ( 'sha256' ) .update ( `#kit/${ name } ${ path }/${ base }` ) .digest ( 'hex' );
const directory = kit + '/' + name;
let { output: [ link ] } = await command ( `cat ${ directory }/${ hash }` );

if ( link )
return console .log ( '#link', 'Already exists' );

await command ( `mkdir -p ${ directory }` );

link = `${ directory }/${ Date .now () }${ extension }`;

command ( `ln -sr ${ file } ${ link }` );
command ( `echo ${ link } > ${ directory }/${ hash }` );
command ( `csound --smacro:sample=${ file } ${ engine }/kit/index.csd` );

console .log ( '#sample', file );
console .log ( '#link', link );

}

};

export const $ = await Scenarist ( scenario );
