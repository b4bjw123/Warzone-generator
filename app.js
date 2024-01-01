let primaryGuns = [];
let secondaryGuns = [];
let perks1 = [];
let perks2 = [];
let perks3 = [];
let tacticals = [];
let lethals = [];
let rules = [];
let perk1 = document.getElementById("perk1Text");
let perk2 = document.getElementById("perk2Text");
let perk3 = document.getElementById("perk3Text");
let primary = document.getElementById("primaryText");
let secondary = document.getElementById("secondaryText");
let tactical = document.getElementById("tacticalText");
let lethal = document.getElementById("lethalText");
let dropLocationCaldera = document.getElementById("locationTextCaldera");
let dropLocationRebirth = document.getElementById("locationTextRebirth");
let rule = document.getElementById("ruleText");
let checkBoxGuns = document.getElementById("checkGuns");
let checkBoxNums = document.getElementById("checkNums");
let playerNumber = document.getElementById("numberText");
let nums = 4;
let numText = document.getElementById("num");
let calderaDiv = document.getElementById("Caldera");
let rebirthDiv = document.getElementById("Rebirth");

jQuery.get('1/primary.txt', function(data) {
    primaryGuns = data.split(",");
    // console.log(primaryGuns)
});

jQuery.get("1/secondary.txt", function(data) {
    secondaryGuns = data.split(",")
    // console.log(secondaryGuns);
});

jQuery.get("1/equipment.txt", function(data) {
    tacticals = data.split(";")[0].split(",")
    lethals = data.split(";")[1].split(",")
});

function selectionSwap() {
    if (checkBoxGuns.checked == true){
        jQuery.get('1/primaryV.txt', function(data) {
            primaryGuns = data.split(",");
        });
        
        jQuery.get("1/secondaryV.txt", function(data) {
            secondaryGuns = data.split(",")
        });
        
        jQuery.get("1/equipmentV.txt", function(data) {
            tacticals = data.split(";")[0].split(",")
            lethals = data.split(";")[1].split(",")
        });
    } else {
        jQuery.get('1/primary.txt', function(data) {
            primaryGuns = data.split(",");
        });
        
        jQuery.get("1/secondary.txt", function(data) {
            secondaryGuns = data.split(",")
        });
        
        jQuery.get("1/equipment.txt", function(data) {
            tacticals = data.split(";")[0].split(",")
            lethals = data.split(";")[1].split(",")
        });
    }
}

function numSwap(){
    if (checkBoxNums.checked == false){
        return true
    }
    else{
        return false
    }
}

function checkNum(){
    if (numSwap()) {
        if (nums == 0){
            return false
        }else {
            nums-=1;
            numText.textContent = nums;
            return true
        }
    }else{
        return true
    }
}

jQuery.get("1/perks.txt", function(data) {
    perks1 = data.split(";")[0].split(",")
    perks2 = data.split(";")[1].split(",")
    perks3 = data.split(";")[2].split(",")
});


jQuery.get("1/rules.txt", function(data) {
    rules = data.split("\n");
});

function randomInt(max){
    return Math.floor(Math.random()*max);
}

function generatePerk2(){
    if(randomInt(100)>=50){
        perk2.textContent = "Overkill"
    } else{
        perk2.textContent = perks2[randomInt(perks2.length)]
    }
}

function generatePerks() {
    perk1.textContent = perks1[randomInt(perks1.length)]
    generatePerk2()
    perk3.textContent = perks3[randomInt(perks3.length)]
}

function generateEquipment(){
    tactical.textContent = tacticals[randomInt(tacticals.length)]
    lethal.textContent = lethals[randomInt(lethals.length)]
}

function generateLoadout(){
    if(!checkNum()){
        return
    }
    generatePerks()
    generateEquipment()
    primary.textContent = generatePrimary();
    if(perk2.textContent=="Overkill"){
        secondary.textContent = generatePrimary();
        while(secondary.textContent==primary.textContent){
            secondary.textContent=generatePrimary();
        }
    } else {
        secondary.textContent = generateSecondary();
    }
}

function generatePrimary(){
    return primaryGuns[randomInt(primaryGuns.length)];
}

function generateSecondary(){
    return secondaryGuns[randomInt(secondaryGuns.length)];
}

function regeneratePrimary(){
    if(!checkNum()){
        return
    }
    primary.textContent = generatePrimary();
}

function regenerateSecondary(){
    if(!checkNum()){
        return
    }
    generatePerk2()
    if (perk2.textContent=="Overkill"){
        secondary.textContent = generatePrimary();
        while(secondary.textContent==primary.textContent){
            secondary.textContent=generatePrimary();
        }        
    } else{
        secondary.textContent = generateSecondary();
    }
}

function generateDropCaldera(){
    dropLocationCaldera.textContent = randomInt(69)+1
}
function generateDropRebirth(){
    dropLocationRebirth.textContent = randomInt(34)+1
}
function mapSwap(){
    if (swapMap.checked == true){
        calderaDiv.style.display = "none";
        rebirthDiv.style.display = "block";
    }
    if (swapMap.checked == false){
        calderaDiv.style.display = "block";
        rebirthDiv.style.display = "none";
    }
}

function generateRule(){
    rule.textContent=rules[randomInt(rules.length)];
}

function generateNumber(){
    playerNumber.textContent = randomInt((document.getElementById("playerSelect").value))+1
}

function page2(){
    window.location = "2.html"
}

function page3(){
    window.location = "3.html"
}
page3()