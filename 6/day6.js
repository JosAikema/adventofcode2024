const {processInput, initialize2DArray} = require("../lib/utils");

class Challenge {
    constructor(testdata = '', data = '') {
        this.result1 = 41;
        this.result2 = 6;
        this.testdata = testdata;
        this.data = data;
        this.noSplit = true;
    }

    setData(testdata, data) {
        this.testdata = testdata;
        this.data = data;
    }

    parse(data) {
        let map = data.split('\n').map(line => line.split(''));
        return map;
    }

    walk(map, posGuard) {
        let direction = posGuard[2];
        let r = posGuard[0];
        let c = posGuard[1];

        switch (direction) {
            case 'up':
                if (map[r-1][c] === '#') {
                    posGuard[2] = 'right';
                } else {
                    posGuard[0] = r-1;
                }
                break;
            case 'right':
                if (map[r][c+1] === '#') {
                    posGuard[2] = 'down';
                } else {
                    posGuard[1] = c+1;
                }
                break;
            case 'down':
                if (map[r+1][c] === '#') {
                    posGuard[2] = 'left';
                } else {
                    posGuard[0] = r+1;
                }
                break;
            case 'left':
                if (map[r][c-1] === '#') {
                    posGuard[2] = 'up';
                } else {
                    posGuard[1] = c-1;
                }
                break;


        }
        return posGuard;
    }

    findGuard(map) {
        let posGuard = [0,0,'down'];
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (map[i][j] === '^') {
                    posGuard = [i,j,'up']
                } else if (map[i][j] === '>') {
                    posGuard = [i,j,'right']
                } else if (map[i][j] === 'v') {
                    posGuard = [i,j,'down']
                } else if (map[i][j] === '<') {
                    posGuard = [i,j,'left']
                }
            }
        }
        return posGuard;
    }

    walkThroughMap(map, posGuard) {
        let canWalk = true;
        let stuck = false;
        let visited = initialize2DArray(map.length, map[0].length, 0);
        let visited_extended = initialize2DArray(map.length, map[0].length, '');
        while (canWalk) {
            let r = posGuard[0];
            let c = posGuard[1];

            if (visited[r][c] === 1 && visited_extended[r][c] === posGuard[2]) {
                stuck = true;
                canWalk = false;
                break;
            }
            visited[r][c] = 1;
            visited_extended[r][c] = posGuard[2];
            if (r <= 0 || r >= map.length-1 || c <= 0 || c >= map[0].length-1) {
                canWalk = false;
            } else {
                posGuard = this.walk(map, posGuard)
            }
        }
        return [visited, stuck];
    }


    execute_part1(data) {
        let map = this.parse(data);

        let posGuard = this.findGuard(map);

        let [visited, stuck] = this.walkThroughMap(map, posGuard);

        let sum = 0;
        for (let i = 0; i < visited.length; i++) {
            let rowsum = visited[i].reduce((acc, val) => acc + val, 0);
            sum += rowsum;
        }

        return sum;

    }

    execute_part2(data) {
        let map = this.parse(data);

        let posGuard = this.findGuard(map);

        let sum = 0;
        return sum;
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

