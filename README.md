<div align= center>
<p>
<img src= "https://i.postimg.cc/pVjNr4vd/EasyUtil.jpg?size=1000x350">
</p>
<a href ="https://discord.com/users/401845716991082496">
<img src="https://img.shields.io/badge/Discord-%E2%9C%A6%20ElShyrux%235729-7289DA?style=for-the-badge&logo=Discord" alt="Support" href = "https://discord.com/users/401845716991082496">
</a>
<a href = "https://www.typescriptlang.org/">
<img src="https://img.shields.io/badge/Made%20with-TypeScript-blue?style=for-the-badge&logo=Typescript" alt= "Lang">
</a>
<a href = "https://www.npmjs.com/package/easyutil-discordjs">
<img src="https://img.shields.io/badge/Version-1.0.0-greeen?style=for-the-badge&logo=npm">
</a>
</div>

# Easyutil-Discordjs


## ℹ What version i need for discord.js? 
Discord.js V 14.0.x

### 📜 Introduction
Easyutil-Discordjs is a library that allows you to manage easily navigation embeds.

### 📥 Installing the package

🌐 Windows version:
```cmd
npm i easyutil-discordjs
```
### 📦 Example of use - (Basic)
```typescript
// Language: TypeScript

import { EmbedBuilder } from 'discord.js';
import { PaginationBuilder } from 'easyutil-discordjs';

// Your interaction command handler...

const embeds: EmbedBuilder[] = [];
for (let i = 1; i <= 5; i++) {
	embeds.push(new EmbedBuilder().setTitle(`Category ${i}`).setDescription("Description"));
	}
	
// The NavEmbedBuilder class initialize with an array of embeds
const nav = new PaginationBuilder({embeds: embeds});
nav.start(interaction);
```

### 📷 Screenshots:


### 📦 Example of use - (Advanced)

```typescript
// Language: TypeScript

import { EmbedBuilder } from 'discord.js';
import { PaginationBuilder } from 'easyutil-discordjs';

// Your interaction command handler...

const embeds: EmbedBuilder[] = [];
for (let i = 1; i <= 5; i++) {
	embeds.push(new EmbedBuilder().setTitle(`Category ${i}`).setDescription("Description"));
	}
	
// The NavEmbedBuilder class initialize with an array of embeds
const nav = new PaginationBuilder({
	embeds: embeds, options: {
		message: "Botones expirados!", 
		buttons: {first: '✔', left: '👻', mid: '🤖', right: '⌛', last: '🎁'}
		}
	});
nav.start(interaction);
```