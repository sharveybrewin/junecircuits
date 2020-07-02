
// Sample code to perform I/O:

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
    process.stdout.write(andPaths(input)+"\n");       // Writing output to STDOUT
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail

// Write your code here
function andPaths(input) {
    let output = "";
    const numOfQueries = parseInt(input.split("\n")[0]);  
    const tests = input.split("\n").splice(1,numOfQueries);

    for(let i=0; i<numOfQueries; i++) {
        const n = parseInt(tests[i]);
        var count = 0;
        const endRowBeforeN = endOfPrevRow(n)
        
        //Lookup largest key in cache which is less than or equal to n
        const largest = searchCache(n)
       console.log(`${n} : ${largest}`);
    
        count += largest[1];
        if(endRowBeforeN > 2 && largest[0] != n) {
            let j = endRowBeforeN;
            let upLeftAdj = (j-1)/2;
            while (j > largest[0]) { //Iterate over the odd numbers in the tree starting with n, going back to largest
                if(upLeftAdj%2 == 1) {
                    count += 1;
                    upLeftAdj -= 1;
                    upLeftAdj /= 2;
                } else {
                    j-= 2;
                    upLeftAdj = (j-1)/2;
                }
            }
            cache[endRowBeforeN] = count;
            j = n%2 == 0? n-1: n;
            upLeftAdj = (j-1)/2;
            while (j > endRowBeforeN) { //Iterate over the odd numbers in the tree starting with n, going back to largest
                if(upLeftAdj%2 == 1) {
                    count += 1;
                    upLeftAdj -= 1;
                    upLeftAdj /= 2;
                } else {
                    j-= 2;
                    upLeftAdj = (j-1)/2;
                }
            }
        }
            
    output += count+"\n"
    }
    //console.log(cache);

    return output;
}

let cache = {1:0, 3:1};

function searchCache(n) {
    var output = [];
 for (const key in cache) {
     if(parseInt(key) > n) {
         return output
     }
     if(parseInt(key) <= n) {
        output = [key,cache[key]]
     }
 }
 console.log(cache);
 return output
}

function startOfRow(n) {
    return Math.pow(2,Math.floor(Math.log2(n)))
}

function startOfPrevRow(n) {
    return Math.pow(2,Math.floor(Math.log2(n))-1)
}

function endOfPrevRow(n) {
    return Math.pow(2,Math.floor(Math.log2(n)))-1
}


console.log(andPaths("2\n12\n7"));
//Expected 19, 15