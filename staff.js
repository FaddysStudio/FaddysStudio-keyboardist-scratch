export default class Staff extends Array {

constructor ( { maqam, reference = 60, key = 0 } ) {

super ();

const staff = this;

Object .assign ( staff, {

maqam,
reference: parseFloat ( reference ) || 60,
key: ( key = parseInt ( key ) ) >= 0 && key < 10 ? key : 0,
path: 0

} );

if ( staff .key < 9 )
staff .push ();

staff .key = key;
staff .path = 0;

if ( staff .key > 0 ) {

staff .shift ();
staff .reference = reference;
staff .unshift ();

}

}

push () {

const staff = this;

if ( staff .key > 9 )
return staff .length;

super .push ( staff .reference );

const { maqam } = staff;

staff .key++;
staff .path++;

staff .reference += maqam [ ( staff .path - 1 ) % maqam .length ] .length;

return staff .push ();

}

unshift () {

const staff = this;

if ( staff .key < 0 )
return staff .length;

super .unshift ( staff .reference );

const { maqam } = staff;

staff .key--;
staff .path++;

staff .reference -= maqam [ maqam .length - ( ( staff .path % maqam .length ) || maqam .length ) ] .length;

return staff .unshift ();

}

};
