import { expect, test } from 'vitest';
import { collections, missingAssets, projects } from './projects';

test('contains the complete Cargo inventory and category membership', () => {
  expect(projects).toHaveLength(39);
  expect(collections.find((item) => item.slug === 'emotion')?.projectSlugs).toHaveLength(9);
  expect(collections.find((item) => item.slug === 'form')?.projectSlugs).toHaveLength(16);
  expect(collections.find((item) => item.slug === 'function')?.projectSlugs).toHaveLength(10);
});

test('uses only local runtime media paths', () => {
  projects.forEach((project) => {
    expect(project.cover.src).toMatch(/^\/media\/display\//);
    project.content.forEach((block) => {
      if (block.type === 'image' || block.type === 'video') {
        expect(block.src).toMatch(/^\/media\//);
        expect(block.src).not.toContain('cargo.site');
      }
    });
  });
});

test('records the three assets that Cargo could not return', () => {
  expect(missingAssets).toHaveLength(3);
  expect(missingAssets.map((asset) => asset.projectTitle)).toEqual([
    'PET URN | Company',
    'PET URN | Company',
    'PET URN | Tie',
  ]);
});
