// TODO 
// function for hero health
// function for boss health (hidden)
// interval for boss Attack
// potion function
// unlock hidden autoheal for merc at lvl 10
// unlock ability to kill death if str and wpn 10+
// max max message over 5000

let resource = 3000000
let strength = 1
let petDamage = 0
let mercDamage = 0
let heroHealth = 100
let bossHealth = 7500000
let petAttackInterval = 3000
let bossAttackInterval = 5000

let weaponUrls = [ "assets/02.png", "assets/03.png", "assets/04.png", "assets/05.png", "assets/06.png", "assets/07.png", "assets/08.png", "assets/09.png", "assets/10.png", "assets/11.png",]

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
  cost: 250,
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
      drawWeapon()
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
    drawWeapon()
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
      upgradeDamage += upgrade.strength
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

function evolve(petName) {
  let petImgElm = document.getElementById(petName + "-img")
  if (petName == "pet") {
    petImgElm.src = "https://cdna.artstation.com/p/assets/images/images/013/925/104/original/bilal-zubeidat-werewolf-attack.gif?1541686984"
    petImgElm.classList.remove("pet-img")
    petImgElm.classList.add("pet-evolved")
  } else {

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
  let petDmgElm = document.getElementById("pet-dmg")
  petDmgElm.innerText = petDamage
  let mercDamageElm = document.getElementById("merc-dmg")
  mercDamageElm.innerText = mercDamage
}

function drawCost(upgrade) {
  let costElm = document.getElementById(upgrade.name)
  costElm.innerText = upgrade.cost
}

function drawWeapon() {
  let weaponElm = document.getElementById("weapon-img")
  weaponElm.src = weaponUrls[weapon.lvl]
}

function drawLvl(elmId, lvl) {
  let lvlElm = document.getElementById(elmId)
  lvlElm.innerText = lvl
}

function drawHeroHealth() {
  let heroHealthElm = document.getElementById("hero-health")
  heroHealthElm.style.width = `${heroHealth}%`
}

function drawPet(petName) {
  let petImgElm = document.getElementById(petName + "-img")
  if (petName == "pet") {
    petImgElm.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d2c9935a-b5fd-49e2-befa-a3c1bea3ccba/dd31e94-858c9432-39a1-4482-bc99-9ec6671d082d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QyYzk5MzVhLWI1ZmQtNDllMi1iZWZhLWEzYzFiZWEzY2NiYVwvZGQzMWU5NC04NThjOTQzMi0zOWExLTQ0ODItYmM5OS05ZWM2NjcxZDA4MmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Sl5If3zbx2BfwADfCPFbYl6tPSkXI26uErQMKiTApu4"
  } else {
    petImgElm.src = ""
  }
}

setInterval(bossAttack, bossAttackInterval)

setInterval(petAttack, petAttackInterval)

drawDps()

drawResource()