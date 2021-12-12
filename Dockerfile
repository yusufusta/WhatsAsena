FROM fusuf/whatsasena:latest

RUN git clone https://github.com/CEHunter2630/Fox /root/WhatsAsena
WORKDIR /root/WhatsAsena/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]

