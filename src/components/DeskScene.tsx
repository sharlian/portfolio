import { deskCategories } from '../data/desk';
import type { DeskMode } from '../utils/deskMode';
import { AllWorksHotspot } from './AllWorksHotspot';
import { CategoryHotspot } from './CategoryHotspot';

export function DeskScene({ mode }: { mode: DeskMode }) {
  return (
    <section aria-label="Explore work on Sharlian's desk" className="desk-scene" data-mode={mode}>
      <div aria-hidden="true" className="desk-scene__light" />
      <nav aria-label="Portfolio categories" className="desk-navigation">
        <AllWorksHotspot />
        {deskCategories.map((category) => <CategoryHotspot category={category} key={category.id} />)}
      </nav>
      <p className="desk-scene__statement">Every object on this desk represents a part of how I think as a designer.</p>
      <span aria-hidden="true" className="desk-scene__maker-mark">S. TSENG</span>
    </section>
  );
}
