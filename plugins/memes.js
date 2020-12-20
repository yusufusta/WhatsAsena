const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const memeMaker = require('meme-maker')


Asena.addCommand({pattern: 'meme ?(.*)', fromMe: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('*Bir fotoğraf veya videoya yanıt verin!*');
    var topText, bottomText;
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[1];
        bottomText = split[0];
    }
	else {
        topText = match[1];
    }
    
	var info = await message.reply('```Medya indiriliyor & meme yapılıyor...```');
	
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });
  	let options = {
  	image: location,         
  	outfile: 'asena-meme.png',
  	topText: topText,
  	bottomText: bottomText,
	}
	memeMaker(options, function(err) {
  		if(e) throw new Error(err)
		await message.client.sendMessage(message.jid, fs.readFileSync(options.outfile), MessageType.document, {filename: 'asena-meme.png', mimetype: Mimetype.png});
		await info.delete();
	});
	
}));
