// import '@quilted/quilt/globals';
// // import {renderToResponse} from '@quilted/quilt/server';
// import {BrowserAssets} from 'quilt:module/assets';

// import {App} from './App.tsx';

// const assets = new BrowserAssets();

export default {
  async fetch(request: Request, {ASSETS}: {ASSETS: any}) {
    if (request.url.endsWith('.css') || request.url.endsWith('.js')) {
      const url = new URL(request.url);
      const assetPath = url.pathname.slice(1);

      const availableDictionary = undefined;
      // const availableDictionary = request.headers.get(
      //   'sec-available-dictionary',
      // );
      if (availableDictionary) {
        const dictionary = await ASSETS.get(
          `${assetPath.replace('assets/', 'diffs/')}.${availableDictionary}.sbr`,
        );

        console.log(
          'dictionary',
          `${assetPath.replace('assets/', 'diffs/')}.${availableDictionary}.sbr`,
        );

        if (dictionary?.body) {
          const headers = new Headers();
          dictionary.writeHttpMetadata(headers as any);
          headers.set('cache-control', 'public, max-age=31536000, immutable');
          headers.set('content-encoding', 'sbr');
          headers.set('content-type', 'application/javascript');
          return new Response(dictionary.body as any, {
            headers,
          });
        }
      }

      const object = await ASSETS.get(assetPath);

      if (!object || !object.body) {
        return new Response(null, {status: 404});
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers as any);
      headers.set('etag', object.httpEtag);

      headers.set('cache-control', 'public, max-age=31536000, immutable');

      const assetPathSplitByDots = url.pathname.split('.');
      const match = `${assetPathSplitByDots.slice(0, -2).join('.')}.*.${assetPathSplitByDots.at(-1)}`;

      headers.set('use-as-dictionary', `match=${JSON.stringify(match)}`);

      return new Response(object.body as any, {
        headers,
      });
    }

    const response = new Response(
      `
      <html>
        <script async src="/assets/browser.JmLcTEgM.js" type="module"></script>
        <link rel="stylesheet" href="/assets/browser.YWwjgM9p.css" />
        <body>
          <div id="app"></div>
        </body>
      </html>
    `,
      {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
          'Origin-Trial':
            'ArnZldPBxuYm2W2w51ckyMVI7/WSVoK3tkB6IQPOlWUyfBb8Q+vVu8XlEs89SltZN2IfafhUTH73mNgnMpdbsQkAAABqeyJvcmlnaW4iOiJodHRwczovL2NocmlzLXRlc3Qtb25lLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29tcHJlc3Npb25EaWN0aW9uYXJ5VHJhbnNwb3J0IiwiZXhwaXJ5IjoxNzE0NTIxNTk5fQ==',
        },
      },
    );

    return response;
  },
};
