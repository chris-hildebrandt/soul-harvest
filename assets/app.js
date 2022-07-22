let resource = 0
let strength = 1

let weapon = {
  strength: 1,
  cost: 25,
}
let magic = {
  strength: 5,
  cost: 200,
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
  } else {
    window.alert("you don't have enough resources!")
  }
}

function drawResource(){
  let walletElm = document.getElementById("resource-counter")
  walletElm.innerText = resource
}

drawResource()