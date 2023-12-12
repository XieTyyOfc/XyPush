/*
   Created By Xiety
   My Contact wa.me/6285863227753
   XyPush V1.0.0
*/

require('./xiety.js')
require("./settings");
const {
  default: xietyConnect,
  DisconnectReason,
  makeInMemoryStore,
  jidDecode,
  downloadContentFromMessage,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const fs = require('fs')
const pino = require('pino')
const readline = require("readline");
const PhoneNumber = require("awesome-phonenumber");
const useCODE = process.argv.includes("--code")
const useQR = !useCODE
const usePairingCode = true;
const {
    Boom
} = require('@hapi/boom')
const { smsg } = require("./lib/functions");
const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});
const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(text, resolve);
  });
};

async function startxiety() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const xiety = xietyConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ['Chrome (Linux)', '', '']
  });
  if (usePairingCode && !xiety.authState.creds.registered) {
    const phoneNumber = await question(
      "Enter a number starting with 62 Example 62xxxxx:\n"
    );
    const code = await xiety.requestPairingCode(phoneNumber.trim());
    console.log(`Pairing code: ${code}`);
  }

  store.bind(xiety.ev);


xiety.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      m = chatUpdate.messages[0];
      if (!m.message) return;
      m.message =
        Object.keys(m.message)[0] === "ephemeralMessage"
          ? m.message.ephemeralMessage.message
          : m.message;
      if (!xiety.public && !m.key.fromMe && chatUpdate.type === "notify")
        return;
      if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
      m = smsg(xiety, m, store);
      require("./xiety")(xiety, m, chatUpdate, store);
    } catch (err) {
      console.log(err);
    }
  });
  
  xiety.public = true;
  
  xiety.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };
  
  xiety.getName = (jid, withoutContact = false) => {
    id = xiety.decodeJid(jid);
    withoutContact = xiety.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = xiety.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === xiety.decodeJid(xiety.user.id)
          ? xiety.user
          : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };
  
  xiety.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await xiety.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await xiety.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${await xiety.getName(
          i + "@s.whatsapp.net"
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:aplusscell@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://youtube.com/@HardzBanx\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
      });
    }
    
     //=================================================//
    xiety.sendMessage(
      jid,
      {
        contacts: { displayName: `${list.length} Kontak`, contacts: list },
        ...opts,
      },
      { quoted }
    );
    
xiety.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    xiety.sendMessage(
      jid,
      {
        text: text,
        contextInfo: {
          mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
          ),
        },
        ...options,
      },
      { quoted }
    );
  
  xiety.ev.on('call', async (celled) => {
let botNumber = await xiety.decodeJid(xiety.user.id)
let koloi = global.anticall
if (!koloi) return
console.log(celled)
for (let kopel of celled) {
if (kopel.isGroup == false) {
if (kopel.status == "offer") {
let nomer = await xiety.sendTextWithMentions(kopel.from, `*${xiety.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner membuka blok !`)
xiety.sendContact(kopel.from, owner.map( i => i.split("@")[0]), nomer)
await sleep(8000)
await xiety.updateBlockStatus(kopel.from, "block")
}
}
}
})
}
  
xiety.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete Session and Scan Again`);
                xiety.logout();
            }
            else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting....");
                startxiety();
            }
            else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server, reconnecting...");
                startxiety();
            }
            else if (reason === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, reconnecting...");
                startxiety();
            }
            else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Scan Again And Run.`);
                xiety.logout();
            }
            else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...");
                startxiety();
            }
            else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut, Reconnecting...");
                startxiety();
            }
            else if (reason === DisconnectReason.Multidevicemismatch) {
                console.log("Multi device mismatch, please scan again");
                xiety.logout();
            }
            else xiety.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
            console.log(`Connected to = ` + JSON.stringify(xiety.user, null, 2))
        }
    })

    xiety.ev.on('creds.update', saveCreds)

}


startxiety()