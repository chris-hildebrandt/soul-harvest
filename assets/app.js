// TODO 
// function for hero health
// function for boss health (hidden)
// interval for boss Attack
// potion function
// unlock hidden autoheal for merc at lvl 10
// unlock ability to kill death if str and wpn 10+
// death health is crazy high

let resource = 3000000
let strength = 1
let petDamage = 0
let heroHealth = 100
let bossHealth = 7500000
let petAttackInterval = 3000
let bossAttackInterval = 5000

let weaponUrls = [
]

let petArmy = {
  mercenary: 0,
  wolf: 0,
}

let power = {
  name: "power",
  strength: 1,
  cost: 25,
  level: 1,
}
let weapon = {
  name: "weapon",
  strength: 5,
  cost: 100,
  level: 0,
}

let pet = {
  name: "pet",
  strength: 3,
  cost: 1,
  level: 0,
}

let merc = {
  name: "merc",
  strength: 10,
  cost: 1000,
  level: 0,
}

function mine() {
  resource += strength
  drawResource()
}

function petAttack() {
  resource += petDamage
  drawResource()
}

function bossAttack() {
  if (heroHealth > 0) {
    heroHealth -= 1
    drawHeroHealth()
  } else if (heroHealth == 0) {
    drawHeroHealth()
    window.alert("You have died! You didn't think that DEATH would just sit there and let you steal his souls did you? Better luck next time kid!")
    document.reload
  } else {
    console.log(heroHealth)
  }
}

function upgradeWeapon() {
  if (weapon.level < 9) {
    if (resource >= weapon.cost) {
      resource -= weapon.cost
      strength += weapon.strength
      weapon.level++
      weapon.strength *= 2
      weapon.cost *= 3
      drawResource()
      drawCost(weapon)
      drawDps()
      drawLvl('weapon-lvl', weapon.level)
    } else {
      window.alert("you don't have enough resources!")
    }
  } else {
    resource -= weapon.cost
    strength += weapon.strength
    weapon.level++
    weapon.strength *= 2
    weapon.cost *= 3
    drawResource()
    drawCost(weapon)
    drawDps()
    drawLvl('weapon-lvl', weapon.level)
    let upgradeElm = document.getElementById("weapon-btn")
    upgradeElm.classList.add("d-none")
    let newButtonElm = document.getElementById("new-weapon-btn")
    newButtonElm.classList.remove("d-none")
  }
}

function upgradeStrength(upgrade) {
  if (upgrade.level < 9) {
    if (resource >= upgrade.cost) {
      resource -= upgrade.cost
      strength += upgrade.strength
      upgrade.level++
      upgrade.cost = upgrade.cost * 2
      drawResource()
      drawCost(upgrade)
      drawDps()
      drawLvl(upgrade.name + '-lvl', upgrade.level)
    } else {
      window.alert("you don't have enough resources!")
    }
  } else {
    resource -= upgrade.cost
    strength += upgrade.strength
    upgrade.level++
    upgrade.cost = upgrade.cost * 2
    drawResource()
    drawCost(upgrade)
    drawDps()
    drawLvl(upgrade.name + '-lvl', upgrade.level)
    let upgradeElm = document.getElementById(upgrade.name + "-btn")
    upgradeElm.classList.add("d-none")
    let newButtonElm = document.getElementById("new-" + upgrade.name + "-btn")
    newButtonElm.classList.remove("d-none")
  }
}

function hirePet(upgrade) {
  if (upgrade.level < 9) {
    if (resource >= upgrade.cost) {
      resource -= upgrade.cost
      petDamage += upgrade.strength
      upgrade.level++
      upgrade.cost = upgrade.cost * 2
      drawPet(upgrade.name)
      drawResource()
      drawCost(upgrade)
      drawDps()
      drawLvl(upgrade.name + '-lvl', upgrade.level)
    } else {
      window.alert("you cannot purchase loyalty with good looks alone!")
    }
  } else {
    resource -= upgrade.cost
    petDamage += upgrade.strength
    upgrade.level++
    upgrade.cost = upgrade.cost * 2
    drawResource()
    drawCost(upgrade)
    drawDps()
    drawLvl(upgrade.name + '-lvl', upgrade.level)
    evolve(upgrade.name)
    let upgradeElm = document.getElementById(upgrade.name + "-btn")
    upgradeElm.classList.add("d-none")
    let newButtonElm = document.getElementById("new-" + upgrade.name + "-btn")
    newButtonElm.classList.remove("d-none")
  }
}

function evolve(petName){
  if(petName == "pet"){
    let petImgElm = document.getElementById("")
  }
}

function maxMessage() {
  window.alert("this cannot be leveled up any further! ...psst try maxing other things!")
}

function drawResource() {
  let walletElm = document.getElementById("resource-counter")
  walletElm.innerText = resource
}

function drawDps() {
  let dpsElm = document.getElementById("dps")
  dpsElm.innerText = strength
}

function drawCost(upgrade) {
  let costElm = document.getElementById(upgrade.name)
  costElm.innerText = upgrade.cost
}


function drawWeapon() {
  let weaponElm = document.getElementById("weapon-img")
  weaponElm.innerHTML
}

function drawLvl(elmId, lvl) {
  let lvlElm = document.getElementById(elmId)
  lvlElm.innerText = lvl
}

function drawHeroHealth() {
  let heroHealthElm = document.getElementById("hero-health")
  heroHealthElm.style.width = `${heroHealth}%`
}

function drawPet(petName){
  let petImgElm = document.getElementById(petName+"-img")
}

// setInterval(bossAttack, bossAttackInterval)

setInterval(petAttack, petAttackInterval)

setInterval

drawDps()

drawResource()