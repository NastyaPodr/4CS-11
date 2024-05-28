const { Telegraf, Markup } = require('telegraf');

const token = '7409472801:AAHV_M5H8Rlc3bu6nGFeiQmUBjTqbyIEBuE';
const bot = new Telegraf(token);

const userLinks = {};

bot.start((ctx) => {
    ctx.reply('Доброго здоров"я! Надішли мені лінки і я з радістю їх збережу!');
});

bot.command('links', (ctx) => {
    const userId = ctx.from.id;
    const links = userLinks[userId] || [];

    if (links.length === 0) {
        ctx.reply('Збережені лінки нот фаунд.');
    } else {
        links.forEach((link, index) => {
            ctx.replyWithHTML(
                `<a href="${link}">${link}</a>`,
                Markup.inlineKeyboard([
                    Markup.button.callback('❌', `delete_link_${index}`)
                ])
            );
        });
    }
});

bot.on('text', (ctx) => {
    const userId = ctx.from.id;
    const text = ctx.message.text;

    if (text.startsWith('http://') || text.startsWith('https://')) {
        if (!userLinks[userId]) {
            userLinks[userId] = [];
        }
        userLinks[userId].push(text);
        ctx.reply('Вітаю, людино, лінк збережено!.');
    }
});

bot.action(/delete_link_(\d+)/, (ctx) => {
    const userId = ctx.from.id;
    const index = parseInt(ctx.match[1]);

    if (userLinks[userId] && userLinks[userId][index]) {
        userLinks[userId].splice(index, 1);
        ctx.reply('Лінк видалено..');

        const links = userLinks[userId] || [];
        if (links.length === 0) {
            ctx.reply('НІ, МОЯ ЇЖА((');
        } else {
            links.forEach((link, index) => {
                ctx.replyWithHTML(
                    `<a href="${link}">${link}</a>`,
                    Markup.inlineKeyboard([
                        Markup.button.callback('❌', `delete_link_${index}`)
                    ])
                );
            });
        }
    } else {
        ctx.reply('Ти шо, лінк вже видалено');
    }
});

// Start the bot
bot.launch()
    .then(() => console.log('Бот: початок'))
    .catch(err => console.error('Блін, помилочка', err));