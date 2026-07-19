import { expect, test } from 'vitest';
import { featuredProjects } from './projects';

test('every featured project has all three translations', () => {
  featuredProjects.forEach((project) => {
    expect(Object.keys(project.copy).sort()).toEqual(['en', 'zh-Hans', 'zh-Hant']);
  });
});
