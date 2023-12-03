const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/)

let digitCombo = null
let firstDigit = null
let secondDigit = null
let digitComboTotal = 0

for(let i = 0; i < input.length; i++) {
    console.log('new line -> ', input[i])
    str = replaceTextNumbersWithDigits(input[i])
    console.log('altered string -> ', str)
    for(let j = 0; j < str.length; j++) {
        if(isNaN(Number(str[j]))) {
            continue 
        }
        console.log('new digit found', str[j])
        console.log(Number(str[j]))
        if(firstDigit === null) {
            console.log('setting first digit and second digit')
            firstDigit = str[j]
            secondDigit = str[j]
        } else {
            console.log('setting second digit')
            secondDigit = str[j]
        }
    } 
    
    digitCombo = firstDigit + secondDigit
    console.log(firstDigit)
    console.log(secondDigit)
    console.log('digitCombo', digitCombo)
    digitComboTotal += Number(digitCombo)
    firstDigit = null
    secondDigit = null
    digitCombo = null
} 

console.log('digitComboTotal', digitComboTotal)

//console.log(input);

function replaceTextNumbersWithDigits(str) {
    //returns objects with first and last substring number values and indexes
    console.log('checking for text numbers')
    const textNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let firstAndLastOccurencesIndeces = []
    for(let i = 0; i < textNumbers.length; i++) {
        if(str.includes(textNumbers[i])) {
            const firstIndex = str.indexOf(textNumbers[i])
            const lastIndex = str.lastIndexOf(textNumbers[i])
            firstAndLastOccurencesIndeces.push({index: firstIndex, textValue: textNumbers[i], numberValue: (i + 1).toString()})
            if(firstIndex !== lastIndex) {
                firstAndLastOccurencesIndeces.push({index: lastIndex, textValue: textNumbers[i], numberValue: (i + 1).toString()})
            }
        }
    }
    
    if(firstAndLastOccurencesIndeces.length === 0) {
        return str
    }

    firstAndLastOccurencesIndeces = firstAndLastOccurencesIndeces.sort((a, b) => a.index - b.index)
    const arrayLength = firstAndLastOccurencesIndeces.length
    str = str.replace(firstAndLastOccurencesIndeces[0].textValue, (firstAndLastOccurencesIndeces[0].numberValue).toString())
    console.log('str', str)
    console.log(firstAndLastOccurencesIndeces)
    if(firstAndLastOccurencesIndeces.length > 1) {
        //special case to handle strings like oneight and sevenine, 
        //if the last text number occurence cannot be found after finding and replacing the first occurence text number
        //then it can only be assumed that the last letter in the first occurence is the first letter in the last occurence.
        //So the string oneight will be parsed as 18ght and sevenine will be parsed as 79ne
        if(str.includes(firstAndLastOccurencesIndeces[arrayLength - 1].textValue)) {
            str = str.replaceAll(firstAndLastOccurencesIndeces[arrayLength - 1].textValue, (firstAndLastOccurencesIndeces[arrayLength - 1].numberValue).toString())
        } else {
            console.log('cannot find occurence of last text number')
            console.log('placing last text number digit value behind first text number digit value')
            console.log('first text number index + 1 -> ', firstAndLastOccurencesIndeces[0].index + 1)
            console.log(str.substring(0, firstAndLastOccurencesIndeces[0].index + 1))
            console.log(str[firstAndLastOccurencesIndeces[0].index + 1])
            console.log(str.substring(firstAndLastOccurencesIndeces[0].index + 2, str.length))
            str = str.substring(0, firstAndLastOccurencesIndeces[0].index + 1) + firstAndLastOccurencesIndeces[arrayLength - 1].numberValue + str.substring(firstAndLastOccurencesIndeces[0].index + 2, str.length)
        }
    }
    console.log('returning altered string -> ', str)
    return str
}