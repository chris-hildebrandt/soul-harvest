// TODO 
// potion function
// add trophy for unlocking pet and merc maxlvl
// unlock ability to kill death if str and wpn 10+

let resource = 0
let strength = 1
let heroHealth = 100
let bossHealth = 75000
let bossHealthPercent = 100
let petAttackInterval = 3000
let bossAttackInterval = 2000
let clicksPerSecond = 0
let DPS = 0

let deathButton = document.querySelector(".death")
deathButton.addEventListener("click", function () {
  clicksPerSecond += 1;
})

function DPSReset() {
  clicksPerSecond = 0
}

let weaponUrls = ["assets/02.png", "assets/03.png", "assets/04.png", "assets/05.png", "assets/06.png", "assets/07.png", "assets/08.png", "assets/09.png", "assets/10.png", "assets/11.png",]

let potion = {
  cost: 250,
  level: 1,
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
  strength: 50,
  cost: 500,
  level: 0,
  damage: 0,
}

let merc = {
  name: "merc",
  strength: 200,
  cost: 1000,
  level: 0,
  damage: 0,
}

function mine() {
  DPS = clicksPerSecond * strength + (pet.damage + merc.damage) / (petAttackInterval / 1000)
  if (power.level == 10 && weapon.level == 10 && pet.level == 10 && merc.level == 10) {
    bossHealth -= strength + merc.damage + pet.damage
    heroHealth += 0.05
    drawBossHealth()
  } else if (merc.level == 10) {
    resource += strength
    heroHealth += 0.05
    drawResource()
  } else {
    resource += strength
    drawResource()
  }
}

function petAttack() {
  resource += merc.damage + pet.damage
  drawResource()
}

function bossAttack() {
  heroHealth--
  drawHeroHealth()
  if (heroHealth <= 0) {
    drawHeroHealth()
    clearInterval(bossInterval)
    window.alert("You have died! You didn't think that DEATH would just sit there and let you steal his souls did you? Better luck next time kid!")
    location.reload()
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
  } else if (resource >= weapon.cost) {
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
  } else {
    window.alert("you don't have enough resources!")
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
  } else if (resource >= upgrade.cost) {
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
  } else {
    window.alert("you don't have enough resources!")
  }
}

function hirePet(upgrade) {
  if (upgrade.level < 9) {
    if (resource >= upgrade.cost) {
      resource -= upgrade.cost
      upgrade.damage += upgrade.strength
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
  } else if (resource >= upgrade.cost) {
    resource -= upgrade.cost
    upgrade.damage += upgrade.strength
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
  } else {
    window.alert("you cannot purchase loyalty with good looks alone!")
  }
}

function evolve(petName) {
  let petImgElm = document.getElementById(petName + "-img")
  if (petName == "pet") {
    petImgElm.src = "https://cdna.artstation.com/p/assets/images/images/013/925/104/original/bilal-zubeidat-werewolf-attack.gif?1541686984"
    petImgElm.classList.remove("pet-img")
    petImgElm.classList.add("pet-evolved")
    petAttackInterval = 1500
  } else {
    let mercImgElm = document.getElementById("merc-img")
    mercImgElm.classList.add("d-none")
    let evolvedMercElm = document.getElementById("merc-img2")
    evolvedMercElm.classList.remove("d-none")
    bossAttackInterval = 4000
  }
}

function maxMessage() {
  if (strength < 5000) {
    window.alert("this cannot be leveled up any further! ...psst try maxing other things!")
  }
  else {
    window.alert("Your power level is already over 5000!!!")
  }
}

function drawResource() {
  let walletElm = document.getElementById("resource-counter")
  walletElm.innerText = resource
  let totalDPSElm = document.getElementById("total-dps")
  totalDPSElm.innerText = DPS.toFixed(0)
}

function drawDps() {
  let dpsElm = document.getElementById("dps")
  dpsElm.innerText = strength
  let petDmgElm = document.getElementById("pet-dmg")
  petDmgElm.innerText = pet.damage
  let mercDamageElm = document.getElementById("merc-dmg")
  mercDamageElm.innerText = merc.damage
}

function drawCost(upgrade) {
  let costElm = document.getElementById(upgrade.name)
  costElm.innerText = upgrade.cost
}

function drawWeapon() {
  let i = weapon.level - 1
  let weaponElm = document.getElementById("weapon-img")
  weaponElm.src = weaponUrls[i]
}

function drawLvl(elmId, lvl) {
  let lvlElm = document.getElementById(elmId)
  lvlElm.innerText = lvl
}

function drawHeroHealth() {
  let heroHealthElm = document.getElementById("hero-health")
  heroHealthElm.style.width = `${heroHealth}%`
}

function drawBossHealth() {
  bossHealthPercent = (bossHealth / 7500000) * 100
  let bossHealthElm = document.getElementById("boss-health")
  bossHealthElm.innerHTML = `<div class="progress"><div class="progress-bar bg-primary" role="progressbar" style="width: ${bossHealthPercent}%;" aria-valuenow="25"
  aria-valuemin="0" aria-valuemax="7500000">${bossHealth}</div></div>`
  let bossMusicElm = document.getElementById("boss-music")
  bossMusicElm.play()
  if (bossHealth <= 0) {
    let bossMusicElm = document.getElementById("boss-music")
    bossMusicElm.pause()
    let victoryFanfareElm = document.getElementById("victory-music")
    victoryFanfareElm.play()
    window.confirm("AMAZING!! You have defeated DEATH itself! The halls of time will ring with your praises and your name will live on forever in glory!!! Actually, everything will live on forever... think of the consequences... whelp, good luck with overpopulation!")
    location.reload()
  }
}

function drawPet(petName) {
  let petImgElm = document.getElementById(petName + "-img")
  if (petName == "pet") {
    petImgElm.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d2c9935a-b5fd-49e2-befa-a3c1bea3ccba/dd31e94-858c9432-39a1-4482-bc99-9ec6671d082d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QyYzk5MzVhLWI1ZmQtNDllMi1iZWZhLWEzYzFiZWEzY2NiYVwvZGQzMWU5NC04NThjOTQzMi0zOWExLTQ0ODItYmM5OS05ZWM2NjcxZDA4MmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Sl5If3zbx2BfwADfCPFbYl6tPSkXI26uErQMKiTApu4"
  } else {
    let mercImgElm = document.getElementById("merc-img")
    mercImgElm.classList.remove("d-none")
  }
}

function buyPotion() {
  if (potion.cost <= resource) {
    resource -= potion.cost
    heroHealth += 50
    potion.level++
    potion.cost = potion.cost * potion.level
    let potionElm = document.getElementById("potion-cost")
    potionElm.innerText = potion.cost
  }
}

function pauseMusic(){
  let bossMusicElm = document.getElementById("boss-music")
  bossMusicElm.pause()
  let victoryFanfareElm = document.getElementById("victory-music")
  victoryFanfareElm.pause()
}

let bossInterval = setInterval(bossAttack, bossAttackInterval)

pauseMusic()

setInterval(petAttack, petAttackInterval)

setInterval(DPSReset, 1000)

drawDps()

drawResource()
