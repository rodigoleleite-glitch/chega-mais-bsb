import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    
    const errorDetails = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : error;

    console.error("APPLICATION CRITICAL ERROR:", errorDetails);
    
    if (import.meta.env.DEV) {
      throw error;
    }

    // Retorna uma página minimalista com o erro para debug visual no Vercel
    const debugHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>Debug Error</title></head>
        <body style="font-family:sans-serif;padding:2rem;line-height:1.5;background:#f9fafb;">
          <h1 style="color:#ef4444;">Application Error</h1>
          <p><strong>Message:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
          <pre style="background:#eee;padding:1rem;border-radius:8px;overflow:auto;max-height:50vh;">${error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}</pre>
          <p><a href="/">Try going home</a></p>
        </body>
      </html>
    `;

    return new Response(debugHtml, {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
