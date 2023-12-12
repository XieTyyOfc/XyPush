/*
   Created By Xiety
   My Contact wa.me/6285863227753
   XyPush V1.0.0
*/

require("./settings");
const {
    baileys,
    proto,
    generateWAMessageFromContent,
    getContentType
} = require("@whiskeysockets/baileys");
const { getGroupAdmins, isUrl } = require("./lib/functions.js");
const fs = require("fs");
const util = require("util");
const crypto = require("crypto");
module.exports = xiety = async (xiety, m, chatUpdate, store) => {
    try {
        const type = getContentType(m.message);
        const content = JSON.stringify(m.message);
        const from = m.key.remoteJid;
        const quoted =
            type == "extendedTextMessage" &&
            m.message.extendedTextMessage.contextInfo != null
                ? m.message.extendedTextMessage.contextInfo.quotedMessage || []
                : [];
        const mime = (quoted.msg || quoted).mimetype || "";
        const isMedia = /image|video|sticker|audio/.test(mime);
        const body =
            type === "conversation" && m.message.conversation
                ? m.message.conversation
                : type == "imageMessage" && m.message.imageMessage.caption
                ? m.message.imageMessage.caption
                : type == "documentMessage" && m.message.documentMessage.caption
                ? m.message.documentMessage.caption
                : type == "videoMessage" && m.message.videoMessage.caption
                ? m.message.videoMessage.caption
                : type == "extendedTextMessage" &&
                  m.message.extendedTextMessage.text
                ? m.message.extendedTextMessage.text
                : type == "buttonsResponseMessage" &&
                  m.message.buttonsResponseMessage.selectedButtonId
                ? m.message.buttonsResponseMessage.selectedButtonId
                : type == "templateButtonReplyMessage" &&
                  m.message.templateButtonReplyMessage.selectedId
                ? m.message.templateButtonReplyMessage.selectedId
                : "";
        const budy =
            type === "conversation"
                ? m.message.conversation
                : type === "extendedTextMessage"
                ? m.message.extendedTextMessage.text
                : "";
        const prefix =
            /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body)
                ? body.match(
                      /^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi
                  )
                : ".";
        const isCmd = body.startsWith(prefix);
        const command = isCmd
            ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
            : "";
        const args = body.trim().split(/ +/).slice(1);
        const q = (text = args.join(" "));
        const isGroup = from.endsWith("@g.us");
        const botNumber = xiety.user.id.split(":")[0];
        const sender = m.key.fromMe
            ? xiety.user.id.split(":")[0] + "@s.whatsapp.net" || xiety.user.id
            : m.key.participant || m.key.remoteJid;
        const senderNumber = sender.split("@")[0];
        const pushname = m.pushName || `${senderNumber}`;
        const groupMetadata = isGroup ? await xiety.groupMetadata(from) : "";
        const groupName = isGroup ? groupMetadata.subject : "";
        const groupId = isGroup ? groupMetadata.id : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
        const isBotGroupAdmins =
            groupAdmins.includes(`${botNumber}@s.whatsapp.net`) || false;
        const isGroupAdmins = groupAdmins.includes(sender) || false;
        const participants = isGroup ? await groupMetadata.participants : "";
        const isSaya = botNumber.includes(senderNumber);
        const isDev = nomorOwner.includes(senderNumber) || isSaya;
        const isOwner = nomorOwner.includes(senderNumber) || isSaya;
        const sleep = async ms => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        const validGrup = (id, array) => {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == id) {
                    return !0;
                }
            }
            return !1;
        };
        0;

        if (!xiety.public) {
            if (!m.key.fromMe) return;
        }

        const contacts = JSON.parse(
            fs.readFileSync("./database/contacts.json")
        );

        const isContacts = contacts.includes(sender);

        const createSerial = size => {
            return crypto.randomBytes(size).toString("hex").slice(0, size);
        };

        const pickRandom = arr => {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        async function loading() {
            xiety.sendMessage(from, { react: { text: `⌛`, key: m.key } });
            await sleep(1000);
            xiety.sendMessage(from, { react: { text: `1️⃣`, key: m.key } });
            await sleep(1000);
            xiety.sendMessage(from, { react: { text: `2️⃣`, key: m.key } });
            await sleep(1000);
            xiety.sendMessage(from, { react: { text: `3️⃣`, key: m.key } });
            await sleep(1000);
            xiety.sendMessage(from, { react: { text: `✅`, key: m.key } });
        }

        if (isCmd) {
            console.log(
                require("chalk").black(
                    require("chalk").bgGreen(`Command ${prefix + command} `)
                ),
                require("chalk").black(
                    require("chalk").bgWhite(`Dari ${m.pushName}`)
                )
            );
        }

        let list = [];
        for (let i of nomorOwner) {
            list.push({
                displayName: await xiety.getName(i + "@s.whatsapp.net"),
                vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await xiety.getName(i + "@s.whatsapp.net")}\n
FN:${await xiety.getName(i + "@s.whatsapp.net")}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
            });
        }

        const fkontak = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(from ? { remoteJid: "status@broadcast" } : {})
            },
            message: {
                contactMessage: {
                    displayName: `${pushname}\n`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;VelzzyBot,;;;\nFN:${pushname},\nitem1.TEL;waid=${
                        sender.split("@")[0]
                    }:${
                        sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                    jpegThumbnail: {
                        url: "https://telegra.ph/file/3c485ff201d9337be14ef.jpg"
                    }
                }
            }
        };

        const reply = async teks => {
            await xiety.sendMessage(from, { text: teks }, { quoted: fkontak });
        };

        switch (command) {
            case "menu":
                await loading();
                await sleep(1000);
                reply(menu);
                break;

            case "push":
                if (!isOwner) return mess.owner;
                if (!isGroup)
                    return reply(
                        `Maaf Kak Fitur ${
                            prefix + command
                        } Hanya Bisa Di Gunakan Di Dalam Group\nUntuk Memasukan Bot Ke Dalam Group Yang Di Ingin Kan\nSilahkan Ketik Command .join linkgroup`
                    );
                if (!text)
                    return reply(
                        `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
                            prefix + command
                        } jeda|teks`
                    );
                await reply("Otw Boskuuu");
                const halsss = await participants
                    .filter(v => v.id.endsWith(".net"))
                    .map(v => v.id);
                global.tekspushkonv3 = text.split("|")[1];
                for (let men of halsss) {
                    if (/image/.test(mime)) {
                        media = await xiety.downloadAndSaveMediaMessage(quoted);
                        mem = await uptotelegra(media);
                        await xiety.sendMessage(men, {
                            image: { url: mem },
                            caption: global.tekspushkonv3
                        });
                        await sleep(text.split("|")[0]);
                    } else {
                        await xiety.sendMessage(men, {
                            text: global.tekspushkonv3
                        });
                        await sleep(text.split("|")[0]);
                    }
                }
                reply("Succes Boss!");
                break;

            case "pushid":
                if (!isOwner) return reply(mess.owner);
                if (!q)
                    return reply(
                        `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
                            prefix + command
                        } idgroup|jeda|teks\nUntuk Liat Id Group Silahkan Ketik .cekidgc`
                    );
                await reply("Otw Boskuuu");
                const groupMetadataa = !isGroup
                    ? await xiety
                          .groupMetadata(`${q.split("|")[0]}`)
                          .catch(e => {})
                    : "";
                const participantss = !isGroup
                    ? await groupMetadataa.participants
                    : "";
                const halls = await participantss
                    .filter(v => v.id.endsWith(".net"))
                    .map(v => v.id);
                global.tekspushkonv2 = q.split("|")[2];
                for (let mem of halls) {
                    if (/image/.test(mime)) {
                        media = await xiety.downloadAndSaveMediaMessage(quoted);
                        memk = await uptotelegra(media);
                        await xiety.sendMessage(mem, {
                            image: { url: memk },
                            caption: global.tekspushkonv2
                        });
                        await sleep(q.split("|")[1]);
                    } else {
                        await xiety.sendMessage(mem, {
                            text: global.tekspushkonv2
                        });
                        await sleep(q.split("|")[1]);
                    }
                }
                reply("Succes Boss!");
                break;

            case "getidgc":
                if (!isGroup) return reply(mess.group);
                reply(`${m.chat}`);
                break;

            case "cekidgc":
                {
                    if (!isOwner) return reply(mess.owner);
                    let getGroups = await xiety.groupFetchAllParticipating();
                    let groups = Object.entries(getGroups)
                        .slice(0)
                        .map(entry => entry[1]);
                    let anu = groups.map(v => v.id);
                    let teks = `⬣ *LIST GROUP ANDA*\n\nTotal Group : ${anu.length} GROUP\n\n`;
                    for (let x of anu) {
                        let metadata2 = await xiety.groupMetadata(x);
                        teks += `❏ *INFO GROUP*\n│⭔ *NAMA :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBER :* ${metadata2.participants.length}\n╰────|\n\n`;
                    }
                    reply(
                        teks +
                            `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak id|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`
                    );
                }
                break;

            case "jpm":
            case "post":
                {
                    if (!isOwner) return reply(mess.owner);
                    if (!text)
                        return reply(
                            `*Penggunaan Salah Silahkan Gunakan Seperti Ini*\n${
                                prefix + command
                            } teks|jeda\n\nReply Gambar Untuk Mengirim Gambar Ke Semua Group\nUntuk Jeda Itu Delay Jadi Nominal Jeda Itu 1000 = 1 detik`
                        );
                    await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_");
                    let getGroups = await xiety.groupFetchAllParticipating();
                    let groups = Object.entries(getGroups)
                        .slice(0)
                        .map(entry => entry[1]);
                    let anu = groups.map(v => v.id);
                    for (let xnxx of anu) {
                        let metadat72 = await xiety.groupMetadata(xnxx);
                        let participanh = await metadat72.participants;
                        if (/image/.test(mime)) {
                            media =
                                await xiety.downloadAndSaveMediaMessage(quoted);
                            mem = await uptotelegra(media);
                            await xiety.sendMessage(xnxx, {
                                image: { url: mem },
                                caption: text.split("|")[0],
                                mentions: participanh.map(a => a.id)
                            });
                            await sleep(text.split("|")[1]);
                        } else {
                            await xiety.sendMessage(xnxx, {
                                text: text.split("|")[0],
                                mentions: participanh.map(a => a.id)
                            });
                            await sleep(text.split("|")[1]);
                        }
                    }
                    reply("*SUCCESFUL");
                }
                break;

            case "join":
                {
                    if (!isOwner) return reply(mess.owner);
                    if (!text)
                        return reply(`Contoh ${prefix + command} linkgc`);
                    if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
                        return reply("Link Invalid!");
                    let result = args[0].split("https://chat.whatsapp.com/")[1];
                    await xiety
                        .groupAcceptInvite(result)
                        .then(res => reply(util.format(res)))
                        .catch(err => reply(util.format(err)));
                }
                break;

            case "savecontact":
                {
                    if (!isOwner) return reply(mess.owner);
                    if (isGroup) return reply("Khusus Private Chat");
                    if (!text)
                        return reply(
                            `Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${
                                prefix + command
                            } idgroup\nUntuk Liat Id Group Silahkan Ketik .cekidgc`
                        );
                    await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_");
                    const groupMetadataa = !isGroup
                        ? await xiety.groupMetadata(`${text}`).catch(e => {})
                        : "";
                    const participants = !isGroup
                        ? await groupMetadataa.participants
                        : "";
                    const halls = await participants
                        .filter(v => v.id.endsWith(".net"))
                        .map(v => v.id);
                    for (let mem of halls) {
                        if (isContacts) return;
                        contacts.push(mem);
                        fs.writeFileSync(
                            "./database/contacts.json",
                            JSON.stringify(contacts)
                        );
                    }
                    try {
                        const uniqueContacts = [...new Set(contacts)];
                        const vcardContent = uniqueContacts
                            .map((contact, index) => {
                                const vcard = [
                                    "BEGIN:VCARD",
                                    "VERSION:3.0",
                                    `FN:WA[${createSerial(2)}] ${
                                        contact.split("@")[0]
                                    }`,
                                    `TEL;type=CELL;type=VOICE;waid=${
                                        contact.split("@")[0]
                                    }:+${contact.split("@")[0]}`,
                                    "END:VCARD",
                                    ""
                                ].join("\n");
                                return vcard;
                            })
                            .join("");
                        fs.writeFileSync(
                            "./database/contacts.vcf",
                            vcardContent,
                            "utf8"
                        );
                    } catch (err) {
                        reply(util.format(err));
                    } finally {
                        await xiety.sendMessage(
                            from,
                            {
                                document: fs.readFileSync(
                                    "./database/contacts.vcf"
                                ),
                                fileName: "contacts.vcf",
                                caption: "Sukses Tinggal Save Ya Kakak",
                                mimetype: "text/vcard"
                            },
                            { quoted: m }
                        );
                        contacts.splice(0, contacts.length);
                        fs.writeFileSync(
                            "./database/contacts.json",
                            JSON.stringify(contacts)
                        );
                    }
                }
                break;

            case "owner":
            case "creator":
                {
                    xiety.sendContact(m.chat, global.nomorOwner, fkontak);
                }
                break;

            case "sc":
            case "script":
            case "scrip":
                {
                    teks91 = `◎Script Ini Gratis Bisa Kalian Download:

             Linksc:
             Linktutor:
             
             Subscribe youtube.com/@Xietyy`;
                    xiety.sendMessage(
                        from,
                        { text: teks91, mentions: [sender] },
                        { quoted: fkontak }
                    );
                }
                break;

            case "stoppush":
                {
                    if (!isOwner) return reply(mess.owner);
                    txts = `success...
        Please Wait 5 Second`;
                    reply(txts);
                    await sleep(2000);
                    let cp = require("child_process");
                    let { promisify } = require("util");
                    let exec = promisify(cp.exec).bind(cp);
                    let o;
                    try {
                        o = exec("pm2 restart all");
                    } catch (e) {
                        o = e;
                    } finally {
                        let { stdout, stderr } = o;
                    }
                }
                xiety.sendMessage(mess.success);
                break;

            case "shutdown":
                if (!isOwner) return reply(mess.owner);
                reply(`Bye...`);
                await sleep(3000);
                process.exit();
                break;

            case "public":
                {
                    if (!isOwner) return reply(mess.owner);
                    xiety.public = true;
                    reply(`*SUKSES MODE PUBLIC ✅*`);
                }
                break;
            case "self":
                {
                    if (!isOwner) return reply(mess.owner);
                    xiety.public = false;
                    reply(`*SUKSES MODE SELF ✅*`);
                }
                break;

            case "cekmember":
                {
                    if (!isOwner) return reply(mess.owner);
                    if (!q) return reply("Id Nya Mana Kak?");
                    let cekmd = await xiety.groupMetadata(q);
                    let txrk = await xiety.sendMessage(
                        from,
                        {
                            text: `Nama Group : ${cekmd.subject}\nMember : ${cekmd.participants.length} Orang`
                        },
                        { quoted: fkontak }
                    );
                    await xiety.sendMessage(
                        from,
                        {
                            text: `Jika Mau Push Kontak Gunakan Command Di Bawah\n${prefix}pushid`
                        },
                        { quoted: fkontak }
                    );
                }
                break;

            default:
                if (
                    budy &&
                    [
                        "assalamu'alaikum",
                        "Assalamu'alaikum",
                        "Assalamualaikum",
                        "assalamualaikum",
                        "Assalammualaikum",
                        "assalammualaikum",
                        "Asalamualaikum",
                        "asalamualaikum",
                        "Asalamu'alaikum",
                        " asalamu'alaikum"
                    ].includes(budy) &&
                    !isCmd
                ) {
                    xiety.sendMessage(from, {
                        text: `${pickRandom([
                            "Wa'alaikumussalam",
                            "Wa'alaikumussalam Wb.",
                            "Wa'alaikumussalam Wr. Wb.",
                            "Wa'alaikumussalam Warahmatullahi Wabarakatuh"
                        ])}`
                    });
                }
        }
    } catch (e) {
        console.log(e);
    }
};
