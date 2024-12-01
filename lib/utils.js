fs = require('fs')

module.exports = {
    processInput (inputFile, noSplit = false) {
        if (noSplit) {
            return fs.readFileSync(inputFile, 'utf8');
        } else {
            return fs.readFileSync(inputFile, 'utf8').split('\n');
        }

    },

    initialize2DArray(w, h, val = null) {
        return Array.from({length: h}).map(() => Array.from({length: w}).fill(val));
    },

    bfs(graph, start) {
        const queue = [start];
        const visited = new Set();
        const result = [];

        while (queue.length) {
            const vertex = queue.shift();

            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);

                for (const neighbor of graph[vertex]) {
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }
}