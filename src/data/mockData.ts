// Mock data for the entire Mowasalat CDP application

export const currentEmployee = {
  id: 1,
  fullName: "Ahmed Al-Thani",
  entraObjectId: "abc-123",
  email: "ahmed.althani@mowasalat.com",
  phone: "+974 5555 1234",
  employeeNumber: "MOW-2019-0147",
  nationality: "Qatari",
  dateOfBirth: "1992-06-15",
  position: { id: 3, title: "Senior Project Coordinator", code: "SPC-01", grade: "G7", gradeLevel: 7 },
  department: { id: 2, name: "Planning & Projects", code: "P&P" },
  division: { id: 1, name: "Corporate Services" },
  hireDate: "2019-03-15",
  avatar: null,
  manager: "Fatima Al-Mansouri",
  managerTitle: "Head of Projects",
  location: "Doha, Qatar",
  education: [
    { degree: "Bachelor of Science in Civil Engineering", institution: "Qatar University", year: "2014" },
    { degree: "Master of Business Administration", institution: "HEC Paris Qatar", year: "2018" },
  ],
  certifications: [
    { name: "PRINCE2 Foundation", provider: "Axelos", year: "2020", status: "Active" },
    { name: "Lean Six Sigma Green Belt", provider: "ASQ", year: "2021", status: "Active" },
  ],
};

export const providers = [
  { id: 1, name: "PMI", fullName: "Project Management Institute", logo: null, country: "USA", website: "https://www.pmi.org" },
  { id: 2, name: "Scrum.org", fullName: "Scrum.org", logo: null, country: "USA", website: "https://www.scrum.org" },
  { id: 3, name: "IIBA", fullName: "International Institute of Business Analysis", logo: null, country: "Canada", website: "https://www.iiba.org" },
  { id: 4, name: "QatarSkills", fullName: "Qatar Skills Development Center", logo: null, country: "Qatar", website: "https://qatarskills.qa" },
  { id: 5, name: "HBKU", fullName: "Hamad Bin Khalifa University", logo: null, country: "Qatar", website: "https://www.hbku.edu.qa" },
  { id: 6, name: "QU Professional", fullName: "Qatar University Professional Development", logo: null, country: "Qatar", website: "https://www.qu.edu.qa" },
  { id: 7, name: "CFA Qatar", fullName: "CFA Society Qatar", logo: null, country: "Qatar", website: "https://cfaqatar.org" },
  { id: 8, name: "Prosci Qatar", fullName: "Prosci Qatar Partner", logo: null, country: "Qatar", website: "https://prosci.com" },
];

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
  {
    id: 1, code: "PMP", title: "Project Management Professional", provider: "PMI", category: "Project Management",
    level: "Advanced", cost: 3500, duration: "6 months", validityMonths: 36, isQatarRecommended: true,
    competencyName: "Project Management", aiConfidence: 95,
    aiReasoning: "Critical gap in Project Management (Level 3 → 5). PMP is the industry gold standard and directly addresses this competency. Qatar Recommended certification with high employer recognition in the region.",
    description: "The PMP certification validates your ability to lead and direct projects. It demonstrates competency in initiating, planning, executing, monitoring & controlling, and closing projects.",
    skills: ["Project Planning", "Risk Assessment", "Stakeholder Communication", "Budget Management", "Agile Methodologies", "Earned Value Management"],
    prerequisites: ["35 hours of project management education", "4,500+ hours leading projects (with degree)"],
    examFormat: "180 questions, 230 minutes",
    image: null,
  },
  {
    id: 2, code: "PgMP", title: "Program Management Professional", provider: "PMI", category: "Project Management",
    level: "Expert", cost: 4200, duration: "8 months", validityMonths: 36, isQatarRecommended: true,
    competencyName: "Project Management", aiConfidence: 78,
    aiReasoning: "Advanced certification building on PMP. While relevant, recommend completing PMP first before pursuing PgMP. Strong alignment with target Senior PM role.",
    description: "The PgMP certification recognizes advanced experience, skill, and performance in the oversight of multiple, related projects and resources aligned to an organizational strategy.",
    skills: ["Program Governance", "Benefits Management", "Stakeholder Engagement", "Strategic Alignment", "Resource Optimization"],
    prerequisites: ["PMP certification recommended", "6,000+ hours of program management experience"],
    examFormat: "170 questions, 240 minutes",
    image: null,
  },
  {
    id: 3, code: "RMP", title: "Risk Management Professional", provider: "PMI", category: "Risk Management",
    level: "Advanced", cost: 3200, duration: "4 months", validityMonths: 36, isQatarRecommended: false,
    competencyName: "Risk Management", aiConfidence: 92,
    aiReasoning: "Critical gap in Risk Management (Level 2 → 4). RMP certification directly targets this competency area and is highly valued in Qatar's transport sector.",
    description: "The PMI-RMP certification recognizes demonstrated knowledge and expertise in the specialized area of assessing and identifying project risks.",
    skills: ["Risk Identification", "Quantitative Risk Analysis", "Risk Response Planning", "Risk Monitoring", "Monte Carlo Simulation"],
    prerequisites: ["30 hours of risk management education", "3,000+ hours in risk management"],
    examFormat: "115 questions, 150 minutes",
    image: null,
  },
  {
    id: 4, code: "PSM-II", title: "Professional Scrum Master II", provider: "Scrum.org", category: "Agile",
    level: "Intermediate", cost: 1500, duration: "2 months", validityMonths: 0, isQatarRecommended: false,
    competencyName: "Leadership", aiConfidence: 71,
    aiReasoning: "Moderate gap in Leadership. Scrum Master certification develops servant leadership skills applicable to project management teams.",
    description: "PSM II demonstrates an advanced level of Scrum mastery, proving ability to apply Scrum in complex, real-world situations.",
    skills: ["Servant Leadership", "Team Facilitation", "Agile Coaching", "Conflict Resolution", "Organizational Design"],
    prerequisites: ["PSM I certification recommended", "Experience as Scrum Master"],
    examFormat: "30 questions, 90 minutes",
    image: null,
  },
  {
    id: 5, code: "CBAP", title: "Certified Business Analysis Professional", provider: "IIBA", category: "Business Analysis",
    level: "Advanced", cost: 2800, duration: "5 months", validityMonths: 36, isQatarRecommended: true,
    competencyName: "Strategic Planning", aiConfidence: 68,
    aiReasoning: "Moderate gap in Strategic Planning. CBAP covers strategic analysis techniques that support long-term planning capabilities.",
    description: "CBAP certification designates proficiency in business analysis, demonstrating ability to tackle complex projects and guide stakeholders through solutions.",
    skills: ["Requirements Engineering", "Business Process Modeling", "Strategic Analysis", "Solution Evaluation", "Elicitation Techniques"],
    prerequisites: ["7,500+ hours of BA experience", "35 hours of professional development"],
    examFormat: "120 questions, 210 minutes",
    image: null,
  },
];

export const trainings = [
  {
    id: 1, code: "PM-BOOT", title: "Project Management Bootcamp", provider: "QatarSkills",
    format: "InPerson", level: "Intermediate", cost: 1200, duration: "5 days",
    competencyName: "Project Management", prepForCertId: 1, prepForCertCode: "PMP",
    description: "Intensive 5-day bootcamp covering the full project management lifecycle. Aligned with PMP exam content and includes practice exams.",
    skills: ["Project Lifecycle", "WBS Creation", "Schedule Management", "Cost Estimation", "Quality Planning"],
    image: null,
  },
  {
    id: 2, code: "LEAD-201", title: "Leadership Essentials for Managers", provider: "HBKU",
    format: "Hybrid", level: "Intermediate", cost: 800, duration: "3 days",
    competencyName: "Leadership", prepForCertId: null, prepForCertCode: null,
    description: "Develop essential leadership capabilities including emotional intelligence, team motivation, and decision-making under pressure.",
    skills: ["Emotional Intelligence", "Team Motivation", "Decision Making", "Delegation", "Performance Coaching"],
    image: null,
  },
  {
    id: 3, code: "RISK-FND", title: "Risk Management Foundations", provider: "QatarSkills",
    format: "OnlineLive", level: "Entry", cost: 600, duration: "2 days",
    competencyName: "Risk Management", prepForCertId: 3, prepForCertCode: "RMP",
    description: "Foundation course covering risk management principles, frameworks, and tools. Excellent preparation for the RMP certification.",
    skills: ["Risk Registers", "SWOT Analysis", "Probability Assessment", "Risk Categorization", "Mitigation Strategies"],
    image: null,
  },
  {
    id: 4, code: "STRAT-301", title: "Strategic Planning Workshop", provider: "QU Professional",
    format: "InPerson", level: "Advanced", cost: 1500, duration: "4 days",
    competencyName: "Strategic Planning", prepForCertId: null, prepForCertCode: null,
    description: "Advanced workshop on developing and executing organizational strategies, including scenario planning and balanced scorecard methodologies.",
    skills: ["Scenario Planning", "Balanced Scorecard", "PESTLE Analysis", "Vision Alignment", "KPI Development"],
    image: null,
  },
  {
    id: 5, code: "FIN-101", title: "Financial Analysis for Non-Finance", provider: "CFA Qatar",
    format: "SelfPaced", level: "Entry", cost: 450, duration: "20 hours",
    competencyName: "Financial Analysis", prepForCertId: null, prepForCertCode: null,
    description: "Self-paced course designed for non-finance professionals to understand financial statements, budgeting, and ROI analysis.",
    skills: ["Financial Statements", "Budget Analysis", "ROI Calculation", "Cost-Benefit Analysis", "Cash Flow Management"],
    image: null,
  },
  {
    id: 6, code: "CHG-201", title: "Change Management Practitioner", provider: "Prosci Qatar",
    format: "Hybrid", level: "Intermediate", cost: 2200, duration: "3 days",
    competencyName: "Change Management", prepForCertId: null, prepForCertCode: null,
    description: "Comprehensive training in the Prosci ADKAR model for managing organizational change. Includes real-world case studies from the GCC region.",
    skills: ["ADKAR Model", "Stakeholder Impact Assessment", "Communication Planning", "Resistance Management", "Change Readiness"],
    image: null,
  },
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
