// console.log("You are doing great!!!");
$(function()
{

    $('h1 > span').animate({
        fontSize : '2rem'
    })
    
    $('aside').animate({
        width : 25,
        height : 25,
        'font-size' : 0
    })

    // FUNCTIONALITY FOR RESTART BUTTON
    $('#restart').click(function()
    {
        location.reload();
    })

    //FUNCTIONALITY FOR LOGGING SECTION
    let is_log_visible = false;
    $('aside > .ham').click(() => {
        
        if (is_log_visible)
        {
            $('aside').animate({
                width : 25,
                height : 25,
                'font-size' : 0
            })
            is_log_visible = false;
        }
        else{
            $('aside').animate({
                width : "100vw",
                maxWidth: '400px',
                height : "80vh",
                fontSize : '16px'
            })
            is_log_visible = true;
        }
    })

    //FUNCTIONALITY FOR BOXES
    let player1 = true;
    $('.box').click(function()
    {

        if ($(this).text() == '')
        {
            if(player1)
            {
                this.innerText = 'X';
                player1 = false;
                $('aside').append('<p>player1 filled</p>');
            }
            else
            {
                this.innerText = '0';
                player1 = true;
                $('aside').append('<p>player2 filled</p>');
            }
    
            let winner;
            if (player1) winner = 'player2';
            else winner = 'player1';
    
            if (win())
            {
                setTimeout(() => {
                    $('.hide_modal>p').text(`Congratulations! ${winner} has won the game.`)
                    $('.modal').css('display', 'grid');
                }, 10);
            }
        }

    })

    //FUNCTIONALITY FOR HIDING THE POPUP
    $('.cross').click(function(){
        $('.modal').hide();
        location.reload();
    })

    if (isEmpty()) location.reload();

})

// GAME LOGIC
let boxes = document.getElementsByClassName('box');

compare = (a, b, c) =>
{
    if (a.innerText == "" || b.innerText == "" || c.innerText == "") return false;
    else if (a.innerText == b.innerText && b.innerText == c.innerText) return true;
}
function win()
{
    function horizontal()
    {
        return (compare(boxes[0], boxes[1], boxes[2]) || compare(boxes[3], boxes[4], boxes[5]) || compare(boxes[6], boxes[7], boxes[8]));
    }
    
    function vertical()
    {
        return (compare(boxes[0], boxes[3], boxes[6]) || compare(boxes[1], boxes[4], boxes[7]) || compare(boxes[2], boxes[5], boxes[8]));
    
    }

    function diagonal()
    {
        return (compare(boxes[0], boxes[4], boxes[8]) || compare(boxes[2], boxes[4], boxes[6]));
    }

    if (horizontal() || vertical() || diagonal()) return true;
}

function isEmpty()
{
    for (let i = 0; i < 9; i++)
    {
        if (boxes[i] === '') return true;
    }

    return false;
}
