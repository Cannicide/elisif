const fs = require('fs')
const ls = require("./ls")

var Skills = require('./rpg-skills');

var characterData = [];
var characterIndex;

ls.setObj("characterArray", characterData);

var message = {};

function splash(msg, playerGold, prefix) {
    message = msg;
    message.channel.send(`Welcome, ${message.author.username} to Adventure Gaem()`);
    if (!playerGold) {
        return `Create a profile first with ${prefix}create if you want to play, pleeblian`;
    }
    else {
        var doesCharExist = false;
        for (var x = 0; x < characterData.length; x++) {
            if (characterData[x].hasCharacter && characterData[x].profile == message.author.id) {
                doesCharExist = true;
                characterIndex = x;
            }
        }
        if (!doesCharExist) {
            createChar(playerGold, prefix);
        }
        else {
            town(playerGold, prefix);
        }
    }
}

function createChar(playerGold, prefix) {
    var classChosen = false;
    while (!classChosen) {
        message.channel.send(`Would you like to be a mage (send ${prefix}mage), fighter (send ${prefix}fighter), or rouge (send ${prefix}rouge)`);
        if  (message.content.startWith(prefix)) {
            var classCheck = message.content.slice(prefix.length)
        }
        if (classCheck == `mage` || classCheck == `fighter` || classCheck == `rouge` ) {

        }
    }
    characterData.push({profile : message.author.id, hasCharacter : true, class: classCheck, level : 1, playerGold: playerGold});
    characterIndex = characterData.length - 1;
    town(playerGold, prefix);
}

function town(playerGold, prefix) {
    message.channel.send(`1. Battle\n2. Shop\n3. Player Info.\n4. Exit`);
    if  (message.content.startWith(prefix)) {
        var choice = message.content.slice(prefix.length)
    }
    switch (choice) {
        case `1`:
            encounter(message.author.id);
        break;

    }

}

function encounter() {
    if (characterData[characterIndex].level < 5) {
        
    }
}

function BattleFunc(playerGold, playerHealth, enemydefense, defense, weaponDamage, enemyDamage, minorHealthPotion, mediumHealthPotion, largeHealthPotion, enemyHealth, prefix) {
    enemyHealth = 100;
    while (enemyHealth > 0) {
        turn(playerHealth, enemydefense, defense, weaponDamage, enemyDamage, minorHealthPotion, mediumHealthPotion, largeHealthPotion, enemyHealth, prefix);
    }
    if (enemyHealth < 1) {
        playerGold = playerGold + ((rand() % 25) + 25);
        message.channel.send("Enemy DEFEATED!!!" + playerGold);
    }
}

function turn(playerHealth, enemydefense, defense, weaponDamage, enemyDamage, minorHealthPotion, mediumHealthPotion, largeHealthPotion, enemyHealth, prefix) {
    message.channel.send("```1. Attack\n2. Inventory\n3. Check\n4. Run (anything after defaults to check)\n```");
    if  (message.content.startWith(prefix)) {
        var fightOption = message.content.slice(prefix.length)
    }
    if (fightOption == 1) {
        attack(weaponDamage, enemyHealth, enemydefense);
        takeDamage(playerHealth, enemyDamage, defense);
    }
    else if (fightOption == 2) {
        usePotion(minorHealthPotion, mediumHealthPotion, largeHealthPotion, playerHealth, enemyDamage, prefix);
    }
    else if (fightOption == 3) {
        checkEnemy(enemyHealth, enemydefense, enemyDamage);
    }
    else if (fightOption == 4) {
        run(weaponDamage, enemyHealth, enemydefense, playerGold);
    }else {
        checkEnemy(enemyHealth, enemydefense, enemyDamage);
    }
    message.channel.send("You have " + playerHealth + "/100 HP.");
}

function attack(weaponDamage, enemyHealth, enemydefense) {
    message.channel.send(`Choose an attack!`)
    switch (characterData[characterIndex].class) {
        case "mage":
            message.channel.send(`Here are your skills ${Skills.Mage.getSkillNames(level)}`);
            try {
            var deltDamage = ((Skills.Mage.useSkills(prefix, enemy) + weaponDamage) + (rand() % 6)) - enemydefense;
            enemyHealth = enemyHealth - deltDamage;
            message.channel.send("You did " + deltDamage + " damage.\nEnemy has " + enemyHealth + "100 HP");                
            } catch (err) {
                message.channel.send(`There is no skill with that name`);
            }

        break;
        case "fighter":
            message.channel.send(`Here are your skills ${Skills.Fighter.getSkillNames(level)}`);
            try {
            var deltDamage = ((Skills.Fighter.useSkills(prefix, enemy) + weaponDamage) + (rand() % 6)) - enemydefense;
            enemyHealth = enemyHealth - deltDamage;
            message.channel.send("You did " + deltDamage + " damage.\nEnemy has " + enemyHealth + "100 HP");                
            } catch (err) {
                message.channel.send(`There is no skill with that name`);
            }

        break;
        case "rouge":
            message.channel.send(`Here are your skills ${Skills.Rouge.getSkillNames(level)}`);
            try {
            var deltDamage = ((Skills.Rouge.useSkills(prefix, enemy) + weaponDamage) + (rand() % 6)) - enemydefense;
            enemyHealth = enemyHealth - deltDamage;
            message.channel.send("You did " + deltDamage + " damage.\nEnemy has " + enemyHealth + "100 HP");                
            } catch (err) {
                message.channel.send(`There is no skill with that name`);
            }

        break;
        
    }
    var deltDamage = ((baseDamage + weaponDamage) + (rand() % 6)) - enemydefense;
    enemyHealth = enemyHealth - deltDamage;
    message.channel.send("You did " + deltDamage + " damage.\nEnemy has " + enemyHealth + "100 HP");
}

function takeDamage(playerHealth, enemyDamage, defense) {
    if (playerHealth > 0) {
        if (enemyHealth > 0) {
            var DamageTaken = enemyDamage - defense;
            playerHealth = playerHealth - DamageTaken;
            message.channel.send("You have taken " + DamageTaken + " damage.");
            message.channel.send("You have " + playerHealth + "/100 HP.");
        }
    } else {
        message.channel.send("You have died.");
    }
}

function minorHealthPotionCheck(minorHealthPotion, playerHealth) {
    if (minorHealthPotion > 0) {
        message.channel.send("Gained 10 HP");
        playerHealth = playerHealth + 10;
        minorHealthPotion = minorHealthPotion - 1;
        if (playerHealth > 100) {
            message.channel.send("Overdose inflicted. Lost 20 HP");
            playerHealth = playerHealth - 20;
        }
        takeDamage(playerHealth, enemyDamage, defense);
    } else {
        message.channel.send(`You have no minor HP potions`);
    }
}

function mediumHealthPotionCheck(mediumHealthPotion, playerHealth) {
    if (mediumHealthPotion > 0) {
        message.channel.send("Gained 25 HP");
        playerHealth = playerHealth + 25;
        mediumHealthPotion = mediumHealthPotion - 1;
        if (playerHealth > 100) {
            message.channel.send("Overdose inflicted. Lost 35 HP");
            playerHealth = playerHealth - 50;
        }
        takeDamage(playerHealth, enemyDamage, defense);
    } else {
        message.channel.send(`You have no medium HP potions`);
    }
}

function largeHealthPotionCheck(largeHealthPotion, playerHealth) {
    if (largeHealthPotion > 0) {
        message.channel.send("Restored All Health");
        playerHealth = 100;
        largeHealthPotion = largeHealthPotion - 1;
        takeDamage(playerHealth, enemyDamage, defense);
    } else {
        message.channel.send(`You have no large HP potions`);
    }
}

function usePotion(minorHealthPotion, mediumHealthPotion, largeHealthPotion, playerHealth, prefix) {
    message.channel.send("You Have " + minorHealthPotion + " Minor Health Potions, " + mediumHealthPotion + " Medium Health Potions, and " + largeHealthPotion + " Large Health Potions.");
    message.channel.send(`Type ${prefix}minor, ${prefix}medium, or ${prefix}large to choose`);
    if (message.content.startWith(prefix)) {
        var potionType = message.content.slice(prefix.length)
    }
    switch (potionType) {
        case minor:
            minorHealthPotionCheck(minorHealthPotion, playerHealth);
            break;
        case medium:
            mediumHealthPotionCheck(mediumHealthPotion, playerHealth)
            break;
        case large:
            largeHealthPotionCheck(largeHealthPotion, playerHealth);
            break;
        default:
            message.channel.send("you failure");
    }
}

function checkEnemy(enemyHealth, enemydefense, enemyDamage) {
    message.channel.send("The Enemy has:" + enemyHealth + " /100 HP" + enemydefense + " Defense" + "And " + enemyDamage + " Attack");
}

function run(playerHealth, enemyDamage, playerGold) {
    var runawayChance = (rand() % 4);
    if (runawayChance == 1) {
        message.channel.send("You Ran away. Lost 25 gold.");
        playerGold = playerGold - 25;

    }
    else {
        message.channel.send("Failed");
        takeDamage(playerHealth, enemyDamage, defense);
    }
}

module.exports = {
    splash: splash
}
