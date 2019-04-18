function Bot(client) {
    this.readyAt = "Ready at: " + client.readyAt;
    this.status = "Status: " + client.status + " (active)";
    this.guildList = function() {
        var guilds = client.guilds.array();
        return "Guild: " + guilds.length;
    }
    this.ping = "Ping: " + client.ping + "ms";
    this.uptime = "Uptime: " + client.uptime + "ms";
    this.isBotObject = true;
}

function viewStats(Obj) {
    if (Obj.isBotObject) {
        return `Statistics:\n\n${Obj.readyAt}\n${Obj.status}\n${Obj.guildList()}\n${Obj.ping}\n${Obj.uptime}\n\nMore statistics at:\nhttps://discordbots.org/bot/501862549739012106`;
    }
    else {
        return null;
    }
}

module.exports = {
    Bot: Bot,
    view: viewStats
}