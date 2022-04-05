import { Application, send } from "https://deno.land/x/oak@v10.5.1/mod.ts";

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

app.use(async ctx => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = [
    "/index.html",
    "/images/favicon.png",
    "/javascripts/script.js",
    "/stylesheets/style.css"
  ]

  console.log(Deno.cwd());
  

  await send(ctx, filePath, { root: `${Deno.cwd()}/public`});
});

app.use(({ response }) => {
  response.body = `
    88888b.  8888b. .d8888b  8888b.  
    888 "88b    "88b88K         "88b 
    888  888.d888888"Y8888b..d888888 
    888  888888  888     X88888  888 
    888  888"Y888888 88888P'"Y888888 
           Mission Control API`;
});

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}
