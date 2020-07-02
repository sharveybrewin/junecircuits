/*You are given a matrix . The matrix rows are numbered from  to  from top to bottom and the matrix columns are numbered from  to  from left to right. The cells of the field at the intersection of the  row and the column has coordinates .

Every cell is empty or blocked. For every cell , determine if you change the state of cell (empty to blocked or blocked to empty), then is it possible to reach cell  from  by going only down and right.

Input format

The first line contains two space-separated numbers   denoting the number of rows and columns.
Next  lines contain symbols. If the symbol on  is '#', then the cell is blocked. Otherwise, if the symbol is '.', then the cell is empty.
Output format

Print   lines where every line contains  numbers. Print 0 if it is impossible to reach . Otherwise, print 1.

Constraints


*/

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";

process.stdin.on("data", function (input) {
    stdin_input += input;                               // Reading input from STDIN
});

process.stdin.on("end", function () {
   main(stdin_input);
});

function main(input) {
    process.stdout.write(run(input)+"\n");       // Writing output to STDOUT
}

function run (input) {
        //input to matrix
        const lines = input.split("\n");
        let thisMatrix = [];
        for (let i=1; i<lines.length; i++) {
            thisMatrix.push(lines[i].split(""));
        }
        console.log(thisMatrix);

        let defaultMasterChecked = []; 
        for (let i=0; i < thisMatrix.length; i++) {
            defaultMasterChecked.push([]);
            for (let j=0; j<thisMatrix[i].length; j++) {
                defaultMasterChecked[i].push(0);
            }
        }
        
        function traversable(matrix, masterCheckMat = defaultMasterChecked, focusCell = [0,0]) {
            //A "checked" matrix to keep track of which cells have already been shown to be not traversable
            let checked = []; 
            for (let i=0; i < thisMatrix.length; i++) {
                checked.push([]);
                for (let j=0; j<thisMatrix[i].length; j++) {
                    checked[i].push(0);
                }
            }

            function traversableFrom(matrix,x,y) {
                stepCount ++;
               // console.log("stepCount: "+stepCount);
               // console.log("location: "+x+","+y);
                if(checked[y][x] == 0) {
                    if(masterCheckMat[y][x] == 0 || ( x <= focusCell[0] && y <= focusCell[1])) { //We can't rely on the masterCheck if its 0, or if we are above or to the right of the focus Cell
                        if(matrix[y][x] == "#" || matrix[matrix.length-1][matrix[0].length-1] == "#") { //If upper left cell, or lower right cell, is blocked, no route.
                            //console.log("This is a #, no route this way");
                            checked[y][x] = -1;
                            return false;
                        }
                        if(x == matrix[0].length-1 && y == matrix.length-1) { //If matrix is 1x1, we're done.
                            //console.log("We're at the end of the matrix");    
                        checked[y][x] = 1;
                            return true;
                        }
                        if(x+1 <= matrix[0].length-1 && checked[y][x+1] == 0) { /*ie has a right-adjacent, unchecked cell*/ 
                            //console.log("Step right if it's a .");
                            if(matrix[y][x+1] == "." && traversableFrom(matrix,x+1,y)) { //If cell to the right is accesible, and creates a traversable matrix, we're done.
                                checked[y][x] = 1;
                            // console.log(x+","+y+"is top left of a traversable matrix");
                                return true;
                            }
                        // console.log("Right from "+x+"," +y +"is not an option");
                            checked[y][x+1] = -1;
                            //console.log(checked); //If this is reached, matrix[y][x+1] is "#", and has not been checked by transversableFrom so checked[y][x+1] is yet to be assigned 1
                        }            
                        if(y+1 <= matrix.length-1 && checked[y+1][x] == 0) { /*ie has a down-adjacent, unchecked cell*/ 
                        // console.log("Step down");
                            if(matrix[y+1][x] == "." && traversableFrom(matrix,x,y+1)) { //If cell below is accessible, and creates a traversable matrix, we're done.
                                checked[y][x] = 1;  
                            //  console.log("d");
                                return true;
                            }
                        // console.log("Down from "+x+","+y+"is not an option");
                            checked[y+1][x] = -1; //If this is reached, matrix[y+1][x] is "#", and has not been checked by transversableFrom so checked[y+1][x] is yet to be assigned 1
                        }
        
                        checked[y][x] = -1;
                        return false; //If none of the above is true, we have a non-traversable matrix
                    } else if (masterCheckMat[y][x] == 1) {
                        checked[y][x] = 1;
                        return true
                    } else {
                        checked[y][x] = -1;
                        return false
                    }
                }
                return false //If this cell has already been checked (and hence not returned true as this line was reached), return false.
            }
            const output =  traversableFrom(matrix,0,0);
            //console.log(checked);
            return [output, checked];
        }


        function changeMatrix(matrix, x ,y) {
            let newMatrix = [];
            for(let i=0; i<matrix.length; i++) { //Create deep copy of matrix
                newMatrix.push([...matrix[i]])
            }
            newMatrix[x][y] = matrix[x][y] == "."? "#" : "."; //Swap # for . or . for #
            return newMatrix;
        }

        let stepCount = 0;
        
        //console.log("Starting outputMat");
        const originalTraversable = traversable(thisMatrix);
        const defaultOutput = originalTraversable[0]? 1: 0 
        const changeChar = defaultOutput? "." : "#" //If the matrix is already traversable, we only need to check whether changing a . to a # makes it non-traversable, and vice versa.

        let outputMat = [];
        for (let i=0; i < thisMatrix.length; i++) {
            let row = [];
            for (let j=0; j < thisMatrix[i].length; j++) {

                if(thisMatrix[i][j] == changeChar) {
                    if( traversable(changeMatrix(thisMatrix,i,j),originalTraversable[1],[j,i])[0]) {
                        row.push(1);
                    } else {
                    row.push(0);
                    }
                } else {
                    row.push(defaultOutput);
                }
            }
            outputMat.push(row);
        }
       // console.log("Finished outputMat");


        let output = "";
        for (let i=0; i < outputMat.length; i++) {
            for (let j=0; j< outputMat[i].length; j++) {
                output += outputMat[i][j].toString()+" ";
            }
            output += "\n"
        }
        return output;
    }
  
console.log(run("1 1\n..#.#.\n#.#...\n.#.#.."));
