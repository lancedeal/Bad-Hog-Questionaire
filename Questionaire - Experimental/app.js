
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
    cDensity.classList.add('display-row-service')
    if(acreNumber > 1){
        cDensity.textContent = `${clearDensity} Clearing - ${acreNumber} Acres`
    } else { cDensity.textContent = `${clearDensity} Clearing`}
    const cPrice = document.createElement('span')
    cPrice.classList.add('display-row-cost')
    if(clearDensity == 'heavy'){
        cPrice.textContent = `$${2000 * acreInput.value}`
    } else { cPrice.textContent = `$${1500 * acreInput.value}` }
    cDiv.appendChild(cDensity)
    cDiv.appendChild(cPrice)
    estimatorDisplay.appendChild(cDiv)

    // Disposal Options Display Div
    const dDiv = document.createElement('div')
    dDiv.classList.add('display-row')
    const dDisposal = document.createElement('span')
    dDisposal.classList.add('display-row-service')
    if(acreNumber > 1){
        dDisposal.textContent = `${disposalMethod} Disposal - ${acreNumber} Acres`
    } else{ dDisposal.textContent = `${disposalMethod} Disposal` }
    const dPrice = document.createElement('span')
    dPrice.classList.add('display-row-cost')
    if(disposalMethod == 'burn'){
        dPrice.textContent = `$${150 * acreInput.value}`
    } else if(disposalMethod == 'mulch'){ dPrice.textContent = `$${250 * acreInput.value}` }
    else { dPrice.textContent = `$${100 * acreInput.value}` }
    dDiv.appendChild(dDisposal)
    dDiv.appendChild(dPrice)
    estimatorDisplay.appendChild(dDiv)

    // Equipment Options Display Div
    const eDiv = document.createElement('div')
    eDiv.classList.add('display-row')
    const eDeposit = document.createElement('span')
    eDeposit.classList.add('display-row-service')
    const ePrice = document.createElement('span')
    ePrice.classList.add('display-row-cost')
    var skidSteerAdded
    switch(disposalMethod){
        case 'burn':
            eDeposit.textContent = 'Skid Steer Deposit'
            ePrice.textContent = '$500 + $80/Hourly'
            skidSteerAdded = true
            break
        case 'mulch':
            eDeposit.textContent = 'Chip Shredder Deposit'
            ePrice.textContent = '$500 + $80/Hourly'
            break
        case 'haul':
            eDeposit.textContent = 'Dump Trailer Deposit'
            ePrice.textContent = '$300 + $80/Hourly'
            break
    }
    eDiv.appendChild(eDeposit)
    eDiv.appendChild(ePrice)
    estimatorDisplay.appendChild(eDiv) 
    if(skidSteerNeeded && !skidSteerAdded){
        const eDiv2 = document.createElement('div')
        eDiv2.classList.add('display-row')
        const eDepo2 = document.createElement('span')
        eDepo2.classList.add('display-row-service')
        eDepo2.textContent = 'Skid Steer Deposit'
        const ePrice2 = document.createElement('span')
        ePrice2.classList.add('display-row-cost')
        ePrice2.textContent = '$500 + $80/Hourly'
        eDiv2.appendChild(eDepo2)
        eDiv2.appendChild(ePrice2)
        estimatorDisplay.appendChild(eDiv2) 
    }
    
}
