let my_board = [ [3,3,7,9,0,0],
                 [2,2,7,9,0,0],
                 [8,1,1,9,0,0],
                 [8,4,4,4,0,0],
                 [8,5,5,0,0,0],
                 [6,6,6,0,0,0] ];

window.onload = function(){

    draw_board(my_board);
}



let activate_button = document.querySelector(".button");

function difficulty(grade){

    if(grade == 1){
         my_board =[ [3,3,7,9,0,0],
                        [2,2,7,9,0,0],
                        [8,1,1,9,0,0],
                        [8,4,4,4,0,0],
                        [8,5,5,0,0,0],
                        [6,6,6,0,0,0] ];
    }else if(grade == 2){
         my_board =[ [0,4,0,7,7,7],
                        [2,4,0,8,10,0],
                        [2,1,1,8,10,11],
                        [3,5,5,5,10,11],
                        [3,0,6,0,0,12],
                        [0,0,6,9,9,12] ];
    }else if(grade == 3){
         my_board =[ [2,0,0,6,6,6],
                        [2,3,3,7,0,0],
                        [1,1,4,7,0,11],
                        [0,0,4,8,8,11],
                        [0,0,5,9,9,11],
                        [0,0,5,10,10,10] ];
    }else if(grade == 4){
         my_board =[ [2,2,6,0,9,9],
                        [3,3,6,0,10,0],
                        [4,0,1,1,10,0],
                        [4,7,7,7,10,11],
                        [4,0,0,8,0,11],
                        [5,5,0,8,12,12] ];
    }
    draw_board(my_board)
    counter = 0
    prior_move = 0
    seconds = 0
    show_counter(counter)
}



function draw_board(board){

    let board_html = generate_board_html(board);
    document.getElementById("board").innerHTML = board_html;

}



function generate_board_html(board){

html_string = "<table><tbody>";

    for( let row = 0; row <  board.length; row++){

        html_string = html_string + "<tr>";

        for(let element = 0; element < board[row].length; element++){
            
            html_string = html_string + '<td onclick = board_click_handler(this) class="car _' + board[row][element] + '"></td>';
            
        }

        html_sting = html_string + "</tr>";

    }
    
    html_string = html_string + "</table></tbody>";
    
    return html_string;

}



function is_vertical(board, row, col){

    let boolean = false

    if(row != 5){
        if(board[row][col] == board[row + 1][col]){
            boolean = true
        }
    }
    if(row != 0){
        if(board[row][col] == board[row - 1][col]){
            boolean = true
        }
    }
    return boolean
}
    
function is_horizontal(board, row, col){

    let boolean = false

    if(col != 5){
        if(board[row][col] == board[row][col + 1]){
            boolean = true
        }
    }
    if(col != 0){
        if(board[row][col] == board[row][col - 1]){
            boolean = true
        }
    }
    return boolean
}



function move_vertical(board, row, col, length){

    if(row != 5){
        if(board[row+1][col] == 0){

            board[row+1][col] = board[row][col];
            board[row +1 -length][col] = 0;
            return board;
        }
    }
    if(row != 0){
        if(board[row-1][col] == 0){

            board[row-1][col] = board[row][col];
            board[row -1 +length][col] = 0;
            return board;
        }
    }
    return board;
}

function move_horizontal(board, row, col, length){

    if(col != 5){
        if(board[row][col+1] == 0){

            board[row][col+1] = board[row][col];
            board[row][col +1 -length] = 0;
            return board;
        }
    }
    if(col != 0){
        if(board[row][col-1] == 0){

            board[row][col-1] = board[row][col];
            board[row][col -1 +length] = 0;
            return board;
        }
    }
    return board;
}



function check_length(board, row, col){

    let counter = 0;

    for( let i = 0; i < board.length; i++){
        for( let j = 0; j < board.length; j++){

            if(board[i][j] == board[row][col]){
                counter = counter + 1;
            }
        }
    }
    return counter;
}

function check_if_won(board){
    
    draw_board(my_board)

    if(board[2][4] == 1 && board[2][5] == 1){
        alert("Proficiat! Je hebt het opgelost met " + counter + " zetten in " + seconds + " seconden!")
        return false
    }
    return true
}
let prior_move = 0
let counter = 0
let prior_board =0

function move_counter(board, row, col){

    if(board[row][col] != prior_move){
        counter = counter + 1
    }
    prior_move = board[row][col]
    

    return counter
}

function show_counter(counter){
    html_counter = "<button class='counter'>" + counter +" zet(ten)" + "</button>"
    document.getElementById("counter").innerHTML = html_counter; 
}

let seconds = 0
function timer(){seconds = seconds + 1}
seconds = setInterval(timer,1000);

html_timer = document.querySelector(".timer");

function show_timer(){
    html_timer = "<button class='real_timer'>" + seconds +"s"+ "</button>";
    document.getElementById("timer").innerHTML = html_timer; 
}
activate_show_timer = setInterval(show_timer,1000)

function board_click_handler(cell){

    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;

    if(my_board[row][col] != 0){

    length = check_length(my_board, row, col);

    if(is_horizontal(my_board, row, col)){

        my_board = move_horizontal(my_board, row, col, length);
        counter = move_counter(my_board, row, col);
    }
    if(is_vertical(my_board, row, col)){

        my_board = move_vertical(my_board, row, col, length);
        counter = move_counter(my_board, row, col)
    }

    draw_board(my_board)

    show_counter(counter)

    check_if_won(my_board)
    }
}

