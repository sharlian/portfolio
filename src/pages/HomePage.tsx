import { PortfolioDesk } from '../components/PortfolioDesk';

export function HomePage({ now }: { now?: Date }) {
  return <main id="main-content" tabIndex={-1}><PortfolioDesk now={now} /></main>;
}
