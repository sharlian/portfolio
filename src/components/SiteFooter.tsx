import { site } from '../data/projects';

export function SiteFooter() {
  return (
    <footer className="portfolio-footer">
      <p>{site.name}</p>
      <nav aria-label="Contact Sharlian">
        {site.contacts.map((contact) => {
          const external = contact.href.startsWith('http');
          return (
            <a
              aria-label={external ? `${contact.label} — opens in a new tab` : contact.label}
              href={contact.href}
              key={contact.label}
              rel={external ? 'noreferrer' : undefined}
              target={external ? '_blank' : undefined}
            >
              {contact.label}
            </a>
          );
        })}
      </nav>
    </footer>
  );
}
