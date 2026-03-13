// Mock data for the entire Mowasalat CDP application

export const currentEmployee = {
  id: 1,
  fullName: "Ahmed Al-Thani",
  entraObjectId: "abc-123",
  email: "ahmed.althani@mowasalat.com",
  employeeNumber: "MOW-2019-0147",
  position: { id: 3, title: "Senior Project Coordinator", code: "SPC-01", grade: "G7", gradeLevel: 7 },
  department: { id: 2, name: "Planning & Projects", code: "P&P" },
  division: { id: 1, name: "Corporate Services" },
  hireDate: "2019-03-15",
  avatar: null,
};

export const competencies = [
  { id: 1, name: "Project Management", category: "Technical", currentLevel: 3, requiredLevel: 5, gap: 2, severity: "Critical" as const },
  { id: 2, name: "Leadership", category: "Behavioral", currentLevel: 3, requiredLevel: 4, gap: 1, severity: "Moderate" as const },
  { id: 3, name: "Stakeholder Management", category: "Behavioral", currentLevel: 4, requiredLevel: 4, gap: 0, severity: "Met" as const },
  { id: 4, name: "Risk Management", category: "Technical", currentLevel: 2, requiredLevel: 4, gap: 2, severity: "Critical" as const },
  { id: 5, name: "Strategic Planning", category: "Technical", currentLevel: 3, requiredLevel: 4, gap: 1, severity: "Moderate" as const },
  { id: 6, name: "Communication", category: "Behavioral", currentLevel: 4, requiredLevel: 4, gap: 0, severity: "Met" as const },
  { id: 7, name: "Financial Analysis", category: "Technical", currentLevel: 2, requiredLevel: 3, gap: 1, severity: "Moderate" as const },
  { id: 8, name: "Change Management", category: "Behavioral", currentLevel: 3, requiredLevel: 4, gap: 1, severity: "Moderate" as const },
];

export const certifications = [
  { id: 1, code: "PMP", title: "Project Management Professional", provider: "PMI", category: "Project Management", level: "Advanced", cost: 3500, duration: "6 months", validityMonths: 36, isQatarRecommended: true, competencyName: "Project Management", aiConfidence: 95, aiReasoning: "Critical gap in Project Management (Level 3 → 5). PMP is the industry gold standard and directly addresses this competency. Qatar Recommended certification with high employer recognition in the region." },
  { id: 2, code: "PgMP", title: "Program Management Professional", provider: "PMI", category: "Project Management", level: "Expert", cost: 4200, duration: "8 months", validityMonths: 36, isQatarRecommended: true, competencyName: "Project Management", aiConfidence: 78, aiReasoning: "Advanced certification building on PMP. While relevant, recommend completing PMP first before pursuing PgMP. Strong alignment with target Senior PM role." },
  { id: 3, code: "RMP", title: "Risk Management Professional", provider: "PMI", category: "Risk Management", level: "Advanced", cost: 3200, duration: "4 months", validityMonths: 36, isQatarRecommended: false, competencyName: "Risk Management", aiConfidence: 92, aiReasoning: "Critical gap in Risk Management (Level 2 → 4). RMP certification directly targets this competency area and is highly valued in Qatar's transport sector." },
  { id: 4, code: "PSM-II", title: "Professional Scrum Master II", provider: "Scrum.org", category: "Agile", level: "Intermediate", cost: 1500, duration: "2 months", validityMonths: 0, isQatarRecommended: false, competencyName: "Leadership", aiConfidence: 71, aiReasoning: "Moderate gap in Leadership. Scrum Master certification develops servant leadership skills applicable to project management teams." },
  { id: 5, code: "CBAP", title: "Certified Business Analysis Professional", provider: "IIBA", category: "Business Analysis", level: "Advanced", cost: 2800, duration: "5 months", validityMonths: 36, isQatarRecommended: true, competencyName: "Strategic Planning", aiConfidence: 68, aiReasoning: "Moderate gap in Strategic Planning. CBAP covers strategic analysis techniques that support long-term planning capabilities." },
];

export const trainings = [
  { id: 1, code: "PM-BOOT", title: "Project Management Bootcamp", provider: "QatarSkills", format: "InPerson", level: "Intermediate", cost: 1200, duration: "5 days", competencyName: "Project Management", prepForCertId: 1, prepForCertCode: "PMP" },
  { id: 2, code: "LEAD-201", title: "Leadership Essentials for Managers", provider: "HBKU", format: "Hybrid", level: "Intermediate", cost: 800, duration: "3 days", competencyName: "Leadership", prepForCertId: null, prepForCertCode: null },
  { id: 3, code: "RISK-FND", title: "Risk Management Foundations", provider: "QatarSkills", format: "OnlineLive", level: "Entry", cost: 600, duration: "2 days", competencyName: "Risk Management", prepForCertId: 3, prepForCertCode: "RMP" },
  { id: 4, code: "STRAT-301", title: "Strategic Planning Workshop", provider: "QU Professional", format: "InPerson", level: "Advanced", cost: 1500, duration: "4 days", competencyName: "Strategic Planning", prepForCertId: null, prepForCertCode: null },
  { id: 5, code: "FIN-101", title: "Financial Analysis for Non-Finance", provider: "CFA Qatar", format: "SelfPaced", level: "Entry", cost: 450, duration: "20 hours", competencyName: "Financial Analysis", prepForCertId: null, prepForCertCode: null },
  { id: 6, code: "CHG-201", title: "Change Management Practitioner", provider: "Prosci Qatar", format: "Hybrid", level: "Intermediate", cost: 2200, duration: "3 days", competencyName: "Change Management", prepForCertId: null, prepForCertCode: null },
];

export const activePlan = {
  id: 1,
  planCode: "CDP-2026-0023",
  status: "InProgress" as const,
  targetPosition: "Senior Project Manager",
  targetGrade: "G9",
  createdAt: "2026-01-15",
  submittedAt: "2026-01-20",
  approvedAt: "2026-02-01",
  completionPercent: 35,
  totalItems: 8,
  completedItems: 3,
  estimatedCost: 12950,
  items: [
    { id: 1, type: "Certification", title: "PMP - Project Management Professional", competency: "Project Management", quarter: "Q1 2026", priority: "Essential", status: "InProgress", confidence: 95 },
    { id: 2, type: "Course", title: "Project Management Bootcamp", competency: "Project Management", quarter: "Q1 2026", priority: "Essential", status: "Completed", confidence: 88 },
    { id: 3, type: "Certification", title: "RMP - Risk Management Professional", competency: "Risk Management", quarter: "Q2 2026", priority: "Essential", status: "NotStarted", confidence: 92 },
    { id: 4, type: "Course", title: "Risk Management Foundations", competency: "Risk Management", quarter: "Q2 2026", priority: "Essential", status: "Completed", confidence: 85 },
    { id: 5, type: "Course", title: "Leadership Essentials for Managers", competency: "Leadership", quarter: "Q2 2026", priority: "Recommended", status: "Completed", confidence: 76 },
    { id: 6, type: "Course", title: "Strategic Planning Workshop", competency: "Strategic Planning", quarter: "Q3 2026", priority: "Recommended", status: "NotStarted", confidence: 72 },
    { id: 7, type: "Mentorship", title: "Mentorship with Fatima Al-Mansouri", competency: "Leadership", quarter: "Q1-Q4 2026", priority: "Recommended", status: "InProgress", confidence: 84 },
    { id: 8, type: "Course", title: "Financial Analysis for Non-Finance", competency: "Financial Analysis", quarter: "Q3 2026", priority: "Optional", status: "NotStarted", confidence: 65 },
  ],
};

export const recentActivity = [
  { id: 1, text: "Completed Leadership Essentials for Managers", date: "2026-03-10", type: "completion" },
  { id: 2, text: "PMP exam scheduled for April 15", date: "2026-03-08", type: "milestone" },
  { id: 3, text: "Mentorship session with Fatima Al-Mansouri", date: "2026-03-05", type: "session" },
  { id: 4, text: "Risk Management Foundations course completed", date: "2026-02-28", type: "completion" },
  { id: 5, text: "Career Development Plan approved by manager", date: "2026-02-01", type: "approval" },
];

export const faqs = [
  { id: 1, question: "What is a Career Development Plan (CDP)?", answer: "A Career Development Plan is a structured roadmap that helps employees identify their career goals, assess competency gaps, and create an actionable learning plan with certifications, courses, and mentorship opportunities.", category: "General" },
  { id: 2, question: "How do I start creating my CDP?", answer: "Navigate to the CDP Wizard from the sidebar or click 'Start CDP Wizard' on the home page. The wizard will guide you through 6 steps: Profile Review, Gap Analysis, Certification & Course Selection, Schedule, Strategic Alignment, and Review.", category: "CDP" },
  { id: 3, question: "What is Daleel?", answer: "Daleel is Mowasalat's AI-powered career advisor. You can chat with Daleel to explore career paths, understand competency requirements, get certification recommendations, and receive personalized career guidance. Access Daleel from the 'Ask Daleel' button in the top bar.", category: "General" },
  { id: 4, question: "How are certifications recommended?", answer: "Our AI analyzes your competency gaps, career aspirations, and the available certification catalogue. Each recommendation comes with a confidence score (0-100%) and detailed reasoning. Qatar Recommended certifications receive priority.", category: "Learning" },
  { id: 5, question: "What happens after I submit my CDP?", answer: "After submission, your CDP goes to your direct manager for review. They can approve the plan, return it for changes with feedback, or discuss it with you. Once approved, you can begin working on the learning items.", category: "CDP" },
  { id: 6, question: "Can I modify my CDP after approval?", answer: "You can request changes to an approved CDP by creating a revision. The revision will need manager approval. Minor updates like progress tracking are automatic.", category: "CDP" },
  { id: 7, question: "How is 'Qatar Recommended' determined?", answer: "Qatar Recommended certifications are flagged by HR based on national development priorities, NHRD guidelines, and industry standards relevant to Qatar's transport and logistics sector.", category: "Learning" },
  { id: 8, question: "Who can I contact for technical support?", answer: "For technical issues with the CDP platform, email cdp-support@mowasalat.com or raise a ticket through the IT helpdesk. For career development questions, reach out to your HR Business Partner.", category: "Technical" },
];

export const positions = [
  { id: 1, title: "Project Manager", grade: "G8", department: "Planning & Projects" },
  { id: 2, title: "Senior Project Manager", grade: "G9", department: "Planning & Projects" },
  { id: 3, title: "Head of Projects", grade: "G10", department: "Planning & Projects" },
  { id: 4, title: "Operations Manager", grade: "G8", department: "Operations" },
  { id: 5, title: "Senior Operations Manager", grade: "G9", department: "Operations" },
  { id: 6, title: "IT Manager", grade: "G8", department: "IT & Digital" },
];

export const teamMembers = [
  { id: 2, name: "Khalid Al-Mohannadi", position: "Project Coordinator", grade: "G6", cdpStatus: "Approved", readiness: 72, learningCount: 3 },
  { id: 3, name: "Sara Al-Sulaiti", position: "Junior Project Coordinator", grade: "G5", cdpStatus: "PendingApproval", readiness: 45, learningCount: 1 },
  { id: 4, name: "Mohammed Al-Kuwari", position: "Project Analyst", grade: "G6", cdpStatus: "Draft", readiness: 58, learningCount: 2 },
  { id: 5, name: "Noura Al-Hajri", position: "Senior Coordinator", grade: "G7", cdpStatus: "InProgress", readiness: 81, learningCount: 4 },
];

export const pendingApprovals = [
  { id: 10, employeeName: "Sara Al-Sulaiti", targetPosition: "Project Coordinator", submittedAt: "2026-03-11", itemCount: 6, estimatedCost: 8500, planCode: "CDP-2026-0031" },
];

export const strategicPriorities = [
  { id: 1, name: "Qatarization & National Development", description: "Supporting Qatar National Vision 2030 through workforce development" },
  { id: 2, name: "Digital Transformation", description: "Building capabilities in digital technologies and innovation" },
  { id: 3, name: "Operational Excellence", description: "Enhancing service delivery and operational efficiency" },
  { id: 4, name: "Safety & Sustainability", description: "Advancing safety standards and environmental sustainability" },
  { id: 5, name: "Customer Experience", description: "Improving passenger experience and service quality" },
];

export const chatMessages = [
  { id: 1, role: "assistant" as const, content: "Hello Ahmed! I'm Daleel, your career development advisor. How can I help you today?" },
];

export const notifications = [
  { id: 1, text: "PMP exam date approaching — April 15, 2026", type: "warning", unread: true },
  { id: 2, text: "Sara Al-Sulaiti submitted CDP for your approval", type: "action", unread: true },
  { id: 3, text: "New training session available: Strategic Planning Workshop", type: "info", unread: false },
];
