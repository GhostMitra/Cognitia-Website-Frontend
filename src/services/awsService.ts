import {
  TeamRegistration,
  ProjectSubmission,
  TeamMember,
  Phase2SelectionStatus,
  Phase2PaymentStatus,
  AttendanceStatus,
} from '../types';

const STORAGE_KEY_TEAMS = 'cognitia_aws_teams_v1';
const STORAGE_KEY_AUTH = 'cognitia_lead_session_v1';

class AWSService {
  private teams: TeamRegistration[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TEAMS);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.teams = parsed.filter(
          (t: TeamRegistration) => !t.id.startsWith('team-spidey-') && !t.id.startsWith('team-cyber-')
        );
      } else {
        this.teams = [];
      }
    } catch {
      this.teams = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(this.teams));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  }

  // S3 Direct Upload Simulation / Integration Layer
  public async uploadFileToS3(
    file: File,
    folder: 'ppts' | 'screenshots' | 'payments'
  ): Promise<{ url: string; fileName: string }> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const bucket = (import.meta as any).env?.VITE_AWS_S3_BUCKET || 'cognitia-2026-submissions-529470779811';
        const region = (import.meta as any).env?.VITE_AWS_REGION || 'ap-south-1';
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const s3Key = `submissions/${folder}/${Date.now()}_${sanitizedName}`;
        
        console.log(`[S3 Direct Upload] Target bucket: s3://${bucket}/${s3Key} (Region: ${region})`);

        resolve({
          url: result,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // Check if an email address is already registered across any team or team member
  public isEmailRegistered(email: string, excludeTeamId?: string): boolean {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return false;
    for (const team of this.teams) {
      if (excludeTeamId && team.id === excludeTeamId) continue;
      if (team.leadEmail.toLowerCase() === normalized) return true;
      for (const m of team.members) {
        if (m.email.toLowerCase() === normalized) return true;
      }
    }
    return false;
  }

  // Check if a GitHub handle is already registered across any team or team member
  public isGitHubRegistered(githubId: string, excludeTeamId?: string): boolean {
    const normalized = githubId.trim().replace(/^@/, '').toLowerCase();
    if (!normalized) return false;
    for (const team of this.teams) {
      if (excludeTeamId && team.id === excludeTeamId) continue;
      for (const m of team.members) {
        if (m.githubId.toLowerCase() === normalized) return true;
      }
    }
    return false;
  }

  // Team Lead Authentication & Registration
  public async registerTeamLead(data: {
    teamName: string;
    leadEmail: string;
    leadPhone: string;
    passwordHash: string;
    leadGitHubId: string;
    leadName: string;
  }): Promise<{ success: boolean; team?: TeamRegistration; message?: string }> {
    const cleanEmail = data.leadEmail.trim().toLowerCase();
    const cleanGitHub = data.leadGitHubId.trim().replace(/^@/, '').toLowerCase();

    if (this.isEmailRegistered(cleanEmail)) {
      return {
        success: false,
        message: `Email address '${data.leadEmail}' is already registered (as a Team Lead or Member). Please use a unique email or log in.`,
      };
    }

    if (this.isGitHubRegistered(cleanGitHub)) {
      return {
        success: false,
        message: `GitHub username '@${cleanGitHub}' is already registered in a team. Each participant must use a unique GitHub ID.`,
      };
    }

    const newTeam: TeamRegistration = {
      id: `team-${Date.now()}`,
      teamName: data.teamName,
      leadEmail: cleanEmail,
      leadPhone: data.leadPhone,
      leadPasswordHash: data.passwordHash,
      registeredAt: new Date().toISOString(),
      phase2Status: 'pending',
      paymentStatus: 'unpaid',
      attendanceStatus: 'not_checked_in',
      members: [
        {
          id: `mem-lead-${Date.now()}`,
          name: data.leadName || 'Team Lead',
          email: cleanEmail,
          phone: data.leadPhone,
          role: 'Team Lead',
          githubId: cleanGitHub,
          isLead: true,
        },
      ],
    };

    this.teams.unshift(newTeam);
    this.saveToStorage();
    this.setLeadSession(newTeam.id);

    return { success: true, team: newTeam };
  }

  public async loginTeamLead(
    email: string,
    passwordHash: string
  ): Promise<{ success: boolean; team?: TeamRegistration; message?: string }> {
    const team = this.teams.find(
      (t) => t.leadEmail.toLowerCase() === email.trim().toLowerCase()
    );

    if (!team) {
      return { success: false, message: 'No registered team found with this email address.' };
    }

    if (team.leadPasswordHash && team.leadPasswordHash !== passwordHash) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    this.setLeadSession(team.id);
    return { success: true, team };
  }

  public setLeadSession(teamId: string | null) {
    if (teamId) {
      localStorage.setItem(STORAGE_KEY_AUTH, teamId);
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  }

  public getActiveLeadTeam(): TeamRegistration | null {
    const teamId = localStorage.getItem(STORAGE_KEY_AUTH);
    if (!teamId) return null;
    return this.teams.find((t) => t.id === teamId) || null;
  }

  public logoutTeamLead() {
    this.setLeadSession(null);
  }

  // Team Management: Update Team Name & Team Members
  public async updateTeamDetails(
    teamId: string,
    teamName: string,
    members: TeamMember[]
  ): Promise<{ success: boolean; team?: TeamRegistration; message?: string }> {
    const index = this.teams.findIndex((t) => t.id === teamId);
    if (index === -1) return { success: false, message: 'Team not found.' };

    for (const m of members) {
      if (!m.isLead) {
        if (this.isEmailRegistered(m.email, teamId)) {
          return {
            success: false,
            message: `Email address '${m.email}' is already registered in another team.`,
          };
        }
        if (this.isGitHubRegistered(m.githubId, teamId)) {
          return {
            success: false,
            message: `GitHub handle '@${m.githubId}' is already registered in another team.`,
          };
        }
      }
    }

    this.teams[index].teamName = teamName;
    this.teams[index].members = members;
    this.saveToStorage();

    return { success: true, team: this.teams[index] };
  }

  // Project Deliverable Submission (PPT, Github, Screenshots)
  public async saveProjectSubmission(
    teamId: string,
    submissionData: Omit<ProjectSubmission, 'id' | 'teamId' | 'submittedAt' | 'updatedAt'>
  ): Promise<{ success: boolean; submission?: ProjectSubmission }> {
    const team = this.teams.find((t) => t.id === teamId);
    if (!team) return { success: false };

    const now = new Date().toISOString();
    const submission: ProjectSubmission = {
      ...submissionData,
      id: team.submission?.id || `sub-${Date.now()}`,
      teamId,
      submittedAt: team.submission?.submittedAt || now,
      updatedAt: now,
    };

    team.submission = submission;
    this.saveToStorage();

    return { success: true, submission };
  }

  // PHASE 2 OFFLINE ROUND & SELECTION METHODS

  // Admin updates team Phase 2 selection status ('selected' | 'waitlisted' | 'not_selected' | 'pending')
  public async updatePhase2Selection(
    teamId: string,
    status: Phase2SelectionStatus
  ): Promise<{ success: boolean; team?: TeamRegistration }> {
    const team = this.teams.find((t) => t.id === teamId);
    if (!team) return { success: false };

    team.phase2Status = status;
    this.saveToStorage();
    return { success: true, team };
  }

  // Participant confirms Phase 2 RSVP
  public async confirmRsvp(teamId: string): Promise<{ success: boolean; team?: TeamRegistration }> {
    const team = this.teams.find((t) => t.id === teamId);
    if (!team) return { success: false };

    team.rsvpConfirmed = true;
    this.saveToStorage();
    return { success: true, team };
  }

  // Participant uploads Phase 2 payment screenshot
  public async submitPaymentScreenshot(
    teamId: string,
    screenshotUrl: string
  ): Promise<{ success: boolean; team?: TeamRegistration }> {
    const team = this.teams.find((t) => t.id === teamId);
    if (!team) return { success: false };

    team.paymentStatus = 'payment_pending';
    team.paymentScreenshotUrl = screenshotUrl;
    team.paymentSubmittedAt = new Date().toISOString();
    this.saveToStorage();

    return { success: true, team };
  }

  // Admin verifies payment & issues unique pass ticket ID
  public async verifyPaymentAndGenerateTicket(
    teamId: string
  ): Promise<{ success: boolean; team?: TeamRegistration; ticketId?: string }> {
    const team = this.teams.find((t) => t.id === teamId);
    if (!team) return { success: false };

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `COGNITIA-2026-PASS-${randomDigits}`;

    team.paymentStatus = 'payment_verified';
    team.ticketPassId = ticketId;
    team.ticketIssuedAt = new Date().toISOString();
    this.saveToStorage();

    return { success: true, team, ticketId };
  }

  // OFFLINE ATTENDANCE CHECK-IN METHOD
  public async markAttendance(
    query: string,
    status: AttendanceStatus
  ): Promise<{ success: boolean; team?: TeamRegistration; message?: string }> {
    const clean = query.trim().toLowerCase();
    if (!clean) return { success: false, message: 'Please enter a valid Pass Ticket ID or Team ID.' };

    const team = this.teams.find(
      (t) =>
        t.id.toLowerCase() === clean ||
        (t.ticketPassId && t.ticketPassId.toLowerCase() === clean)
    );

    if (!team) {
      return { success: false, message: `No registered team matching Ticket/ID '${query}' was found.` };
    }

    team.attendanceStatus = status;
    team.checkInTimestamp = status === 'checked_in' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined;
    this.saveToStorage();

    return { success: true, team };
  }

  // Admin Access Methods
  public getAllRegistrations(): TeamRegistration[] {
    return [...this.teams];
  }
}

export const awsService = new AWSService();
