import { Link } from 'react-router-dom';
import type { DeskCategory } from '../data/desk';

export function CategoryHotspot({ category }: { category: DeskCategory }) {
  return (
    <Link
      aria-label={`${category.title}. ${category.description}`}
      className={`desk-hotspot desk-hotspot--${category.id}`}
      to={category.href}
    >
      <span aria-hidden="true" className="desk-hotspot__object" />
      <span className="desk-hotspot__copy">
        <strong className="desk-hotspot__title">{category.title}</strong>
        <span className="desk-hotspot__description">{category.description}</span>
      </span>
    </Link>
  );
}
