import {useEffect, useState} from 'react'
import {useCallback} from 'react'
import blue from './images/blue.png'
import green from './images/green.png'
import orange from './images/orange.png'
import red from './images/red.png'
import blank from './images/blank.png'
import { Typography } from 'antd'

const { Title } = Typography
const width = 8

const candyColors=[
    green,
    blue,
    orange,
    red
]


const App = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)
    const [currentTime, setCurrentTime]=useState(60)



    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForColumnOfFive = useCallback (() => {
        for (let i = 0; i < 32; i++) {
            const columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfFive.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 1)
                columnOfFive.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    })



    useEffect(() => {
        if(currentTime>0) {
            setTimeout(() => setCurrentTime(currentTime - 1), 800);
        } else if(currentTime === 0) {
            setCurrentTime(0);
            setTimeout(() => alert('GAME OVER Your score is ' + scoreDisplay), 800);
        }
    }, [currentTime, scoreDisplay]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForRowOfFive = useCallback(() => {
        for (let i = 0; i < 64; i++) {
            const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
            const decidedColor = currentColorArrangement[i]
            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 61, 62, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFive.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 1)
                rowOfFive.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForColumnOfFour = useCallback(() => {
        for (let i = 0; i < 40; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 1)
                columnOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForRowOfFour = useCallback(() => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 1)
                rowOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForColumnOfThree = useCallback(() => {
        for (let i = 0; i < 48; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 1)
                columnOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForRowOfThree = useCallback(() => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 1)
                rowOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }
    }

    const dragStart = (e) => {
        setSquareBeingDragged(e.target)
    }
    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target)
    }
    const dragEnd = () => {
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFive = checkForColumnOfFive()
        const isARowOfFive = checkForRowOfFive()
        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingReplacedId &&
            validMove &&
            (isARowOfThree || isAColumnOfThree || isARowOfFour || isAColumnOfFour || isARowOfFive || isAColumnOfFive)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
        }
    }


    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFive()
            checkForRowOfFive()
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFive, checkForRowOfFive, checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    return (
        <div className="app">
            <div className="game">
                {currentColorArrangement.map((candyColor, index) => (
                    <img
                        key={index}
                        src={candyColor}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}
            </div>
          <div className="back">
              {/* <Time ={scoreDisplay}/> */}
              <h2 id="times"> Time: {currentTime} </h2>
            {/* <Score score={scoreDisplay}/> */}
            <Title className="score">Score: {scoreDisplay}</Title>

                </div>

        </div>



    )

}



export default App