document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById('puzzle');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const size = 4;
    let puzzleArray = [];

   
    const initializePuzzle = () => {
        puzzleArray = Array.from({ length: size * size }, (_, i) => (i < size * size - 1) ? i + 1 : null);
        renderPuzzle();
    };

    const renderPuzzle = () => {
        puzzleContainer.innerHTML = '';
        puzzleArray.forEach((num, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (num === null) {
                tile.classList.add('empty');
            } else {
                tile.textContent = num;
            }
            tile.dataset.index = index;
            puzzleContainer.appendChild(tile);
        });
    };


    const shufflePuzzle = () => {
        for (let i = puzzleArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzleArray[i], puzzleArray[j]] = [puzzleArray[j], puzzleArray[i]];
        }
        renderPuzzle();
    };

   
    const isValidMove = (index) => {
        const emptyIndex = puzzleArray.indexOf(null);
        const row = Math.floor(index / size);
        const col = index % size;
        const emptyRow = Math.floor(emptyIndex / size);
        const emptyCol = emptyIndex % size;

        return (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
               (col === emptyCol && Math.abs(row - emptyRow) === 1);
    };

  
    const moveTile = (index) => {
        if (!isValidMove(index)) return;
        const emptyIndex = puzzleArray.indexOf(null);
        [puzzleArray[index], puzzleArray[emptyIndex]] = [puzzleArray[emptyIndex], puzzleArray[index]];
        renderPuzzle();
    };


    puzzleContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tile') && !e.target.classList.contains('empty')) {
            const index = Number(e.target.dataset.index);
            moveTile(index);
        }
    });


    shuffleBtn.addEventListener('click', () => {
        shufflePuzzle();
    });

  
    initializePuzzle();
});
