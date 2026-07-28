import { getDeskMode } from '../utils/deskMode';
import { DeskScene } from './DeskScene';
import '../styles/desk.css';

export function PortfolioDesk({ now = new Date() }: { now?: Date }) {
  return <DeskScene mode={getDeskMode(now)} />;
}
