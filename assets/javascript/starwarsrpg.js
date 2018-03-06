function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function moveCard(o,cardId) {
    console.log(o);
    id=o.id;
    buttonId=id.replace(' ','\\ ');
    id=id.replace('button_','#div_').replace(' ','\\ ');
    console.log("characterToPlayer " + id);

    // Capture the player card in 'element' before removing it from the deck
    var element = $(id).get();

    //Remove player card from deck
    $(id).remove();

    //Place the player card in the player slot
    $(cardId).append(element);

    //Take the button from the card; it is no longer neccessary.
    $(o.id).remove();

    console.log("ELEMENT " + element);
}

$(document).ready(function(){

    class Character {
        constructor(name,icon,hp) {
            this.name=name;
            this.icon=icon;
            this.hp=hp;
        }
    }

    var characters_bank = [
        {
            'name'  :   'Han Solo',
            'icon'  :   'Han-Solo.png',
            'hp'    :   110
        },
        {
            'name'  :   'Wicket',
            'icon'  :   'Wicket-Warrick.png',
            'hp'    :   50
        },
        {
            'name'  :   'Tusken Raider',
            'icon'  :   'Tusken-Riders.png',
            'hp'    :   90
        },
        {
            'name'  :   'Darth Vader',
            'icon'  :   'Vader.png',
            'hp'    :   200
        },
        {
            'name'  :   'Yoda',
            'icon'  :   'Yoda.png',
            'hp'    :   195
        },
        {
            'name'  :   'Stormtrooper',
            'icon'  :   'Stormtrooper.png',
            'hp'    :   180
        }, 
        {
            'name'  :   'Lando Calrissian',
            'icon'  :   'Lando.png',
            'hp'    :   160
        }, 
        {
            'name'  :   'Luke Skywalker',
            'icon'  :   'Luke-Skywalker.png',
            'hp'    :   150
        }, 
        {
            'name'  :   'Darth Maul',
            'icon'  :   'Darth-Maul.png',
            'hp'    :   190
        }  
    ];


    // shuffle the card deck
    characters = shuffle(characters_bank).slice(0,5);

    // Render the card deck characters
    characters.forEach(element => {
        $('#card_deck').append(`
        <div id="div_${element.name}" class="player_card" style="text-align: center;">
            <img src="./assets/images/characters/${element.icon}" class="player_icon" alt="">
            <div class="character_name">
                ${element.name}
            </div>
            <div class="character_hp">
                ${element.hp}
            </div>
            <button id="button_${element.name}" type="button" class="btn btn-dark useButton">Use</button>
        </div>`);
    });

    $('.useButton').click(function(id){
        moveCard(this,'#playerCard');
        // Now, the next time a useButton is clicked, the card will go to the defender.
        $('.useButton').click(function(id){
            moveCard(this,'#defenderCard');

            //Now, disable all of those buttons.
            $('.useButton').unbind('click');
            
        });        
        
    });
    //$('.useButton').attr('onclick','alert("Hello")');

});