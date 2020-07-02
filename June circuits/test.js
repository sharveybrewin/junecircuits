/*if(false && func()) {
    console.log(1);
}


function func() {
    console.log(2);
    return true
}

if(false && true && true) {
    console.log(1);
}
*/
/*
const matrix = [[1,2],[3,4]];
console.log(matrix);

let newMatrix = [];
for(let i=0; i<matrix.length; i++) {
    newMatrix.push([...matrix[i]])
}

newMatrix[0][1] = 5;
matrix[0][1] = 6;

console.log(newMatrix);
console.log(matrix);
*/
/*
const arr = [1,2];
let newArr = [...arr];
newArr[0] = 3;
console.log(arr);
console.log(newArr);
*/

/*var stepCount = 0;
function ifClause() {
    stepCount = 1;
    return false;
}*/
/*
if(ifClause()) {
    console.log(stepCount);
}
else {
console.log(stepCount);
}

x=0;
function changeX() {
    if(x==2) {
        return 1
    };
}

if(changeX()){
    x = 2;
}

console.log(x);

var f = () => {}

console.log(f());

var arr = [];
console.log(arr[1]);

class X {
    get Y() { return 42;}
}

console.log(3=='3');
*/

if([]) {
    console.log("Empty array is not falsy")
}