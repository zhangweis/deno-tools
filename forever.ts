import {Denon} from 'https://deno.land/x/denon@2.5.0/mod.ts';
import { parseArgs } from 'https://deno.land/x/denon@2.5.0/src/args.ts';
import {
    grantPermissions,
    initializeConfig,
    printAvailableScripts,
    printHelp,
    upgrade,
  } from "https://deno.land/x/denon@2.5.0/src/cli.ts";
import { CompleteDenonConfig, readConfig, reConfig } from "https://deno.land/x/denon@2.5.0/src/config.ts";
import { BRANCH, VERSION } from "https://deno.land/x/denon@2.5.0/info.ts";
import { log } from "https://deno.land/x/denon@2.5.0/deps.ts";
const logger = log.create("main");

console.log({parseArgs});
const args = parseArgs(Deno.args);
await grantPermissions();
let config = await readConfig(args.config);
config.args = args;

console.log({config})

if (BRANCH !== "main") {
    logger.info(`v${VERSION}-${BRANCH}`);
  } else {
    logger.info(`v${VERSION}`);
  }
  if (args.version) Deno.exit(0);
  // const builtIn = ["run", "test", "fmt", "lint"];
  const script = args.cmd[0];

  // if (!config.scripts[script] && !builtIn.includes(script)) {
  //   const other = closest(script, Object.keys(config.scripts).concat(builtIn));
  //   logger.error(
  //     `Could not find script \`${script}\` did you mean \`${other}\`?`,
  //   );
  //   Deno.exit(1);
  // }

  const denon = new Denon(config);

  // TODO(@qu4k): events
  for await (const event of denon.run(script)) {
    if (event.type === "reload") {
      if (
        event.change.some(
          (_) => reConfig.test(_.path) && _.path === config.configPath,
        )
      ) {
        config = await readConfig(args.config);
        logger.debug("reloading config");
      }
    }
    console.log({event})
  }
