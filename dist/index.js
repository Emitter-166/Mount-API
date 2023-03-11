"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
require('dotenv').config({
    path: path.join(__dirname, ".env")
});
app.use((0, cors_1.default)());
const F = discord_js_1.IntentsBitField.Flags;
const client = new discord_js_1.Client({
    intents: [F.Guilds, F.GuildMessages, F.GuildMembers, F.MessageContent]
});
app.get('/api', async (req, res) => {
    res.status(200).send({ count: amount });
});
app.get('/', (req, res) => {
    res.send("sussy baka");
});
let amount = 0;
client.on('guildMemberUpdate', async (old, newMember) => {
    const nick_old = old.nickname?.toLocaleLowerCase();
    const nick_new = newMember.nickname?.toLocaleLowerCase();
    if (nick_old?.startsWith('mount') && !(nick_new?.startsWith('mount')))
        amount--;
    if (nick_new?.startsWith('mount') && !(nick_old?.startsWith('mount')))
        amount++;
});
client.once('ready', async (client) => {
    console.log("ready");
    const guild = await client.guilds.fetch("859736561830592522");
    const members = await guild.members.fetch();
    amount += members.filter(member => member.nickname?.toLocaleLowerCase().startsWith('mount')).size;
});
client.login(process.env._TOKEN);
app.listen('6584');
