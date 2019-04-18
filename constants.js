//Changing variable - Only for prefix code
var fix;
function setFix(prefix) {
    fix = prefix;
}
//External Commands List
var ext = require("./external");
function extCommands() {
    var extList = "";
    Object.keys(ext.commands).forEach(function(key) {
        var commandStuff = ext.commands[key].name.split("");
        var commandLatter = commandStuff.slice(1, (commandStuff.length + 1)).join("");
        var commandFormer = commandStuff[0].toUpperCase();
        var name = commandFormer + commandLatter;
        var usage = ext.commands[key].usage(fix);
        var desc = ext.commands[key].desc;
        extList = extList + `
            ${name} - 
            ||\`${usage}\`||
            ${desc}


        `;
    });
    return extList;    
}
//Constant variables - Will not and should not be changed in the code
var profileStarterAmount1 = 50; //Amount given to new casino profiles to start off
var battleshipTurnAmount = 25;
function getHelpCommands(parm) {
    var main = `
    **Commands List**
    ~~-----------------~~
    Sifcasino -
    ||\`/sifcasino\`||
    Sends you a list of the commands and how to use them, with a never-changing prefix.


    Fetch Prefix -
    ||\`/fetch prefix\`||
    Sends you the bot's current prefix.


    Casino Help -
    ||\`${fix}casino <help>\`||
    Alternate form of Sifcasino command, but uses the current prefix.


    Casino Reset Balance -
    ||\`${fix}reset <balance>\`||
    Resets casino balance to $0, in case any bugs involving casino profile occur.


    Roulette -
    ||\`${fix}roulette [bet]\`||
    Casino game. Spins a roulette wheel with 38 numbered slots, returning green for 0, and red or black for the rest. Earn money for guessing the right color.


    Double -
    ||\`${fix}double [bet]\`||
    Casino game. Gives you a chance to double the bet money you specify and collect it.


    Coinflip -
    ||\`${fix}coin [bet] [heads/tails]\`||
    Casino game. Gives you a 50-50 chance to win bet money based on a coinflip.


    Dice Roll -
    ||\`${fix}dice [bet]\`||
    Casino game. Rolls two dice. If you roll dual ONEs, you gain 3 times your bet. If you roll any other matching numbers, you gain 7 times your bet.


    User Self-Info -
    ||\`${fix}user:all <actuator>\`||
    Sends you some useful information about your discord account, including your ID and tag.


    About The Bot -
    ||\`${fix}about\`||
    Sends you information about the bot, including the bot's creator, github page, and invite link.


    Prefix -
    ||\`${fix}prefix <new prefix>\`||
    Sets a new bot prefix for the current guild, if you have admin permissions.


    Casino Profile -
    ||\`${fix}profile\`||
    Views your current balance {and donation levels}.


    `
    var main2 = `
    ** **
    ** **
    Jackpot -
    ||\`${fix}jackpot [bet]\`||
    Casino game. Starts or joins a jackpot game. Multiplayer; anyone can join, winner takes all.


    Jackpot (end) -
    ||\`${fix}jackpot <end>\`||
    Ends any currently running jackpot game in the guild. Only the creator of the game or an administrator can do this.


    Battleship (start) -
    ||\`${fix}bs [bet]\`||
    Casino game. Starts a battleship game with the specified bet. Play for a chance to win 20 TIMES YOUR BET!


    Battleship (guess) -
    ||\`${fix}bsguess [row] [column]\`||
    Guesses the coordinates of a battleship in a 10x10 game board in an already started game.


    Blackjack -
    ||\`${fix}blackjack [bet]\`||
    Casino game. Starts a blackjack card game against the computer where the highest card wins, with some special exceptions.


    Hit -
    ||\`${fix}hit\`||
    Used in games like blackjack and double to continue playing.


    Stand -
    ||\`${fix}stand\`||
    Used in games like blackjack and double to stop playing and attempt to collect the bet money.
    ** **
    ** **
    `
    var main3 = `


    Music (Play) -
    ||\`${fix}play [song title or lyrics]\`||
    Searches youtube with the specified keywords and plays that song/video to you in voice channel, or adds that song/video to your queue.


    Music (Stop) -
    ||\`${fix}stop\`||
    Stops the music currently playing in your voice channel, and deletes your queue.


    Music (List Queue) -
    ||\`${fix}queue\`||
    Lists currently playing music and your queue.


    Music (Loop Queue) -
    ||\`${fix}loop\`||
    Loops your current queue once by adding the entire queue onto itself.


    Statistics -
    ||\`${fix}stats\`|| or ||\`${fix}statistics\`||
    Views bot statistics, including ping, uptime, and number of guilds.


    Hangman -
    ||\`${fix}hm [start/end/guess]\`||
    Casino game. Starts a guild-based hangman game, ends it, or guesses a letter in it, respectively. All participants gain $5000 dollars each upon victory.


    Casino Create -
    ||\`${fix}create\`||
    Creates a casino profile (necessary to play casino games).


    Casino Delete -
    ||\`${fix}delete\`||
    Deletes your casino account, and consequently, your balance/profile. Also used to confirm your account deletion.


    *Casino Command Format Guide:*
    \`<argument>\` = Optional parameter
    \`[argument]\` = Required parameter
    \`{argument or description}\` = Future feature that is not yet implemented
    \`[argument1/argument2]\` = You can use \`argument1\` or \`argument2\` as the parameter
    ** **    
    ** **
    `; //Universal content for all variations of the help command
    var ext = `
    **External Commands (Made By Other Developers)**
    ~~------------------------------------------------~~

    ` + extCommands();
    if (parm == "main") {
        return main;
    }
    else if (parm == "ext") {
        return ext;
    }
    else if (parm == "main2") {
        return main2;
    }
    else if (parm == "main3") {
        return main3;
    } 
}


module.exports = {
    profileStarterAmount: profileStarterAmount1,
    help: getHelpCommands,
    setPrefix: setFix,
    battleshipTurnMax: battleshipTurnAmount
}