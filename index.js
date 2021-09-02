// class bases approach to solve the problem
const X = 'X', O = 'O', NONE = "";

BOARD = [[NONE, NONE, NONE],
[NONE, NONE, NONE],
[NONE, NONE, NONE]];


//making some variables for the code
let boardcolor = "#b8860b";
let bordercolor = "#8b0000";
let fillmode;
let vsComputer = false;
// let gameState = 'start';

// if (gameState === 'start')
// {
//     let section = document.querySelector('section');
//     section.classList.add('start');
//     window.addEventListener('keypress', (e) => {
//         section.classList.remove('start');
//         gameState = 'play';
//     })
// }

// for changing the computer functionality option
document.querySelector('.vscomputer').addEventListener('click', function () {
    if (spaces(BOARD).length < 9) return;
    document.querySelector('.vscomputer span').classList.toggle('bg-red');
    vsComputer = !vsComputer;
})

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

//defining function which selects the clicked block and added event listner to them
let h4 = document.querySelector('#fill_opt h4');
let before = null;

blocks.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add("selected");
        if (before) before.classList.remove('selected');
        before = element;


        if (element.hasChildNodes()) return;

        let add = document.createElement('p');

        let player = next_player(BOARD);
        if (player == O) {
            add.innerText = 'O';
            h4.innerText = "Player1(X)'s turn";
        }
        else {
            add.innerText = 'X';
            h4.innerText = "Player2(O)'s turn";
        }

        element.append(add);
        BOARD[get_row(element)][get_col(element)] = (element.innerText === 'X') ? X : O;

        let l = document.createElement('p');
        l.innerText = `${element.className} is filled with ${element.innerText}`;
        log.append(l);

        if (Terminal(BOARD)) gameover();
        if (vsComputer && next_player(BOARD) === O) computer_play();
    });
});


// function to finish the game
function gameover() {

    let w;
    if (Terminal(BOARD)) {
        w = helper(BOARD);
    }
    else return 0;

    if (w) {
        if (w == -1) win = "player2";
        else win = "player1";
        setTimeout(() => {
            alert(`Congratulations! ${win} has won the game\nRestart`);
            reset();
        }, 100);

        return 1;
    }

    else {
        setTimeout(() => {
            alert(`The game ended in a tie\nRestart`);
            reset();
        }, 100);

        return 1;
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

// Adding functinality for players to play versus computers
const computer_play = () => {

    computer_choice();
    h4.innerText = "Player1(0)'s turn";
}
computer_choice = () => {

    // if (!sp) return 0;

    let action = minimax(BOARD)
    let row = action[0];
    let col = action[1];

    let cl = (row + 1).toString();
    let bl = document.getElementsByClassName(cl)[col];
    if (bl.hasChildNodes()) computer_choice();
    else {
        BOARD[row][col] = O;
        bl.innerHTML = '<p>O</p>';
        let l = document.createElement('p');
        l.innerText = `${bl.className} selected is filled with ${bl.innerText}`;
        log.append(l);
    }

}


// Making a good AI for our game
const next_player = b => {

    let count_x = 0, count_o = 0;

    b.forEach(e => {
        e.forEach(f => {
            if (f === X) count_x++;
            else if (f === O) count_o++;
        })
    })

    if (count_x === count_o) return X;
    else return O;
}

const winner = b => {

    // Horizontal checking
    for (let i = 0; i < 3; i++) {
        if (b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
            if (b[i][0] !== NONE) return b[i][0];
        }
    }

    // Vertical checking
    for (let i = 0; i < 3; i++) {
        if (b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
            if (b[0][i] !== NONE) return b[0][i];
        }
    }

    // Diagonal checking
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) if (b[0][0] !== NONE) return b[0][0];
    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) if (b[1][1] !== NONE) return b[1][1];

    return -1;
}

const Terminal = b => {

    if (winner(b) !== -1) return true;

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) if (b[i][j] === NONE) return false;

    return true;
}

const helper = b => {
    let w = winner(b);

    if (w === X) return 1;
    else if (w === O) return -1;
    else return 0;
}

const spaces = b => {

    let mySet = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (b[i][j] === NONE) {
                let pt = [i, j];
                mySet.push(pt);
            }
        }

    }

    return mySet;
}

const result = (b, a) => {

    b[a[0]][a[1]] = next_player(b);

    return b;
}

// In javascript all arguments are passed by value 
// means that the actual value will not change if we pass something as an argument in a function
const max_value = b => {

    if (Terminal(b)) return helper(b);

    let s = spaces(b);

    let v = -1;
    s.forEach(element => {

        v = Math.max(v, min_value(result(b, element)));
        b[element[0]][element[1]] = NONE;
    });

    return v;
}

const min_value = b => {

    if (Terminal(b)) return helper(b);

    let s = spaces(b);

    let v = 1;
    s.forEach(element => {

        v = Math.min(v, max_value(result(b, element)));
        b[element[0]][element[1]] = NONE;
    });

    return v;
}

const minimax = b => {
    let actions = spaces(b);
    let l = [];
    for (let action of actions)
    {
        l.push([action, max_value(result(b, action))]);
        b[action[0]][action[1]] = NONE;
    }
    let m_v = l[0][1], ans = l[0][0];
    for (let ob of l) {
        if (ob[1] < m_v) {
            ans = ob[0]
            m_v = ob[1]
        }
    }

    return ans
    // }
}