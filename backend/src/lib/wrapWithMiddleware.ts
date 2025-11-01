export function wrapWithMiddlewares(handler: any, ...middlewares: any[]) {
  return async (c: any) => {
    for (const mw of middlewares) {
      let nextCalled = false;
      let middlewareResponse: any = null;

      // Execute middleware and capture its response
      middlewareResponse = await mw(c, async () => {
        nextCalled = true;
      });

      // If middleware did NOT call next(), return its response
      if (!nextCalled) {
        return middlewareResponse || c.body(null, 500); // Return middleware's response
      }
    }

    // All middleware passed, run the actual handler
    return handler(c);
  };
}