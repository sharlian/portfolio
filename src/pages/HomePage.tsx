import { MaterialAtlas } from '../components/MaterialAtlas';
import { featuredProjects } from '../data/projects';

export function HomePage() {
  return <main id="main-content" tabIndex={-1}><MaterialAtlas projects={featuredProjects} /></main>;
}
