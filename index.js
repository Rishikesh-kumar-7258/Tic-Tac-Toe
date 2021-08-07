//making some variables for the code
let boardcolor = "#b8860b";
let bordercolor = "#8b0000";
let fillmode;
let player1 = true;

//defining reset function which reloads the page
function reset() {
    location.reload();
}

// some useful elements to be used in the code
let log = document.getElementById("log");
let blocks = document.querySelectorAll(".block");

//defining setcolor function which set's the color to the board
function setcolor() {
    var picker = document.getElementById("color");
    var blocks = document.getElementsByClassName("block");
    let l = document.createElement('p');

    if (bordercolor == picker.value) {
        l.innerText += `same color cannot be given to both board and border`;
        log.append(l);
        return false;
    }
    for (let i = 0; i < 9; i++) {
        console.log(blocks[i]);
        blocks[i].style.backgroundColor = picker.value;
    }
    boardcolor = picker.value;

    l.innerHTML = `Color of the blocks is changed to ${picker.value}`;
    log.append(l);
}

//defining setborder which sets the color to the border
function setborder() {
    var picker = document.getElementById("color");
    var log = document.getElementById('log');
    let p = document.createElement('p');
    if (boardcolor == picker.value) {
        p.innerText = `Same color cannot be given to both board and border`;
        log.append(p);
        return false;
    }
    for (let i = 0; i < 9; i++) {
        console.log(blocks[i]);
        blocks[i].style.borderColor = picker.value;
    }
    bordercolor = picker.value;
    p.innerText = `Color of the border is changed to ${picker.value}`;
    log.append(p);
}

//defininf select function which selects the clicked block
let h4 = document.querySelector('#fill_opt h4');
let before = null;

// Using data structures to solve the tic-tac-toe problem
const matrix = [];
for (let i = 0; i < 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) temp.push('');
    matrix.push(temp);
}

blocks.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add("selected");
        if (before) before.classList.remove('selected');
        before = element;


        if (element.hasChildNodes()) return;

        let add = document.createElement('p');
        if (player1) {
            add.innerText = '0';
        }
        else {
            add.innerText = 'X';
        }

        player1 = !player1;

        if (player1) h4.innerText = "Player1(0)'s turn";
        else h4.innerText = "Player2(X)'s turn";

        element.append(add);
        insert_to_matrix(element);

        let l = document.createElement('p');
        l.innerText = `${element.className} is filled with ${element.innerText}`;
        log.append(l);
        gameover(element);

    });
});

//function to determine if the block is empty or not
function isempty(x) {

    return (x == '');
}

//function to determine if the array is equal
function arEqual(...arg) {

    for (let i = 1; i < arg.length ; i++)
        if (arg[i] !== arg[i-1]) return false;

    return true;
}

// function to finish the game
function gameover(e) {
    let row = get_row(e);
    let col = get_col(e);

    let horizontal = arEqual(matrix[row][0], matrix[row][1], matrix[row][2]);
    let vertical = arEqual(matrix[0][col], matrix[1][col], matrix[2][col]);

    let diagonal, temp1 = false, temp2 = false;
    if (row === col) temp1 =  arEqual(matrix[0][0], matrix[1][1], matrix[2][2]);
    if ((row + col) === 2) temp2 = arEqual(matrix[0][2], matrix[1][1], matrix[2][0]);

    diagonal = (temp1 || temp2);

    if (horizontal || vertical || diagonal) {
        let winner;
        if (player1) winner = "player2";
        else winner = "player1";
        setTimeout(() => {
            alert(`Congratulations! ${winner} has won the game now the game will be restarted`);
            reset();
        }, 100);
    }
}

const alphaToInt = e => {

    return (e.charCodeAt(0) - 'a'.charCodeAt(0));
}

const digitToInt = e => {

    return (e.charCodeAt(0) - '0'.charCodeAt(0));
}

const get_row = box => {
    let classes = box.classList;
    let row = digitToInt(classes[2]) - 1;

    return row;
}

const get_col = box => {
    let classes = box.classList;
    let col = alphaToInt(classes[1]);

    return col;
}

const insert_to_matrix = box => {

    let row = get_row(box);
    let col = get_col(box);

    matrix[row][col] = box.innerText;
}

