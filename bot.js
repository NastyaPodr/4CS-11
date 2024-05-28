const TelegramBot = require('node-telegram-bot-api');

const token = '7409472801:AAE_AZL2VXdbiLJnydUSLK20BbQl8Wy3tCY';

const bot = new TelegramBot(token, { polling: true });

const userLinks = {};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Доброго здоров"я! Надішли мені лінки і я з радістю їх збережу!');
});

bot.onText(/\/links/, (msg) => {
  const userId = msg.from.id;
  if (userLinks[userId] && userLinks[userId].length > 0) {
    userLinks[userId].forEach((link) => {
      bot.sendMessage(msg.chat.id, link);
    });
  } else {
    bot.sendMessage(msg.chat.id, 'Збережені лінки нот фаунд.');
  }
});

bot.on('message', (msg) => {
  const userId = msg.from.id;
  const text = msg.text;

  if (text.startsWith('http://') || text.startsWith('https://')) {
    if (!userLinks[userId]) {
      userLinks[userId] = [];
    }
    userLinks[userId].push(text);
    bot.sendMessage(msg.chat.id, 'Вітаю, людино, лінк збережено!');
  }
});

bot.command('links', (ctx) => {
    const userId = ctx.from.id;
    if (userLinks[userId] && userLinks[userId].length > 0) {
      userLinks[userId].forEach((link, index) => {
        ctx.reply(link, Markup.inlineKeyboard([
          Markup.button.callback('❌', `delete_${userId}_${index}`)
        ]));
      });
    } else {
      ctx.reply('У вас немає збережених лінків.');
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
      ctx.reply('Лінк збережено!');
    }
  });
  
  bot.on('callback_query', (ctx) => {
    const callbackData = ctx.callbackQuery.data;
    if (callbackData.startsWith('delete_')) {
      const parts = callbackData.split('_');
      const userId = parseInt(parts[1], 10);
      const linkIndex = parseInt(parts[2], 10);
  
      if (userLinks[userId] && userLinks[userId][linkIndex]) {
        userLinks[userId].splice(linkIndex, 1);
        ctx.answerCbQuery('Лінк видалено.');
        ctx.deleteMessage();
      } else {
        ctx.answerCbQuery('Ти шо, лінк вже видалено.');
      }
    }
  });

  let linkStillExists = false;
  for (const id in userLinks) {
    if (userLinks[id].includes(linkToDelete)) {
      linkStillExists = true;
      break;
    }
  }

  if (!linkStillExists) {
    for (const id in userLinks) {
      userLinks[id] = userLinks[id].filter(link => link !== linkToDelete);
    }
  }
} else {
  ctx.answerCbQuery('Лінк вже видалено.');
}
}
});

  bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));