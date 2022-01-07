let primaryGuns = [];
let secondaryGuns = [];
let perks1 = [];
let perks2 = [];
let perks3 = [];
let tacticals = [];
let lethals = [];
let perk1 = document.getElementById("perk1Text");
let perk2 = document.getElementById("perk2Text");
let perk3 = document.getElementById("perk3Text");
let primary = document.getElementById("primaryText");
let secondary = document.getElementById("secondaryText");
let tactical = document.getElementById("tacticalText");
let lethal = document.getElementById("lethalText");
let dropLocation = document.getElementById("locationText");

jQuery.get('primary.txt', function(data) {
    primaryGuns = data.split(",");
    // console.log(primaryGuns)
});

jQuery.get("secondary.txt", function(data) {
    secondaryGuns = data.split(",")
    // console.log(secondaryGuns);
});

jQuery.get("perks.txt", function(data) {
    perks1 = data.split(";")[0].split(",")
    perks2 = data.split(";")[1].split(",")
    perks3 = data.split(";")[2].split(",")
    // console.log(perks1);
    // console.log(perks2);
    // console.log(perks3);
});

jQuery.get("equipment.txt", function(data) {
    tacticals = data.split(";")[0].split(",")
    lethals = data.split(";")[1].split(",")
    // console.log(tacticals);
    // console.log(lethals);
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
    generatePerks()
    generateEquipment()
    primary.textContent = generatePrimary();
    if(perk2.textContent=="Overkill"){
        secondary.textContent = generatePrimary();
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
    primary.textContent = generatePrimary();
}

function regenerateSecondary(){
    generatePerk2()
    if (perk2.textContent=="Overkill"){
        secondary.textContent = generatePrimary();
    } else{
        secondary.textContent = generateSecondary();
    }
}

function generateDrop(){
    dropLocation.textContent = randomInt(69)+1
}