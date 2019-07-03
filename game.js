function rpgGame() {
    //char select sheet
    var fighter = { attack: 5, Armor: 3, hP: 200 };
    var mage = { attack: 10, Armor: 0, hP: 100 };
    var rogue = { attack: 7, Armor: 1, hP: 150 };
    var monk = { attack: 2, Armor: 0, hP: 400 };
    //Moster stat sheet
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
    var basehP = 0;
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
        combatAttack = baseAttack*lvl;
        maxhP = basehP + ((lvl-1)*25);
        $("#playerhP").append("Level " + lvl + "<br>HP: " + playerChar.hP+"/"+maxhP + "<br>Attack:" + combatAttack + "<br>Armor:" + playerChar.Armor + "<br>Gold:" + gold);
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
        { name: "Attack Up", statBoost: 5, gold: 10},
        { name: "Armor Up", statBoost: 5, gold: 10},
        { name: "Potion", statBoost: 10, gold: 10},
        { name: "Random Trinket", statBoost: 0, gold: 25}];
    function buyItem() {

        console.log("shopper");
        ITEM = $(this).text();
        console.log(ITEM);

        if (ITEM == "Attack Up" && gold>= 10) {
            baseAttack = baseAttack + 1;
            gold= gold-10
        }
        else if (ITEM == "Armor Up" && gold>= 10) {
            playerChar.Armor = playerChar.Armor + 1;
            gold= gold-10
        }
        else if (ITEM == "Potion" && gold>= 10) {
            playerChar.hP = maxhP + 25;
            gold= gold-10
        }

        else if (ITEM == "Random Trinket" && gold>= 25) {
            lvl = lvl + 1;
            gold= gold-100

        }
        else if (ITEM == "Sleep for the Night" && gold>= inn[0].gold){
            playerChar.hP = maxhP;
            gold = gold -inn[0].gold;
        }
        else if (ITEM == "Eat a Meal" && gold>= inn[1].gold){
            var potionCalc = playerChar.hP+25;
            if (potionCalc <= maxhP){
            playerChar.hP = playerChar.hP +25;}
            else{
                playerChar.hP = maxhP;
            }
            gold = gold -inn[1].gold;
        }

        statSheet();
    }



    //inn, max hp
    var inn = [
        { name: "Sleep for the Night", gold: 5},
        { name: "Eat a Meal", gold: 2},
        ];

    

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
    var journey = ["Explore", "Shop", "Inn", "Boss"];
    //ADD CODE FOR ABOVE
    $(document).on("click", ".char", charactorSelect);
    $(document).on("click", ".atk", atkEnemy);
    $(document).on("click", ".itm", buyItem);

    //$(".atk").click(atkEnemy);
    var dBtn = false;
    function disableATKbutton() {
        
        dBtn = true;
        console.log(dBtn)
        setTimeout(function () {dBtn = false; }, 1500);
        console.log(dBtn)
    }




    function atkEnemy() {
        if(dBtn === false&& enemySelected === true){
        chosenAction = $(this).text();
        
        if (playerChar.hP > 0 && enemySelected === true && chosenAction == "Attack") {
            ATTACK();
            roundEND();
        }
        else if (playerChar.hP > 0 && enemySelected === true && chosenAction == "Run") {
            disableATKbutton();

            counterATK();
            $("#result").append("You ESCAPED");
            $("#Computer").empty();
            $("#computerhP").empty();
            $("#computerImg").attr("src", "");
            $("#actions").empty();
            statSheet();

            enemySelected = false;
            bossBattle = false;


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
        


    }

    function counterATK() {
        if (baseArmor < computerChar.counterAttack) {
            playerChar.hP = playerChar.hP - computerChar.counterAttack;
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
            $("#result").append("You DIED. The world is doomed...");
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
                if (winCount === lvl) {
                    lvl++;
                    winCount = 0;
                    playerChar.hP = playerChar.hP +25;
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
        else if (dBtn === false&&enemySelected === false) {
            
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
        basehP = playerChar.hP;


        statSheet();


    }
    function selEnemy() {
        if (selecctedChar == "Explore") {

            fightActions();
            computerChar = monster[Math.floor(Math.random() * monster.length)];
            $("#computerImg").attr("src", computerChar.imgFile);
            enemyhP = computerChar.hP
            $("#computerhP").append("HP: " + enemyhP);
            $("#Computer").append(computerChar.name);

        }
        else if (selecctedChar == "Shop") {
            shopActions();
            $("#computerImg").attr("src", "assets/images/buildings/Shop.gif");
            $("#Computer").append("Shop");

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
            bossBattle = true;

            fightActions();
            computerChar = boss[Math.floor(Math.random() * boss.length)];
            $("#computerImg").attr("src", computerChar.imgFile);
            enemyhP = computerChar.hP
            $("#computerhP").append("HP: " + enemyhP);
            $("#Computer").append(computerChar.name);

        }
        else if (selecctedChar == "Inn"){
            shopActions();
            $("#computerImg").attr("src", "assets/images/buildings/Inn.gif");
            $("#Computer").append("Inn");
            for (i = 0; i < inn.length; i++) {
                shopItemsDiv = $('<div>').attr("class", "lftaln");

                var shopItems = $('<button>').text(inn[i].name);
                shopItems.attr("class", "btn btn-primary itm");
                shopItemsDiv.append(shopItems);
                shopItemsDiv.append(" " + inn[i].gold + " gold<br><br>");
                $("#damage").append(shopItemsDiv);

            }
        }
    }
}
