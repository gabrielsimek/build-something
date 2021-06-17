import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('tests my repo', () => {
    const a = 1;
    const b = 2;
    expect(a).toBe(b);
  });
});
