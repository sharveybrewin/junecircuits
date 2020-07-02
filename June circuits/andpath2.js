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
        
        for(let i = 1; i < n; i += 2) { //Iterate over the odd numbers in the tree
                count += Math.floor(Math.log2((n+1)/(i+1)));
        }
    output += count+"\n"
    count = 0;
    }
    return output;
}