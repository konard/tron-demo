/**
 * Structural tests for the Tron-like demo page.
 * These guard against accidental regressions to the demo entry point
 * (renamed elements, missing three.js import, broken loop wiring).
 */

import { describe, it, expect } from 'test-anywhere';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const demoPath = join(here, '..', 'docs', 'demo', 'index.html');
const html = readFileSync(demoPath, 'utf8');

describe('tron demo page', () => {
  it('declares an HTML5 doctype', () => {
    expect(html.toLowerCase().startsWith('<!doctype html>')).toBe(true);
  });

  it('has a canvas the renderer can attach to', () => {
    expect(html.includes('id="scene"')).toBe(true);
  });

  it('imports three.js via an import map', () => {
    expect(html.includes('importmap')).toBe(true);
    expect(html.includes('three')).toBe(true);
  });

  it('builds two terrain tiles for the infinite loop', () => {
    expect(html.includes('tileA')).toBe(true);
    expect(html.includes('tileB')).toBe(true);
  });

  it('builds a triangulated spaceship and recycles tiles', () => {
    expect(html.includes('buildShip')).toBe(true);
    expect(html.includes('TILE_D')).toBe(true);
  });

  it('drives the scene with requestAnimationFrame', () => {
    expect(html.includes('requestAnimationFrame')).toBe(true);
  });
});
