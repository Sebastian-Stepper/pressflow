import { Hono, Context as HonoContext } from "hono";

const {{componentName}} = new Hono();

app.get(`/{{componentName}}`, (c: Hono<Context>) =>
  c.json("Why did the C++ programmer get lost? He took the wrong branch.")
);

export default {{componentName}};
