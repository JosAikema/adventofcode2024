const {processInput, initialize2DArray} = require("../lib/utils");

class Challenge {
    constructor(testdata = '', data = '') {
        this.result1 = 3749;
        this.result2 = 11387;
        this.testdata = testdata;
        this.data = data;
        this.noSplit = false;
    }

    setData(testdata, data) {
        this.testdata = testdata;
        this.data = data;
    }

    parse(data) {
        let lines = []
        //console.log(data)
        data.forEach(line => {
            lines.push({outcome: line.split(':')[0], items: line.split(':')[1].trim().split(' ')})
        })
        return lines
    }


    generateCombinations(operators, places) {
        const results = [];

        function generate(currentCombination) {
            if (currentCombination.length === places) {
                results.push(currentCombination.join(''));
                return;
            }

            for (const operator of operators) {
                generate([...currentCombination, operator]);
            }
        }

        generate([]);
        return results;
    }





    useOperator(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '*':
                return a * b;
            case '|':
                return parseInt(a.toString() + b.toString());
        }
    }


    solve(line, operators) {
        let items = line.items
        let found = false
        let combinations = this.generateCombinations(operators, items.length-1);

        combinations.forEach(combination => {

            if (found) {
                return
            }
            let result = parseInt(items[0]);
            for (let i = 1; i < items.length; i++) {
                result = this.useOperator(result, parseInt(items[i]), combination[i-1])
            }
            found = result == line.outcome


        })

        return found

    }


    execute(data, operators) {
        let sum = 0
        let lines = this.parse(data)


        lines.forEach(line => {
            let result = this.solve(line, operators);
            if (result) {
                sum = sum + parseInt(line.outcome)
            }

        })

        return sum;

    }


    part1() {

        let result = 0;
        let operators = ['*', '+']
        if (this.execute(this.testdata, operators) === this.result1) {
            console.log('Test passed');
            result = this.execute(this.data, operators);
        } else {
            console.log('Test failed (should be ' + this.result1 + ')');
        }

        return result;
    }

    part2() {
        let result = 0;
        let operators = ['*', '+','|']
        if (this.execute(this.testdata, operators) === this.result2) {
            console.log('Test passed');
            result = this.execute(this.data, operators);
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

