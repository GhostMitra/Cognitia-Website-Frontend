export type CartridgeId =
  | 'dashboard'
  | 'rules'
  | 'tracks'
  | 'timeline'
  | 'sponsors'
  | 'members'
  | 'prizes'
  | 'faq';

export type BadgeTone = 'orange' | 'white' | 'red';

export interface Cartridge {
  id: CartridgeId;
  title: string;
  code: string;
  romSize: string;
  genre: string;
  iconName: string;
  description: string;
}

export interface BootStep {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'ok' | 'fail';
  timestamp?: string;
}

export interface TrackItem {
  id: string;
  title: string;
  bounty: string;
  tag: string;
  description: string;
  requirements: string[];
  color: string;
}

export interface TimelineEvent {
  time: string;
  date: string;
  title: string;
  type: 'milestone' | 'keynote' | 'deadline' | 'workshop';
  status: 'completed' | 'current' | 'upcoming';
  desc: string;
}

export interface SponsorItem {
  tier: 'TITANIUM' | 'GOLD' | 'COMMUNITY' | 'POWERED BY';
  name: string;
  perk: string;
  badge: string;
  credits: string;
}

export interface MemberItem {
  name: string;
  role: string;
  handle: string;
  avatarBg: string;
  badge: string;
}

export interface PrizeItem {
  place: string;
  amount: string;
  category: string;
  iconColor: string;
  perks: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
