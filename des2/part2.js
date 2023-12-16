const fs = require('fs');

const inputContent = fs.readFileSync('./input.txt', 'utf-8')

const games = inputContent.split('\n').map(game => game.trim())

const parsedGames = games.map(game => {
    const [gameNumberText, draws] = game.split(':')
    const [_, gameNumber] = gameNumberText.split(' ')
    const drawsArray = draws.split(';').map(draw => draw.trim())

    const gameDraws = drawsArray.map(draw => {
        const colors = draw.split(',').map(color => color.trim())
        const drawObject = {}
        colors.forEach(color => {
            const [quantity, colorName] = color.split(' ')
            drawObject[colorName] = parseInt(quantity)
        })
        return drawObject
    })
    return {
        number: parseInt(gameNumber),
        draws: gameDraws
    }
})
const sumOfPossibleGames = parsedGames.reduce((acc, game) => {
    let redMinimum = 0, blueMinimum = 0, greenMinimum = 0
    for(let i = 0; i < game.draws.length; i++) {
        const draw = game.draws[i]
        if(draw?.red > redMinimum) {
            redMinimum = draw.red
        }
        if(draw?.blue > blueMinimum) {
            blueMinimum = draw.blue
        }
        if(draw?.green > greenMinimum) {
            greenMinimum = draw.green
        }
    }
    const powerOfMinimumSetOfCubes = redMinimum * blueMinimum * greenMinimum
    return acc + powerOfMinimumSetOfCubes
}, 0)

console.log(sumOfPossibleGames)