/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;

you may not use this file except in compliance with the License.

Thanks to lyfe00011

WhatsAsena - Yusuf Usta

*/

const {MessageType, Presence, MessageOptions} = require('@adiwajshing/baileys');

const Base = require('./Base');

const Message = require('./Message');

const ReplyMessage = require('./ReplyMessage');

class Sticker extends Base {

    constructor(client, data) {

        super(client);

        if (data) this._patch(data);

    }

    _patch(data) {

        this.id = data.key.id === undefined ? undefined : data.key.id;

        this.jid = data.key.remoteJid;

        this.fromMe = data.key.fromMe;

        this.url = data.message.stickerMessage.url;

        this.mimetype = data.message.stickerMessage.mimetype;

        this.height = data.message.stickerMessage.height;

        this.width = data.message.stickerMessage.width;

        this.mediaKey = data.message.stickerMessage.mediaKey;

        this.data = data;

        

        if (data.message.stickerMessage.hasOwnProperty('contextInfo') && data.message.contextInfo.quotedMessage) { 

            this.reply_message = new ReplyMessage(this.client, data.message.stickerMessage.contextInfo); }

        else {

            this.reply_message = false;

        }

        

        return super._patch(data);

    }

    async delete() {

        return await this.client.deleteMessage(this.jid, {id: this.id, remoteJid: this.jid, fromMe: true})

    }

    async reply(text) {

        var message = await this.client.sendMessage(this.jid, text, MessageType.text, {quoted: this.data})

        return new Message(this.client, message)

    }

    async sendMessage(content, type, options) {

        return await this.client.sendMessage(this.jid, content, type, options)

    }

    async sendTyping() {

        return await this.client.updatePresence(this.jid, Presence.composing) ;

    }

    async sendRead() {

        return await this.client.chatRead(this.jid);

    }

    async download(location = this.id) {

        await this.client.downloadAndSaveMediaMessage(this.data, location);

        return this.id + '.' + this.mimetype.split('/')[1];

    }

};

module.exports = Sticker;
