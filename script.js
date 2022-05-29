let canvas = document.querySelector('.myCanvas');

let c = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let generation = 0;
let arr = [];
let newArr = [];

function runRule() {
    // Grab the cell size
    let cellWidth = document.querySelector('.cellSize').value;
    let arrSize = canvas.width / cellWidth;

    //  Grab the rule number and convert to binary string
    let ruleNum = document.querySelector('.ruleNum').value;
    let number = parseInt(ruleNum);
    let result = number.toString(2);

    // Convert binary string to array characters
    let rulesNew = [...result];
    // If array length is less than 8 then add 0(s) to the beginning of the array
    while(rulesNew.length < 8) {
        rulesNew.unshift('0');
    }

    initialRow(arrSize);

    for (let i = 0; i < arr.length; i++) {
        fillState(cellWidth);
        generation++;
        arr = next_row(rulesNew);     
    }
    
}

// will initialize the first row - generation 0
function initialRow(arrSize) {
    for (let i = 0; i < arrSize; i++) {
        if(i == Math.floor(arrSize / 2)) arr.push(1);
        else arr.push(0);
    }
    console.log(arr);
    return arr;
}

// will the fill the cells with correct color
function fillState(cellWidth) {
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == 1) c.fillStyle = 'black';
        else c.fillStyle = 'white';
        
        c.fillRect(i*cellWidth, generation*cellWidth, cellWidth, cellWidth);
    }
    return arr;
}

// function to determine the states of the next row
function next_row(rulesNew) {
    for (let i = 0; i < arr.length; i++) {
        let left = arr[i-1];
        let current = arr[i];
        let right = arr[i+1];

        if(left == null) left = 0;
        if(right == null) right = 0;
        newArr.push(resultState(left, current, right, rulesNew));
    }
    // clear arr and replace with newArr values
    arr.length = 0;
    arr.push.apply(arr, newArr);
    newArr.length = 0;

    return arr;
}

// function to return the next cell state when the three parameter cells match the rule
function resultState(left, current, right, rulesNew) {
    if(left == 1 && current == 1 && right == 1) return rulesNew[0];
    else if(left == 1 && current == 1 && right == 0) return rulesNew[1];
    else if(left == 1 && current == 0 && right == 1) return rulesNew[2];
    else if(left == 1 && current == 0 && right == 0) return rulesNew[3];
    else if(left == 0 && current == 1 && right == 1) return rulesNew[4];
    else if(left == 0 && current == 1 && right == 0) return rulesNew[5];
    else if(left == 0 && current == 0 && right == 1) return rulesNew[6];
    else if(left == 0 && current == 0 && right == 0) return rulesNew[7];
    return 0;
}

// Event Listener to call the runRule() function when the run rule button is clicked
document.querySelector('.btn').addEventListener('click', runRule);