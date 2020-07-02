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
    process.stdout.write(bubbleSort(input)+"\n");       // Writing output to STDOUT
}

function bubbleSort(input) {
    const n = parseInt(input.split("\n")[0]);  
    const arr = Array.from(input.split("\n")[1].split(" "), x => parseInt(x));

    let count = 0;
    let swapped = true;
    while(swapped !== false) {
        swapped = false;
        count ++;
        for (let i = 0; i < n-1; i++) {

            if(arr[i] > arr[i+1]) {
                var first = arr[i];
                var second = arr[i+1];
                arr[i] = second;
                arr[i+1] = first;
                swapped = true
            } 
        }
    }
    return count;
}

console.log(bubbleSort("5\n14 10 3 7 5"));
