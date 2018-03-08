$(document).ready(function(){
    // gameState controls what buttons are active
    //  Choosing player            0
    //  Choosing defender          1
    //  Game is being played       2
    //  Game is over, player won   3
    //  Game is over, player lost  4
     function newGameState(x) {
        console.log(`NEW GAMESTATE ${x}`)
        $('#message1').text( function() {
            if        (x == 0) {
                return 'Choose your character';    
            } else if (x == 1) {
                if        (characters.length == (maxCharacters - 1)) {
                    return 'Choose your enemy';    
                } else if (characters.length == 1) {
                    return `${defender.name} is dead! Go ahead and choose ${characters[0].name}`;
                } else {
                    return `${defender.name} is dead! Choose your next enemy`;
                };
            } else if (x == 2) {
                return 'Fight!';
            } else if (x == 3) {
                return 'Game Over -- YOU WON';
            } else if (x == 4) {
                return 'Game Over -- YOU LOST';
            };
        });
        $('#message2').text( function() {
            if        (x == 0) {
                return 'This will be you.';
            } else if (x == 1) {
                if (characters.length == (maxCharacters - 1)) {
                    return `This is who ${player.name} will fight.`;
                } else {
                    return '';
                };
            } else if (x == 2) {
                if (characters.length == (maxCharacters - 2)) {
                    return 'Click ATTACK until someone dies ...';
                } else {
                    return '';
                };
            } else if (x == 3) {
                return `${player.name} killed everyone!!`;
            } else if (x == 4) {
                return `${player.name} got killed pretty bad ...`;
            };
        });
        $('#attackButton').text( function() {
            if (x < 2) {
                $('#attackButton').hide();
                return ' ';
            } else if (x == 2) {
                $('#attackButton').show();
                return 'ATTACK';
            } else if (x > 2) {
                $('#attackButton').show();
                return 'START NEW GAME';
            };
        });
        return x;
    };
    var gameState = newGameState(0);

    // These two objects hold the roles of the characters pulled from the card deck.
    var player;
    var defender;

    // This is how many characters are available at game start.
    var maxCharacters = 5;
    // These are the available characters.  Begin the game with maxCharacters (i.e. 5) characters.
    var characters_bank = [
        {
            'name'  :   'Han Solo',
            'icon'  :   'Han-Solo.png',
            'hp'    :   110,
            'ap'    :   5,
            'cap'   :   5
        },
        {
            'name'  :   'Wicket',
            'icon'  :   'Wicket-Warrick.png',
            'hp'    :   50,
            'ap'    :   1,
            'cap'   :   2
        },
        {
            'name'  :   'Tusken Raider',
            'icon'  :   'Tusken-Riders.png',
            'hp'    :   90,
            'ap'    :   7,
            'cap'   :   4
        },
        {
            'name'  :   'Darth Vader',
            'icon'  :   'Vader.png',
            'hp'    :   200,
            'ap'    :   15,
            'cap'   :   11
        },
        {
            'name'  :   'Yoda',
            'icon'  :   'Yoda.png',
            'hp'    :   195,
            'ap'    :   19,
            'cap'   :   11
        },
        {
            'name'  :   'Stormtrooper',
            'icon'  :   'Stormtrooper.png',
            'hp'    :   180,
            'ap'    :   10,
            'cap'   :   7
        }, 
        {
            'name'  :   'Lando Calrissian',
            'icon'  :   'Lando.png',
            'hp'    :   160,
            'ap'    :   9,
            'cap'   :   4
        }, 
        {
            'name'  :   'Luke Skywalker',
            'icon'  :   'Luke-Skywalker.png',
            'hp'    :   150,
            'ap'    :   12,
            'cap'   :   8
        }, 
        {
            'name'  :   'Darth Maul',
            'icon'  :   'Darth-Maul.png',
            'hp'    :   190,
            'ap'    :   15,
            'cap'   :   6
        },
        {
            'name'  :   'Greedo',
            'icon'  :   'Greedo.png',
            'hp'    :   300,
            'ap'    :   30,
            'cap'   :   3
        },
        {
            'name'  :   'General Grievous',
            'icon'  :   'General-Grievous.png',
            'hp'    :   160,
            'ap'    :   10,
            'cap'   :   20
        },
        {
            'name'  :   'Padme Amidala',
            'icon'  :   'Padme-Amidala.png',
            'hp'    :   190,
            'ap'    :   20,
            'cap'   :   11
        },
        {
            'name'  :   'Mace Windu',
            'icon'  :   'Mace-Windu-02.png',
            'hp'    :   222,
            'ap'    :   22,
            'cap'   :   2
        },
        {
            'name'  :   'Darth Sidious',
            'icon'  :   'Darth-Sidious-01.png',
            'hp'    :   111,
            'ap'    :   11,
            'cap'   :   13
        },
        {
            'name'  :   'Bail Organa',
            'icon'  :   'Bail-Organa.png',
            'hp'    :   202,
            'ap'    :   4,
            'cap'   :   44
        },
        {
            'name'  :   'Admiral Ackbar',
            'icon'  :   'Ackbar.png',
            'hp'    :   165,
            'ap'    :   18,
            'cap'   :   8
        }  
    ];
    function shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };    // Add a 'charId' property to each element in the character bank.
    // 'charId' is the name property with spaces converted to underscores.
    // This saves me the work of doing it myself when entering characters.
    characters_bank.forEach(element => {
        element.charId = (element.name).replace(' ','_');
    });

    // shuffle the card deck, take maxCharacters characters from it
    // bug12 - slice after shuffle, not before
    // characters = shuffle(characters_bank.slice(0,maxCharacters));
    characters = shuffle(characters_bank).slice(0,maxCharacters);

    // Render the card deck characters on the screen
    characters.forEach(element => {
        $('#card_deck').append(`
        <div id="div_${element.charId}" class="player_card d-flex flex-column-reverse" style="text-align: center;">
            <button id="button_${element.charId}" type="button" class="btn btn-dark useButton">Use</button>
            <div class="character_hp">${element.hp}</div>
            <img src="./assets/images/characters/${element.icon}" class="player_icon" alt="">
            <div class="character_name">${element.name}</div>
        </div>`);
    });


    function chooseCharacter(o,cardId) {
        // o = The button element.  We need its id.
        // cardId = the id of the div to which we will append a new element.
        var id = o.id;
        
        // o.id == 'button_CHARACTER'
        // id   == 'div_CHARACTER'
        id=(o.id).replace('button_','#div_');
        charId=(o.id).replace('button_','');

        // Capture the character div in 'element' before removing it from the deck
        var element = $(id).get();

        //Remove player div from deck
        $(id).remove();

        // Remove any div already in the destination div
        $(cardId).empty();

        //Place the character div in the target div
        $(cardId).append(element);

        //Take the button from the div; it is no longer neccessary.
        $(`${cardId} button`).remove();
        
        

        // Remove the character from the characters array.
        // When this array is empty, game is over and player has beaten all defenders.
        var pos = characters.map(function(e) { return e.charId; }).indexOf(charId);
        if (pos >= 0) {
            characters.splice(pos,1);
        }

        // Return a character object whose 'hp' property can be modified/updated with each round of play
        var retVal = ($.grep(characters_bank, function(el,idx) {return el.charId == charId}, false))[0];
        return retVal;
    }


    /////////////////////////////////////////////////////
    //      Begin user interaction states 0 and 1      //
    /////////////////////////////////////////////////////
    $('.useButton').click(function(id){
        console.log(`GAMESTATE ${gameState}`)
        if (gameState == 0) {
            // Choose player character
            // When the first useButton is clicked, the card belonging to the button will go to the player.
            player = chooseCharacter(this,'#playerCard');
            gameState = newGameState(1);
        } else if (gameState == 1) {
            // Choose defender character
            // Then, the next time a useButton is clicked, the card belonging to the button will go to the defender.
            defender = chooseCharacter(this,'#defenderCard');
            gameState = newGameState(2);
            //Now, disable the character chooser buttons.
            //$('.useButton').unbind('click');
        }
    });
        
    /////////////////////////////////////////////
    //        Gameplay Begins Here state 2     //
    /////////////////////////////////////////////
    $('#attackButton').click(function(id){
        console.log(`GAMESTATE ${gameState}`)
        if (gameState == 2) {

            // Player Turn
            defender.hp -= player.ap;
            player.ap   *= 2;

            // Defender Turn
            player.hp   -= defender.cap;

            // Update Player and Defender cards.
            [player,defender].forEach( function(c) {
                $('div#div_'+c.charId+' > div.character_hp').text(c.hp);
            });

            // Add some effects
            // the one with the higher HP will 'pulsate'
            // and the other will 'shake'

            // $('#playerCard .player_card').animate({"border-style": "dashed"}, 2000);
            
            // $('#playerCard .player_card').toggle(2000);


            function attackAnimation(strWinner,strLoser) {
                $(`#${strWinner}Card .player_icon`).animate({height: "+=10px" , width: "+=10px"},'fast').animate({height: "-=10px" , width: "-=10px"},'fast');;
                $(`#${strLoser}Card .player_icon`).animate({height: "-=10px" , width: "-=10px"},'fast').animate({height: "+=10px" , width: "+=10px"},'fast');;
                $(`#${strLoser}Card .player_card`).css("border-style","dashed");
                $(`#${strWinner}Card .player_card`).css("border-style","solid");

            }

            if (player.hp > defender.hp) {
                attackAnimation('player','defender');
            } else if (defender.hp > player.hp) {
                attackAnimation('defender','player');
            } else {
                // Don't animate in the rare case they tie
            }

            // End of round. Did someone die?
            if (player.hp <= 0) {
                // Player died.  Game over.
                gameState = newGameState(4);
                $('#playerCard .character_name').css('text-decoration', 'line-through');
            } else if (defender.hp <= 0) {
                $('#defenderCard .character_name').css('text-decoration', 'line-through');
                // Defender died
                if (characters.length == 0) {
                    // No more characters to become next Defender.  Player won.  Game over.
                    gameState = newGameState(3);
                } else {
                    // Player has to fight again.
                    gameState = newGameState(1);
                }
            };
        } else if (gameState > 2) {
            location.reload();
        }
    });
});