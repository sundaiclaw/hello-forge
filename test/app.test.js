const test = require('node:test');
const assert = require('node:assert/strict');

test('base64 publish payload encodes Hello 1!!', () => {
  const payload = Buffer.from(JSON.stringify({ message: 'Hello 1!!' })).toString('base64');
  const decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  assert.equal(decoded.message, 'Hello 1!!');
});
