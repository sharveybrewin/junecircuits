
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
    process.stdout.write(numOfTrianlges(input)+"\n");       // Writing output to STDOUT
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail

// Write your code here

function numOfTrianlges(input) {
    const t = parseInt(input.split("\n")[0]);  
    const tests = input.split("\n").splice(1,t);
    
    let output = "";
    for (let i=0; i < tests.length; i++) {
        const n = parseInt(tests[i].split(" ")[0]);

        const blackVertices = Array.from(tests[i].split(" ").splice(1,2), x => parseInt(x));



        let whiteVertices = [];

        for (let i=1; i <= n; i++) {
            if (!blackVertices.includes(i)) {
                whiteVertices.push(i);
            }
        }

        let numOfConsecDoubles = 0;
        for (let i = 0; i < whiteVertices.length-1; i++) {
            if(whiteVertices[i+1] == whiteVertices[i]+1) {
                numOfConsecDoubles ++;
            }
        }
        if(whiteVertices[0] == 1 && whiteVertices[whiteVertices.length-1] == n) {
            numOfConsecDoubles ++;
        }

        let numOfConsecTriples = 0;
        for (let i = 0; i < whiteVertices.length-1; i++) {
            if(whiteVertices[i+1] == whiteVertices[i]+1 && whiteVertices[i+2] == whiteVertices[i]+2) {
                numOfConsecTriples ++;
            }
        }
        if(whiteVertices[0] == 1 && whiteVertices[whiteVertices.length-1] == n) {
            if(whiteVertices[1] == 2) {
                numOfConsecTriples ++;
            }
            if(whiteVertices[whiteVertices.length-2] == n-1){
                numOfConsecTriples ++;
            }
        }

        output += (numOfConsecDoubles*(n-4)-numOfConsecTriples).toString();
        if(i !== tests.length-1) {
            output += "\n";
        }
    }
    console.log(output);
}
numOfTrianlges("3\n10 7 2\n10 1 2\n24 2 4");