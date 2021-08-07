// class bases approach to solve the problem
class Matrix {
    #board;
    #spaces;
    #over;
    constructor() {
        this.#board = [];
        this.#spaces = 9;
        this.#over = -1;

        for (let i = 0; i < 3; i++) this.#board.push(['', '', '']);
    }

    isOver = () => this.#over;

    insert_to_board = (row, col, value) => {
        this.#board[row][col] = value;
        this.#spaces -= 1;

        this.#over = this.#game_over(this.#board,row, col);
    }

    //function to determine if the array is equal
    #areEqual(arr) {

        return arr.every(v => v === arr[0]);
    }

    #game_over(m, row, col) {
        let horizontal = this.#areEqual(m[row]);
        if (horizontal) return 1;

        let arr = [];
        for (let i = 0; i < 3; i++) arr.push(m[i][col]);
        let vertical = this.#areEqual(arr);
        if (vertical) return 1;

        let diagonal;
        if (row === col) {
            arr = [];
            for (let i = 0; i < 3; i++) arr.push(m[i][i]);

            diagonal = this.#areEqual(arr);

            if (diagonal) return 1;
        }
        if ((row + col) === 2) {
            arr = [];
            for (let i = 0; i < 3; i++) arr.push(m[i][2 - i]);

            diagonal = this.#areEqual(arr);

            if (diagonal) return 1;
        }

        if (this.#spaces == 0) return 0;

        return -1;
    }

    // Adding functinality for players to play versus computers
    // computer_choice = (m, sp) => {

    //     if (sp == 0) return 0;
        
    // }

}

// Instantiating a board for game
const board = new Matrix();

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
        l.innerText = `same color cannot be given to both board and border`;
        log.append(l);
        return false;
    }
    for (let i = 0; i < 9; i++) {
        console.log(blocks[i]);
        blocks[i].style.backgroundColor = picker.value;
    }
    boardcolor = picker.value;

    l.innerText = `Color of the blocks is changed to ${picker.value}`;
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
blocks.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add("selected");
        if (before) before.classList.remove('selected');
        before = element;


        if (element.hasChildNodes()) return;

        let add = document.createElement('p');
        if (player1) {
            add.innerText = '0';
            h4.innerText = "Player2(X)'s turn";
        }
        else {
            add.innerText = 'X';
            h4.innerText = "Player1(0)'s turn";
        }

        player1 = !player1;

        element.append(add);
        board.insert_to_board(get_row(element), get_col(element), element.innerText);

        let l = document.createElement('p');
        l.innerText = `${element.className} is filled with ${element.innerText}`;
        log.append(l);
        gameover();

    });
});


// function to finish the game
function gameover() {

    if (board.isOver() == 1) {
        let winner;
        if (player1) winner = "player2";
        else winner = "player1";
        setTimeout(() => {
            alert(`Congratulations! ${winner} has won the game\nRestart`);
            reset();
        }, 100);
    }

    if (board.isOver() == 0) {
        setTimeout(() => {
            alert(`The game ended in a tie\nRestart`);
            reset();
        }, 100);
    }

}

// functions to get the row and column of the board
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