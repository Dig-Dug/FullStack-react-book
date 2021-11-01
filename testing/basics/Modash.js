// We write the Modash library in this file in the Unit Testing chapter
function truncate(string, length){
    if(string.length > length){
        return string.slice(0, length) + '...';
    }else{return string;}
}

function capitalize(string){
    return(
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    );
}

function camelCase(string){
    const words = string.split(/[\s|\-|_]+/);
    return [
        words[0].toLowerCase(),
        ...words.slice(1).map((w) => capitalize(w)),
    ].join('');
}

//object encapsulating methods
const Modash = {
    truncate,
    capitalize,
    camelCase,
};
//export it
export default Modash;














