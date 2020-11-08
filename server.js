const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");                                     
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");                                                                       
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);          

const app = express();
app.get("/", (request, response) => {
  console.log();
  response.sendStatus(200);                         
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
   
var prefix = ayarlar.prefix;                              

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();                                    
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${ayarlar.prefix}${props.help.name}`);                                     
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {                                  
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);                 
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);                             
    } 
  });
};

//Kanal Koruma//

client.on("channelDelete", async function(channel) {
if(channel.guild.id !== "774985147434926090") return;
    let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});              
    if(logs.entries.first().executor.bot) return;
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("774985109656830012"))
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("774985148546547772"))
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("774985141104672768"))
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("774985163767414784"))

    }) 
const sChannel = channel.guild.channels.find(c=> c.id ==="774985187435347978")              
const cıks = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`${channel.name} adlı Kanal silindi Silen kişinin yetkilerini  çekiyom moruk çıkssss :sorgu:`)         
.setFooter('Recep Efsanesin Selami Var')   
sChannel.send(cıks)
  
channel.guild.owner.send(` **${channel.name}** adlı Kanal silindi Silen  kişinin yetkilerini aldım :sorgu:`)        
}) 

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {               
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

// Doss koruma //

client.on('message', msg => {

if(client.ping > 2500) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "ddos-system")

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :sorgu: __**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti")) 
           .catch(console.error);
}});

client.unload = command => {
  return new Promise((resolve, reject) => {               
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);                 
    }
  });
};

//Küfür Engel//
client.on("message", async msg => {
  
  
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;                     
});

//Küfür Engel//

client.on("messageUpdate", (old, nev) => {
  if (old.content != nev.content) {
    const yasak = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",                
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",                                           
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      "sg",
      "oç",
      "oçe",
      "anan",
      "ananı",
      "ananı sikim",
      "anneni sikim",
      "anneni sikeyim",
      "ananı sikeyim",
      "annen",
      "ağzına",
      "ağzına sıçim",
      "ağzına sıçayım",                               
      "ağzına s",
      "am",
      "ambiti",
      "amını",
      "amını s",
      "amcık",
      "amcik",
      "amcığını",
      "amciğini",
      "amcığını",
      "amcığını s",                                    
      "amck",
      "amckskm",
      "amcuk",
      "amına",
      "amına k",
      "amınakoyim",
      "amına s",
      "amunu",
      "amını",
      "amın oğlu",
      "amın o",
      "amınoğlu",            
      "amk",
      "aq",
      "amnskm",
      "anaskm",
      "ananskm",
      "amkafa",
      "amk çocuğu",
      "amk oç",
      "piç",
      "amk ç",
      "amlar",
      "amcıklar",
      "amq",
      "amındaki",
      "amnskm",            
      "ananı",
      "anan",
      "ananın am",
      "ananızın",
      "aneni",
      "aneni s",               
      "annen",
      "anen",
      "ananın dölü",
      "sperm",
      "döl",
      "anasının am",
      "anası orospu",
      "orospu",
      "orosp,",
      "kahpe",     
      "kahbe",
      "kahße",
      "ayklarmalrmsikerim",
      "ananı avradını",                                         
      "avrat",
      "avradını",
      "avradını s",
      "babanı",
      "babanı s",
      "babanın amk",                
      "annenin amk",
      "ananın amk",
      "bacı",
      "bacını s",
      "babası pezevenk",
      "pezevenk",
      "pezeveng",
      "kaşar",
      "a.q",
      "a.q.",
      "bitch",
      "çük",
      "yarrak",                  
      "am",
      "cibiliyetini",
      "bokbok",
      "bombok",
      "dallama",           
      "göt",
      "götünü s",          
      "ebenin",
      "ebeni",
      "ecdadını",    
      "gavad",
      "ebeni",
      "ebe",
      "fahişe",
      "sürtük",
      "fuck",
      "gotten",
      "götten",
      "göt",                                        
      "gtveren",
      "gttn",
      "gtnde",
      "gtn",
      "hassiktir",
      "hasiktir",                                   
      "hsktr",
      "haysiyetsiz",
      "ibne",
      "ibine",
      "ipne",
      "kaltık",
      "kancık",
      "kevaşe",
      "kevase",
      "kodumun",
      "orosbu",
      "fucker",
      "penis",
      "pic",
      "porno",
      "sex", 
      "sikiş",
      "s1kerim",
      "s1k", 
      "puşt",
      "sakso",
      "sik",
      "skcm",
      "siktir", 
      "sktr",
      "skecem",
      "skeym",
      "slaleni",
      "sokam",
      "sokuş",
      "sokarım",
      "sokarm", 
      "sokaym", 
      "şerefsiz",
      "şrfsz",
      "sürtük",
      "taşak",
      "taşşak",
      "tasak",    
      "tipini s",
      "yarram",
      "yararmorospunun",
      "yarramın başı",                
      "yarramınbaşı",
      "yarraminbasi",
      "yrrk",
      "zikeyim",
      "zikik",
      "zkym"
    ];
    if (yasak.some(banned => nev.content.includes(banned))) {
      if (!nev.member.hasPermission("MANAGE_MESSAGES")) {         
        try {
          nev.delete();
          nev.channel.send(
            `<@${nev.author.id}>, bu sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`
          );
          nev.author.send(
            `<@${nev.author.id}>, **${nev.guild.name}** adlı sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!` 
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});
    client.on("message", async msg => {         
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {                     
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

//Küfür Engel//

client.on("messageUpdate", msg => {                     
  
  
 const i = db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);                   
          }
        }
    }
    if (!i) return;
});
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;            
  return permlvl;
};
client.on("message", async  msg => {
 var i = await db.fetch(`reklam_${msg.guild.id}`)
    if (i == 'acik') {
       const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".ga","cf", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('no reklam').then(msg => msg.delete(3000));                  
    

  msg.delete(3000);                              

            }              
          } catch(err) {
            console.log(err);           
          }
        }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  })
  ;
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => { 
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));                 
});
client.on('guildMemberAdd',async member => {
  let gkisi = client.users.get(member.id);
  
  // Şüpheli hesaba rol verme//
    const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   
    if (ktarih < 2592000001) 
  member.addRole("774985140366868541")
  member.removeRole("774985133592936458 ")                     
  
  
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));       
});

client.login(ayarlar.token);
let ehengel = JSON.parse(
  fs.readFileSync("./ayarlar/everhereengel.json", "utf8")
);

//Everyone-Here Engelleme//

client.on("message", async function(msg) {              
  if (!msg.guild) {
  } else {
    if (!ehengel[msg.guild.id]) {
    } else {
      if (ehengel[msg.guild.id].sistem == false) {
      } else if (ehengel[msg.guild.id].sistem == true) {
        if (msg.author.id == msg.guild.ownerID) {
        } else {
          if (msg.content.includes("@everyone")) {
            msg.delete();
            msg 
              .reply("maalesef `everyone` atmana izin veremem!")                
              .then(msj => msj.delete(3200));
          } else {
          }
          if (msg.content.includes("@here")) {
            msg.delete();
            msg
              .reply("maalesef `here` atmana izin veremem!")                     
              .then(msj => msj.delete(3200));
          } else {
          }
        }
      }                              

    }
  }
  
  //Yasaklı Tagdakilere Cezalı Verme//
  
  client.on("guildMemberAdd", member => {

if(member.user.username.includes("")){
member.addRole("")
member.removeRole("")
member.send("Sunucumuzun Yasaklı Tagında Bulunuyorsunuz,")
  
//Ban Limit//
  
  client.on("guildBanAdd", async (guild, user) => {
  if (!db.has(`banlimit_${guild.id}`)) return;
  let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
  if (logs.entries.first().executor.bot) return;
  const kisi = logs.entries.first().executor
  const member = guild.members.get(kisi.id)
  if (member.hasPermission('ADMINISTRATOR')) return;
  let banlimit = db.fetch(`banlimit_${guild.id}`)
  if (isNaN(banlimit)) return;
  banlimit = banlimit + 1
  if (!db.has(`bansayi_${member.id}_${guild.id}`)) {
    if (banlimit == 1) {
      var array = member.roles.filter(role => role.name !== "@everyone").array()
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.set(`bansayi_${member.id}_${guild.id}`, 1)
    }
  }else{
    const bansayisi = db.fetch(`bansayi_${member.id}_${guild.id}`) + 1
    if (bansayisi >= banlimit) {
      db.delete(`bansayi_${member.id}_${guild.id}`)
      var array = member.roles.filter(role => role.name !== "@everyone").array()                  
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.add(`bansayi_${member.id}_${guild.id}`, 1)                   
    }
  }
})
  
  
}
})
});
client.on('ready', async () => {
client.user.setActivity(`RecepEfsanesi / O Efsane`)
client.user.setStatus('online')
})

// SES SOKMA  //

client.on('ready', ()=>{
client.channels.get('774985138169577482').join()
})

//-------------Tag sistem----------------//

client.on("userUpdate", async (old, nev) => {
  let emingSunucu = "722900315380121745"; //Sunucu ID
  let emingKanal = "775011303546814504"; //BILGI KANAL ID
  let emingRol = "774985169874321409"; //ROL ID
  let emingTag = "O ' × EFSANE ★"; //TAG
  if (old.username !== nev.username) {
    if (
      nev.username.includes(emingTag) &&
      !client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını aldı ${emingRol} rolünü kazandı.**`
        );
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .addRole(emingRol);
    }
    if (
      !nev.username.includes(emingTag) &&
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .removeRole(emingRol);
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını çıkarttı ${emingRol} rolünü kaybetti.**`
        );
    }
  }
});

///////////////////////////////////////////////////