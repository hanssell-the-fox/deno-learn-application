import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";

const app = new Application();
const PORT = 8000;

app.use(({ request, response }) => {
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