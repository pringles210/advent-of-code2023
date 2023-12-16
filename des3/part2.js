const fs = require('fs')

const inputContent = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/)

let currentNumber = null
let numberStartIndex = null
let numberEndIndex = null

function findNumbersWithAdjacentSymbol(inputContent) {
    const numbers = []
    for(let i = 0; i < inputContent.length; i++) {
        for(let j = 0; j < inputContent[i].length; j++) {
            if(!isNaN(Number(inputContent[i][j]))) {

                if(currentNumber !== null) {
                    currentNumber += inputContent[i][j]
                    numberEndIndex = j 
                } else {
                    numberStartIndex = j
                    numberEndIndex = j 
                    currentNumber = inputContent[i][j]
                }

                if(j === inputContent[i].length - 1) {
                    const gearCoordinates = adjacentSymbolScan(i)
                    gearCoordinates.forEach(gc => {
                        numbers.push(gc)
                    })
                }
            } else if(currentNumber !== null){
                //check for adjacent symbols 
                const gearCoordinates = adjacentSymbolScan(i)
                gearCoordinates.forEach(gc => {
                    numbers.push(gc)
                })
            }
        }
    }
    return numbers
}

function adjacentSymbolScan(i) {
    const numbersWithGearCoordinates = []
    let iterationStartIndex = numberStartIndex > 0 ? numberStartIndex - 1 : 0
    let iterationEndIndex = numberEndIndex < inputContent[i].length - 1 ? numberEndIndex + 1 : numberEndIndex

    //left side
    if(numberStartIndex > 0) {
        if(inputContent[i][iterationStartIndex].includes('*')) {
            const number = { number: Number(currentNumber), numberStartIndexI: i, numberStartIndexJ: numberStartIndex, i: i, j: iterationStartIndex }
            numbersWithGearCoordinates.push(number)
        }
    }
    //right side
    if(numberEndIndex < inputContent[i].length - 1) {
        if(inputContent[i][iterationEndIndex].includes('*')) {
            const number = { number: Number(currentNumber), numberStartIndexI: i, numberStartIndexJ: numberStartIndex, i: i, j: iterationEndIndex }
            numbersWithGearCoordinates.push(number)
        }
    }

    //top
    if(i > 0) { //will only execute if current row is not top row
        for(let t = iterationStartIndex; t <= iterationEndIndex; t++) {
            if(inputContent[i - 1][t].includes('*')) {
                const number = { number: Number(currentNumber), numberStartIndexI: i, numberStartIndexJ: numberStartIndex, i: i - 1, j: t }
                numbersWithGearCoordinates.push(number)
            }
        }
    }

    //bottom
    if(i < inputContent.length - 1) {//will only execute if current row is not bottom row
        for(let b = iterationStartIndex; b <= iterationEndIndex; b++) {
            if(inputContent[i + 1][b].includes('*')) {
                const number = { number: Number(currentNumber), numberStartIndexI: i, numberStartIndexJ: numberStartIndex, i: i + 1, j: b }
                numbersWithGearCoordinates.push(number)
            }
        }
    }

    currentNumber = null
    numberStartIndex = null
    numberEndIndex = null
    return numbersWithGearCoordinates
}

const gearCoordinates = findNumbersWithAdjacentSymbol(inputContent)
const sumOfAllExactlyTwoNumbersAdjacentToGear = gearCoordinates.reduce((accumulator, currentGearCoordinates) => {
    const matchingCoordinates = gearCoordinates.filter(gc => {
        if(gc.numberStartIndexI === currentGearCoordinates.numberStartIndexI && gc.numberStartIndexJ === currentGearCoordinates.numberStartIndexJ) {
            return 
        }

        if(gc.i !== currentGearCoordinates.i || gc.j !== currentGearCoordinates.j) {
            return false
        }
        return true
    })

    if(matchingCoordinates.length === 1) {
        const matchingCoordinateIndex = gearCoordinates.findIndex(gc => {
            const props = {
                numberStartIndexI: matchingCoordinates[0].numberStartIndexI,
                numberStartIndexJ: matchingCoordinates[0].numberStartIndexJ
            }
            return Object.keys(props).every(key => gc[key] === props[key])
        })
        gearCoordinates.splice(matchingCoordinateIndex, 1)
        const multipliedNumbers = currentGearCoordinates.number * matchingCoordinates[0].number 
        return accumulator + multipliedNumbers
    }   
    return accumulator
}, 0) 

console.log(sumOfAllExactlyTwoNumbersAdjacentToGear)