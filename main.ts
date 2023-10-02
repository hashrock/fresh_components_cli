import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import {join} from "https://deno.land/std/path/mod.ts";

interface Component {
  name: string;
  usage: string;
  source: string;
  tags: string[];
}

const basepath = "https://deno.land/x/fresh/www/components/";

const components: Component[] = [
  {
    name: "Button",
    source: "Button.tsx",
    tags: ["button"],
    usage: "<Button>Hello</Button>",
  },
  {
    name: "Footer",
    source: "Footer.tsx",
    tags: ["footer"],
    usage: "<Footer />",
  },
];

await new Command()
  .name("cliffy")
  .version("0.1.0")
  .description("Command line framework for Deno")
  .parse(Deno.args);

const item = components[0];

const source = await fetch(new URL(item.source, basepath));
const text = await source.text();
const dir = join(Deno.cwd(), "components");
const path = join(dir, item.source);

await Deno.mkdir(dir, { recursive: true });
await Deno.writeTextFile(path, text);

console.log("Usage: ")
console.log(item.usage);

