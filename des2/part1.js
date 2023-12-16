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
console.log(parsedGames)
const sumOfPossibleGames = parsedGames.reduce((acc, game) => {
    for(let i = 0; i < game.draws.length; i++) {
        const draw = game.draws[i]
        if(draw['red'] > 12 || draw['green'] > 13 || draw['blue'] > 14) {
            console.log(`Game ${game.number} is not possible due to this draw: `)
            console.log(draw)
            return acc
        }
    }
    return acc + game.number
}, 0)

console.log(sumOfPossibleGames)