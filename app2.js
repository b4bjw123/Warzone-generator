let primaryGuns = [];
let secondaryGuns = [];
let perks1 = [];
let perks2 = [];
let perks3 = [];
let perks4 = [];
let tacticals = [];
let lethals = [];
let rules = [];
let map = [];
let perk1 = document.getElementById("perk1Text");
let perk2 = document.getElementById("perk2Text");
let perk3 = document.getElementById("perk3Text");
let perk4 = document.getElementById("perk4Text");
let primary = document.getElementById("primaryText");
let secondary = document.getElementById("secondaryText");
let tactical = document.getElementById("tacticalText");
let lethal = document.getElementById("lethalText");
let dropLocation = document.getElementById("locationText");
// let dropLocationRebirth = document.getElementById("locationTextRebirth");
let rule = document.getElementById("ruleText");
let checkBoxGuns = document.getElementById("checkGuns");
let checkBoxNums = document.getElementById("checkNums");
let playerNumber = document.getElementById("numberText");
let nums = 4;
let numText = document.getElementById("num");
// let calderaDiv = document.getElementById("Caldera");
// let rebirthDiv = document.getElementById("Rebirth");

jQuery.get('2/primary.txt', function(data) {
    primaryGuns = data.split(",");
});

jQuery.get("2/secondary.txt", function(data) {
    secondaryGuns = data.split(",")
});

jQuery.get("2/equipment.txt", function(data) {
    tacticals = data.split(";")[0].split(",")
    lethals = data.split(";")[1].split(",")

});

// function selectionSwap() {
//     if (checkBoxGuns.checked == true){
//         // console.log("Vanguard");
//         jQuery.get('2/primaryV.txt', function(data) {
//             primaryGuns = data.split(",");
//             // console.log(primaryGuns)
//         });
        
//         jQuery.get("2/secondaryV.txt", function(data) {
//             secondaryGuns = data.split(",")
//             // console.log(secondaryGuns);
//         });
        
//         jQuery.get("2/equipmentV.txt", function(data) {
//             tacticals = data.split(";")[0].split(",")
//             lethals = data.split(";")[1].split(",")
//             // console.log(tacticals);
//             // console.log(lethals);
//         });
//     } else {
//         // console.log("All guns");
//         jQuery.get('2/primary.txt', function(data) {
//             primaryGuns = data.split(",");
//             // console.log(primaryGuns)
//         });
        
//         jQuery.get("2/secondary.txt", function(data) {
//             secondaryGuns = data.split(",")
//             // console.log(secondaryGuns);
//         });
        
//         jQuery.get("2/equipment.txt", function(data) {
//             tacticals = data.split(";")[0].split(",")
//             lethals = data.split(";")[1].split(",")
//             // console.log(tacticals);
//             // console.log(lethals);
//         });
//     }
// }

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

jQuery.get("2/perks.txt", function(data) {
    perks1 = data.split(";")[0].split(",")
    perks2 = data.split(";")[0].split(",")
    perks3 = data.split(";")[1].split(",")
    perks4 = data.split(";")[2].split(",")
});


jQuery.get("2/rules.txt", function(data) {
    rules = data.split("\n");
});

jQuery.get("2/map.txt", function(data) {
    map = data.split(";");
});

function randomInt(max){
    return Math.floor(Math.random()*max);
}

function generateBasePerk(){
    if(randomInt(100)>=25){
        return "Overkill"
    } else{
        return perks2[randomInt(perks2.length)]
    }
}

function generateBasePerks(){
    perk1.textContent = generateBasePerk()
    perk2.textContent = generateBasePerk()
    while (perk1.textContent==perk2.textContent) {
        perk2.textContent = generateBasePerk();
    }
}
function generatePerks() {
    generateBasePerks()
    perk3.textContent = perks3[randomInt(perks3.length)]
    perk4.textContent = perks4[randomInt(perks4.length)]
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
    if(perk1.textContent=="Overkill" || perk2.textContent=="Overkill"){
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
    generateBasePerks()
    if (perk1.textContent=="Overkill" || perk2.textContent=="Overkill"){
        secondary.textContent = generatePrimary();
        while(secondary.textContent==primary.textContent){
            secondary.textContent=generatePrimary();
        }        
    } else{
        secondary.textContent = generateSecondary();
    }
}

function generateDrop(){
    // console.log(map);
    dropLocation.textContent = map[randomInt(53)+1]
}
// function generateDropRebirth(){
//     dropLocationRebirth.textContent = randomInt(34)+1
// }
// function mapSwap(){
//     if (swapMap.checked == true){
//         calderaDiv.style.display = "none";
//         rebirthDiv.style.display = "block";
//     }
//     if (swapMap.checked == false){
//         calderaDiv.style.display = "block";
//         rebirthDiv.style.display = "none";
//     }
// }

function generateRule(){
    rule.textContent=rules[randomInt(rules.length)];
}

function generateNumber(){
    playerNumber.textContent = randomInt((document.getElementById("playerSelect").value))+1
}

function page1(){
    window.location = "index.html"
}