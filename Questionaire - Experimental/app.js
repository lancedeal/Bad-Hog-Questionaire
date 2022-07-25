

// The Divs
const clearDiv = document.querySelector('.questionaire-clearing')
const acreDiv = document.querySelector('.questionaire-acres')
const dispoDiv = document.querySelector('.questionaire-disposal')

// Acre Input
const acreInput = document.getElementById('acre-input')

// Other Variables
var allowHaul = true
var clearDensity = ""
var acreNumber
var disposalMethod = ""
var skidSteerNeeded
var sub1Acre = false
var total = 0
const totalCalculation = document.querySelector('.questionaire-total-calculation')
const afterQuestionaire = document.querySelector('.after-questionaire')
const estimatorDisplay = document.createElement('div')
estimatorDisplay.classList.add('estimator-display')
afterQuestionaire.appendChild(estimatorDisplay)

// Clearing Options
const lightC = document.getElementById('lightC')
const moderateC = document.getElementById('moderateC')
const heavyC = document.getElementById('heavyC')


// Acre Options
const acreSub = document.getElementById('acre-less-than-1')
acreSub.addEventListener('click', () => { 
    acreSub.classList.toggle('questionaire-choice-selected') 
    if(sub1Acre){
        sub1Acre = false
    } else {
        sub1Acre = true
    }
})

// Disposal Options
const burnD = document.getElementById('burnD')
const mulchD = document.getElementById('mulchD')
const haulD = document.getElementById('haulD')


// Buttons
const startQuestionaire = document.getElementById('start-questionaire')
const clearNext = document.getElementById('clear-btn-next')
const acreBack = document.getElementById('acre-btn-back')
const acreNext = document.getElementById('acre-btn-next')
const dispoBack = document.getElementById('dispo-btn-back')
const dispoDone = document.getElementById('dispo-btn-done')
const closeBtns = document.querySelectorAll('.close-x').forEach( btn => { btn.addEventListener('click', () => { hideAll() } )})
const resetTotal = document.getElementById('total-reset')

// Event Listeners
lightC.addEventListener('click', () => { toggleClearing('light') })
moderateC.addEventListener('click', () => { toggleClearing('moderate') })
heavyC.addEventListener('click', () => { toggleClearing('heavy') })

burnD.addEventListener('click', () => { toggleDisposal('burn');checkComplete() })
mulchD.addEventListener('click', () => { toggleDisposal('mulch');checkComplete() } )
haulD.addEventListener('click', () => { toggleDisposal('haul');checkComplete() } )

startQuestionaire.addEventListener('click', () => { showClearing() })
clearNext.addEventListener('click', () => { showAcre() })
acreBack.addEventListener('click', () => { showClearing() })
acreNext.addEventListener('click', () => { checkAcres();checkComplete();showDisposal() })
dispoBack.addEventListener('click', () => { showAcre() })
dispoDone.addEventListener('click', () => { calculateTotal();hideAll() 
    const estimatorDisplay = document.createElement('div')
    estimatorDisplay.classList.add('estimator-display')
    afterQuestionaire.appendChild(estimatorDisplay)})
resetTotal.addEventListener('click', () => { total = 0 ; totalCalculation.textContent = total ; estimatorDisplay.remove() })


function toggleClearing(data){
    switch(data){
        case 'light':
            if(clearDensity == 'light'){
                clearDensity = ""
            } else { clearDensity = 'light' }
            lightC.classList.toggle('questionaire-choice-selected')
            moderateC.classList.remove('questionaire-choice-selected')
            heavyC.classList.remove('questionaire-choice-selected')
            break
        case 'moderate':
            if(clearDensity == 'moderate'){
                clearDensity = ""
            } else { clearDensity = 'moderate' }
            lightC.classList.remove('questionaire-choice-selected')
            moderateC.classList.toggle('questionaire-choice-selected')
            heavyC.classList.remove('questionaire-choice-selected')
            break
        case 'heavy':
            if(clearDensity == 'heavy'){
                clearDensity = ""
            } else { clearDensity = 'heavy' }
            lightC.classList.remove('questionaire-choice-selected')
            moderateC.classList.remove('questionaire-choice-selected')
            heavyC.classList.toggle('questionaire-choice-selected')
            break
    }
}

function toggleDisposal(data){
    switch(data){
        case 'burn':
            if(disposalMethod == 'burn'){
                disposalMethod = ""
            } else { disposalMethod = 'burn' }
            burnD.classList.toggle('questionaire-choice-selected')
            mulchD.classList.remove('questionaire-choice-selected')
            haulD.classList.remove('questionaire-choice-selected')
            break
        case 'mulch':
            if(disposalMethod == 'mulch'){
                disposalMethod = ""
            } else { disposalMethod = 'mulch' }
            burnD.classList.remove('questionaire-choice-selected')
            mulchD.classList.toggle('questionaire-choice-selected')
            haulD.classList.remove('questionaire-choice-selected')
            break
        case 'haul':
            if(disposalMethod == 'haul'){
                disposalMethod = ""
            } else { disposalMethod = 'haul' }
            burnD.classList.remove('questionaire-choice-selected')
            mulchD.classList.remove('questionaire-choice-selected')
            haulD.classList.toggle('questionaire-choice-selected')
            break
    }
}

function showClearing(){
    clearDiv.classList.remove('hidden')
    acreDiv.classList.add('hidden')
    dispoDiv.classList.add('hidden')
}

function showAcre(){
    acreDiv.classList.remove('hidden')
    clearDiv.classList.add('hidden')
    dispoDiv.classList.add('hidden')
}

function showDisposal(){
    dispoDiv.classList.remove('hidden')
    acreDiv.classList.add('hidden')

    if(allowHaul){
        haulD.disabled = false
        haulD.classList.remove('btn-disabled')
    } else {
        haulD.disabled = true
        haulD.classList.add('btn-disabled')
        haulD.classList.remove('questionaire-choice-selected')
    }
}

function hideAll(){
    clearDiv.classList.add('hidden')
    acreDiv.classList.add('hidden')
    dispoDiv.classList.add('hidden')

    lightC.classList.remove('questionaire-choice-selected')
    moderateC.classList.remove('questionaire-choice-selected')
    heavyC.classList.remove('questionaire-choice-selected')

    acreSub.classList.remove('questionaire-choice-selected')

    burnD.classList.remove('questionaire-choice-selected')
    mulchD.classList.remove('questionaire-choice-selected')
    haulD.classList.remove('questionaire-choice-selected')

    allowHaul = true
    total = 0
    sub1Acre = false
    acreInput.value = 1
    clearDensity = ""
    disposalMethod = ""
}

function checkAcres(){
    if(sub1Acre || acreInput.value == 0){
        acreNumber = 1
        skidSteerNeeded = false
    } else {
        skidSteerNeeded = true
        acreNumber = acreInput.value
        if(acreInput.value > 1){
            allowHaul = false
        } else {
            allowHaul = true
        }
    }
}

function checkComplete(){
    if(clearDensity == "" || disposalMethod == ""){
        dispoDone.classList.add('btn-disabled-2')
        dispoDone.disabled = true
    } else {
        dispoDone.classList.remove('btn-disabled-2')
        dispoDone.disabled = false
    }
}

function calculateTotal(){

    console.log(`Density: ${clearDensity}`)
    if(skidSteerNeeded){
        console.log(`Acres: ${acreNumber}`)
    } else {
        console.log(`Acres: less than one`)
    }
    console.log(`Method: ${disposalMethod}`)
    
    if(clearDensity == 'heavy'){
        total += 2000 * acreNumber
    } else {
        total += 1500 * acreNumber
    }

    switch(disposalMethod){
        case 'burn':
            total += (150 * acreNumber) + 500
            break
        case 'mulch':
            total += (250 * acreNumber) + 500
            break
        case 'haul':
            total += (100 * acreNumber) + 300
    }

    if(skidSteerNeeded){
        total += 500
    }
    console.log(total)
    totalCalculation.textContent = total

    // Create Display Divs

    // Clearing Options Display Div
    const cDiv = document.createElement('div')
    cDiv.classList.add('display-row')
    const cDensity = document.createElement('span')
    cDensity.textContent = clearDensity
    const cAcre = document.createElement('span')
    if(sub1Acre){
        cAcre.textContent = `Acres: <1`
    } else {
        cAcre.textContent = `Acres: ` + acreNumber
        console.log(acreNumber)
    }
    const cPrice = document.createElement('span')
    if(clearDensity == 'heavy'){
        cPrice.textContent = `$${2000 * acreInput.value}`
    } else { cPrice.textContent = `$${1500 * acreInput.value}` }
    cDiv.appendChild(cDensity)
    cDiv.appendChild(cAcre)
    cDiv.appendChild(cPrice)
    estimatorDisplay.appendChild(cDiv)

    // Disposal Options Display Div
    const dDiv = document.createElement('div')
    dDiv.classList.add('display-row')
    const dDisposal = document.createElement('span')
    dDisposal.textContent = disposalMethod
    const dAcre = document.createElement('span')
    if(sub1Acre){
        cAcre.textContent = `Acres: Less Than One`
    } else {
        cAcre.textContent = `Acres: ${acreInput}`
    }
    const dPrice = document.createElement('span')
    if(disposalMethod == 'burn'){
        dPrice.textContent = 150 * acreInput
    } else if(disposalMethod == 'mulch'){ dPrice.textContent = 250 * acreInput.value }
    else { dPrice.textContent = 100 * acreInput.value}
    dDiv.appendChild(dDisposal)
    dDiv.appendChild(dAcre)
    dDiv.appendChild(dPrice)
    estimatorDisplay.appendChild(dDiv)

    // Equipment Options Display Div
    const eDiv = document.createElement('div')
    eDiv.classList.add('display-row')
    
    
    

    // Calculate Equipment Costs
    /*
        Mulch - Chip Shredder
        Haul - Dump Trailer
        Burn - Skid Steer
    */
}
