
  
// start setup zone ----------------------------------------------------  
  const fade_speed = 700; //number of millisecond used in fadeIn, fadeOut, hide, etc.
  const computer_move_timeout = 2000 //number of milliseconds computer wait to move after its turn
  const fadeIn_fadeOut_delay = 3000 //number of milliseconds end-game-container wait before fadeOut
  
  var players_number = 0; //number of player selected in tha main menu
  var symbol_player_1 = ""; //the character "x" or "o" of player one
  var symbol_player_2 = ""; // if player 1 choose "x" this is "o" and viceversa 
  var its_up_to = ""; // indicate who have to move
  var total_moves = 0; //used to check strategies for computer move
  
  var level_strategy_1 = 0; // controls at what level of Strategy 1 the game is
  var level_strategy_2 = 0; // controls at what level of Strategy 2 the game is
  var level_strategy_3 = 0; // controls at what level of Strategy 3 the game is
  
  var you_can_click = false; // used to block casual clcicking on the board
   
  $("#menu-second-container").hide(); // contains the butotns to choose the symbol "x" or "o"
  $("#board").hide(); // the board game
  $(".cell").attr("used","false"); //the board's cells  
  $("[id|=cell]").hide(); // (3x3 matrix) equivalent to: $(".cell").children("p").hide()
  $("#end-game-container").hide(); //container that shows a message when a player wins the game and restart
  $("#header-row").children().hide(); //contains scores and reset button
  
  hide_flag_player();

// end setup zone ------------------------------------------------------------------  
    
  
// start FUNCTIONS ------------------------------------------------------------------   
  
  // go back to main menu
  function reset_game(){
    players_number = 0;
    symbol_player_1 = "";
    symbol_player_2 = "";
    total_moves = 0;

    level_strategy_1 = 0;
    level_strategy_1 = 0;
    level_strategy_1 = 0;
    
    $("#header-label-score-1-col").html("0");    
    $("#header-label-score-2-col").html("0");
    
    $(".cell").attr("used","false");
    $(".cell").children("p").hide(); //equivalent to: $("[id|=cell]").hide()
    hide_flag_player();  
        
    $("#header-row").children().fadeOut(fade_speed/2); 
    $("#end-game-container").fadeOut(fade_speed, function(){
      $("#end-game-title").html("Game over!"); 
      $("#board").fadeOut(fade_speed, function(){
        $("#menu-first-container").fadeIn(fade_speed);      
      });
    }); 
        
    //reset cells status (better use unique "for" with "board-cell-x" --> x = 1 to 9)
    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++ ){
        $("[id|=cell-" + row + "-" + col + "]").parent().attr("used", "false");
        $("[id|=cell-" + row + "-" + col + "]").html("b");        
      }
    }
  }; // function reset_game
  
  
  // go back to board for a new game round
  function replay(){
    total_moves = 0;
    
    level_strategy_1 = 0;
    level_strategy_1 = 0;
    level_strategy_1 = 0;    
    
    $(".cell").attr("used","false");    
    $(".cell").children("p").hide(); //equivalent to: $("[id|=cell]").hide()
   
    $("#end-game-container").fadeOut(fade_speed, function(){
      $("#header-row").children().show();
      $("#end-game-title").html("Game over!");       
      $("#board").fadeIn(fade_speed, function(){
        choose_first_player(players_number);      
      });
    });
    

    //reset cells status
    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++ ){
        $("[id|=cell-" + row + "-" + col + "]").parent().attr("used", "false");
        $("[id|=cell-" + row + "-" + col + "]").html("b");        
      }
    }      
        
  };
      
  function show_flag_player_1(){        //is(:visible) or is(:hidden) give always true!
    if($("#flag-player-1").attr("status") === "hidden"){    
      $("#flag-player-1").toggle("slide", { direction: "down" }, fade_speed, function(){
        //only after flag_player_1 is rised up, Player_1 can click
        you_can_click = true;
      });
      $("#flag-player-1").attr("status", "visible");
    } 
    
    if($("#flag-player-2").attr("status") === "visible"){    
      $("#flag-player-2").toggle("slide", { direction: "down" }, fade_speed);
      $("#flag-player-2").attr("status", "hidden");      
    }    
  }; // function show_flag_player_1  
  
  
  function show_flag_player_2(){          //is(:visible) or is(:hidden) give always true!
    if($("#flag-player-2").attr("status") === "hidden"){    
      $("#flag-player-2").toggle("slide", { direction: "down" }, fade_speed, function(){
       // if Player_2 isn't Computer, only at this point Player_2 can click the board
        if(players_number === "2"){
              you_can_click = true;           
           }
      });
      $("#flag-player-2").attr("status", "visible");      
    }   
    
    if($("#flag-player-1").attr("status") === "visible"){    
      $("#flag-player-1").toggle("slide", { direction: "down" }, fade_speed);
      $("#flag-player-1").attr("status", "hidden");        
    }    
  }; // function show_flag_player_2
  
  
   function hide_flag_player(){            //is(:visible) or is(:hidden) give always true!
      if($("#flag-player-1").attr("status") === "visible"){    
        $("#flag-player-1").toggle("slide", { direction: "down" }, fade_speed);
        $("#flag-player-1").attr("status", "hidden");        
      }
    
      if($("#flag-player-2").attr("status") === "visible"){
        $("#flag-player-2").toggle("slide", { direction: "down" }, fade_speed);
        $("#flag-player-2").attr("status", "hidden");           
      }

  }; //function hide_flag_player
   
    
  // called to randomnly select who moves first
  function choose_first_player(players_number){
    //at this poinf flags can be turned to "visible". Player doesn't see yet, because they are hidden
    $("#flag-player-1").css("visibility", "visible");
    $("#flag-player-2").css("visibility", "visible");     
    var first_player = Math.floor(Math.random() * 2) + 1;
    if(first_player === 1){
      show_flag_player_1();
      its_up_to = "1";
    }else{        
      show_flag_player_2();    
      if(players_number === "1"){
          setTimeout(function(){
            its_up_to = "c";
            computer_move();
            its_up_to = "1";
            show_flag_player_1();
          }, computer_move_timeout);   
         }else{
          its_up_to = "2";
         }      
    }
    
  }; // function choose_first_player
  
  
  
  // check the board status to find a victory a draw or to keep playing
  function check_board(){
    
    var p1 = $("#board-cell-1").children("p").html();
    var p2 = $("#board-cell-2").children("p").html();
    var p3 = $("#board-cell-3").children("p").html();
    var p4 = $("#board-cell-4").children("p").html();
    var p5 = $("#board-cell-5").children("p").html();
    var p6 = $("#board-cell-6").children("p").html();
    var p7 = $("#board-cell-7").children("p").html();
    var p8 = $("#board-cell-8").children("p").html();
    var p9 = $("#board-cell-9").children("p").html();    
    
    
    
    
          if(p1 === p2 && p2 === p3){
       return p1; //1
            
    }else if(p7 === p8 && p8 === p9){
       return p7; //2
      
    }else if(p1 === p4 && p4 === p7){
       return p1; //3
      
    }else if(p3 === p6 && p6 === p9){
       return p3; //4
      
    }else if(p2 === p5 && p5 === p8){
       return p2; //5
      
    }else if(p4 === p5 && p5 === p6){
       return p4; //6      
      
    }else if(p1 === p5 && p5 === p9){
       return p1; //7
      
    }else if(p3 === p5 && p5 === p7){
       return p3; //8
      
    }else{
      
      //-----------------------------------
      for(var cellIndex = 1; cellIndex < 10; cellIndex++){
          var cellValue = $("#board-cell-" + cellIndex).children("p").html();
          if(cellValue === "b"){
               return "keep_playing";
          }
      }
      //----------------------------------      
            
       return "draw";
    }
  }; // function check_board
  
  
  //------------
    function check_board_status(){
      // START - check board status
      var status = check_board();
      // check the status of the board, possible values: 1) "keep_plying", 2) the symbols in winning row ("x" or "o"), 3) "draw"
      if(status === "x" || status === "o"){       // someone won
         
        var winner = "";
        if(status === symbol_player_1){
          winner = "Player 1";
          $("#header-label-score-1-col").html( $("#header-label-score-1-col").html()*1 + 1 );
        }else if(players_number === "1"){ // status === symbol_player_2 and players_number === "1" (Player_1 against Computer)
          winner = "Computer";
          $("#header-label-score-2-col").html( $("#header-label-score-2-col").html()*1 + 1 );           
        }else{                            // status === symbol_player_2 and player_number === "2" (player_1 against Player_2)
          winner = "Player 2";
          $("#header-label-score-2-col").html( $("#header-label-score-2-col").html()*1 + 1 );          
        }
        
        //set the message to show (end-game-title) with the winner
        var new_end_game_title = $("#end-game-title").html() + '<br />' + " The winner is: " + winner;
        $("#end-game-title").html(new_end_game_title);
        
        //hide the flag currently visible
        hide_flag_player();        
        //calls end-game-container and after 3 seconds fades it out and reset the game
        $("#board").fadeOut(fade_speed, function(){
          $("#header-row").children().hide();
          $("#end-game-container").fadeIn(fade_speed).delay(fadeIn_fadeOut_delay).fadeOut(fade_speed,function(){
            replay();
          });      
        });
        return false;
      }else if(status === "draw") {                                      // it was a draw
        $("#end-game-title").html("It seems nobody won ...");
        
        //hide the flag currently visible
        hide_flag_player();           
        //calls end-game-container and after 3 seconds fades it out and reset the game        
        $("#board").fadeOut(fade_speed, function(){
          $("#header-row").children().hide();
          $("#end-game-container").fadeIn(fade_speed).delay(fadeIn_fadeOut_delay).fadeOut(fade_speed,function(){
            replay();
          });      
        });
        return false;
      }else{ //check_status returns "keep_playing"
        return true;
      }
      // END - check board status  
    }
  //-------------
  
  
  
  
  // I am The Computer! I am unbeatbable! Mwahahaha-hahaha-hahaha!!!
  function computer_move(){
    
    var there_is_a_move = false;
    var the_move = "";     
    
    function winning_blocking_move(symbol){

    //check for a winning or blocking move (they are 3 x 8 = 24)
      
    var p1 = $("#board-cell-1").children("p").html();
    var p2 = $("#board-cell-2").children("p").html();
    var p3 = $("#board-cell-3").children("p").html();
    var p4 = $("#board-cell-4").children("p").html();
    var p5 = $("#board-cell-5").children("p").html();
    var p6 = $("#board-cell-6").children("p").html();
    var p7 = $("#board-cell-7").children("p").html();
    var p8 = $("#board-cell-8").children("p").html();
    var p9 = $("#board-cell-9").children("p").html();    

      
    var combinations = [
      "fill",       //Sorry, in this case I don't like zero-based array!
      p1 + p2 + p3, //combination 1
      p7 + p8 + p9, //combination 2
      p1 + p4 + p7, //combination 3
      p3 + p6 + p9, //combination 4
      p2 + p5 + p8, //combination 5
      p4 + p5 + p6, //combination 6
      p1 + p5 + p9, //combination 7
      p3 + p5 + p7  //combination 8                              
    ];
    
    var c = symbol;
    var b = "b";
    var comb_1 = b+c+c;
    var comb_2 = c+b+c;
    var comb_3 = c+c+b;
      
// NEW VERSION -------------------------------------------------
  var combinationArray = [
      "fill",
      [1, ["1", "2", "3"]],
      [2, ["7", "8", "9"]],
      [3, ["1", "4", "7"]],
      [4, ["3", "6", "9"]],
      [5, ["2", "5", "8"]],
      [6, ["4", "5", "6"]],
      [7, ["1", "5", "9"]],
      [8, ["3", "5", "7"]]

  ];
  var comb = [comb_1, comb_2, comb_3];      
  var combIndex = -1;
  var cell_index = 0;
  for(var combinationsIndex = 1; combinationsIndex < 9; combinationsIndex++){
    if(comb.indexOf(combinations[combinationsIndex]) > -1){
        combIndex = comb.indexOf(combinations[combinationsIndex]);
        cell_index = combinationArray[combinationsIndex][1][combIndex];
        there_is_a_move = true;
        the_move = "#board-cell-" + cell_index;
    }
  }
      
// NEW VERSION -------------------------------------------------     
      
      

      
/* OLD VERSION ------------------------------------------------
    // combination 1
          if(combinations[1] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-1";  
    }else if(combinations[1] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-2";        
    }else if(combinations[1] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-3";
    
      // combination 2      
    }else if(combinations[2] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-7";        
    }else if(combinations[2] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-8";        
    }else if(combinations[2] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-9";
      
    // combination 3       
    }else if(combinations[3] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-1";        
    }else if(combinations[3] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-4";        
    }else if(combinations[3] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-7";
      
    // combination 4       
    }else if(combinations[4] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-3";        
    }else if(combinations[4] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-6";        
    }else if(combinations[4] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-9";
      
    // combination 5       
    }else if(combinations[5] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-2";        
    }else if(combinations[5] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-5";        
    }else if(combinations[5] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-8";
      
    // combination 6       
    }else if(combinations[6] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-4";        
    }else if(combinations[6] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-5";        
    }else if(combinations[6] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-6";
      
    // combination 7       
    }else if(combinations[7] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-1";        
    }else if(combinations[7] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-5";        
    }else if(combinations[7] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-9";

    // combination 8       
    }else if(combinations[8] === comb_1){
      there_is_a_move = true;
      the_move = "#board-cell-3";        
    }else if(combinations[8] === comb_2){
      there_is_a_move = true;
      the_move = "#board-cell-5";        
    }else if(combinations[8] === comb_3){
      there_is_a_move = true;
      the_move = "#board-cell-7";        
    }
*/ //OLD VERSION ------------------------------------------------------------


   } // winning_blocking_move
    
    
    // --------------------- STRATEGIES ------------------------------------------------------------------------
    
    // ------------- N.1 (first move: computer)
    //
    // 1 - Select a corner (S1 step 1)
    // 2 - Player makes a move (this strategy wins if Player_1 do not move at the center, otherwise will be a draw)
    // 3 - Select one of the adjacent corner (S1 step 2)
    // 4 - Player will move between your two positions
    // 5 - Select a third corner (this move will give you two victory chances) (S1 step 3)
    // 6 - Player will move to block one row
    // 7 - Computer wins with the other row

    
    // ------------- N.2 (first move: Player_1, this is the second move (total_moves = 1) )
    //
    // If Player 1 moved in the center
    // 1 - Computer moves in a corner (one of pos 1, 2, 3, 4) (S2 step 1)
    // 2 - Player_1 moves
    // 3 - Computer muves in a free corner position (one of pos 1, 3, 7, 8) otherwise Player_1 wins, avoid cross positions (pos 2, 6, 8, 4) (S2 step 2)
    
    
    // ------------- N.3 (first move: Player_1, this is the second move (total_moves = 1) )
    //
    // If Player_1 moved NOT in the center
    // 1 - Computer moves in the center (S3 step 1)
    // 2 - Player_1 moves 
    // 2 - Computer moves in a cross position (pos 2, 6, 8, 4) otherwise Player_1 wins, avoid corner positions (pos 1, 3, 7, 8) (S3 step 2)

    
    // ------------- N.4 (If find "pcp" combination. Trying to win) - Not implemented here. Maybe in the next release
    //                                                             c  
    // 1 - Computer moves in one of the free cross positions (eg. p c p) (S4 step 1)
    // 2 - Player_1 moves, to block computer victory
    //                                                                  c c 
    // 3 - Computer moves in the corner adjacent its previous move (eg. p c p) (S4 step 2)
    //                                                                    p 
    
    winning_blocking_move(symbol_player_2);
    var there_is_a_winning_move = there_is_a_move;
    var winning_move = the_move;
    
    winning_blocking_move(symbol_player_1);
    var there_is_a_blocking_move = there_is_a_move;
    var blocking_move = the_move;
    
    there_is_a_move = false;
    the_move = "";
    
    //first move to try, go for a winning move, if it exists 
    if(there_is_a_winning_move === true){
      $(winning_move).attr("used", "true");
      $(winning_move).children("p").html(symbol_player_2);
      $(winning_move).children("p").toggle();
      there_is_a_winning_move = false;
      winning_move = "";

    //second move to try, avoiding player_1 to win
    }else if(there_is_a_blocking_move === true){  
      $(blocking_move).attr("used", "true");
      $(blocking_move).children("p").html(symbol_player_2);
      $(blocking_move).children("p").toggle();
      there_is_a_blocking_move = false;
      blocking_move = "";
            
    //Strategy N.1 - if this is the first move, select a corner cell    
    }else if(total_moves === 0){ //S1 step 1
      // firts of all, randomly select one of the four corners
      var corners = ["#board-cell-1", "#board-cell-3", "#board-cell-7", "#board-cell-9"];
      var maxCornersIndex = corners.length - 1;
      var randomCornersIndex = Math.floor(Math.random() * maxCornersIndex) + 0;
      var randomCorner = corners[randomCornersIndex];        
      
      $(randomCorner).attr("used", "true");
      $(randomCorner).children("p").html(symbol_player_2);
      $(randomCorner).children("p").toggle();
      
      level_strategy_1 = 2;
      
    }else if(level_strategy_1 === 2){ // S1 step 2
      // Select one of the adiacent corner
      var S1_2_move = "";
      
            if($("#board-cell-1").children("p").html() === symbol_player_2){
              if($("#board-cell-3").attr("used") === "false"){
                  S1_2_move = "#board-cell-3"; //or "#board-cell-7" if "#board-cell-3" is checked
              }else{
                  S1_2_move = "#board-cell-7";                
              }   
      }else if($("#board-cell-3").children("p").html() === symbol_player_2){
              if($("#board-cell-9").attr("used") === "false"){
                  S1_2_move = "#board-cell-9"; //or "#board-cell-1" if "#board-cell-9" is checked
              }else{
                  S1_2_move = "#board-cell-1";                
              }     
      }else if($("#board-cell-9").children("p").html() === symbol_player_2){
              if($("#board-cell-7").attr("used") === "false"){
                  S1_2_move = "#board-cell-7"; //or "#board-cell-3" if "#board-cell-7" is checked
              }else{
                  S1_2_move = "#board-cell-3";                
              }  
      }else if($("#board-cell-7").children("p").html() === symbol_player_2){        
              if($("#board-cell-1").attr("used") === "false"){
                  S1_2_move = "#board-cell-1"; //or "#board-cell-9" if "#board-cell-1" is checked
              }else{
                  S1_2_move = "#board-cell-9";                
              }  
      }
      
      $(S1_2_move).attr("used", "true");
      $(S1_2_move).children("p").html(symbol_player_2);
      $(S1_2_move).children("p").toggle();
      
      level_strategy_1 = 3;
      
    }else if(level_strategy_1 === 3){ // S1 step 3
      //Select a third free corner (at this point there is at least one free corner)
      var S1_3_move = "";

      // this code select a free corner - It can be placed in a function -----------------------   
          var cornerArray = [1, 3, 9, 7];
          for(var index = 0; index < 4; index++){
            if($("#board-cell-" + cornerArray[index] ).attr("used") === "false"){
              S1_3_move = "#board-cell-" + cornerArray[index];
            }
          }
     //-----------------------------------------------------------------------------------------        
      
      $(S1_3_move).attr("used", "true");
      $(S1_3_move).children("p").html(symbol_player_2);
      $(S1_3_move).children("p").toggle();      
      
      level_strategy_1 = 0;
      //this move end Strategy N.1
    
    //Strategy N.2 - This is the second move and Player_1 moved in the center   
    }else if(total_moves === 1 && $("#board-cell-5").attr("used") === "true"){ //S2 step 1    
        //Computer moves in a corner position (for now always 1)
        $("#board-cell-1").attr("used", "true");
        $("#board-cell-1").children("p").html(symbol_player_2);
        $("#board-cell-1").children("p").toggle();
        level_strategy_2 = 2;      
    }else if(level_strategy_2 === 2){        //S2 step 2
      //Computer moves in a free corner position (one of 1, 3, 9, 7)
      var S2_2_move = "";
      
  // this code select a free corner - It can be placed in a function -----------------------   
      var cornerArray = [1, 3, 9, 7];
      for(var index = 0; index < 4; index++){
        if($("#board-cell-" + cornerArray[index] ).attr("used") === "false"){
          S2_2_move = "#board-cell-" + cornerArray[index];
        }
      }
 //-----------------------------------------------------------------------------------------     
      
      $(S2_2_move).attr("used", "true");
      $(S2_2_move).children("p").html(symbol_player_2);
      $(S2_2_move).children("p").toggle();      
      
      level_strategy_2 = 0;
      //this move end Strategy N.2
      
    //Strategy N.3 - This is the second move and Player_1 checked one position other than the center   
    }else if(total_moves === 1 && $("#board-cell-5").attr("used") === "false"){ //S3 step 1          
        //Computer moves in the center
        $("#board-cell-5").attr("used", "true");
        $("#board-cell-5").children("p").html(symbol_player_2);
        $("#board-cell-5").children("p").toggle();
        level_strategy_3 = 2;      
      
    }else if(level_strategy_2 === 2){         
      //Computer moves in a cross position (one of 2, 6. 8. 4)
      var S3_2_move = "";
      // this code select a free cross position - It can be placed in a function -----------------------   
          var crossArray = [2, 6, 8, 4];
          for(var index = 0; index < 4; index++){
            if($("#board-cell-" + crossArray[index] ).attr("used") === "false"){
              S3_2_move = "#board-cell-" + crossArray[index];
            }
          }
     //-------------------------------------------------------------------------------------------------       
      $(S3_2_move).attr("used", "true");
      $(S3_2_move).children("p").html(symbol_player_2);
      $(S3_2_move).children("p").toggle();      
      
      level_strategy_3 = 0;
      //this move end Strategy N.3         

      
      
    }else{ //finally, if Computer doesn't know what to do, it plays a random move  
      console.log("random move");
      //get unchecked cells
      var unchecked_cells = [];
      for(var row = 0; row < 3; row++){
        for(var col = 0; col < 3; col++ ){
          var status = $("[id|=cell-" + row + "-" + col + "]").parent().attr("used");
          if(status === "false"){
            unchecked_cells.push($("[id|=cell-" + row + "-" + col + "]").attr("id"));
          }
        }
      }    
      console.log(unchecked_cells);
      //random select one of the unchecked cells
      var upperIndex = unchecked_cells.length - 1;
      var random_index = Math.floor(Math.random() * upperIndex) + 0;
      var id = unchecked_cells[random_index];


      $("[id|=" + id + "]").parent().attr("used", "true");
      $("[id|=" + id + "]").html(symbol_player_2);
      $("[id|=" + id + "]").toggle();    
    }
    console.log("End computer move");
    total_moves++;

  } // function computer_move
  
// end FUNCTIONS -----------------------------------------------------  
  



$(document).ready(function(){
 
    
// start action zone -------------------------------------------------  
  
  // choose one or two players and calls second menu
  $("[id|=menu-first-btn]").click(function(){
    players_number = $(this).attr("number");
      $("#header-label-player-1-col").html("Player 1");
    
      if(players_number === "1"){
        $("#flag-player-1").html("Your turn!");
        $("#flag-player-2").html("Computer's turn");          
        $("#header-label-player-2-col").html("Computer");        
      }else{
        $("#flag-player-1").html("Go Player 1!");
        $("#flag-player-2").html("Go player 2!");
        $("#header-label-player-2-col").html("Player 2");         
      }
                  
    $("#menu-first-container").fadeOut(fade_speed, function(){
      $("#menu-second-container").fadeIn(fade_speed); 
    });
  });
  
  
  // chhose "x" or "o" and show the game's board
  $("[id|=menu-second-btn]").click(function(){
    symbol_player_1 = $(this).attr("symbol");
    if(symbol_player_1 === "x"){
        symbol_player_2 = "o";
       }else{
        symbol_player_2 = "x";
       }
    $("#menu-second-container").fadeOut(fade_speed, function(){ 
      $("#board").fadeIn(fade_speed);
      $("#header-row").children().fadeIn(fade_speed * 2);
      choose_first_player(players_number);
    });
  });
  
  // return to main menu from second menu
  $("#menu-second-back").click(function(){
    $("#menu-second-container").fadeOut(fade_speed, function(){ 
      $("#menu-first-container").fadeIn(fade_speed);      
    });
  });  

  // reset every value and return to main menu
  $("#header-label-reset-col").click(function(){
    reset_game();
  });
  
  
  // actions taken when player click on the board - START
  $(".cell").click(function(){
    if(you_can_click === true){
    you_can_click = false;  
    var id = $(this).children("p").attr("id");
    if($(this).attr("used") === "false"){ //check if a cell is already clicked
      $(this).attr("used", "true");
      total_moves++;      
      
      if(its_up_to === "1"){
        $("[id|=" + id + "]").html(symbol_player_1);
        $("[id|=" + id + "]").toggle();
        var keep_playing = check_board_status();
        if(keep_playing === true){
          if(players_number === "1"){
            its_up_to = "c";
            show_flag_player_2();
            setTimeout(function(){            
              computer_move();
              keep_playing = check_board_status();
              if(keep_playing === true){
                its_up_to = "1";
                show_flag_player_1();
              }
            }, computer_move_timeout);            
          }else{
            show_flag_player_2();          
            its_up_to = "2";
          }
       } 

      }else if(its_up_to === "2"){
        $("[id|=" + id + "]").html(symbol_player_2);
        $("[id|=" + id + "]").toggle();
        var keep_playing = check_board_status();
        if(keep_playing === true){
          its_up_to = "1";
          show_flag_player_1();
        }
      }else if(its_up_to === "c"){ // replaced by function computer_move()
        //$("[id|=" + id + "]").html(symbol_player_2);
        //$("[id|=" + id + "]").toggle();
        //its_up_to = "1";
        //show_flag_player_1();
      }

    }
    
  } //end you_can_click 
  });
  // actions taken when player click on the board - END
  
  
// end action zone -----------------------------------------------------------  
 
});