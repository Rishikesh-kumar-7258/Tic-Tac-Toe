console.log("you are doing great!");

//making some variables for the code
let boardcolor = "#b8860b";
let bordercolor = "#8b0000";
let fillmode;
let player1 = true, player2 = false;

//defining reset function which reloads the page
function reset()
{
    location.reload();
    
}

//defining setcolor function which set's the color to the board
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

//defining setborder which sets the color to the border
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

//defininf select function which selects the clicked block
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
    if (e.innerHTML == 'X' || e.innerHTML == '0')
    {
        return false;
    }
    if (player1)
    {
        e.innerHTML = "0";
        player1 = false;
        player2 = true;
    }
    else
    {
        e.innerHTML = "X";
        player1 = true;
        player2 = false;
    }
    log.innerHTML += `<p>${e.className} is filled with ${e.innerHTML}`
    inact();
    // if (horizontal()) console.log("game over");
    gameover();
}

//defining a function to set a button inactive
function inact()
{
    let btn1 = document.getElementById('player1');
    let btn2 = document.getElementById('player2');

    if (player1)
    {
        btn2.style.backgroundColor = "grey";
        btn1.style.backgroundColor = "#ffffff";
    }
    else 
    {
        btn1.style.backgroundColor = "grey";
        btn2.style.backgroundColor = "#ffffff";
    }

}

//a function to determine if the block is empty or not
function isempty(x)
{
    if (x != 'X' && x != '0') return true;

    return false;
}

//function to determine if the array is equal
function arEqual(arr)
{
    if (arr[0] == arr[1] && arr[1] == arr[2]) return true;

    return false;
}

// horizontal function which checks the horizontal winner;
function horizontal()
{
    let blocks = document.getElementsByClassName("block");

    for (let i = 0; i < 3; i++)
    {
        let arr = [];
        for (let j = 3*i; j < 3*(i+1); j++)
        {
            let filled = blocks[j].innerHTML;

            if (!isempty(filled)) arr.push(filled);
            else return false;
        }

        return arEqual(arr);
    }

}

// function to finish the game
function gameover()
{
    if(horizontal() == true) 
    {
        reset();
    }
}