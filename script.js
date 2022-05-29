let canvas = document.querySelector('.myCanvas');

let c = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let generation = 0;
let arr = [];
let newArr = [];

function runRule() {
    // Grab the cell size
    let cellWidth = document.querySelector('.cellSize');
    let arrSize = canvas.width / cellWidth;

    //  Grab the rule number and convert to binary string
    let ruleNum = document.querySelector('.ruleNum');
    let number = parseInt(ruleNum);
    let result = number.toString(2);

    // Convert binary string to array characters
    let rulesNew = [...result];
    // If array length is less than 8 then add 0(s) to the beginning of the array
    while(rulesNew.length < 8) {
        rulesNew.unshift('0');
    }

    initialRow(arrSize);
}

// woll initialize the first row - generation 0
function initialRow(arrSize) {
    for (let i = 0; i < arrSize; i++) {
        if(i == Math.floor(arrSize / 2)) arr.push(1);
        else arr.push(0);
    }
    return arr;
}

// Event Listener to call the runRule() function when the run rule button is clicked
document.querySelector('.btn').addEventListener('click', runRule);