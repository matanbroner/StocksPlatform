const QueryModule = require('./query');

const intervalSeconds = 5000000

function removeInvalidTokens() {
    await QueryModule.removeInvalidTokens();
}

setInterval(removeInvalidTokens, intervalSeconds);