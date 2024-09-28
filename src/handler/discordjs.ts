import fs from "fs";
import path from "path";
import { select, cancel, text } from "@clack/prompts";

const fsPromises = fs.promises;

export async function handler() {
  const componentType = await select({
    message: "Pick a component type",
    options: [
      { value: "command", label: "Command" },
      { value: "event", label: "Event" },
    ],
  });

  if (String(componentType) === "command") {
    const componentName = await text({
      message: "What's the component's name?",
      placeholder: "Example",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      },
    });
    const componentDescription = await text({
      message: "What's the component's description?",
      placeholder: "Example Description",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      },
    });

    const workingDir = process.cwd();
    const srcDir = path.join(workingDir, "src");
    const commandsDir = path.join(srcDir, "commands");

    try {
      const files = await fsPromises.readdir(workingDir);
      const hasSrcFolder = files.includes("src");

      if (!hasSrcFolder) {
        console.error(
          "\u001b[31mThis project is not a valid project or didn't get set up right!\x1b[0m"
        );
        console.log("\x1b[30m\x1b[1mError: SRC folder not found!\x1b[0m");
        return;
      }

      const srcFiles = await fsPromises.readdir(srcDir);
      const hasCommandFolder = srcFiles.includes("commands");

      if (!hasCommandFolder) {
        await fsPromises.mkdir(commandsDir);
      }

      const filePath = path.join(commandsDir, `${String(componentName)}.ts`);
      const templatePath = path.join(
        __dirname,
        "templates",
        "discordjs",
        "newCommand.ts"
      );
      const templateData = await fsPromises.readFile(templatePath, "utf8");
      const replacedData = templateData.replace(
        /{{componentName}}/g,
        String(componentName)
      );

      await fsPromises.writeFile(filePath, replacedData);

      console.log(
        `Successfully created a command named ${String(
          componentName
        )} with the description ${String(componentDescription)}!`
      );
      console.log(
        "\x1b[36mTo now use the command register it and then use the command handler!\x1b[0m\n"
      );
      console.log(
        "\x1b[30m\x1b[1mCommand Handler: https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands\x1b[0m"
      );
      console.log(
        "\x1b[30m\x1b[1mCommand Register: https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands\x1b[0m"
      );
      console.log("\nThanks ❤️ for choosing PressFlow");
    } catch (e) {
      console.log("\x1b[31m\x1b[1mError: " + e + "\x1b[0m");
    }
  }

  if (String(componentType) === "event") {
    const componentTrigger = await text({
      message: "What's the events trigger?",
      placeholder: "Example",
      validate(value) {
        if (value.length === 0) return "Value is required!";
      },
    });

    const workingDir = process.cwd();
    const srcDir = path.join(workingDir, "src");
    const eventsDir = path.join(srcDir, "events");

    try {
      const files = await fsPromises.readdir(workingDir);
      const hasSrcFolder = files.includes("src");

      if (!hasSrcFolder) {
        console.error(
          "\u001b[31mThis project is not a valid project or didn't get set up right!\x1b[0m"
        );
        console.log("\x1b[30m\x1b[1mError: SRC folder not found!\x1b[0m");
        return;
      }

      const srcFiles = await fsPromises.readdir(srcDir);
      const hasEventsFolder = srcFiles.includes("events");

      if (!hasEventsFolder) {
        await fsPromises.mkdir(eventsDir);
      }

      const filePath = path.join(eventsDir, `${String(componentTrigger)}.ts`);
      const templatePath = path.join(
        __dirname,
        "../templates/discordjs/newEvent.ts"
      );
      const templateData = await fsPromises.readFile(templatePath, "utf8");
      const replacedData = templateData.replace(
        /{{componentTrigger}}/g,
        String(componentTrigger)
      );

      await fsPromises.writeFile(filePath, replacedData);

      console.log(
        `Successfully created a event with the trigger ${String(
          componentTrigger
        )}!`
      );
      console.log("\x1b[36mTo now use the event, just start the bot!\x1b[0m\n");
      console.log(
        "\x1b[30m\x1b[1mEvent Handler: https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands\x1b[0m"
      );
      console.log("");
      console.log("\nThanks ❤️ for choosing PressFlow");
    } catch (e) {
      console.log("\x1b[31m\x1b[1mError: " + e + "\x1b[0m");
    }
  }
}
