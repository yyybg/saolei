let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'

let square = JSON.parse(s)


const templateCell = (line, x) => {
    let s = '<div class="row clearfix">'
    for (let i = 0; i < line.length; i++) {
        let e = line[i];
        s += `<div class="cell" data-number="${e}" data-x="${x}" data-y="${i}">${e}</div>`
        
    }
    s += '</div>'   
    return s

}

const templateRow = (square) => {
    let res = ''

    for (let i = 0; i < square.length; i++) {
        let row = square[i];
        res += templateCell(row, i)       
    }

    return res

}

const renderSquare = (square) => {
    let s = templateRow(square)
    let mine = e('#id-div-mime')

    mine.insertAdjacentHTML('beforeend', s)
}


const bindEventDelegate = (square) => {
    let mine = e('#id-div-mime')
    bindEvent(mine, 'click', (event) => {
        // log("click cell")
        let self = event.target
        vjkl(self, square)
    })

}

const vjkl = (cell, square) => {
    // log("vjkl")
    let num = cell.dataset.number
    // log("number", num)
    if (!cell.classList.contains("show")) {
        cell.classList.add("show")

        if (num === "9") {
            alert("游戏结束！")
        } else if (num === "0") {
            let x = Number(cell.dataset.x)
            let y = Number(cell.dataset.y)
            vjklAround(square, x, y)
        }
    }
}

const vjklAround = (square, x, y) => {

    vjkl1(square, x - 1, y - 1)
    vjkl1(square, x, y - 1)
    vjkl1(square, x + 1, y - 1)
    vjkl1(square, x - 1, y)
    vjkl1(square, x + 1, y)
    vjkl1(square, x - 1, y + 1)
    vjkl1(square, x, y + 1)
    vjkl1(square, x + 1, y + 1)
}


const vjkl1 = (square, x, y) => {
    // log("vjk11 x y", x, y)
    // 判断是否越界
    if (x >= 0 && x < square.length && y >=0 && y < square[0].length){
        let num = square[x][y]
        let cell = e(`[data-x="${x}"][data-y="${y}"]`)
        let showed = cell.classList.contains("show")

        if (!showed) {
            if (num === 0) {
                cell.classList.add("show")
                vjklAround(square, x, y)
            } else if (num !== 9) {
                cell.classList.add("show")
            }
        }
    }
}

const __main = () => {
    renderSquare(square)
    bindEventDelegate(square)

}
__main()