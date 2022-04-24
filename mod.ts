import {
  Application,
  send,
  SendOptions,
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import api from "./api.ts";

const app = new Application();
const PORT = 8000;

app.use(async ({ request }, next) => {
  await next();
  console.log(`${request.method} ${request.url}`);
});

app.use(async ({ response }, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  response.headers.set("X-Response-Time", `${delta}`);
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = [
    "/index.html",
    "/images/favicon.png",
    "/javascripts/script.js",
    "/stylesheets/style.css",
  ];

  const publicFolder: SendOptions = {
    root: `${Deno.cwd()}/public/`,
    index: "index.html",
  };

  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, publicFolder);
  }
});

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}
