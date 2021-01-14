console.log("you are doing great!");
let boardcolor = "#b8860b";
let bordercolor = "#ff0000";
let fillmode;

function reset()
{
    location.reload();
}

function setcolor()
{
    var picker = document.getElementById("color");
    var log = document.getElementById('log');
    var blocks = document.getElementsByClassName("block");
    if (bordercolor == picker.value)
    {
        log.innerHTML += `<p> same color cannot be given to both board and border</p>`
        return false;
    }
    for (let i = 0; i < 9; i++)
    {
        console.log(blocks[i]);
        blocks[i].style.backgroundColor = picker.value;
    }
    boardcolor = picker.value;
    log.innerHTML +=`<p>Color of the blocks is changed to ${picker.value}</p>`;
    // console.log(picker.value);
}

function setborder()
{
    var picker = document.getElementById("color");
    var log = document.getElementById('log');
    var blocks = document.getElementsByClassName("block");
    if (boardcolor == picker.value)
    {
        log.innerHTML += `<p> same color cannot be given to both board and border</p>`
        return false;
    }
    for (let i = 0; i < 9; i++)
    {
        console.log(blocks[i]);
        blocks[i].style.borderColor = picker.value;
    }
    bordercolor = picker.value;
    log.innerHTML +=`<p>Color of the border is changed to ${picker.value}</p>`;
    // console.log(picker.value);
}

function select(e)
{
    let blocks = document.getElementsByClassName("block")
    let log = document.getElementById("log");
    for (let i = 0; i < 9; i++)
    {
        blocks[i].style.backgroundColor = boardcolor;
        blocks[i].style.borderColor = bordercolor
    }
    e.style.backgroundColor = "green";
    e.style.borderColor = "darkgreen";
    e.innerHTML = "X";
    log.innerHTML += `<p>${e.className} is filled with ${e.innerHTML}`
}

function flipcoin()
{
    let num = Math.random()*100;
    console.log(num);
    
    let winner;
    let log = document.getElementById('log');
    if (num > 50)
    {
        winner = "player1";
    }
    else
    {
        winner = "player2";
    }

    log.innerHTML += `<p>${winner} won the toss</p>`;
    fillmode = prompt("you have won the toss choose the input method ('0' of 'X'))");
    console.log(fillmode);
}