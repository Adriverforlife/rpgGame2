function rpgGame() {
    //char select sheet
    var fighter = { attack: 5, Armor: 3, hP: 200 };
    var mage = { attack: 10, Armor: 0, hP: 100 };
    var rogue = { attack: 7, Armor: 1, hP: 150 };
    var monk = { attack: 2, Armor: 0, hP: 400 };

    var monster = [
        { name: "Beastman", counterAttack: 5, hP: 20, imgFile: "assets/images/monsters/beastman.gif" },
        { name: "Spider", counterAttack: 2, hP: 10, imgFile: "assets/images/monsters/spider.gif" },
        { name: "Slime", counterAttack: 10, hP: 50, imgFile: "assets/images/monsters/slime.gif" }]
    var boss = [{ name: "Demon", counterAttack: 50, hP: 1000, imgFile: "assets/images/monsters/demon.gif" }]

    //variables for game
    var startGame = false;
    var enemySelected = false;
    var playerChar = {};
    var computerChar = {};
    var baseAttack = 0;
    var combatAttack = 0;
    enemyhP = 0;
    var gold = 0;
    var winCount = 0;
    var lvl = 1;
    var maxhP = 0;
    var baseArmor = 0;
    var bossBattle = false;

    //SoundEffects
    var deadSound = document.createElement("audio");
    deadSound.setAttribute("src", "assets/sounds/dead.wav");
    var atkSound = document.createElement("audio");
    atkSound.setAttribute("src", "assets/sounds/attack.wav")
    var counterSound = document.createElement("audio");
    counterSound.setAttribute("src", "assets/sounds/counterattack.wav")

    //~~~~~~~~~~~~~~~~~~

    //ADD CODE BELOW
    //starting stats
    function statSheet() {
        $("#playerhP").empty();
        combatAttack = baseAttack
        $("#playerhP").append("Level " + lvl + "<br>HP: " + playerChar.hP + "<br>Attack:" + combatAttack + "<br>Armor:" + playerChar.Armor + "<br>Gold:" + gold);
    }
    //store, gold and items
    function shopActions() {
        $("#actions").empty();
        var locationAction = $('<div>');

        var action = $('<button>').text("Leave");
        action.attr("class", "btn btn-primary atk");
        locationAction.append(action);
        $("#actions").append(locationAction);
    }
    var shoP = [
        { name: "Attack Up", statBoost: 5, gold: 0, imgFile: "assets/images/monsters/beastman.gif" },
        { name: "Armor Up", statBoost: 5, gold: 0, imgFile: "assets/images/monsters/spider.gif" },
        { name: "Potion", statBoost: 10, gold: 0, imgFile: "assets/images/monsters/slime.gif" },
        { name: "Random Trinket", statBoost: 0, gold: 1000, imgFile: "assets/images/monsters/demon.gif" }];
    function buyItem() {

        console.log("shopper");
        ITEM = $(this).text();
        console.log(ITEM);

        if (ITEM == "Attack Up") {
            playerChar.attack = baseAttack + 5;
        }
        else if (ITEM == "Armor Up") {
            playerChar.Armor = playerChar.Armor + 1;
        }
        else if (ITEM == "Potion") {
            playerChar.hP = playerChar.hP + 25;
        }

        else if (ITEM == "Other") {
            lvl = lvl + 1;
        }

        statSheet();
    }



    //inn, max hp

    //experience, levels, etc.
    //ability to run away
    function fightActions() {
        fightArr = ["Attack", "Run"];
        $("#actions").empty();

        var fightDiv = $('<div>');
        for (i = 0; i < fightArr.length; i++) {

            var action = $('<button>').text(fightArr[i]);
            action.attr("class", "btn btn-primary atk");
            fightDiv.append(action);
            $("#actions").append(fightDiv);
        }
    }
    //boss fight

    //persistant items and consumable items
    var journey = ["explore", "Shop", "Inn", "Boss"];
    //ADD CODE FOR ABOVE
    $(document).on("click", ".char", charactorSelect);
    $(document).on("click", ".atk", atkEnemy);
    $(document).on("click", ".itm", buyItem);

    //$(".atk").click(atkEnemy);
    var dBtn = false;
    function disableATKbutton() {
        
        dBtn = true;
        console.log(dBtn)
        setTimeout(function () {dBtn = false; }, 1000);
        console.log(dBtn)
    }




    function atkEnemy() {
        if(dBtn === false){
        chosenAction = $(this).text();
        
        if (playerChar.hP > 0 && enemySelected === true && chosenAction == "Attack") {
            ATTACK();
            roundEND();
        }
        else if (playerChar.hP > 0 && enemySelected === true && chosenAction == "Run") {
            counterATK();
            $("#result").append("You ESCAPED");
            $("#Computer").empty();
            $("#computerhP").empty();
            $("#computerImg").attr("src", "");
            enemySelected = false;
            bossBattle = false;
            combatAttack = baseAttack


        }
        else {
            $("#result").append("You LEFT");
            $("#Computer").empty();
            $("#computerhP").empty();
            $("#computerImg").attr("src", "");
            console.log("nothing")
            enemySelected = false;
            $("#damage").empty();

        }}
    }


    function ATTACK() {
        
        disableATKbutton();
        $("#playerImg").animate({ top: "-=20px", }, 100);
        $("#playerImg").animate({ top: "+=20px", }, 100);
        $("#computerImg").delay("fast").animate({ right: "-20px" }, 100);
        $("#computerImg").animate({ right: "+=20px", }, 100);
        $("#damage").empty();
        atkSound.play();
        enemyhP = enemyhP - combatAttack;
        $("#computerhP").empty();
        $("#computerhP").append("HP: " + enemyhP);
        $("#damage").append("You did " + combatAttack + " damage to the enemy.");
        combatAttack = combatAttack + baseAttack;


    }

    function counterATK() {
        if (baseArmor < computerChar.counterAttack) {
            playerChar.hP = playerChar.hP + baseArmor - computerChar.counterAttack;
            //$("#playerhP").append("HP: " + playerChar.hP);

            $("#damage").append(" The monster attacked for " + computerChar.counterAttack + " damage.");
            $("#computerImg").delay(1000).animate({ top: "-=20px", }, 100);
            $("#computerImg").animate({ top: "+=20px", }, 100);
            $("#playerImg").delay(1700).animate({ right: "+20px" }, 75);
            $("#playerImg").animate({ right: "-=20px", }, 100);
            setTimeout(function () {
                counterSound.play();
            }, 1075);

        }
        else if (baseArmor > computerChar.counterAttack) {
            $("#damage").append(" The monsters attack bounced off your armor");
            $("#computerImg").delay(1000).animate({ top: "-=20px", }, 100);
            $("#computerImg").animate({ top: "+=20px", }, 100);
            $("#playerImg").delay(1700).animate({ right: "+20px" }, 75);
            $("#playerImg").animate({ right: "-=20px", }, 100);
            setTimeout(function () {
                counterSound.play();
            }, 1075);



        }
    }
    function roundEND() {
        if (playerChar.hP < 1) {
            $("#result").append("You LOSE");
            deadSound.play();

        }
        else if (enemyhP < 1) {
            if (bossBattle == false) {
                $("#result").append("You WIN");
                $("#Computer").empty();
                $("#computerhP").empty();
                $("#computerImg").attr("src", "");
                deadSound.play();
                enemySelected = false;
                winCount++;
                gold++;
                $("#actions").empty();
                combatAttack = baseAttack
                if (winCount === lvl) {
                    lvl++;
                    winCount = 0;
                    console.log(winCount)
                }
                console.log(winCount)
            }
            else {
                $("#result").append("You've SAVED THE WORLD!");
                $("#Computer").empty();
                $("#computerhP").empty();
                $("#computerImg").attr("src", "");
                deadSound.play();


            }




        }
        else {
            counterATK()
        }
        statSheet();
    }

    function startJourney() {
        $("#location").html("Where to go?");
        for (i = 0; i < journey.length; i++) {
            var encounterDiv = $('<div>');
            var encounter = $('<button>').text(journey[i]);
            encounter.attr("class", "btn btn-primary char");
            encounter.attr("id", "monster");
            encounterDiv.append(encounter);
            encounterDiv.append('<br><br>')
            $("#charSel").append(encounterDiv);

        }
    }



    function charactorSelect() {
        if (startGame === false) {
            selecctedChar = $(this).text();
            $("#Player").append(selecctedChar);
            startGame = true;
            selAvatar();
            $(this).closest('button').remove();
            $("#charSel").html("");
            startJourney();

        }
        else if (enemySelected === false) {
            $("#damage").empty();

            selecctedChar = $(this).text();
            selEnemy();
            enemySelected = true;
            $("#result").empty();
        }

    };
    function selAvatar() {
        if (selecctedChar == "Fighter") {
            playerChar = fighter;
            $("#playerImg").attr("src", "assets/images/fighter/player.gif");
        }
        else if (selecctedChar == "Mage") {
            playerChar = mage;
            $("#playerImg").attr("src", "assets/images/mage/player.gif");

        }
        else if (selecctedChar == "Rogue") {
            playerChar = rogue;
            $("#playerImg").attr("src", "assets/images/rogue/player.gif");

        }
        else if (selecctedChar == "Monk") {
            $("#playerImg").attr("src", "assets/images/monk/player.gif");

            playerChar = monk;
        }
        baseAttack = playerChar.attack;
        baseArmor = playerChar.Armor;

        statSheet();


    }
    function selEnemy() {
        if (selecctedChar == "explore") {
            combatAttack = baseAttack

            fightActions();
            computerChar = monster[Math.floor(Math.random() * monster.length)];
            $("#computerImg").attr("src", computerChar.imgFile);
            enemyhP = computerChar.hP
            $("#computerhP").append("HP: " + enemyhP);
            $("#Computer").append(computerChar.name);

        }
        else if (selecctedChar == "Shop") {
            shopActions();
            for (i = 0; i < shoP.length; i++) {
                shopItemsDiv = $('<div>').attr("class", "lftaln");

                var shopItems = $('<button>').text(shoP[i].name);
                shopItems.attr("class", "btn btn-primary itm");
                shopItemsDiv.append(shopItems);
                shopItemsDiv.append(" " + shoP[i].gold + " gold<br><br>");
                $("#damage").append(shopItemsDiv);

            }


        }
        else if (selecctedChar == "Boss") {
            combatAttack = baseAttack
            bossBattle = true;

            fightActions();
            computerChar = boss[Math.floor(Math.random() * boss.length)];
            $("#computerImg").attr("src", computerChar.imgFile);
            enemyhP = computerChar.hP
            $("#computerhP").append("HP: " + enemyhP);
            $("#Computer").append(computerChar.name);

        }
    }
}
