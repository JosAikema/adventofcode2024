const {processInput} = require("../lib/utils");

class Challenge {
    constructor(testdata, data) {
        this.result1 = 2
        this.result2 = 4;
        this.testdata = testdata;
        this.data = data;
    }

    parse(data) {

        return data.map(r => {
            let levels = r.split(' ')
            return levels.map(l => {
                return parseInt(l)
            })

        });

    }

    checkReport(report) {
        let result = true;
        let direction = 'same'
        for(let i=0; i<report.length; i++) {
            if (i === 0) {
                if (report[i] < report[i+1]) {
                    direction = 'increasing'
                } else if (report[i] > report[i+1]) {
                    direction = 'decreasing'
                } else {
                    result = false
                }
            } else {
                if (direction === 'increasing') {
                    if (report[i] < report[i-1]) {
                        result = false
                    }
                } else if (direction === 'decreasing') {
                    if (report[i] > report[i-1]) {
                        result = false
                    }
                } else {
                    result = false
                }
            }

        }
        for (let i=0; i<report.length-1; i++) {
            let diff = Math.abs(report[i] - report[i+1])
            if ((diff > 3) || (diff === 0)) {
                result = false
            }
        }

        return result
    }

    execute_part1(data) {
        let reports = this.parse(data)
        let validReports = 0;
        reports.forEach(r => {
            if (this.checkReport(r)) {
                validReports++
            }
        })
        return validReports
    }

    execute_part2(data) {
        let reports = this.parse(data)
        let validReports = 0;

        reports.forEach(r => {
            if (this.checkReport(r)) {
                validReports++
            } else {
                for (let i=0; i<r.length; i++) {
                    const fixed = [...r.slice(0, i), ...r.slice(i + 1)];
                    if (this.checkReport(fixed)) {
                        validReports++
                        break
                    }
                }

            }
        })
        return validReports
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

