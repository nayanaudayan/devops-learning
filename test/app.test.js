const test = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../src/app');

test('GET /health returns ok', async (t) => {
  const server = createServer().listen(0);
  t.after(() => server.close()); // always runs, even if an assertion fails
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/health`);
  assert.strictEqual(res.status, 200); 
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('unknown route returns 404', async (t) => {
  const server = createServer().listen(0);
  t.after(() => server.close());
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/nope`);
  assert.strictEqual(res.status, 404);
});
