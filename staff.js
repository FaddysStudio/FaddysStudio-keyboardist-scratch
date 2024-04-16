import faddys from './faddys.js';

export default new class Staff extends Array {

constructor ( reference = 60, direction = 1 ) {

super ();

const staff = this;

staff .reference = reference;

if ( direction > 0 )
staff .push ();

else if ( direction < 0 )
staff .unshift ();

}

push () {

const staff = this;

if ( staff .length === 10 )
return staff .length;

super .push ( staff .reference );

console .log ( staff .reference );

staff .reference += faddys [ ( staff .length - 1 ) % faddys .length ] .length;

return staff .push ();

}

unshift () {

const staff = this;

if ( staff .length === 10 )
return staff .length;

super .unshift ( staff .reference );

staff .reference -= faddys [ faddys .length - ( ( staff .length % faddys .length ) || faddys .length ) ] .length;

return staff .unshift ();

}

};
