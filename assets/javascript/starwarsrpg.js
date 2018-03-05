$(document).ready(function(){
    function shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

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

    // Super-Battle-Droid.png
    // Lando.png
    // Luke-Skywalker.png
    // Jango-Fett.png
    // Han-Solo.png
    // Darth-Maul.png

    
    characters = shuffle(characters_bank).slice(0,5);

    characters.forEach(element => {
        $('#card_deck').append(`
        <div class="player_card" style="text-align: center;">
            <img src="./assets/images/characters/${element.icon}" class="player_icon" alt="">
            <div class="character_name">
                ${element.name}
            </div>
            <div class="character_hp">
                ${element.hp}
            </div>
            <button type="button" class="btn btn-dark">Use</button>
        </div>`);
    });



});