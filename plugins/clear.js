const {MessageType, GroupSettingChange, ChatModification, WAConnectionTest} = require('@adiwajshing/baileys');
const Asena = require('../events');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('clear');

Asena.addCommand({pattern: 'clear', fromMe: true, desc: Lang.CLR_DESC}, (async (message, match) => {

    await message.client.sendMessage(message.jid, Lang.CLR_PROC, MessageType.text);

    await message.client.modifyChat(message.jid, ChatModification.delete);

    await message.client.sendMessage(message.jid, Lang.CLR_DONE, MessageType.text);

}));
