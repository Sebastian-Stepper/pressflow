import { select, cancel } from "@clack/prompts";
import { handler as svelteHandler } from "./handler/svelte";
import { handler as discordjsHandler } from "./handler/discordjs";
import { handler as honoHandler } from "./handler/hono";
import { handler as expressjsHandler } from "./handler/expressjs";

async function main() {
  const selectFramework = await select({
    message: "Pick a framework",
    options: [
      { value: "svelte", label: "Svelte 🔥" },
      { value: "discordjs", label: "DiscordJS 🤖" },
      { value: "expressjs", label: "ExpressJS 🔗" },
      { value: "hono", label: "Hono ⚡" },
    ],
  });

  if (selectFramework === "svelte") {
    svelteHandler();
  }
  if (selectFramework === "discordjs") {
    discordjsHandler();
  }
  if (selectFramework === "expressjs") {
    expressjsHandler();
  }
  if (selectFramework === "hono") {
    honoHandler();
  }
}

main();

module.exports = main;
