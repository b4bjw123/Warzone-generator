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
let generateButton = document.getElementById("generate");
let primaryButton = document.getElementById("regeneratePrimary");
let secondaryButton = document.getElementById("regenerateSecondary");
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
let devMode = false;
let locked = false;
let lockedButton = document.getElementById("locked");
let coord = document.getElementById("coord");

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


// if devMode is false de-increment generate value 
function checkNum() {
    if (!devMode) {
        if (locked){
            return true 
        } else if (nums == 0) {
            return false
        } else {
            nums -= 1;
            numText.textContent = "Chances: "+nums;
            if (nums == 0){
                generateButton.style.color = "lightgrey"
                primaryButton.style.color = "lightgrey"
                secondaryButton.style.color = "lightgrey"
                document.querySelectorAll("#regenerateThrow").forEach(function(el) {
                    el.style.color="lightgrey"
                })
            }
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
    generateTactical()
    generateLethal()
}

// Generate Tactical
function generateTactical() {
    tactical.textContent =  tacticals[randomInt(tacticals.length)]
    unlock()
}

// Generate throwies and populate on page
function generateLethal() {
    lethal.textContent = lethals[randomInt(lethals.length)]
    unlock()
}

// Generates loadout and populates
function generateLoadout() {
    if (!checkNum()) {
        return
    }
    if (locked){
        generatePerkPack();
        unlock();
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
    // generatePerkPack()
    primary.textContent = generatePrimary();
    unlock();
}

// Regenerate perk pack, then generate primary or secondary
function regenerateSecondary() {
    if (!checkNum()) {
        return
    }
    // generatePerkPack()
    secondary.textContent = generateSecondary();
    while (secondary.textContent == primary.textContent) {
        secondary.textContent = generateSecondary();
    }
    unlock();
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
    tmp = urzikstan[randomInt(urzikstan.length) + 1]
    showCoord(tmp[0].charCodeAt(0)-65,tmp[1])
    dropLocation.textContent = tmp
    map.src="3/Urzikstan.png"
}
// Generate drop location and populate
function mapVondel(){
    tmp = vondel[randomInt(vondel.length) + 1]
    showCoord(tmp[0].charCodeAt(0)-65,tmp[1])
    dropLocation.textContent = tmp
    map.src="3/Vondel.png"
}
// Generate drop location and populate
function mapAshika(){
    tmp = ashika[randomInt(ashika.length) + 1]
    showCoord(tmp[0].charCodeAt(0)-65,tmp[1])
    dropLocation.textContent = tmp
    map.src="3/Ashika.png"
}

function lock(){
    locked = true;
    lockedButton.style.background = "indianred"
    generateButton.style.background = "indianred"
    generateButton.textContent = "Regenerate Perks"
    primaryButton.style.background = "indianred"
    secondaryButton.style.background = "indianred"
    document.querySelectorAll("#regenerateThrow").forEach(function(el) {
        el.style.display="inline"
    })
}

function unlock(){
    locked = false;
    lockedButton.style.background = ""
    generateButton.style.background = ""
    generateButton.textContent = "Generate Loadout"
    primaryButton.style.background = ""
    secondaryButton.style.background = ""
    document.querySelectorAll("#regenerateThrow").forEach(function(el) {
        el.style.display="none"
    })
}

function showCoord(x,y) {
    coord.style.opacity = 1
    coord.style.marginLeft = "calc(var(--px)*38 + var(--px)*"+x*100+")"
    coord.style.marginTop = "calc(var(--px)*38 + var(--px)*"+y*100+")"
} 