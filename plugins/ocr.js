/*
Nekobin for WhatsAsena - mr_justin
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/
const Asena = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const tesseract = require("node-tesseract-ocr");
const Language = require('../language');
const Lang = Language.getString('ocr');

Asena.addCommand({ pattern: 'ocr', fromMe: true, desc: Lang.OCR_DESC }, (async (message, match) => {
    if (message.reply_message.video === false && message.reply_message.image)
        var downloading = await message.reply(Lang.DOWNLOADING); {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        const result = await tesseract.recognize(location)
                  })
       
        return await message.client.sendMessage(message.jid, '```' + Lang.CONV + ':```\n\n' + result, MessageType.text);
    }
    else {
        return await message.sendMessage(Lang.NEED_REPLY);
    }
}));
