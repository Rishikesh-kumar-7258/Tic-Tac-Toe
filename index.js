// console.log("you are doing great!");

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
let blocks = document.querySelectorAll(".block")

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

blocks.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add("selected");
        if (before) before.classList.remove('selected');
        before = element;

        if (!isempty(element)) {
            return false;
        }
        let add = document.createElement('p');
        if (player1) {
            add.innerText = '0';
            player1 = false;
        }
        else {
            add.innerText = 'X';
            player1 = true;
        }

        if (player1) h4.innerText = "Player1(0)'s turn";
        else h4.innerText = "Player2(X)'s turn";

        element.append(add);

        let l = document.createElement('p');
        l.innerText = `${element.className} is filled with ${element.innerText}`;
        log.append(l);
        gameover();
    });
});

//function to determine if the block is empty or not
function isempty(x) {
    if (x.hasChildNodes()) return false;
    else return true;
}

//function to determine if the array is equal
function arEqual(...arg) {

    let empty = false;
    for (let i = 0; i < arg.length; i++)
    {
        if (isempty(arg[i])) return false;
    }

    for (let i = 1; i < arg.length; i++) {
        if (arg[i].innerText !== arg[i-1].innerText) return false;
    }

    return true;
}

// horizontal function which checks the horizontal winner;
function horizontal() {
    
    return (arEqual(blocks[0], blocks[1], blocks[2]) 
            || arEqual(blocks[3], blocks[4], blocks[5])
            || arEqual(blocks[6], blocks[7], blocks[8]));

}

//function to find check the winner vertically
function vertically() {
    
    return (arEqual(blocks[0], blocks[3], blocks[6])
        || arEqual(blocks[1], blocks[4], blocks[7])
        || arEqual(blocks[2], blocks[5], blocks[8]));
}

//function to check the winner diagonally
function diagonally() {
    
    return (arEqual(blocks[0], blocks[4], blocks[8])
        || arEqual(blocks[2], blocks[4], blocks[6]));
}

// function to finish the game
function gameover() {
    if (horizontal() || vertically() || diagonally()) {
        let winner;
        if (player1) winner = "player2";
        else winner = "player1";
        setTimeout(() => {
            alert(`Congratulations! ${winner} has won the game now the game will be restarted`);
            reset();
        }, 100);
    }
}