export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  metric: string;
  metricLabel: string;
  context: string;
  problem: string;
  role: string;
  outcome: string;
  flow: string[];
  details: string[];
};
export const projects: Project[] = [
  {
    id: "01",
    slug: "sales-crm",
    title: "Sales CRM",
    category: "Internal system",
    summary: "A working rhythm for leads, conversations, and follow-ups.",
    metric: "10–15",
    metricLabel: "salespeople",
    context:
      "Sales leads were arriving through Intercom. The sales team needed a more structured way to manage the work around each lead.",
    problem:
      "Lead entry, calls, status updates, and follow-ups needed to belong to a coherent workflow.",
    role: "I built an internal CRM using AppSheet, with lead entry, call logs, status management, and operational visibility.",
    outcome:
      "Approximately 10–15 salespeople used the system, and it continued being used for more than one year.",
    flow: ["Lead", "Call log", "Status", "Follow-up", "Visibility"],
    details: [
      "AppSheet was the pragmatic implementation choice for this internal workflow.",
      "Continued use is the strongest evidence in this project: the system became part of the team’s working routine.",
    ],
  },
  {
    id: "02",
    slug: "wedding-album-operations",
    title: "Album operations",
    category: "Production workflow",
    summary: "Connecting the people behind a multi-stage production process.",
    metric: "10–20",
    metricLabel: "people across roles",
    context:
      "Wedding-album production involved designers, a production manager, brand leads, and a data manager.",
    problem:
      "Different roles needed a shared operational workflow to coordinate production.",
    role: "I worked on the internal operational system, bringing multi-role workflow design, user understanding, and product iteration to the production process.",
    outcome:
      "The system addressed a workflow involving about five designers and other production roles, with an overall user range of approximately 10–20 people.",
    flow: ["Data", "Design", "Coordination", "Production"],
    details: [
      "This is a professional internal production project.",
      "The meaningful design constraint was coordination across roles, rather than a single person’s task list.",
    ],
  },
  {
    id: "03",
    slug: "asset-management",
    title: "Asset management",
    category: "Physical → digital",
    summary:
      "Turning a distributed physical operation into a trackable system.",
    metric: "~5,000",
    metricLabel: "physical assets",
    context:
      "Physical assets were distributed across Hyderabad, Bengaluru, Chennai, and Delhi.",
    problem:
      "Tracking assets across locations required evidence, recurring audits, reporting, and clear operational accountability.",
    role: "I designed and built an operational asset-management system with tracking, monthly audits, photographs, reporting, and automated reports.",
    outcome:
      "The system handled roughly 5,000 physical assets across the four locations described in this project.",
    flow: ["Asset", "Location", "Audit", "Evidence", "Report"],
    details: [
      "Photographs and audit evidence connected the digital record to the physical world.",
      "Good software does not always look revolutionary. Sometimes it quietly removes operational chaos.",
    ],
  },
  {
    id: "04",
    slug: "workflow-proposal-product",
    title: "Workflow & proposal product",
    category: "Product system",
    summary: "From configurable workflows toward a broader media platform.",
    metric: "Workflow",
    metricLabel: "to product systems",
    context:
      "A workflow-oriented proposal product included a no-code or configurable workflow-builder concept.",
    problem:
      "As the product evolved, workflows expanded toward galleries, boards, reviews, approvals, collaboration, and media.",
    role: "My involvement crossed product thinking, architecture, workflow design, frontend/backend work, APIs, and infrastructure and storage considerations.",
    outcome:
      "This work represents a transition from internal tooling into more complex product systems.",
    flow: ["Workflow", "Media", "Review", "Approval", "Collaboration"],
    details: [
      "The product’s evolution increased the number of relationships the system had to accommodate.",
      "A workflow is a useful lens for thinking about interfaces, APIs, data, and storage together.",
    ],
  },
];
