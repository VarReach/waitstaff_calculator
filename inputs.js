'use strict';

function isNumberKey(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)));
}