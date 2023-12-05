const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/)
const games = lineParser(lines)
console.log(games)



function lineParser(lines) {
    const games = {}
    for (let i = 0; i < lines.length; i++) {
        const splitLine = lines[i].split(' ')
        games[i + 1] = [
            { [splitLine[1]]: parseInt(splitLine[2]), [splitLine[3]]: parseInt(splitLine[4]), [splitLine[5]]: parseInt(splitLine[6])},
            { [splitLine[7]]: parseInt(splitLine[8]), [splitLine[9]]: parseInt(splitLine[10]), [splitLine[11]]: parseInt(splitLine[12])},
            { [splitLine[13]]: parseInt(splitLine[14]), [splitLine[15]]: parseInt(splitLine[16]), [splitLine[17]]: parseInt(splitLine[18])}
        ]
    }
    return games
}
