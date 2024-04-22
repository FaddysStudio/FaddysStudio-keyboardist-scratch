import { readdir } from 'node:fs/promises';
import { exec } from 'node:child_process';

export default class Browser {

async $list () {

const browser = this;

if ( ! browser .directory )
const directory = ( await readdir ( process .cwd () ) );

const name = browser .directory .pop ();

exec (

`file --brief --mime-type ${ name }`,
( _, type ) => {

if ( ! Browser .compatible .includes ( type .trim () ) )
return;

console .log ( samples .push ( name ), name );

exec (   

}

) );

}

static compatible = [

'audio/x-wav',
'audio/x-aiff'

]

};

new Browser () .$list ();
