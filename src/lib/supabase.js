import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Local mock storage helper for fallback operation
export const mockStore = {
  getUser: () => {
    const saved = localStorage.getItem('cognitia_hacker_user');
    return saved ? JSON.parse(saved) : {
      id: 'spidey-007',
      email: 'peter.parker@earth616.web',
      handle: 'WebSlinger_616',
      role: 'Frontend Developer',
      universe: 'earth-616',
      team: 'Spider-Alliance',
      track: 'AI Web-Slingers'
    };
  },
  setUser: (user) => {
    localStorage.setItem('cognitia_hacker_user', JSON.stringify(user));
  },
  getSubmissions: () => {
    const saved = localStorage.getItem('cognitia_submissions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'sub-1',
        title: 'Bio-Electric Web Canvas',
        pitch: 'Autonomous AI Spider-Bot for real-time threat detection in urban networks.',
        track: 'AI Web-Slingers',
        repo: 'https://github.com/peterparker/bio-web',
        demo: 'https://bio-web-616.vercel.app',
        status: 'Submitted',
        team: 'Spider-Alliance',
        upvotes: 42
      },
      {
        id: 'sub-2',
        title: 'Oscorp Security Sentinel',
        pitch: 'Zero-trust decentralized firewall detecting Symbiote malware payloads.',
        track: 'Cyber-Defense',
        repo: 'https://github.com/oscorp/sentinel',
        demo: 'https://oscorp-sentinel.io',
        status: 'Under Review',
        team: 'Cyber-Gliders',
        upvotes: 38
      }
    ];
  },
  addSubmission: (sub) => {
    const subs = mockStore.getSubmissions();
    const updated = [sub, ...subs];
    localStorage.setItem('cognitia_submissions', JSON.stringify(updated));
    return updated;
  }
};
