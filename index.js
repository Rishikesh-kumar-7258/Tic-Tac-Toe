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
    let blocks = document.getElementsByClassName("block");

    for (let i = 0; i < 9; i++)
    {
        blocks[i].style.animation = "slide 1s 0.5s linear";
        setTimeout(() => {
            
        }, 100);
    }
    
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
    if (e.innerHTML == '<p>X</p>' || e.innerHTML == '<p>0</p>')
    {
        return false;
    }
    if (player1)
    {
        e.innerHTML = "<p>0</p>";
        player1 = false;
        player2 = true;
    }
    else
    {
        e.innerHTML = "<p>X</p>";
        player1 = true;
        player2 = false;
    }
    log.innerHTML += `<p>${e.className} is filled with ${e.innerText}`
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
    if (x != '<p>X</p>' && x != '<p>0</p>') return true;

    return false;
}

//function to determine if the array is equal
function arEqual(arr)
{
    let prev = arr[0];

    for (let i = 1; i < 3; i++)
    {
        if (arr[i] == -1 || arr[i] != prev) return false;
    }
    return true;
}

// horizontal function which checks the horizontal winner;
function horizontal()
{
    let blocks = document.getElementsByClassName("block");

    let i = 0;
    
    while (i < 3)
    {
        let j = i*3;
        let arr = [];

        while (j < 3*(i+1))
        {
            let written = blocks[j].innerHTML;

            if (!isempty(written)) arr.push(written);
            else arr.push(-1);

            j++;
        }

        if (arEqual(arr)) return true;

        i++;
    }

    return false;

}

//function to find check the winner vertically
function vertically()
{
    let blocks = document.getElementsByClassName('block');

    for (let i = 0; i < 3; i++)
    {
        let arr = [];
        for (let j = i; j <= i + 6; j += 3)
        {
            let written = blocks[j].innerHTML;
            if (!isempty(written)) arr.push(written);
            else arr.push(-1);
        }

        if (arEqual(arr)) return true;
    }

    return false;
}

//function to check the winner diagonally
function diagonally()
{
    let blocks = document.getElementsByClassName('block');
    let arr = [];
    for (let i = 0; i < 9; i += 4)
    {
        let written = blocks[i].innerHTML;

        if (!isempty(written)) arr.push(written);
        else arr.push(-1);
    }

    if (arEqual(arr)) return true;

    let arr2 = [];
    for (let i = 2; i < 7; i += 2)
    {
        let written = blocks[i].innerHTML;

        if (!isempty(written)) arr2.push(written);
        else arr2.push(-1);
    }

    if (arEqual(arr2)) return true;
    
    return false;
}

// function to finish the game
function gameover()
{
    if(horizontal() || vertically() || diagonally()) 
    {
        let winner;
        if (player1) winner = "player2";
        else winner = "player1";
        setTimeout(() => {
            alert(`Congratulations! ${winner} has won the game now the game will be restarted`);  
            reset();
        }, 100);
    }
}

//function to make the blocks animated
function animate_block()
{
    let blocks = document.getElementsByClassName("block");

    for (let i = 0; i < blocks; i++)
    {
        setTimeout(() => {    
            blocks[i].style.animation = "drop_down 1s 0.5s linear";
        }, 100);
    }
}

animate_block();