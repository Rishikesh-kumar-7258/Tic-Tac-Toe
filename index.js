console.log("you are doing great!");

function setcolor()
{
    var picker = document.getElementById("color");
    var log = document.getElementById('log');
    var blocks = document.getElementsByClassName("block");
    for (let i = 0; i < 9; i++)
    {
        console.log(blocks[i]);
        blocks[i].style.backgroundColor = picker.value;
    }
    log.innerHTML +=`<p>Color of the board is changed to ${picker.value}</p>`;
    console.log(picker.value);
}