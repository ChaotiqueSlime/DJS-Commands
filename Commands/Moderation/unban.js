const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unban",
    description: "Unban Banned Players",
    category: 'Moderation',
    aliases: [],
    cooldown: 1,
    async execute(message, args) {

        let reason = args.slice(1).join(' ');

        if (!message.member.hasPermission("KICK_MEMBERS")) {

            return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
        }

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {

            return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
        }

        if (!reason) reason = 'No reason supplied';

        let userID = args[0]
        if (!userID) return message.channel.send(`You Need To Unban A ID`)

        message.guild.fetchBans().then(bans => {
            if (bans.size == 0) return message.channel.send('No Body Is Currently Banned!')
            let bUser = bans.find(b => b.user.id == userID)
            if (bUser) {

                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .addField('Action:', 'Unban')
                    .addField('Victim: ', `<@${userID}> - (ID: ${userID})`)
                    .addField('Moderator: ', `<@${message.author.id}>`)
                    .addField('Reason: ', reason)
                    .setFooter(`${message.guild.name}`)
                    .setTimestamp();


                return message.channel.send(embed).then(message.guild.members.unban(bUser.user));
            }

        })
    }
}
