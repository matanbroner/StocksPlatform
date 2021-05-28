const QueryModule = require('./query');

async function removeInvalidTokens() {
    await QueryModule.removeInvalidTokens();
}

module.exports = {
    removeInvalidTokens
}