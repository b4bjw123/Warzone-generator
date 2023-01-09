let primaryGuns = [];
let secondaryGuns = [];
let perks = [];
let tacticals = [];
let lethals = [];
let rules = [];
let map = [];
let perk = document.getElementById("perksText");
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

jQuery.get('2/primary.txt', function (data) {
    primaryGuns = data.split(",");
});

jQuery.get("2/secondary.txt", function (data) {
    secondaryGuns = data.split(",")
});

jQuery.get("2/equipment.txt", function (data) {
    tacticals = data.split(";")[0].split(",")
    lethals = data.split(";")[1].split(",")

});

function numSwap() {
    if (checkBoxNums.checked == false) {
        return true
    } else {
        return false
    }
}

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

jQuery.get("2/perks.txt", function (data) {
    perks = data.split(";")[0].split(",");
});

jQuery.get("2/rules.txt", function (data) {
    rules = data.split("\n");
});

jQuery.get("2/map.txt", function (data) {
    map = data.split(";");
});

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function generatePerkPack() {
    if (randomInt(100) >= (100 - overKillPercent)) {
        return "Weapon Specialist"
    } else {
        return perks[randomInt(perks.length)]
    }
}

function generateEquipment() {
    tactical.textContent = tacticals[randomInt(tacticals.length)]
    lethal.textContent = lethals[randomInt(lethals.length)]
}

function generateLoadout() {
    if (!checkNum()) {
        return
    }
    perk.textContent = generatePerkPack()
    generateEquipment()
    primary.textContent = generatePrimary();
    if (perk.textContent == "Weapon Specialist") {
        secondary.textContent = generatePrimary();
        while (secondary.textContent == primary.textContent) {
            secondary.textContent = generatePrimary();
        }
    } else {
        secondary.textContent = generateSecondary();
    }
}

function generatePrimary() {
    return primaryGuns[randomInt(primaryGuns.length)];
}

function generateSecondary() {
    return secondaryGuns[randomInt(secondaryGuns.length)];
}

function regeneratePrimary() {
    if (!checkNum()) {
        return
    }
    primary.textContent = generatePrimary();
    generateEquipment()
}

function regenerateSecondary() {
    if (!checkNum()) {
        return
    }
    perk.textContent = generatePerkPack()
    if (perk.textContent == "Weapon Specialist") {
        secondary.textContent = generatePrimary();
        while (secondary.textContent == primary.textContent) {
            secondary.textContent = generatePrimary();
        }
    } else {
        secondary.textContent = generateSecondary();
    }
    generateEquipment()
}

function generateDrop() {
    dropLocation.textContent = map[randomInt(53) + 1]
}

function generateRule() {
    rule.textContent = rules[randomInt(rules.length)];
}

function page1() {
    window.location = "index.html"
}