const {processInput} = require("../lib/utils");

class Challenge {
    constructor(testdata, data, result1, result2) {
        this.result1 = result1;
        this.result2 = result2;
        this.testdata = testdata;
        this.data = data;
    }

    parse(data) {
        let list1 = [];
        let list2 = []
        data.forEach(r => {
            let row = r.replace(/\s\s+/g, ' ').split(' ')
            list1.push(parseInt(row[0]))
            list2.push(parseInt(row[1]))
        })
        return [list1, list2]
    }

    execute_part1(data) {
        let [list1, list2] = this.parse(data)

        let sorted1 = list1.sort()
        let sorted2 = list2.sort()

        let diffs = []

        sorted1.forEach((r, i) => {
            let diff = Math.abs(r - sorted2[i])
            diffs.push(diff)
        })

        return diffs.reduce((a, b) => a + b, 0)
    }

    execute_part2(data) {
        let [list1, list2] = this.parse(data)

        let counts = []
        list1.forEach((r, i) => {
            let count = 0;
            for (const num of list2) {
                if (r === num) {
                    count++
                }
            }
            counts[i] = count * r;
        })

        return counts.reduce((a, b) => a + b, 0)
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

