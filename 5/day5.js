const {processInput} = require("../lib/utils");

class Challenge {
    constructor(testdata = '', data = '') {
        this.result1 = 143
        this.result2 = 123;
        this.testdata = testdata;
        this.data = data;
        this.noSplit = true;
    }

    setData(testdata, data) {
        this.testdata = testdata;
        this.data = data;
    }

    parse(data) {
        let [rules, updates] = data.split('\n\n')
        return [rules.split('\n'), updates.split('\n')];
    }

    valid(update, rules) {
        let result = true;
        rules.forEach((rule) => {
            let [first, second] = rule.split('|')
            let items = update.split(',')

            if (items.indexOf(first) === -1 || items.indexOf(second) === -1) {
                //console.log('rule not checked because one or both items do not exist in update')
            } else if (items.indexOf(first) < items.indexOf(second)) {
                //console.log('update valid because first item is before second item')
            } else {
                //console.log('update invalid because first item is after second item')
                result = false;
            }
        })
        return result;
    }


    execute_part1(data) {
        let [rules, updates] = this.parse(data);

        let filtered_updates = updates.filter((update) => {
            return this.valid(update, rules)

        })

        let sum = 0
        filtered_updates.forEach((update) => {
            sum += +update.split(',')[Math.floor(update.split(',').length/2)]
        })

    }

    execute_part2(data) {
        let [rules, updates] = this.parse(data);
        let filtered_updates = updates.filter((update) => {
            return !this.valid(update, rules)
        })

        let fixed_updates = []
        filtered_updates.forEach((update) => {
            let sorted = update.split(',').sort((a, b) => {
                let rule = rules.find((r) => r.includes(a) && r.includes(b));
                return rule.indexOf(a) - rule.indexOf(b);
            })
            fixed_updates.push(sorted.join(','))
        })

        let sum = 0
        fixed_updates.forEach((update) => {
            sum += +update.split(',')[Math.floor(update.split(',').length/2)]
        })
        console.log('sum', sum);

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

