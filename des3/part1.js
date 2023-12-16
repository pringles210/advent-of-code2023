const fs = require('fs')

const inputContent = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/)

let currentNumber = null
let numberStartIndex = null
let numberEndIndex = null
const nonSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

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
                    const number = adjacentSymbolScan(i)
                    if(number) {
                        numbers.push(Number(number))
                    }
                }
            } else if(currentNumber !== null){
                //check for adjacent symbols 
                const number = adjacentSymbolScan(i)
                if(number) {
                    numbers.push(Number(number))
                }
            }
        }
    }
    return numbers
}

function adjacentSymbolScan(i) {
    let hasAdjacentSymbol = false
    let iterationStartIndex = numberStartIndex > 0 ? numberStartIndex - 1 : 0
    let iterationEndIndex = numberEndIndex < inputContent[i].length - 1 ? numberEndIndex + 1 : numberEndIndex

    //left side
    if(numberStartIndex > 0) {
        if(!nonSymbols.includes(inputContent[i][iterationStartIndex])) {
            hasAdjacentSymbol = true
        }
    }
    //right side
    if(!hasAdjacentSymbol && numberEndIndex < inputContent[i].length - 1) {
        if(!nonSymbols.includes(inputContent[i][iterationEndIndex])) {
            hasAdjacentSymbol = true
        }
    }

    //top
    if(!hasAdjacentSymbol && i > 0) { //will only execute if current row is not top row
        for(let t = iterationStartIndex; t <= iterationEndIndex; t++) {
            if(!nonSymbols.includes(inputContent[i - 1][t])) {
                hasAdjacentSymbol = true
            }
        }
    }

    //bottom
    if(!hasAdjacentSymbol && i < inputContent.length - 1) {//will only execute if current row is not bottom row
        for(let b = iterationStartIndex; b <= iterationEndIndex; b++) {
            if(!nonSymbols.includes(inputContent[i + 1][b])) {
                hasAdjacentSymbol = true
            }
        }
    }

    const numberToReturn = currentNumber
    currentNumber = null
    numberStartIndex = null
    numberEndIndex = null

    if(hasAdjacentSymbol) {
        return numberToReturn
    }
}

const adjacentNumbers = findNumbersWithAdjacentSymbol(inputContent)
const sum = adjacentNumbers.reduce((accumulator, currentNumber) => {
    return accumulator + currentNumber
}, 0)

console.log(sum)