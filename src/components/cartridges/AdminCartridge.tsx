import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  Search,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Github,
  Users,
  CheckCircle2,
  AlertTriangle,
  X,
  LogOut,
  CreditCard,
  Ticket,
  Check,
  Sparkles,
  QrCode,
  UserCheck,
  Hourglass,
  RefreshCw,
} from 'lucide-react';
import { awsService } from '../../services/awsService';
import { TeamRegistration, Phase2SelectionStatus, AttendanceStatus } from '../../types';
import { sound } from '../../utils/audio';

export const AdminCartridge: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const [teams, setTeams] = useState<TeamRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedTeamModal, setSelectedTeamModal] = useState<TeamRegistration | null>(null);

  // Attendance Scanner Bar State
  const [scanQuery, setScanQuery] = useState<string>('');
  const [scanMessage, setScanMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const authSession = sessionStorage.getItem('cognitia_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
      loadAdminData();
    }
  }, []);

  const loadAdminData = () => {
    const data = awsService.getAllRegistrations();
    setTeams(data);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (username === 'Cognitia2026Admin' && password === 'fuckoff') {
      sound.playBoot();
      setIsAuthenticated(true);
      sessionStorage.setItem('cognitia_admin_auth', 'true');
      loadAdminData();
    } else {
      sound.playBlip(300);
      setLoginError('Invalid admin credentials. Access denied.');
    }
  };

  const handleAdminLogout = () => {
    sound.playBlip(400);
    setIsAuthenticated(false);
    sessionStorage.removeItem('cognitia_admin_auth');
  };

  const handlePhase2StatusChange = async (teamId: string, newStatus: Phase2SelectionStatus) => {
    sound.playBlip(600);
    await awsService.updatePhase2Selection(teamId, newStatus);
    loadAdminData();
    if (selectedTeamModal && selectedTeamModal.id === teamId) {
      setSelectedTeamModal({ ...selectedTeamModal, phase2Status: newStatus });
    }
  };

  const handleVerifyPaymentAndGenerateTicket = async (teamId: string) => {
    sound.playBoot();
    const res = await awsService.verifyPaymentAndGenerateTicket(teamId);
    if (res.success && res.team) {
      loadAdminData();
      setSelectedTeamModal(res.team);
      alert(`Payment verified! Ticket pass issued: ${res.ticketId}`);
    }
  };

  // QR / Ticket Pass ID Attendance Scan
  const handleAttendanceScanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScanMessage(null);

    if (!scanQuery.trim()) {
      setScanMessage({ type: 'error', text: 'Please scan or enter a Pass Ticket ID or Team ID.' });
      return;
    }

    const res = await awsService.markAttendance(scanQuery, 'checked_in');
    if (res.success && res.team) {
      sound.playBoot();
      loadAdminData();
      setScanMessage({
        type: 'success',
        text: `✓ ATTENDANCE MARKED PRESENT: Team '${res.team.teamName}' (${res.team.ticketPassId || res.team.id})`,
      });
      setScanQuery('');
    } else {
      sound.playBlip(300);
      setScanMessage({ type: 'error', text: res.message || 'Verification failed.' });
    }
  };

  const handleToggleAttendanceStatus = async (teamId: string, currentStatus?: AttendanceStatus) => {
    sound.playBlip(500);
    const nextStatus: AttendanceStatus = currentStatus === 'checked_in' ? 'not_checked_in' : 'checked_in';
    const res = await awsService.markAttendance(teamId, nextStatus);
    if (res.success) {
      loadAdminData();
      if (selectedTeamModal && selectedTeamModal.id === teamId) {
        setSelectedTeamModal({ ...selectedTeamModal, attendanceStatus: nextStatus });
      }
    }
  };

  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.leadEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.ticketPassId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.submission?.projectTitle || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack =
      selectedTrack === 'all' || (t.submission && t.submission.trackId === selectedTrack);

    return matchesSearch && matchesTrack;
  });

  const exportToCSV = () => {
    sound.playBlip(700);
    const headers = [
      'Team ID',
      'Team Name',
      'Lead Email',
      'Lead Phone',
      'Members Count',
      'Project Title',
      'Track',
      'Phase 2 Status',
      'Payment Status',
      'Ticket Pass ID',
      'Venue Attendance',
      'Check-in Time',
    ];

    const rows = teams.map((t) => [
      t.id,
      `"${t.teamName.replace(/"/g, '""')}"`,
      t.leadEmail,
      t.leadPhone,
      t.members.length,
      `"${(t.submission?.projectTitle || 'N/A').replace(/"/g, '""')}"`,
      t.submission?.trackId || 'N/A',
      t.phase2Status || 'pending',
      t.paymentStatus || 'unpaid',
      t.ticketPassId || 'N/A',
      t.attendanceStatus === 'checked_in' ? 'Present' : 'Absent',
      t.checkInTimestamp || 'N/A',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Cognitia2026_Attendance_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Unauthenticated Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-full justify-between gap-3 select-none overflow-y-auto" id="cartridge-admin-login">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[12px] sm:text-[13px] text-[#eb5147]">
                ADMIN CONTROL PORTAL
              </span>
              <span className="bg-[#241818] text-[#eb5147] border border-[#422525] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
                RESTRICTED ROUTE
              </span>
            </div>
            <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
              Authorized administrative personnel only. System activity is logged.
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="flex-1 flex justify-center items-center py-2">
          <div className="w-full max-w-md bg-[#141618] border-2 border-[#422525] p-5 rounded-md shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center gap-2 border-b border-[#331c1c] pb-3 mb-4">
              <ShieldCheck size={18} className="text-[#eb5147]" />
              <span className="font-pixel text-[11px] text-[#eb5147]">
                ADMIN AUTHENTICATION GATE
              </span>
            </div>

            {loginError && (
              <div className="mb-3 p-2 bg-[#261414] border border-[#522525] text-[#fca5a5] font-silkscreen text-[8px] flex items-center gap-1.5 rounded-xs">
                <AlertTriangle size={12} className="text-[#ef4444] shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-3">
              <div>
                <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1 flex items-center gap-1">
                  <User size={10} /> Admin Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cognitia2026Admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#090b0d] border border-[#331c1c] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#eb5147] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-silkscreen text-[8px] text-[#8f9396] mb-1 flex items-center gap-1">
                  <Lock size={10} /> Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#090b0d] border border-[#331c1c] text-[#cfe8ff] font-sans text-xs px-2.5 py-1.5 rounded-xs focus:border-[#eb5147] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#241818] border border-[#522525] hover:border-[#eb5147] font-pixel text-[9px] text-[#eb5147] tracking-wider py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#000] active:translate-y-0.5 transition-none cursor-pointer mt-2"
              >
                <ShieldCheck size={14} /> ACCESS ADMIN CONSOLE
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
          <span>COGNITIA 2026 SECURITY PROTOCOL</span>
          <span className="text-[#eb5147]">CONFIDENTIAL</span>
        </div>
      </div>
    );
  }

  const totalTeams = teams.length;
  const totalSubmissions = teams.filter((t) => t.submission).length;
  const totalPhase2Selected = teams.filter((t) => t.phase2Status === 'selected').length;
  const totalPhase2Waitlisted = teams.filter((t) => t.phase2Status === 'waitlisted').length;
  const totalCheckedIn = teams.filter((t) => t.attendanceStatus === 'checked_in').length;

  return (
    <div className="flex flex-col h-full justify-between gap-2.5 select-none overflow-y-auto" id="cartridge-admin-console">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-md bg-[#141618] border-2 border-[#2b2e30]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[11px] text-[#eb5147]">
              ADMIN CONSOLE
            </span>
            <span className="bg-[#182418] text-[#a7d38a] border border-[#254225] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs">
              LIVE ATTENDANCE SYSTEM
            </span>
          </div>
          <p className="font-silkscreen text-[8px] text-[#8f9396]">
            COGNITIA 2026 &bull; SUBMISSIONS, WAITLIST &amp; VENUE ATTENDANCE SCANNER
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={exportToCSV}
            className="font-pixel text-[8px] bg-[#182418] border border-[#254225] hover:border-[#a7d38a] text-[#a7d38a] py-1 px-2.5 rounded-xs flex items-center gap-1 cursor-pointer"
          >
            <Download size={12} /> EXPORT CSV
          </button>
          <button
            onClick={handleAdminLogout}
            className="font-silkscreen text-[8px] bg-[#261414] border border-[#442222] text-[#eb5147] hover:text-white px-2 py-1 rounded-xs flex items-center gap-1 cursor-pointer"
          >
            <LogOut size={12} /> LOGOUT
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-5 gap-2">
        <div className="p-2 bg-[#141618] border-2 border-[#2b2e30] rounded-md text-center">
          <span className="font-silkscreen text-[7px] text-[#8f9396] block uppercase">REGISTERED</span>
          <span className="font-pixel text-[14px] text-[#6fb3d9]">{totalTeams}</span>
        </div>
        <div className="p-2 bg-[#141618] border-2 border-[#2b2e30] rounded-md text-center">
          <span className="font-silkscreen text-[7px] text-[#8f9396] block uppercase">SUBMISSIONS</span>
          <span className="font-pixel text-[14px] text-[#a7d38a]">{totalSubmissions}</span>
        </div>
        <div className="p-2 bg-[#141618] border-2 border-[#2b2e30] rounded-md text-center">
          <span className="font-silkscreen text-[7px] text-[#8f9396] block uppercase">SELECTED</span>
          <span className="font-pixel text-[14px] text-[#b180ff]">{totalPhase2Selected}</span>
        </div>
        <div className="p-2 bg-[#141618] border-2 border-[#2b2e30] rounded-md text-center">
          <span className="font-silkscreen text-[7px] text-[#8f9396] block uppercase">WAITLISTED</span>
          <span className="font-pixel text-[14px] text-[#f2933d]">{totalPhase2Waitlisted}</span>
        </div>
        <div className="p-2 bg-[#141618] border-2 border-[#2b2e30] rounded-md text-center">
          <span className="font-silkscreen text-[7px] text-[#8f9396] block uppercase">VENUE CHECKED-IN</span>
          <span className="font-pixel text-[14px] text-[#a7d38a]">{totalCheckedIn}</span>
        </div>
      </div>

      {/* OFFLINE VENUE ATTENDANCE SCANNER BAR */}
      <div className="p-3 bg-[#141618] border-2 border-[#a7d38a] rounded-md space-y-2">
        <div className="flex items-center justify-between border-b border-[#254225] pb-1.5">
          <span className="font-pixel text-[10px] text-[#a7d38a] flex items-center gap-1.5">
            <QrCode size={14} /> VENUE ATTENDANCE SCANNER (QR &amp; TICKET PASS ID SEARCH)
          </span>
          <span className="font-silkscreen text-[7px] text-[#8f9396]">
            Scan Pass QR or Type Ticket ID (e.g. COGNITIA-2026-PASS-8921)
          </span>
        </div>

        {scanMessage && (
          <div
            className={`p-2 rounded-xs border font-silkscreen text-[8px] flex items-center gap-1.5 ${
              scanMessage.type === 'success'
                ? 'bg-[#142417] border-[#25522b] text-[#86efac]'
                : 'bg-[#261414] border-[#522525] text-[#fca5a5]'
            }`}
          >
            {scanMessage.type === 'success' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
            <span>{scanMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleAttendanceScanSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Scan Ticket QR code or enter Pass ID / Team ID..."
            value={scanQuery}
            onChange={(e) => setScanQuery(e.target.value)}
            className="flex-1 bg-[#090b0d] border border-[#254225] text-[#a7d38a] font-mono text-xs px-2.5 py-1.5 rounded-xs focus:border-[#a7d38a] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#182418] border border-[#254225] hover:border-[#a7d38a] font-pixel text-[8px] text-[#a7d38a] uppercase px-3 py-1.5 rounded-xs flex items-center gap-1 cursor-pointer"
          >
            <UserCheck size={12} /> MARK PRESENT
          </button>
        </form>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#141618] border-2 border-[#2b2e30] rounded-md">
        <div className="relative flex-1 min-w-[150px]">
          <Search size={12} className="absolute left-2 top-2 text-[#8f9396]" />
          <input
            type="text"
            placeholder="Search teams, ticket IDs, lead emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs pl-6 pr-2 py-1 rounded-xs focus:outline-none"
          />
        </div>

        <select
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value)}
          className="bg-[#090b0d] border border-[#2b2e30] text-[#cfe8ff] font-sans text-xs px-2 py-1 rounded-xs focus:outline-none"
        >
          <option value="all">ALL TRACKS</option>
          <option value="AI / Machine Learning">AI / MACHINE LEARNING</option>
          <option value="Cybersecurity & Privacy">CYBERSECURITY &amp; PRIVACY</option>
          <option value="Web3 & Blockchain">WEB3 &amp; BLOCKCHAIN</option>
          <option value="Open Innovation">OPEN INNOVATION</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="grow bg-[#141618] border-2 border-[#2b2e30] rounded-md overflow-hidden flex flex-col">
        <div className="overflow-x-auto overflow-y-auto max-h-[220px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1c1f23] border-b-2 border-[#2b2e30] font-pixel text-[8px] text-[#f4c151] uppercase">
              <tr>
                <th className="p-2">Team Name</th>
                <th className="p-2">Lead Email</th>
                <th className="p-2">Phase 2 Status</th>
                <th className="p-2">Ticket / Payment</th>
                <th className="p-2">Venue Attendance</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2b2e30] font-sans text-xs text-[#cfe8ff]">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-[#8f9396] font-silkscreen text-[8px]">
                    No registrations or submissions found.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((t) => (
                  <tr key={t.id} className="hover:bg-[#1b1f24]">
                    <td className="p-2 font-semibold text-[#cfe8ff]">
                      {t.teamName}
                      {t.ticketPassId && (
                        <span className="block font-mono text-[9px] text-[#8f9396]">{t.ticketPassId}</span>
                      )}
                    </td>
                    <td className="p-2 text-[#6fb3d9] font-mono">{t.leadEmail}</td>
                    <td className="p-2">
                      <select
                        value={t.phase2Status || 'pending'}
                        onChange={(e) => handlePhase2StatusChange(t.id, e.target.value as Phase2SelectionStatus)}
                        className={`font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs border cursor-pointer ${
                          t.phase2Status === 'selected'
                            ? 'bg-[#2b1f3d] text-[#b180ff] border-[#b180ff]'
                            : t.phase2Status === 'waitlisted'
                            ? 'bg-[#241d14] text-[#f2933d] border-[#423325]'
                            : t.phase2Status === 'not_selected'
                            ? 'bg-[#261414] text-[#eb5147] border-[#522525]'
                            : 'bg-[#181b1e] text-[#8f9396] border-[#2b2e30]'
                        }`}
                      >
                        <option value="pending">PENDING EVAL</option>
                        <option value="selected">SELECTED</option>
                        <option value="waitlisted">WAITLISTED</option>
                        <option value="not_selected">NOT SELECTED</option>
                      </select>
                    </td>
                    <td className="p-2">
                      {t.paymentStatus === 'payment_verified' ? (
                        <span className="bg-[#182418] text-[#a7d38a] border border-[#254225] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs">
                          TICKET ISSUED
                        </span>
                      ) : t.paymentStatus === 'payment_pending' ? (
                        <span className="bg-[#241d14] text-[#f2933d] border border-[#423325] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs animate-pulse">
                          PAYMENT PENDING
                        </span>
                      ) : (
                        <span className="bg-[#1c1f24] text-[#8f9396] border border-[#2b2e30] font-silkscreen text-[7px] px-1.5 py-0.5 rounded-xs">
                          UNPAID
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleToggleAttendanceStatus(t.id, t.attendanceStatus)}
                        className={`font-silkscreen text-[7px] px-2 py-0.5 rounded-xs border flex items-center gap-1 cursor-pointer ${
                          t.attendanceStatus === 'checked_in'
                            ? 'bg-[#182418] text-[#a7d38a] border-[#254225]'
                            : 'bg-[#1c1f24] text-[#8f9396] border-[#2b2e30] hover:text-[#a7d38a]'
                        }`}
                      >
                        <UserCheck size={10} />
                        {t.attendanceStatus === 'checked_in'
                          ? `PRESENT (${t.checkInTimestamp || 'OK'})`
                          : 'MARK PRESENT'}
                      </button>
                    </td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => {
                          sound.playBlip(600);
                          setSelectedTeamModal(t);
                        }}
                        className="bg-[#1e2329] border border-[#3a4149] hover:border-[#f4c151] font-pixel text-[7px] text-[#f4c151] px-2 py-0.5 rounded-xs cursor-pointer"
                      >
                        INSPECT
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECTOR MODAL */}
      {selectedTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex justify-center items-center p-3">
          <div className="w-full max-w-xl bg-[#141618] border-2 border-[#f4c151] p-4 rounded-md shadow-[4px_4px_0_0_#000] max-h-[85vh] overflow-y-auto space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2b2e30] pb-2">
              <div>
                <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase block">
                  SUBMISSION &amp; ATTENDANCE INSPECTOR
                </span>
                <span className="font-pixel text-[12px] text-[#f4c151]">
                  {selectedTeamModal.teamName}
                </span>
              </div>
              <button
                onClick={() => setSelectedTeamModal(null)}
                className="p-1 bg-[#261414] text-[#eb5147] hover:text-white rounded-xs"
              >
                <X size={14} />
              </button>
            </div>

            {/* Offline Attendance Toggle Box */}
            <div className="flex items-center justify-between bg-[#090b0d] border border-[#254225] p-2.5 rounded-xs">
              <div>
                <span className="font-pixel text-[9px] text-[#a7d38a] block">VENUE ATTENDANCE CONTROL</span>
                <span className="font-silkscreen text-[8px] text-[#8f9396]">
                  Status: {selectedTeamModal.attendanceStatus === 'checked_in' ? `Checked in at ${selectedTeamModal.checkInTimestamp || 'Venue'}` : 'Not Checked In'}
                </span>
              </div>
              <button
                onClick={() => handleToggleAttendanceStatus(selectedTeamModal.id, selectedTeamModal.attendanceStatus)}
                className={`font-pixel text-[8px] px-2.5 py-1 rounded-xs border cursor-pointer ${
                  selectedTeamModal.attendanceStatus === 'checked_in'
                    ? 'bg-[#182418] text-[#a7d38a] border-[#254225]'
                    : 'bg-[#1c1f24] text-[#8f9396] border-[#2b2e30] hover:text-[#a7d38a]'
                }`}
              >
                {selectedTeamModal.attendanceStatus === 'checked_in' ? 'TOGGLE ABSENT' : 'MARK PRESENT AT VENUE'}
              </button>
            </div>

            {/* Phase 2 Selection Selector */}
            <div className="flex items-center justify-between bg-[#090b0d] border border-[#2b2e30] p-2.5 rounded-xs">
              <div>
                <span className="font-pixel text-[9px] text-[#b180ff] block">PHASE 2 SELECTION STATUS</span>
                <span className="font-silkscreen text-[8px] text-[#8f9396]">
                  Current Status: {selectedTeamModal.phase2Status || 'pending'}
                </span>
              </div>
              <select
                value={selectedTeamModal.phase2Status || 'pending'}
                onChange={(e) => handlePhase2StatusChange(selectedTeamModal.id, e.target.value as Phase2SelectionStatus)}
                className="font-pixel text-[8px] bg-[#1c1f24] border border-[#3a4149] text-[#b180ff] px-2 py-1 rounded-xs"
              >
                <option value="pending">PENDING EVAL</option>
                <option value="selected">SELECTED FOR PHASE 2</option>
                <option value="waitlisted">WAITLISTED FOR PHASE 2</option>
                <option value="not_selected">NOT SELECTED</option>
              </select>
            </div>

            {/* Payment & Ticket Verification */}
            <div className="bg-[#090b0d] border border-[#2b2e30] p-2.5 rounded-xs space-y-2">
              <div className="flex items-center justify-between border-b border-[#2b2e30] pb-1.5">
                <span className="font-pixel text-[9px] text-[#f4c151]">PHASE 2 PAYMENT VERIFICATION</span>
                <span className="font-silkscreen text-[8px] text-[#8f9396]">
                  Status: {selectedTeamModal.paymentStatus || 'unpaid'}
                </span>
              </div>

              {selectedTeamModal.paymentScreenshotUrl ? (
                <div className="space-y-2">
                  <span className="font-silkscreen text-[8px] text-[#a7d38a] block">SUBMITTED PAYMENT RECEIPT:</span>
                  <div className="border border-[#2b2e30] rounded-xs overflow-hidden h-36 bg-black">
                    <img src={selectedTeamModal.paymentScreenshotUrl} alt="Payment Receipt" className="w-full h-full object-contain" />
                  </div>

                  {selectedTeamModal.paymentStatus !== 'payment_verified' ? (
                    <button
                      onClick={() => handleVerifyPaymentAndGenerateTicket(selectedTeamModal.id)}
                      className="w-full bg-[#182418] border-2 border-[#254225] hover:border-[#a7d38a] font-pixel text-[9px] text-[#a7d38a] uppercase py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#000] cursor-pointer"
                    >
                      <CheckCircle2 size={14} /> VERIFY PAYMENT &amp; GENERATE OFFLINE TICKET PASS
                    </button>
                  ) : (
                    <div className="p-2 bg-[#182418] border border-[#254225] text-[#a7d38a] font-silkscreen text-[8px] text-center rounded-xs">
                      TICKET ISSUED: <span className="font-mono text-white font-bold">{selectedTeamModal.ticketPassId}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="font-silkscreen text-[8px] text-[#8f9396] italic">
                  No payment screenshot uploaded yet by participant team.
                </p>
              )}
            </div>

            {/* Members Roster */}
            <div>
              <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase block mb-1">
                TEAM ROSTER &amp; GITHUB HANDLES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedTeamModal.members.map((m) => (
                  <div key={m.id} className="p-2 bg-[#090b0d] border border-[#2b2e30] rounded-xs font-sans text-xs">
                    <p className="font-bold text-[#cfe8ff]">
                      {m.name} {m.isLead && <span className="text-[#f2933d] font-silkscreen text-[8px]">(LEAD)</span>}
                    </p>
                    <p className="text-[#8f9396] font-silkscreen text-[8px]">{m.role}</p>
                    <p className="text-[#6fb3d9] font-mono mt-0.5"><Github size={9} className="inline" /> @{m.githubId}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Deliverables */}
            {selectedTeamModal.submission ? (
              <div className="space-y-2 border-t border-[#2b2e30] pt-2">
                <span className="font-silkscreen text-[8px] text-[#a7d38a] uppercase block">
                  PROJECT DELIVERABLES:
                </span>

                <div className="p-2 bg-[#090b0d] border border-[#2b2e30] rounded-xs">
                  <p className="font-pixel text-[10px] text-[#f4c151]">{selectedTeamModal.submission.projectTitle}</p>
                  <p className="font-sans text-xs text-[#8f9396] italic">{selectedTeamModal.submission.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <a
                    href={selectedTeamModal.submission.githubRepoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs bg-[#090b0d] border border-[#6fb3d9] text-[#6fb3d9] px-2 py-1 rounded-xs flex items-center gap-1"
                  >
                    <Github size={10} /> REPO LINK <ExternalLink size={9} />
                  </a>

                  {selectedTeamModal.submission.pptUrl && (
                    <a
                      href={selectedTeamModal.submission.pptUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs bg-[#182418] border border-[#254225] text-[#a7d38a] px-2 py-1 rounded-xs flex items-center gap-1"
                    >
                      <FileText size={10} /> PPT SLIDES ({selectedTeamModal.submission.pptFileName}) <ExternalLink size={9} />
                    </a>
                  )}
                </div>

                {selectedTeamModal.submission.screenshots && selectedTeamModal.submission.screenshots.length > 0 && (
                  <div>
                    <span className="font-silkscreen text-[8px] text-[#8f9396] block mb-1">SCREENSHOTS:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {selectedTeamModal.submission.screenshots.map((url, i) => (
                        <div key={i} className="border border-[#2b2e30] rounded-xs overflow-hidden h-20 bg-black">
                          <img src={url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2 bg-[#241d14] border border-[#423325] text-[#f2933d] font-silkscreen text-[8px] text-center rounded-xs">
                THIS TEAM HAS NOT UPLOADED FINAL PROJECT DELIVERABLES YET.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>COGNITIA ATTENDANCE &amp; TICKETING CONTROL</span>
        <span className="text-[#a7d38a]">COGNITIA 2026 ADMIN</span>
      </div>
    </div>
  );
};
