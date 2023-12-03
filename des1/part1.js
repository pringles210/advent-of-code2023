const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/)

let digitCombo = null
let firstDigit = null
let secondDigit = null
let digitComboTotal = 0

for(let i = 0; i < input.length; i++) {
    console.log('new line -> ', input[i])
    for(let j = 0; j < input[i].length; j++) {
        if(isNaN(Number(input[i][j]))) {
            continue 
        }
        console.log('new digit found', input[i][j])
        console.log(Number(input[i][j]))
        if(firstDigit === null) {
            console.log('setting first digit and second digit')
            firstDigit = input[i][j]
            secondDigit = input[i][j]
        } else {
            console.log('setting second digit')
            secondDigit = input[i][j]
        }
    } 
    digitCombo = firstDigit + secondDigit
    console.log(firstDigit)
    console.log(digitCombo)
    console.log('digitCombo', digitCombo)
    digitComboTotal += Number(digitCombo)
    firstDigit = null
    secondDigit = null
    digitCombo = null
} 

console.log('digitComboTotal', digitComboTotal)

//console.log(input);