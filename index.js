console.log("you are doing great!");
var boardcolor, bordercolor;

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