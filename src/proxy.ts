const html = `<!doctype html>
<html lang="bg">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Сайтът е временно спрян</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #111; color: #eee; font-family: system-ui, sans-serif; text-align: center; padding: 16px; box-sizing: border-box; }
  h1 { font-size: 1.75rem; margin: 0 0 .5rem; }
  p { color: #aaa; margin: 0; }
</style>
</head>
<body>
  <main>
    <h1>Сайтът е временно спрян</h1>
    <p>Услугата е преустановена поради неплатени задължения.</p>
  </main>
</body>
</html>`;

/** Site suspended for non-payment: every request gets this page. Delete this file to restore the site. */
export function proxy(): Response {
  return new Response(html, {
    status: 503,
    headers: { "content-type": "text/html; charset=utf-8", "retry-after": "86400" },
  });
}
