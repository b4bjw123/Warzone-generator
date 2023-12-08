let primaryGuns = [];
let secondaryGuns = [];
let perks1_2 = [];
let perks3 = [];
let perks4 = [];
let tacticals = [];
let lethals = [];
let rules = [];
let urzikstan = [];
let vondel = [];
let ashika = [];
let map = document.getElementById("map");
let perk1 = document.getElementById("perk1Text");
let perk2 = document.getElementById("perk2Text");
let perk3 = document.getElementById("perk3Text");
let perk4 = document.getElementById("perk4Text");
let primary = document.getElementById("primaryText");
let secondary = document.getElementById("secondaryText");
let tactical = document.getElementById("tacticalText");
let lethal = document.getElementById("lethalText");
let dropLocation = document.getElementById("locationText");
let overKillPercent = 50;
let rule = document.getElementById("ruleText");
let checkBoxGuns = document.getElementById("checkGuns");
let checkBoxNums = document.getElementById("checkNums");
let playerNumber = document.getElementById("numberText");
let nums = 4;
let numText = document.getElementById("num");

// Read all files into vars
jQuery.get('3/primary.txt', function (data) {
    primaryGuns = data.split(",");
});

jQuery.get("3/secondary.txt", function (data) {
    secondaryGuns = data.split(",")
});

jQuery.get("3/equipment.txt", function (data) {
    tacticals = data.split(";")[0].split(",")
    lethals = data.split(";")[1].split(",")
});

jQuery.get("3/perks.txt", function (data) {
    perks1_2 = data.split(";")[0].split(",");
    perks3 = data.split(";")[1].split(",");
    perks4 = data.split(";")[2].split(",");
});

jQuery.get("3/rules.txt", function (data) {
    rules = data.split("\n");
});

jQuery.get("3/Urzikstan.txt", function (data) {
    urzikstan = data.split(";");
});
jQuery.get("3/vondel.txt", function (data) {
    vondel = data.split(";");
});
jQuery.get("3/ashika.txt", function (data) {
    ashika = data.split(";");
});


// returns a boolean if the limited/unlimited switch is toggled
function numSwap() {
    if (checkBoxNums.checked == false) {
        return true
    } else {
        return false
    }
}

// if numSwap() is true de-increment generate value 
function checkNum() {
    if (numSwap()) {
        if (nums == 0) {
            return false
        } else {
            nums -= 1;
            numText.textContent = nums;
            return true
        }
    } else {
        return true
    }
}

// returns random int from 0 to @param max
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

// 50% chance of weapon specialist OR random pick of other perk packs
function generatePerkPack() {
    perk1.textContent = perks1_2[randomInt(perks1_2.length)]
    perk2.textContent = perks1_2[randomInt(perks1_2.length)]
    perk3.textContent = perks3[randomInt(perks3.length)]
    perk4.textContent = perks4[randomInt(perks4.length)]
}

// Generate throwies and populate on page
function generateEquipment() {
    tactical.textContent = tacticals[randomInt(tacticals.length)]
    lethal.textContent = lethals[randomInt(lethals.length)]
}

// Generates loadout and populates
function generateLoadout() {
    if (!checkNum()) {
        return
    }
    generatePerkPack()
    generateEquipment()
    primary.textContent = generatePrimary();
    secondary.textContent = generateSecondary();
    while (secondary.textContent == primary.textContent) {
        secondary.textContent = generateSecondary();
    }
}

// Generate primary gun from array
function generatePrimary() {
    return primaryGuns[randomInt(primaryGuns.length)];
}

// Generate secondary gun from array
function generateSecondary() {
    return secondaryGuns[randomInt(secondaryGuns.length)];
}

// Regenerate after checking 
function regeneratePrimary() {
    if (!checkNum()) {
        return
    }
    generatePerkPack()
    primary.textContent = generatePrimary();
}

// Regenerate perk pack, then generate primary or secondary
function regenerateSecondary() {
    if (!checkNum()) {
        return
    }
    generatePerkPack()
    secondary.textContent = generateSecondary();
    while (secondary.textContent == primary.textContent) {
        secondary.textContent = generateSecondary();
    }
}

// Generate rule and populate
function generateRule() {
    rule.textContent = rules[randomInt(rules.length)];
}

function page1() {
    window.location = "index.html"
}

function page2() {
    window.location = "2.html"
}

// Generate drop location and populate
function mapUrzikstan(){
    dropLocation.textContent = urzikstan[randomInt(urzikstan.length) + 1]
    map.src="3/urzikstan.png"
}
// Generate drop location and populate
function mapVondel(){
    dropLocation.textContent = vondel[randomInt(vondel.length) + 1]
    map.src="3/Vondel.png"
}
// Generate drop location and populate
function mapAshika(){
    dropLocation.textContent = ashika[randomInt(ashika.length) + 1]
    map.src="3/Ashika.png"
}