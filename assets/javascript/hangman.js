$(document).ready(function () {
    var tries;
    var wins = 0;
    var answer;
    var guesses;
    var lettersGuessed;
    var myWord;
    var reset = 0;
    var arrLtrsGuessed;
    var maxTries;
    var randomMiscImgCtr = 0;
    var randomMiscSndCtr = 0;
    var arrMiscImg = [];
    var miscImgCnt = 13;
    var arrMiscSnd = [];
    var miscSndCnt = 13;

    var wordBank = [
        'power',
        'thing',
        'piano',
        'queen',
        'chest',
        'month',
        'death',
        'hotel',
        'blood',
        'drama',
        'honey',
        'event',
        'tooth',
        'studio',
        'recipe',
        'advice',
        'aspect',
        'office',
        'cousin',
        'cancer',
        'speech',
        'device',
        'tennis',
        'extent',
        'camera',
        'leader',
        'speaker',
        'revenue',
        'teacher',
        'arrival',
        'student',
        'thought',
        'context',
        'session',
        'outcome',
        'science',
        'problem',
        'bedroom',
        'library',
        'article',
        'housing',
        'alcohol',
        'surgery',
        'judgment',
        'shopping',
        'currency',
        'employer',
        'security',
        'director',
        'property',
        'relation',
        'election',
        'database',
        'internet',
        'instance',
        'audience',
        'category',
        'weakness',
        'medicine',
        'platform',
        'agreement',
        'promotion',
        'chocolate',
        'operation',
        'direction',
        'apartment',
        'tradition',
        'employment',
        'television',
        'technology',
        'assumption',
        'obligation',
        'connection',
        'percentage',
        'difficulty',
        'protection',
        'appointment',
        'measurement',
        'requirement',
        'negotiation',
        'advertising',
        'information',
        'temperature',
        'combination',
        'environment',
        'distribution',
        'organization',
        'significance',
    ]
    ;
    function blink_text(selector) {
        $(selector).fadeOut(500);
        $(selector).fadeIn(500);
    }

    function randomizeImages() {
        for (var i = 0; i < miscImgCnt ; i++) {
            arrMiscImg.push(i);
        }
        arrMiscImg.sort(function(a, b){return 0.5 - Math.random()});
        console.log(arrMiscImg);
    }
    
    function randomizeSounds() {
        for (var i = 0; i < miscSndCnt ; i++) {
            arrMiscSnd.push(i);
        }
        arrMiscSnd.sort(function(a, b){return 0.5 - Math.random()});
        console.log(arrMiscSnd);
    }

    $('#hmLabelWins',
    '#hmLabelAnswer',
    '#hmLabelGuessesLeft',
    '#hmLabelLettersGuessed',
    ).show();

    function labelsDisplay(toggle) {
        toggleDisplay('Label',toggle);
    }

    function valuesDisplay(toggle) {
        toggleDisplay('Value',toggle);
    }

    function toggleDisplay(type,toggle) {
        $('[id*=' + type + ']').css('color',toggle?'white':'black');
    }

    function updateValues() {
        $('#hmValueWins').text(wins);
        $('#hmValueAnswer').text(answer);
        $('#hmValueGuessesLeft').text(maxTries-tries);
        $('#hmValueLettersGuessed').text(lettersGuessed);
    }

    function newMiscImg() {
        randomMiscImgCtr = (++randomMiscImgCtr==miscImgCnt)?0:randomMiscImgCtr;
        $('#miscImage').attr('src','./assets/images/randomMisc/image_' + randomMiscImgCtr + '.gif');
    }

    function newMiscSnd() {
        randomMiscSndCtr = (++randomMiscSndCtr==miscSndCnt)?0:randomMiscSndCtr;
        var audio = new Audio('./assets/audio/sound_' + randomMiscSndCtr + '.wav');
        audio.play();
    }

    function blinkText(id) {
        $(id).fadeOut(500);
        $(id).fadeIn(500);

    }

    window.onload = function() {
        labelsDisplay(false);
        valuesDisplay(false);
        randomizeImages();
        randomizeSounds();
    
        document.onkeypress = function(event) {

            if (!reset) {
                // Only the ENTER key can begin the game
                if (event.keyCode != 13) {
                    blinkText('startMsg');
                    return;
                };
                tries = 0;
                guesses = 0;    
                arrLtrsGuessed = [];
                lettersGuessed = "";
                answer = "";

                myWord = wordBank[Math.floor((Math.random() * wordBank.length) + 0)];
                // myWord = 'elephant';

                for (var i =1; i<=myWord.length; i++) {
                    answer += "_";
                }
                maxTries = myWord.length * 3;
        
                $('#startMsg').text('To guess a letter, press its key.');
                updateValues();
                labelsDisplay(true);
                valuesDisplay(true);
                reset++;
            } else {
                if (1) { // Check for matched characters and update answer

                    $('#startMsg').text('To guess a letter, press its key.');

                    var key = event.key.toLowerCase();
                    // make sure an alphabetic key was pressed
                    if (   (event.keyCode >= 65 && event.keyCode <= 90)
                        || (event.keyCode >= 97 && event.keyCode <= 122)
                        ) {

                        // bump tries
                        tries++;
                        $('#hmValueGuessesLeft').text(maxTries - tries);

                        // record the letter guessed
                        if (arrLtrsGuessed.indexOf(key) == -1) {
                            arrLtrsGuessed.push(key);
                            $('#hmValueLettersGuessed').text(arrLtrsGuessed.join(""));
                        }

                        var arrAnswer = answer.split("");
                        var correct = 0;
                        for (var i = 0; i < myWord.length; i++) {
                            if (myWord[i] == key) {
                                arrAnswer[i]=key;
                                correct++;
                            }
                        }
                        answer = arrAnswer.join("");
                        $('#hmValueAnswer').text(answer);
                        if (correct) {
                            newMiscImg();
                            console.log("correct letter");
                        }
                    } else {
                        $('#startMsg').text('ALPHABETIC KEYS ONLY');
                        $('#startMsg').css('color','red');
                        blinkText('#startMsg');
                        $('#startMsg').css('color','white');
                        $('#startMsg').text('To guess a letter, press its key.');
                    }
                }
                console.log("tries " + tries);
                if (1) { // Check win lose
                    if (answer == myWord) { // Did user guess the word?
                        $('#startMsg').text("YOU WIN !!!!  PRESS ENTER FOR ANOTHER GAME");
                        $('#startMsg').css('color','white');
                        wins++;
                        $('#hmValueWins').text(wins);
                        reset = 0;
                        newMiscSnd();
                    } else if (tries==maxTries) { // Is users out of tries?
                        $('#startMsg').text("YOU LOST!!!   The word was " + myWord + ".    PRESS ENTER FOR ANOTHER GAME");
                        reset = 0;
                        var audio = new Audio('./assets/audio/game_over_man.wav');
                        audio.play();
                    }
                
                }
            }
        }
    }
})