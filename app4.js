let primaryGuns = [
    []
];
let secondaryGuns = [];
let perks1 = [];
let perks2 = [];
let perks3 = [];
let wildcards = [];
let tacticals = [];
let lethals = [];
let rules = [];
let urzikstan = [];
let vondel = [];
let ashika = [];
let rebirth = [];
let area99 = [];
let generateButton = document.getElementById("generate");
let primaryButton = document.getElementById("regeneratePrimary");
let secondaryButton = document.getElementById("regenerateSecondary");
let map = document.getElementById("map");
let perk1 = document.getElementById("perk1Text");
let perk2 = document.getElementById("perk2Text");
let perk3 = document.getElementById("perk3Text");
let wildcard = document.getElementById("wildcard1Text");
let primary = document.getElementById("primaryText");
let secondary = document.getElementById("secondaryText");
let tactical = document.getElementById("tacticalText");
let lethal = document.getElementById("lethalText");
let dropLocation = document.getElementById("locationText");
let level = document.getElementById("level");
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
jQuery.get('4/primary.txt', function (data) {
    temp = data.replace(/[\n\r\t]/gm, "").split(",");
    primaryGuns.pop();
    for (x = 0; x < temp.length; x++) {
        primaryGuns.push(temp[x].split(":"));
    }
});

jQuery.get("4/secondary.txt", function (data) {
    temp = data.replace(/[\n\r\t]/gm, "").split(",");
    secondaryGuns.pop();
    for (x = 0; x < temp.length; x++) {
        secondaryGuns.push(temp[x].split(":"));
    }
});

jQuery.get("4/equipment.txt", function (data) {
    tacticals = data.replace(/[\n\r\t]/gm, "").split(";")[0].split(",")
    lethals = data.replace(/[\n\r\t]/gm, "").split(";")[1].split(",")
});

jQuery.get("4/perks.txt", function (data) {
    perks1 = data.replace(/[\n\r\t]/gm, "").split(";")[0].split(",");
    perks2 = data.replace(/[\n\r\t]/gm, "").split(";")[1].split(",");
    perks3 = data.replace(/[\n\r\t]/gm, "").split(";")[2].split(",");
});

jQuery.get("4/wildcards.txt", function (data) {
    wildcards = data.replace(/[\n\r\t]/gm, "").split(";");
});

jQuery.get("4/rules.txt", function (data) {
    rules = data.split("\n");
});

jQuery.get("4/Urzikstan.txt", function (data) {
    urzikstan = data.replace(/[\n\r\t]/gm, "").split(";");
});

jQuery.get("4/Vondel.txt", function (data) {
    vondel = data.replace(/[\n\r\t]/gm, "").split(";");
});

jQuery.get("4/Ashika.txt", function (data) {
    ashika = data.replace(/[\n\r\t]/gm, "").split(";");
});

jQuery.get("4/Rebirth.txt", function (data) {
    rebirth = data.replace(/[\n\r\t]/gm, "").split(";");
});

jQuery.get("4/Area99.txt", function (data) {
    area99 = data.replace(/[\n\r\t]/gm, "").split(";");
});

// if devMode is false de-increment generate value 
function checkNum() {
    if (!devMode) {
        if (locked) {
            return true
        } else if (nums == 0) {
            return false
        } else {
            nums -= 1;
            numText.textContent = "Chances: " + nums;
            if (nums == 0) {
                generateButton.style.color = "lightgrey"
                primaryButton.style.color = "lightgrey"
                secondaryButton.style.color = "lightgrey"
                document.querySelectorAll("#regenerateThrow").forEach(function (el) {
                    el.style.color = "lightgrey"
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
    perk1.textContent = perks1[randomInt(perks1.length)]
    perk2.textContent = perks2[randomInt(perks2.length)]
    perk3.textContent = perks3[randomInt(perks3.length)]
}

// Generate throwies and populate on page
function generateEquipment() {
    generateTactical()
    generateLethal()
}

// Generate Tactical
function generateTactical() {
    tactical.textContent = tacticals[randomInt(tacticals.length)]
    unlock()
}

// Generate throwies and populate on page
function generateLethal() {
    lethal.textContent = lethals[randomInt(lethals.length)]
    unlock()
}

// Generate wildcard and populate on page
function generateWildcard() {
    wildcard.textContent = wildcards[randomInt(wildcards.length)]
    // wildcard.textContent = "Overkill"
    unlock()
}

// Generates loadout and populates
function generateLoadout() {
    if (!checkNum()) {
        return
    }
    if (locked) {
        generatePerkPack();
        unlock();
        return
    }
    generatePerkPack()
    generateEquipment()
    generateWildcard()
    primary.textContent = generatePrimary();
    if (wildcard.textContent.includes("Overkill")) {
        secondary.textContent = generatePrimary();
        while (secondary.textContent == primary.textContent) {
            secondary.textContent = generatePrimary();
        }
    } else {
        secondary.textContent = generateSecondary();
    }
}

// Generate primary gun from array
function generatePrimary() {
    while (true) {
        temp = primaryGuns[randomInt(primaryGuns.length)];
        if (temp[1]<=level.value){
            break
        }
    }
    return temp[0];
}

// Generate secondary gun from array
function generateSecondary() {
    while (true) {
        temp = secondaryGuns[randomInt(secondaryGuns.length)];
        if (temp[1]<=level.value){
            break
        }
    }
    return temp[0];
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
function mapUrzikstan() {
    tmp = urzikstan[randomInt(urzikstan.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "4/Urzikstan.png"
}
// Generate drop location and populate
function mapVondel() {
    tmp = vondel[randomInt(vondel.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "4/Vondel.png"
}
// Generate drop location and populate
function mapAshika() {
    tmp = ashika[randomInt(ashika.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "4/Ashika.png"
}
// Generate drop location and populate
function mapRebirth() {
    tmp = rebirth[randomInt(rebirth.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "4/rebirth.png"
}
// Generate drop location and populate
function mapArea99() {
    tmp = area99[randomInt(area99.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "4/Area99.png"
}

function lock() {
    locked = true;
    lockedButton.style.background = "indianred"
    generateButton.style.background = "indianred"
    generateButton.textContent = "Regenerate Perks"
    primaryButton.style.background = "indianred"
    secondaryButton.style.background = "indianred"
    document.querySelectorAll("#regenerateThrow").forEach(function (el) {
        el.style.display = "inline"
    })
}

function unlock() {
    locked = false;
    lockedButton.style.background = ""
    generateButton.style.background = ""
    generateButton.textContent = "Generate Loadout"
    primaryButton.style.background = ""
    secondaryButton.style.background = ""
    document.querySelectorAll("#regenerateThrow").forEach(function (el) {
        el.style.display = "none"
    })
}

function showCoord(x, y) {
    coord.style.opacity = 1
    coord.style.marginLeft = "calc(var(--px)*38 + var(--px)*" + x * 100 + ")"
    coord.style.marginTop = "calc(var(--px)*38 + var(--px)*" + y * 100 + ")"
}