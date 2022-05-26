# Easyutil-Discordjs

What is this?

Easyutil-Discordjs is a library that allows you to manage easily navigation embeds.

How to use it?

```typescript
import NavEmbedBuilder from 'easyutil-discordjs';

// Your command handler...

const embeds: EmbedBuilder[] = [];
for (let i = 1; i <= 5; i++) {
	embeds.push(new EmbedBuilder().setTitle(`Category ${i}`).setDescription("Description"));
	}

const nav = new NavEmbedBuilder(embeds);
nav.start(interaction);
```
