import { deskContacts } from '../data/desk';

export function SiteFooter() {
  return (
    <footer className="portfolio-footer">
      <nav aria-label="Contact Sharlian">
        {deskContacts.map((contact) => (
          <a
            aria-label={contact.external ? `${contact.label} — opens in a new tab` : contact.label}
            href={contact.href}
            key={contact.label}
            rel={contact.external ? 'noreferrer' : undefined}
            target={contact.external ? '_blank' : undefined}
          >
            {contact.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
