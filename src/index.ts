import { Client, GuildMember, IntentsBitField, PartialGuildMember} from 'discord.js';
import * as path from 'path';
import express from 'express';

const app = express();

require('dotenv').config({
    path: path.join(__dirname, ".env")
})




const F = IntentsBitField.Flags;
const client = new Client({
    intents: [F.Guilds, F.GuildMessages, F.GuildMembers, F.MessageContent]
})

app.get('/', async (req, res) => {
    res.status(200).send({count: amount, Headers: {"Access-Control-Allow-Origin": "*"}});
})

let amount = 0;

client.on('guildMemberUpdate', async (old , newMember) => {
    const nick_old = old.nickname?.toLocaleLowerCase();
    const nick_new = newMember.nickname?.toLocaleLowerCase();
    
    if(nick_old?.startsWith('mount') && !(nick_new?.startsWith('mount'))) amount--;
    if(nick_new?.startsWith('mount') && !(nick_old?.startsWith('mount'))) amount++;
})


client.once('ready', async (client) => {
    console.log("ready");

    const guild = await client.guilds.fetch("859736561830592522");

    const members = await guild.members.fetch();

    amount += members.filter(member => member.nickname?.toLocaleLowerCase().startsWith('mount')).size
})

client.login(process.env._TOKEN)
app.listen('6584');








