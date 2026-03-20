let primaryGuns = [];
let perks1 = [];
let perks2 = [];
let perks3 = [];
let wildcards = [];
let tacticals = [];
let lethals = [];
let rules = [];
let rebirth = [];
let havens = [];
let generateButton = document.getElementById("generate");
let primaryButton = document.getElementById("regeneratePrimary");
let secondaryButton = document.getElementById("regenerateSecondary");
let map = document.getElementById("map");
let perk1 = document.getElementById("perk1Text");
let perk2 = document.getElementById("perk2Text");
let perk3 = document.getElementById("perk3Text");
let primary = document.getElementById("primaryText");
let secondary = document.getElementById("secondaryText");
let tactical = document.getElementById("tacticalText");
let lethal = document.getElementById("lethalText");
let dropLocation = document.getElementById("locationText");
let level = document.getElementById("level");
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
let timerButton = document.getElementById("timerButton");
let timerRunning = false;
var alarmAudio = new Audio('5/do-it.mp3');


// Read all files into vars
jQuery.get('5/primary.txt', function (data) {
    temp = data.replace(/[\n\r\t]/gm, "").split(",");
    primaryGuns.pop();
    for (x = 0; x < temp.length; x++) {
        primaryGuns.push(temp[x].split(":"));
    }
});

jQuery.get("5/equipment.txt", function (data) {
    temp = data.replace(/[\n\r\t]/gm, "").split(";")[0].split(",")
    tacticals.pop();
    for (x = 0; x < temp.length; x++) {
        tacticals.push(temp[x].split(":"));
    }
    temp = data.replace(/[\n\r\t]/gm, "").split(";")[1].split(",")
    lethals.pop();
    for (x = 0; x < temp.length; x++) {
        lethals.push(temp[x].split(":"));
    }
});

jQuery.get("5/perks.txt", function (data) {
    temp = data.replace(/[\n\r\t]/gm, "").split(";")[0].split(",");
    perks1.pop();
    for (x = 0; x < temp.length; x++) {
        perks1.push(temp[x].split(":"));
    }
    temp = data.replace(/[\n\r\t]/gm, "").split(";")[1].split(",");
    perks2.pop();
    for (x = 0; x < temp.length; x++) {
        perks2.push(temp[x].split(":"));
    }
    temp = data.replace(/[\n\r\t]/gm, "").split(";")[2].split(",");
    perks3.pop();
    for (x = 0; x < temp.length; x++) {
        perks3.push(temp[x].split(":"));
    }
});

jQuery.get("5/rules.txt", function (data) {
    rules = data.split("\n");
});

jQuery.get("5/verdansk.txt", function (data) {
    verdansk = data.replace(/[\n\r\t]/gm, "").split(";");
});

jQuery.get("5/Rebirth.txt", function (data) {
    rebirth = data.replace(/[\n\r\t]/gm, "").split(";");
});

jQuery.get("5/Havens.txt", function (data) {
    havens = data.replace(/[\n\r\t]/gm, "").split(";");
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
    while (true) {
        temp = perks1[randomInt(perks1.length)];
        if (parseInt(temp[1])<=parseInt(level.value)){
            break
        }
    }
    perk1.textContent = temp[0];
    while (true) {
        temp = perks2[randomInt(perks2.length)];
        if (parseInt(temp[1])<=parseInt(level.value)){
            break
        }
    }
    perk2.textContent = temp[0];
    while (true) {
        temp = perks3[randomInt(perks3.length)];
        if (parseInt(temp[1])<=parseInt(level.value)){
            break
        }
    }
    perk3.textContent = temp[0];
}

// Generate throwies and populate on page
function generateEquipment() {
    generateTactical()
    generateLethal()
}

// Generate Tactical
function generateTactical() {
    while (true) {
        temp = tacticals[randomInt(tacticals.length)];
        if (parseInt(temp[1])<=parseInt(level.value)){
            break
        }
    }
    tactical.textContent = temp[0];
    unlock()
}

// Generate throwies and populate on page
function generateLethal() {
    while (true) {
        temp = lethals[randomInt(lethals.length)];
        if (parseInt(temp[1])<=parseInt(level.value)){
            break
        }
    }
    lethal.textContent = temp[0];
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
    primary.textContent = generatePrimary();
    secondary.textContent = generatePrimary();
    while (secondary.textContent == primary.textContent) {
        secondary.textContent = generatePrimary();
    }
}

// Generate primary gun from array
function generatePrimary() {
    while (true) {
        temp = primaryGuns[randomInt(primaryGuns.length)];
        if (parseInt(temp[1])<=parseInt(level.value) && temp!=secondary.textContent){
            break
        }
    }
    return temp[0];
}

// Generate secondary gun from array
function generateSecondary() {
    while (true) {
        temp = primaryGuns[randomInt(primaryGuns.length)];
        if (parseInt(temp[1])<=parseInt(level.value) && temp!=primary.textContent){
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
function mapVerdansk() {
    tmp = verdansk[randomInt(verdansk.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "5/verdansk.png"
}
// Generate drop location and populate
function mapRebirth() {
    tmp = rebirth[randomInt(rebirth.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "5/Rebirth.png"
}
// Generate drop location and populate
function mapHavens() {
    tmp = havens[randomInt(havens.length) + 1]
    showCoord(tmp[0].charCodeAt(0) - 65, tmp[1])
    dropLocation.textContent = tmp
    map.src = "5/Havens.png"
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

function startTimer() {
    if (timerRunning){
        clearTimeout(timer);
        timerRunning = false;
        timerButton.innerHTML = "Start Timer"
    } else {
        timerRunning = true;
        timerButton.innerHTML = "Stop Timer"
        createTimer();
    }
}

function createTimer(){
    timer = setTimeout(function() {
        alarmAudio.play();
        alert("test");
        createTimer();
        },randomInt(80)*6000);
}