import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  Lock,
  Github,
  Plus,
  Trash2,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Users,
  Send,
  CloudUpload,
  Image as ImageIcon,
  Edit2,
  Save,
  QrCode,
  CreditCard,
  Ticket,
  Printer,
  Check,
  Building,
  Calendar,
  Clock,
  Sparkles,
  Hourglass,
  Hash,
} from 'lucide-react';
import { awsService } from '../../services/awsService';
import { TeamRegistration, TeamMember } from '../../types';
import { sound } from '../../utils/audio';

export const RegistrationCartridge: React.FC = () => {
  const [activeLeadTeam, setActiveLeadTeam] = useState<TeamRegistration | null>(null);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'team' | 'submission' | 'phase2'>('team');

  // Auth Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPassword, setLeadPassword] = useState('');
  const [leadGithub, setLeadGithub] = useState('');
  const [teamName, setTeamName] = useState('');

  // Team Edit State
  const [editableTeamName, setEditableTeamName] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  // New Member Form
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Developer');
  const [newMemberGithub, setNewMemberGithub] = useState('');

  // Submission Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [trackId, setTrackId] = useState('AI / Machine Learning');
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [pptUrl, setPptUrl] = useState('');
  const [pptFileName, setPptFileName] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Phase 2 State
  const [paymentScreenshot, setPaymentScreenshot] = useState<string>('');
  const [paymentTxId, setPaymentTxId] = useState<string>('');
  const [isUploadingPayment, setIsUploadingPayment] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refreshActiveTeam();
  }, []);

  const refreshActiveTeam = () => {
    const current = awsService.getActiveLeadTeam();
    if (current) {
      setActiveLeadTeam(current);
      setEditableTeamName(current.teamName);
      setMembers(current.members || []);
      if (current.paymentScreenshotUrl) {
        setPaymentScreenshot(current.paymentScreenshotUrl);
      }
      if (current.paymentTransactionId) {
        setPaymentTxId(current.paymentTransactionId);
      }
      if (current.submission) {
        setProjectTitle(current.submission.projectTitle || '');
        setTagline(current.submission.tagline || '');
        setTrackId(current.submission.trackId || 'AI / Machine Learning');
        setGithubRepoUrl(current.submission.githubRepoUrl || '');
        setPptUrl(current.submission.pptUrl || '');
        setPptFileName(current.submission.pptFileName || '');
        setScreenshots(current.submission.screenshots || []);
      }
    }
  };

  // Handle Team Lead Auth
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (isLoginMode) {
      if (!leadEmail || !leadPassword) {
        setAuthError('Please enter both email and password.');
        return;
      }
      const res = await awsService.loginTeamLead(leadEmail, leadPassword);
      if (res.success && res.team) {
        sound.playBoot();
        setActiveLeadTeam(res.team);
        setEditableTeamName(res.team.teamName);
        setMembers(res.team.members);
        setAuthSuccess('Team lead authenticated successfully.');
      } else {
        sound.playBlip(300);
        setAuthError(res.message || 'Authentication failed.');
      }
    } else {
      if (!teamName || !leadName || !leadEmail || !leadPhone || !leadPassword || !leadGithub) {
        setAuthError('Please fill out all mandatory fields.');
        return;
      }
      const res = await awsService.registerTeamLead({
        teamName,
        leadName,
        leadEmail,
        leadPhone,
        passwordHash: leadPassword,
        leadGitHubId: leadGithub,
      });

      if (res.success && res.team) {
        sound.playBoot();
        setActiveLeadTeam(res.team);
        setEditableTeamName(res.team.teamName);
        setMembers(res.team.members);
        setAuthSuccess('Team lead registered successfully.');
      } else {
        sound.playBlip(300);
        setAuthError(res.message || 'Registration failed.');
      }
    }
  };

  const handleLogout = () => {
    sound.playBlip(400);
    awsService.logoutTeamLead();
    setActiveLeadTeam(null);
  };

  // Add Member
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail || !newMemberPhone || !newMemberGithub) {
      alert('Please fill out all member details.');
      return;
    }

    const cleanEmail = newMemberEmail.trim().toLowerCase();
    const cleanGithub = newMemberGithub.trim().replace(/^@/, '').toLowerCase();

    if (
      members.some((m) => m.email.toLowerCase() === cleanEmail) ||
      awsService.isEmailRegistered(cleanEmail, activeLeadTeam?.id)
    ) {
      alert(`Email '${newMemberEmail}' is already registered for another participant or team lead.`);
      return;
    }

    if (
      members.some((m) => m.githubId.toLowerCase() === cleanGithub) ||
      awsService.isGitHubRegistered(cleanGithub, activeLeadTeam?.id)
    ) {
      alert(`GitHub handle '@${cleanGithub}' is already registered for another participant or team lead.`);
      return;
    }

    const newMem: TeamMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName,
      email: cleanEmail,
      phone: newMemberPhone,
      role: newMemberRole,
      githubId: cleanGithub,
      isLead: false,
    };

    const updated = [...members, newMem];
    setMembers(updated);
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberPhone('');
    setNewMemberGithub('');
    sound.playBlip(700);

    if (activeLeadTeam) {
      const res = await awsService.updateTeamDetails(activeLeadTeam.id, editableTeamName, updated);
      if (!res.success && res.message) {
        alert(res.message);
        setMembers(members);
      }
    }
  };

  const handleRemoveMember = (id: string) => {
    sound.playBlip(350);
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    if (activeLeadTeam) {
      awsService.updateTeamDetails(activeLeadTeam.id, editableTeamName, updated);
    }
  };

  const handleSaveTeamDetails = async () => {
    if (!activeLeadTeam) return;
    const res = await awsService.updateTeamDetails(activeLeadTeam.id, editableTeamName, members);
    if (res.success && res.team) {
      sound.playBlip(800);
      setActiveLeadTeam(res.team);
      setIsEditingTeam(false);
      alert('Team details saved successfully.');
    } else if (res.message) {
      alert(res.message);
    }
  };

  const handlePptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    try {
      const res = await awsService.uploadFileToS3(file, 'ppts');
      setPptUrl(res.url);
      setPptFileName(res.fileName);
      sound.playBlip(900);
    } catch {
      alert('PPT upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const res = await awsService.uploadFileToS3(file, 'screenshots');
        newUrls.push(res.url);
      }
      setScreenshots((prev) => [...prev, ...newUrls]);
      sound.playBlip(900);
    } catch {
      alert('Screenshot upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    if (!activeLeadTeam) return;

    if (!projectTitle || !githubRepoUrl || !pptUrl) {
      setSubmitMessage({
        type: 'error',
        text: 'Please provide project title, GitHub repo URL, and upload your PPT slides.',
      });
      return;
    }

    setIsUploading(true);
    const res = await awsService.saveProjectSubmission(activeLeadTeam.id, {
      projectTitle,
      tagline,
      trackId,
      githubRepoUrl,
      pptUrl,
      pptFileName: pptFileName || 'Presentation.pdf',
      screenshots,
    });
    setIsUploading(false);

    if (res.success && res.submission) {
      sound.playBoot();
      setSubmitMessage({
        type: 'success',
        text: 'Project deliverables submitted successfully!',
      });
    } else {
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit project deliverables.',
      });
    }
  };

  // Phase 2 RSVP & Payment Handlers
  const handleConfirmRsvp = async () => {
    if (!activeLeadTeam) return;
    sound.playBoot();
    const res = await awsService.confirmRsvp(activeLeadTeam.id);
    if (res.success && res.team) {
      setActiveLeadTeam(res.team);
    }
  };

  const handlePaymentScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !activeLeadTeam) return;
    if (!paymentTxId.trim()) {
      alert('Please enter your UPI Transaction ID / UTR Ref Number before uploading receipt.');
      return;
    }

    const file = e.target.files[0];
    setIsUploadingPayment(true);
    try {
      const res = await awsService.uploadFileToS3(file, 'payments');
      const submitRes = await awsService.submitPaymentScreenshot(activeLeadTeam.id, res.url, paymentTxId);
      if (submitRes.success && submitRes.team) {
        sound.playBoot();
        setActiveLeadTeam(submitRes.team);
        setPaymentScreenshot(res.url);
        alert('Payment receipt and Transaction ID submitted for admin verification!');
      }
    } catch {
      alert('Payment screenshot upload failed.');
    } finally {
      setIsUploadingPayment(false);
    }
  };

  const handlePrintTicket = () => {
    sound.playBlip(700);
    window.print();
  };

  // Dynamic UPI Details
  const upiId = 'cognitia2026@upi';
  const amount = '500';
  const remark = activeLeadTeam ? `Cognitia-Phase2-${activeLeadTeam.id}` : 'Cognitia-Phase2';
  const upiUrl = `upi://pay?pa=${upiId}&pn=Cognitia2026&am=${amount}&tn=${encodeURIComponent(remark)}&cu=INR`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}`;

  // Unauthenticated Lead Login / Signup View
  if (!activeLeadTeam) {
    return (
      <div className="flex flex-col h-full justify-between gap-3 select-none overflow-y-auto" id="cartridge-registration">
        {/* Retro Header */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[12px] sm:text-[13px] text-[#f4c151]">
                PARTICIPANT LEAD REGISTRATION &amp; PORTAL
              </span>
              <span className="bg-[#182418] text-[#a7d38a] border border-[#254225] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
                CLOUD SERVER ACTIVE
              </span>
            </div>
            <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
              Register your team lead credentials or log in to manage team members and project deliverables.
            </p>
          </div>
        </div>

        {/* Auth Card Container */}
        <div className="flex-1 flex justify-center items-center py-2">
          <div className="w-full max-w-lg bg-[#141618] border-2 border-[#2b2e30] p-4 sm:p-5 rounded-md shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between border-b border-[#2b2e30] pb-3 mb-4">
              <span className="font-pixel text-[11px] text-[#6fb3d9] flex items-center gap-1.5">
                <User size={14} className="text-[#f4c151]" />
                {isLoginMode ? 'Team Lead Login' : 'New Team Registration'}
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playBlip(450);
                  setIsLoginMode(!isLoginMode);
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className="font-silkscreen text-[8px] text-[#f4c151] hover:underline bg-[#1c1f24] border border-[#33373a] px-2 py-0.5 rounded-xs"
              >
                {isLoginMode ? 'Switch to Signup' : 'Switch to Login'}
              </button>
            </div>

            {authError && (
              <div className="mb-3 p-2 bg-[#261414] border border-[#522525] text-[#fca5a5] font-silkscreen text-[8px] flex items-center gap-1.5 rounded-xs">
                <AlertTriangle size={12} className="text-[#ef4444] shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div className="mb-3 p-2 bg-[#142417] border border-[#25522b] text-[#86efac] font-silkscreen text-[8px] flex items-center gap-1.5 rounded-xs">
                <CheckCircle2 size={12} className="text-[#22c55e] shrink-0" />
                <span>{authSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {!isLoginMode && (
                <>
                  <div>
                    <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1">
                      Team Name <span className="text-[#eb5147]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cyber Spiders"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1">
                      Team Lead Full Name <span className="text-[#eb5147]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Peter Parker"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1 flex items-center gap-1">
                  <Mail size={10} /> Lead Email Address <span className="text-[#eb5147]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="lead@hackathon.org"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
                />
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1 flex items-center gap-1">
                    <Phone size={10} /> Lead Phone Number <span className="text-[#eb5147]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1 flex items-center gap-1">
                  <Lock size={10} /> Password <span className="text-[#eb5147]">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={leadPassword}
                  onChange={(e) => setLeadPassword(e.target.value)}
                  className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
                />
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1 flex items-center gap-1">
                    <Github size={10} /> Lead GitHub Handle <span className="text-[#eb5147]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. peterparker-dev"
                    value={leadGithub}
                    onChange={(e) => setLeadGithub(e.target.value)}
                    className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#1e2329] border border-[#3a4149] hover:border-[#f4c151] font-pixel text-[9px] text-[#f4c151] tracking-wider py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#000] active:translate-y-0.5 transition-none cursor-pointer mt-2"
              >
                {isLoginMode ? 'AUTHENTICATE LEAD' : 'REGISTER TEAM LEAD'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
          <span>VERIFIED BY SECURE CLOUD AUTH</span>
          <span className="text-[#a7d38a]">COGNITIA 2026 REGISTRATION PROTOCOL</span>
        </div>
      </div>
    );
  }

  // Authenticated Lead Dashboard View
  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none overflow-y-auto" id="cartridge-registration-dashboard">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-md bg-[#141618] border-2 border-[#2b2e30]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[11px] text-[#f4c151]">
              Team: {activeLeadTeam.teamName}
            </span>
            <span className="bg-[#182418] text-[#a7d38a] border border-[#254225] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs">
              REGISTERED
            </span>
            {activeLeadTeam.phase2Status === 'selected' && (
              <span className="bg-[#1a2d42] text-[#6fb3d9] border border-[#2b394d] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                <Sparkles size={9} /> PHASE 2 SELECTED
              </span>
            )}
            {activeLeadTeam.phase2Status === 'waitlisted' && (
              <span className="bg-[#241d14] text-[#f2933d] border border-[#423325] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                <Hourglass size={9} /> WAITLISTED
              </span>
            )}
          </div>
          <p className="font-silkscreen text-[8px] text-[#8f9396]">
            Lead: {activeLeadTeam.leadEmail} &bull; ID: {activeLeadTeam.id}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playBlip(500);
              setActiveTab('team');
            }}
            className={`font-pixel text-[8px] px-2.5 py-1 rounded-xs border transition-none cursor-pointer flex items-center gap-1 ${
              activeTab === 'team'
                ? 'bg-[#1a2d42] border-[#f4c151] text-[#f4c151] shadow-[2px_2px_0_0_#000]'
                : 'bg-[#181b1e] border-[#2b2e30] text-[#8f9396] hover:bg-[#202428]'
            }`}
          >
            <Users size={12} /> MEMBERS
          </button>
          <button
            onClick={() => {
              sound.playBlip(500);
              setActiveTab('submission');
            }}
            className={`font-pixel text-[8px] px-2.5 py-1 rounded-xs border transition-none cursor-pointer flex items-center gap-1 ${
              activeTab === 'submission'
                ? 'bg-[#1a2d42] border-[#f4c151] text-[#f4c151] shadow-[2px_2px_0_0_#000]'
                : 'bg-[#181b1e] border-[#2b2e30] text-[#8f9396] hover:bg-[#202428]'
            }`}
          >
            <CloudUpload size={12} /> DELIVERABLES
          </button>
          <button
            onClick={() => {
              sound.playBlip(500);
              setActiveTab('phase2');
            }}
            className={`font-pixel text-[8px] px-2.5 py-1 rounded-xs border transition-none cursor-pointer flex items-center gap-1 ${
              activeTab === 'phase2'
                ? 'bg-[#2b1f3d] border-[#b180ff] text-[#b180ff] shadow-[2px_2px_0_0_#000]'
                : 'bg-[#181b1e] border-[#2b2e30] text-[#b180ff] hover:bg-[#202428]'
            }`}
          >
            <Ticket size={12} /> PHASE 2 OFFLINE
          </button>
          <button
            onClick={handleLogout}
            className="p-1 bg-[#261414] border border-[#442222] text-[#eb5147] hover:text-white rounded-xs text-[8px] font-silkscreen flex items-center gap-1"
            title="Log Out"
          >
            <LogOut size={12} />
          </button>
        </div>
      </div>

      {/* TAB 1: TEAM MEMBERS */}
      {activeTab === 'team' && (
        <div className="space-y-3 grow overflow-y-auto">
          {/* Team Name Settings */}
          <div className="p-3 bg-[#141618] border-2 border-[#2b2e30] rounded-md">
            <div className="flex items-center justify-between border-b border-[#2b2e30] pb-2 mb-2">
              <span className="font-pixel text-[10px] text-[#6fb3d9] flex items-center gap-1">
                <Edit2 size={12} /> TEAM NAME &amp; IDENTIFIER
              </span>
              {!isEditingTeam ? (
                <button
                  onClick={() => setIsEditingTeam(true)}
                  className="font-silkscreen text-[8px] text-[#f4c151] hover:underline"
                >
                  [Edit Name]
                </button>
              ) : (
                <button
                  onClick={handleSaveTeamDetails}
                  className="font-pixel text-[8px] bg-[#182418] text-[#a7d38a] border border-[#254225] px-2 py-0.5 rounded-xs flex items-center gap-1"
                >
                  <Save size={10} /> SAVE DETAILS
                </button>
              )}
            </div>
            {isEditingTeam ? (
              <input
                type="text"
                value={editableTeamName}
                onChange={(e) => setEditableTeamName(e.target.value)}
                className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
              />
            ) : (
              <p className="font-pixel text-[12px] text-[#cfe8ff]">{editableTeamName}</p>
            )}
          </div>

          {/* Members Roster */}
          <div className="p-3 bg-[#141618] border-2 border-[#2b2e30] rounded-md">
            <div className="border-b border-[#2b2e30] pb-2 mb-2">
              <span className="font-pixel text-[10px] text-[#f4c151] flex items-center gap-1">
                <Users size={12} /> REGISTERED MEMBERS ({members.length}/4)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#090b0d] border border-[#2b2e30] p-2 rounded-xs flex items-start justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-pixel text-[9px] text-[#cfe8ff]">{m.name}</span>
                      {m.isLead && (
                        <span className="bg-[#241d14] text-[#f2933d] border border-[#423325] font-silkscreen text-[7px] px-1 py-0.2 rounded-xs">
                          LEAD
                        </span>
                      )}
                    </div>
                    <span className="font-silkscreen text-[7px] text-[#8f9396] block">{m.role}</span>
                    <div className="mt-1 font-silkscreen text-[7px] text-[#7d8285] space-y-0.5">
                      <p className="flex items-center gap-1"><Mail size={9} /> {m.email}</p>
                      <p className="flex items-center gap-1"><Phone size={9} /> {m.phone}</p>
                      <p className="flex items-center gap-1 text-[#6fb3d9] font-mono"><Github size={9} /> @{m.githubId}</p>
                    </div>
                  </div>

                  {!m.isLead && (
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      className="text-[#eb5147] hover:text-red-300 p-0.5"
                      title="Remove Member"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Member Form */}
            <form onSubmit={handleAddMember} className="border-t border-[#2b2e30] pt-2 mt-2">
              <span className="font-silkscreen text-[8px] text-[#8f9396] block mb-1.5 flex items-center gap-1">
                <Plus size={10} /> Add Team Member (Must have unique GitHub ID):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newMemberPhone}
                  onChange={(e) => setNewMemberPhone(e.target.value)}
                  className="bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Frontend)"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
                />
                <input
                  type="text"
                  placeholder="GitHub Handle"
                  value={newMemberGithub}
                  onChange={(e) => setNewMemberGithub(e.target.value)}
                  className="bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
                />
                <button
                  type="submit"
                  className="bg-[#1e2329] border border-[#3a4149] hover:border-[#f4c151] font-pixel text-[8px] text-[#a7d38a] uppercase py-1 px-2 rounded-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus size={10} /> ADD MEMBER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: DELIVERABLES */}
      {activeTab === 'submission' && (
        <form onSubmit={handleProjectSubmit} className="space-y-3 grow overflow-y-auto">
          {submitMessage && (
            <div
              className={`p-2.5 rounded-xs border font-silkscreen text-[8px] flex items-center gap-1.5 ${
                submitMessage.type === 'success'
                  ? 'bg-[#142417] border-[#25522b] text-[#86efac]'
                  : 'bg-[#261414] border-[#522525] text-[#fca5a5]'
              }`}
            >
              {submitMessage.type === 'success' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
              <span>{submitMessage.text}</span>
            </div>
          )}

          <div className="p-3 bg-[#141618] border-2 border-[#2b2e30] rounded-md space-y-2">
            <span className="font-pixel text-[10px] text-[#f4c151] block border-b border-[#2b2e30] pb-1">
              PROJECT TITLE &amp; TRACK
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1">
                  Project Title <span className="text-[#eb5147]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spider-Sense AI"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
                />
              </div>

              <div>
                <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1">
                  Track Selection <span className="text-[#eb5147]">*</span>
                </label>
                <select
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
                >
                  <option value="AI / Machine Learning">AI / Machine Learning</option>
                  <option value="Cybersecurity & Privacy">Cybersecurity & Privacy</option>
                  <option value="Web3 & Blockchain">Web3 & Blockchain</option>
                  <option value="Open Innovation">Open Innovation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1">
                Project Pitch Tagline
              </label>
              <input
                type="text"
                placeholder="Brief one-line summary of project"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs"
              />
            </div>
          </div>

          <div className="p-3 bg-[#141618] border-2 border-[#2b2e30] rounded-md space-y-2">
            <span className="font-pixel text-[10px] text-[#6fb3d9] block border-b border-[#2b2e30] pb-1">
              GITHUB REPOSITORY URL *
            </span>
            <input
              type="url"
              required
              placeholder="https://github.com/username/repo"
              value={githubRepoUrl}
              onChange={(e) => setGithubRepoUrl(e.target.value)}
              className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#6fb3d9] font-mono text-xs px-2 py-1 rounded-xs"
            />
          </div>

          {/* PPT UPLOAD */}
          <div className="p-3 bg-[#141618] border-2 border-[#2b2e30] rounded-md space-y-2">
            <span className="font-pixel text-[10px] text-[#a7d38a] block border-b border-[#2b2e30] pb-1">
              PPT PRESENTATION SLIDES *
            </span>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer font-pixel text-[8px] bg-[#1e2329] border border-[#3a4149] hover:border-[#a7d38a] text-[#a7d38a] py-1 px-2.5 rounded-xs flex items-center gap-1">
                <CloudUpload size={12} /> UPLOAD PPT FILE
                <input
                  type="file"
                  accept=".pdf,.pptx,.ppt"
                  onChange={handlePptUpload}
                  className="hidden"
                />
              </label>
              {pptFileName && (
                <span className="font-silkscreen text-[8px] text-[#a7d38a] bg-[#182418] border border-[#254225] px-2 py-0.5 rounded-xs font-mono">
                  {pptFileName}
                </span>
              )}
            </div>
          </div>

          {/* SCREENSHOTS UPLOAD */}
          <div className="p-3 bg-[#141618] border-2 border-[#2b2e30] rounded-md space-y-2">
            <span className="font-pixel text-[10px] text-[#f2933d] block border-b border-[#2b2e30] pb-1">
              PROJECT SCREENSHOTS
            </span>
            <label className="cursor-pointer font-pixel text-[8px] bg-[#1e2329] border border-[#3a4149] hover:border-[#f2933d] text-[#f2933d] py-1 px-2.5 rounded-xs inline-flex items-center gap-1">
              <Plus size={12} /> ADD SCREENSHOTS
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleScreenshotUpload}
                className="hidden"
              />
            </label>

            {screenshots.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {screenshots.map((url, idx) => (
                  <div key={idx} className="relative group border border-[#2b2e30] rounded-xs overflow-hidden h-16 bg-black">
                    <img src={url} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveScreenshot(idx)}
                      className="absolute top-0.5 right-0.5 p-0.5 bg-[#eb5147] text-white rounded-xs"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-[#182418] border-2 border-[#254225] hover:border-[#a7d38a] font-pixel text-[10px] text-[#a7d38a] uppercase py-2.5 px-3 rounded-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#000] cursor-pointer"
          >
            <Send size={14} /> {isUploading ? 'UPLOADING DELIVERABLES...' : 'SUBMIT PROJECT DELIVERABLES'}
          </button>
        </form>
      )}

      {/* TAB 3: PHASE 2 OFFLINE ROUND & DYNAMIC UPI QR PAYMENT & TICKET */}
      {activeTab === 'phase2' && (
        <div className="space-y-3 grow overflow-y-auto">
          {/* Phase 2 Selection Status Card */}
          {(!activeLeadTeam.phase2Status || activeLeadTeam.phase2Status === 'pending') && (
            <div className="p-4 bg-[#141618] border-2 border-[#2b2e30] rounded-md text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#241d14] text-[#f2933d] border border-[#423325] font-pixel text-[9px] px-3 py-1 rounded-xs">
                <Clock size={14} /> PHASE 1 EVALUATION IN PROGRESS
              </div>
              <p className="font-silkscreen text-[8px] text-[#8f9396]">
                Your Phase 1 project deliverables are under evaluation by the Cognitia Jury. Selection status for the offline round will be updated soon.
              </p>
            </div>
          )}

          {activeLeadTeam.phase2Status === 'waitlisted' && (
            <div className="p-4 bg-[#141618] border-2 border-[#423325] rounded-md text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#241d14] text-[#f2933d] border border-[#423325] font-pixel text-[9px] px-3 py-1 rounded-xs">
                <Hourglass size={14} /> WAITLISTED FOR PHASE 2 OFFLINE ROUND
              </div>
              <p className="font-silkscreen text-[8px] text-[#cfe8ff]">
                Your team is currently on the official Cognitia Phase 2 Waitlist. If a confirmed spot opens up, the jury will promote your team, and you will be notified to confirm RSVP &amp; proceed to payment!
              </p>
            </div>
          )}

          {activeLeadTeam.phase2Status === 'not_selected' && (
            <div className="p-4 bg-[#141618] border-2 border-[#422525] rounded-md text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#261414] text-[#eb5147] border border-[#522525] font-pixel text-[9px] px-3 py-1 rounded-xs">
                <AlertTriangle size={14} /> PHASE 1 COMPLETED
              </div>
              <p className="font-silkscreen text-[8px] text-[#8f9396]">
                Thank you for participating in Cognitia 2026! Unfortunately, your team was not selected for the Phase 2 Offline Round.
              </p>
            </div>
          )}

          {activeLeadTeam.phase2Status === 'selected' && (
            <div className="space-y-3">
              {/* Step 1: RSVP Confirmation */}
              {!activeLeadTeam.rsvpConfirmed ? (
                <div className="p-4 bg-[#141618] border-2 border-[#b180ff] rounded-md space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-[#b180ff]" size={18} />
                    <span className="font-pixel text-[11px] text-[#b180ff]">
                      CONGRATULATIONS! SELECTED FOR PHASE 2 OFFLINE ROUND
                    </span>
                  </div>
                  <p className="font-silkscreen text-[8px] text-[#cfe8ff]">
                    Phase 2 takes place live at the Campus Auditorium. Please confirm your team's offline participation RSVP to proceed to payment and ticket pass generation.
                  </p>
                  <button
                    onClick={handleConfirmRsvp}
                    className="w-full bg-[#2b1f3d] border-2 border-[#b180ff] hover:bg-[#392854] font-pixel text-[9px] text-[#b180ff] uppercase py-2 px-3 rounded-xs flex items-center justify-center gap-2 shadow-[2px_2px_0_0_#000] cursor-pointer"
                  >
                    <Check size={14} /> CONFIRM OFFLINE PARTICIPATION RSVP
                  </button>
                </div>
              ) : (
                <>
                  {/* Step 2: Payment Portal (Unpaid or Pending) */}
                  {activeLeadTeam.paymentStatus !== 'payment_verified' && (
                    <div className="p-4 bg-[#141618] border-2 border-[#2b2e30] rounded-md space-y-3">
                      <div className="flex items-center justify-between border-b border-[#2b2e30] pb-2">
                        <span className="font-pixel text-[10px] text-[#f4c151] flex items-center gap-1.5">
                          <CreditCard size={14} /> PHASE 2 OFFLINE ENTRY FEE &amp; DYNAMIC UPI QR
                        </span>
                        <span className="font-silkscreen text-[8px] bg-[#241d14] text-[#f2933d] border border-[#423325] px-2 py-0.5 rounded-xs">
                          {activeLeadTeam.paymentStatus === 'payment_pending'
                            ? 'VERIFICATION PENDING'
                            : 'PAYMENT REQUIRED'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                        {/* Dynamic UPI QR Code Box */}
                        <div className="bg-[#090b0d] border border-[#2b2e30] p-3 rounded-xs flex flex-col items-center justify-center text-center space-y-2">
                          <span className="font-pixel text-[8px] text-[#6fb3d9]">SCAN TO PAY VIA ANY UPI APP</span>
                          <div className="p-1 bg-white rounded-md border-2 border-[#f4c151]">
                            <img src={qrCodeImageUrl} alt="Dynamic UPI Payment QR" className="w-40 h-40" />
                          </div>
                          <div className="font-mono text-[9px] text-[#a7d38a] space-y-0.5">
                            <p>UPI ID: <span className="font-bold text-white">{upiId}</span></p>
                            <p>AMOUNT: <span className="font-bold text-[#f4c151]">₹{amount} INR</span></p>
                            <p className="text-[8px] text-[#8f9396]">REMARK: {remark}</p>
                          </div>
                        </div>

                        {/* Payment Instructions & Receipt Upload */}
                        <div className="space-y-3">
                          <div className="bg-[#090b0d] border border-[#2b2e30] p-2.5 rounded-xs text-[8px] font-silkscreen text-[#8f9396] space-y-1">
                            <p className="text-[#cfe8ff] font-pixel text-[8px]">PAYMENT INSTRUCTIONS:</p>
                            <p>1. Open Google Pay, PhonePe, Paytm, or BHIM.</p>
                            <p>2. Scan the dynamic QR code above. Amount &amp; Remark will be auto-filled.</p>
                            <p>3. Complete ₹500 payment and copy the Transaction / UTR ID.</p>
                            <p>4. Enter Transaction ID &amp; upload receipt screenshot below.</p>
                          </div>

                          <div>
                            <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1 flex items-center gap-1">
                              <Hash size={10} /> UPI Transaction ID / UTR Ref Number <span className="text-[#eb5147]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 429183749012 or UPI/123456"
                              value={paymentTxId}
                              onChange={(e) => setPaymentTxId(e.target.value)}
                              className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#f4c151] font-mono text-xs px-2.5 py-1.5 rounded-xs focus:border-[#f4c151] focus:outline-none"
                            />
                          </div>

                          {activeLeadTeam.paymentStatus === 'payment_pending' && (
                            <div className="p-2 bg-[#182418] border border-[#254225] text-[#a7d38a] font-silkscreen text-[8px] flex items-center gap-1.5 rounded-xs">
                              <CheckCircle2 size={12} className="shrink-0" />
                              <span>Payment submitted! Tx ID: {paymentTxId}</span>
                            </div>
                          )}

                          <label className="cursor-pointer font-pixel text-[8px] bg-[#1e2329] border border-[#3a4149] hover:border-[#f4c151] text-[#f4c151] py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#000] w-full">
                            <CloudUpload size={14} />
                            {isUploadingPayment
                              ? 'UPLOADING RECEIPT...'
                              : activeLeadTeam.paymentStatus === 'payment_pending'
                              ? 'UPDATE PAYMENT RECEIPT'
                              : 'UPLOAD PAYMENT SCREENSHOT'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePaymentScreenshotUpload}
                              className="hidden"
                            />
                          </label>

                          {paymentScreenshot && (
                            <div className="border border-[#2b2e30] rounded-xs overflow-hidden h-20 bg-black">
                              <img src={paymentScreenshot} alt="Payment Receipt" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Verified Downloadable Offline Pass Ticket */}
                  {activeLeadTeam.paymentStatus === 'payment_verified' && (
                    <div className="space-y-3">
                      <div className="p-2 bg-[#182418] border border-[#254225] text-[#a7d38a] font-silkscreen text-[8px] flex items-center justify-between rounded-xs">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 size={12} /> PAYMENT VERIFIED! OFFICIAL OFFLINE PASS GENERATED.
                        </span>
                        <button
                          onClick={handlePrintTicket}
                          className="font-pixel text-[7px] bg-[#1a2d42] border border-[#f4c151] text-[#f4c151] px-2 py-0.5 rounded-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Printer size={10} /> PRINT / DOWNLOAD
                        </button>
                      </div>

                      {/* TICKET CARD PASS */}
                      <div
                        ref={ticketRef}
                        className="bg-[#141618] border-4 border-[#f4c151] p-4 rounded-md shadow-[6px_6px_0_0_#000] space-y-3 text-[#cfe8ff] relative overflow-hidden"
                      >
                        {/* Background Watermark */}
                        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none font-pixel text-[80px] text-[#f4c151]">
                          2026
                        </div>

                        {/* Ticket Header */}
                        <div className="flex items-center justify-between border-b-2 border-[#f4c151] pb-2">
                          <div>
                            <span className="font-pixel text-[12px] text-[#f4c151] block">
                              COGNITIA 2026 &bull; OFFLINE PASS
                            </span>
                            <span className="font-silkscreen text-[7px] text-[#8f9396]">
                              OFFICIAL PARTICIPANT ENTRY TICKET
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="bg-[#182418] text-[#a7d38a] border border-[#254225] font-mono text-[9px] font-bold px-2 py-0.5 rounded-xs">
                              {activeLeadTeam.ticketPassId}
                            </span>
                            {activeLeadTeam.attendanceStatus === 'checked_in' && (
                              <span className="bg-[#182418] text-[#a7d38a] border border-[#254225] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                                <CheckCircle2 size={8} /> VENUE CHECKED IN ({activeLeadTeam.checkInTimestamp || 'CONFIRMED'})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Team Info & Event Metadata */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                          <div className="sm:col-span-2 space-y-1 font-silkscreen text-[8px]">
                            <p className="font-pixel text-[11px] text-[#6fb3d9]">
                              TEAM: {activeLeadTeam.teamName}
                            </p>
                            <p className="text-[#8f9396]">
                              LEAD: {activeLeadTeam.leadEmail} ({activeLeadTeam.leadPhone})
                            </p>
                            {activeLeadTeam.paymentTransactionId && (
                              <p className="text-[#f4c151] font-mono">
                                TX ID: {activeLeadTeam.paymentTransactionId}
                              </p>
                            )}

                            <div className="pt-1.5 space-y-1 text-[#cfe8ff]">
                              <p className="flex items-center gap-1 text-[#a7d38a]">
                                <Building size={10} /> VENUE: Campus Main Auditorium, Hall B
                              </p>
                              <p className="flex items-center gap-1 text-[#f4c151]">
                                <Calendar size={10} /> DATE: March 14, 2026
                              </p>
                              <p className="flex items-center gap-1 text-[#6fb3d9]">
                                <Clock size={10} /> TIME: 09:00 AM IST
                              </p>
                            </div>
                          </div>

                          {/* Venue Check-In QR */}
                          <div className="bg-[#090b0d] border border-[#2b2e30] p-2 rounded-xs flex flex-col items-center justify-center text-center">
                            <span className="font-pixel text-[7px] text-[#f4c151] mb-1">VENUE CHECK-IN</span>
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                                activeLeadTeam.ticketPassId || activeLeadTeam.id
                              )}`}
                              alt="Ticket Pass QR"
                              className="w-20 h-20 border border-white"
                            />
                            <span className="font-mono text-[6px] text-[#8f9396] mt-1">SCAN AT ENTRANCE</span>
                          </div>
                        </div>

                        {/* Roster List */}
                        <div className="border-t border-[#2b2e30] pt-2">
                          <span className="font-silkscreen text-[7px] text-[#8f9396] uppercase block mb-1">
                            ADMITTED TEAM ROSTER ({activeLeadTeam.members.length}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeLeadTeam.members.map((m) => (
                              <span
                                key={m.id}
                                className="bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-silkscreen text-[7px] px-2 py-0.5 rounded-xs"
                              >
                                {m.name} {m.isLead ? '(LEAD)' : ''} &bull; @{m.githubId}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>ALL TEAM DATA SYNCED TO CLOUD</span>
        <span className="text-[#a7d38a]">COGNITIA 2026</span>
      </div>
    </div>
  );
};
