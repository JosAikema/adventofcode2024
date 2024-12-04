const {processInput} = require("../lib/utils");

class Challenge {
    constructor(testdata, data) {
        this.result1 = 18
        this.result2 = 9;
        this.testdata = testdata;
        this.data = data;
    }

    parse(data) {

    }

    findOccurrences(matrix, word) {
        const directions = [
            { row: 0, col: 1 },    // naar rechts
            { row: 0, col: -1 },   // naar links
            { row: 1, col: 0 },    // naar beneden
            { row: -1, col: 0 },   // naar boven
            { row: 1, col: 1 },    // diagonaal naar rechtsonder
            { row: 1, col: -1 },   // diagonaal naar linksonder
            { row: -1, col: 1 },   // diagonaal naar rechtsboven
            { row: -1, col: -1 }   // diagonaal naar linksboven
        ];

        const numRows = matrix.length;
        const numCols = matrix[0].length;
        const wordLength = word.length;
        let occurrences = [];

        // Loop door elke cel in de matrix
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                // Controleer of het woord begint bij de huidige cel in elke richting
                directions.forEach(direction => {
                    let match = true;
                    for (let i = 0; i < wordLength; i++) {
                        const newRow = row + i * direction.row;
                        const newCol = col + i * direction.col;

                        // Controleer of de nieuwe positie binnen de matrix valt en overeenkomt met het woord
                        if (
                            newRow < 0 || newRow >= numRows ||
                            newCol < 0 || newCol >= numCols ||
                            matrix[newRow][newCol] !== word[i]
                        ) {
                            match = false;
                            break;
                        }
                    }

                    // Als het woord gevonden is, voeg de startpositie toe aan de resultaten
                    if (match) {
                        occurrences.push({ ch: matrix[row][col], startRow: row, startCol: col, direction });
                    }
                });
            }
        }

        return occurrences;
    }

    validateXmas(matrix, result, visited) {

        let posA = { row: result.startRow+result.direction.row, col: result.startCol+result.direction.col };

        if (visited.includes(posA.row+ ':' + posA.col)) {
            return false
        }

        if (posA.row !== 0 && posA.col !== 0 && posA.row !== matrix.length-1 && posA.col !== matrix[0].length-1) {
            let lb =  matrix[posA.row - 1][posA.col - 1];
            let ro = matrix[posA.row + 1][posA.col + 1];
            let lo =  matrix[posA.row + 1][posA.col - 1]
            let rb = matrix[posA.row - 1][posA.col + 1]

            if ((lb+ro+lo+rb === 'SMSM') || (lb+ro+lo+rb === 'SMMS') || (lb+ro+lo+rb === 'MSMS') || (lb+ro+lo+rb === 'MSSM')) {
                visited.push(posA.row+ ':' + posA.col);
                return true;
            }

        }
        return false;
    }

    execute_part1(data) {
        const matrix = data.map(line => line.split(''));

        const results = this.findOccurrences(matrix, 'XMAS');

        return results.length;
    }

    execute_part2(data) {
        const matrix = data.map(line => line.split(''));

        const results = this.findOccurrences(matrix, 'MAS');
        let validXmas = 0;

        let visited = [];
        results.forEach(result => {
            if (this.validateXmas(matrix, result, visited)) {
                validXmas++
            }
        })

        return validXmas;
    }



    part1() {

        let result = 0;
        if (this.execute_part1(this.testdata) === this.result1) {
            console.log('Test passed');
            result = this.execute_part1(this.data);
        } else {
            console.log('Test failed (should be ' + this.result1 + ')');
        }

        return result;
    }

    part2() {
        let result = 0;
        if (this.execute_part2(this.testdata) === this.result2) {
            console.log('Test passed');
            result = this.execute_part2(this.data);
        } else {
            console.log('Test failed (should be ' + this.result2 + ')');
        }
        return result;
    }

    run() {
        let result = this.part1();
        console.log('Result part1 : ', result);
        result = this.part2();
        console.log('Result part2 : ', result);
        return true;
    }
}

module.exports = Challenge;

