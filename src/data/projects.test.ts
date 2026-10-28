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

test('includes the recovered Company and Tie assets with no remaining gaps', () => {
  const company = projects.find((project) => project.slug === 'company');
  const tie = projects.find((project) => project.slug === 'tie');
  const companyImages = company?.content.flatMap((block) => block.type === 'image' ? [block.src] : []);
  const tieImages = tie?.content.flatMap((block) => block.type === 'image' ? [block.src] : []);

  expect(missingAssets).toEqual([]);
  expect(companyImages).toEqual(expect.arrayContaining([
    '/media/display/E2605376898779255339093382875918.avif',
    '/media/display/L2605378966493245305270733064974.avif',
  ]));
  expect(tieImages).toContain('/media/display/T2605395203538739913302580087566.avif');
});
