let resource = 0
let strength = 1
let petDamage = 0

let weapon = {
  name: "weapon",
  strength: 1,
  cost: 25,
}
let magic = {
  name: "magic",
  strength: 5,
  cost: 200,
}

let pet = {
  name: "pet",
  strength: 3,
  cost: 250,
}

let mercenary = {
  name: "merc",
  strength: 10,
  cost: 1000,
}

function earnResource(){
  resource += strength
  console.log("resource", resource);
  drawResource()
}

function increaseStrength(upgrade){
  if(resource >= upgrade.cost){
    resource -= upgrade.cost
    strength += upgrade.strength
    upgrade.cost = upgrade.cost*2
    drawResource()
    drawCost(upgrade)
    drawDps()
  } else {
    window.alert("you don't have enough resources!")
  }
}

function hirePet(name){
  if(resource >= name.cost){
    resource -= name.cost
    petDamage += name.strength
    upgrade.cost = upgrade.cost*2
    drawResource()
    drawCost(name)
    drawDps()
  } else {
    window.alert("you cannot purchase loyalty with good looks alone!")
  }
}

function drawResource(){
  let walletElm = document.getElementById("resource-counter")
  walletElm.innerText = resource
}

function drawDps(){
  let dpsElm = document.getElementById("dps")
  dpsElm.innerText = strength
}

function drawCost(upgrade){
  debugger
  let costElm = document.getElementById(upgrade.name)
  costElm.innerText = upgrade.cost
}

function petAttack(){
  resource += petDamage
  drawResource()
}

setInterval(petAttack, 3000)

drawDps()
drawResource()