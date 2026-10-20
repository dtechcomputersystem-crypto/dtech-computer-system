// Nexora IT Solutions - Enterprise IT Services Catalog
export const initialServices = [
  {
    id: "srv-managed-it",
    title: "24/7 Managed IT Support & Helpdesk",
    tagline: "Total peace of mind with 15-minute response SLA guarantees",
    category: "support",
    icon: "headset",
    badge: "Most Popular",
    badgeColor: "bg-blue-600",
    basePrice: 85,
    pricingModel: "per seat / month",
    summary: "Dedicated Tier 1-3 helpdesk, automated patch management, endpoint threat monitoring, and executive quarterly business reviews.",
    deliverables: [
      "15-Minute Critical Response SLA (24/7/365)",
      "Automated OS & Third-party Patch Automation",
      "Unlimited Remote & Scheduled Onsite Support",
      "Proactive Network & Server Uptime Monitoring",
      "Dedicated Virtual CIO (vCIO) Strategy Consulting",
      "Identity & Access Management (IAM) Lifecycle"
    ],
    tiers: [
      { name: "Essential Support", price: "$65/user/mo", response: "1 Hour SLA", coverage: "8am - 8pm M-F" },
      { name: "Business Pro", price: "$85/user/mo", response: "30 Min SLA", coverage: "24/7 Priority" },
      { name: "Enterprise Elite", price: "$120/user/mo", response: "15 Min SLA", coverage: "24/7 Dedicated Team + Onsite" }
    ],
    caseStudySnippet: "Reduced downtime by 94% for an 800-person logistics corporation within 60 days."
  },
  {
    id: "srv-cybersecurity",
    title: "Enterprise Cybersecurity & SOC2 Audit",
    tagline: "Zero-trust architecture, automated threat hunting & compliance",
    category: "security",
    icon: "shield-check",
    badge: "Compliance Ready",
    badgeColor: "bg-rose-600",
    basePrice: 2400,
    pricingModel: "per engagement / monthly retainer",
    summary: "Comprehensive vulnerability assessment, continuous 24/7 SIEM/SOC monitoring, external penetration testing, and ISO 27001/SOC 2 readiness.",
    deliverables: [
      "Black-box & White-box Penetration Testing",
      "24/7 Managed Detection and Response (MDR) & SIEM",
      "SOC 2 Type II, ISO 27001 & HIPAA Compliance Roadmaps",
      "Employee Security Awareness & Phishing Simulation",
      "Incident Response Retainer with 1-Hour SLA guarantee",
      "Cloud Security Posture Management (CSPM)"
    ],
    tiers: [
      { name: "Security Assessment", price: "$2,400 one-time", response: "Comprehensive Audit", coverage: "Full Report & Remediation Plan" },
      { name: "Continuous Defense", price: "$1,800/month", response: "24/7 SOC Monitoring", coverage: "Endpoint + Cloud Workloads" },
      { name: "Compliance Shield", price: "$3,500/month", response: "Full vCISO + Audit", coverage: "Zero-Trust + Certification Prep" }
    ],
    caseStudySnippet: "Neutralized over 14,000 automated ransomware probes with zero breach incidents."
  },
  {
    id: "srv-cloud-devops",
    title: "Cloud Infrastructure, Migration & DevOps",
    tagline: "Scalable AWS, Azure & GCP architectures with Terraform IaC",
    category: "cloud",
    icon: "cloud",
    badge: "Cloud Certified",
    badgeColor: "bg-indigo-600",
    basePrice: 3200,
    pricingModel: "per sprint / milestone",
    summary: "Seamless migration of on-premise workloads to AWS/Azure/GCP, multi-region Kubernetes deployments, CI/CD pipeline automation, and FinOps cost reduction.",
    deliverables: [
      "Zero-Downtime Database & Application Migration",
      "Infrastructure as Code (IaC) via Terraform & Ansible",
      "Production-Grade Kubernetes (EKS / AKS) Engineering",
      "Automated GitHub Actions / GitLab CI/CD Pipelines",
      "Cloud FinOps Audit (Average 32% Cloud Cost Savings)",
      "Multi-Region High Availability & Automated Failover"
    ],
    tiers: [
      { name: "Cloud Health & Cost Audit", price: "$1,500 one-time", response: "5-Day Deep Dive", coverage: "Waste Identification & Architecture Blueprint" },
      { name: "Migration Sprint", price: "$4,500/sprint", response: "Dedicated Cloud Architect", coverage: "Hands-on Migration & CI/CD" },
      { name: "24/7 Cloud NOC & SRE", price: "$2,800/month", response: "15 Min Outage SLA", coverage: "Kubernetes & Cloud Fleet Management" }
    ],
    caseStudySnippet: "Migrated 45 microservices to AWS EKS with zero downtime and 38% monthly hosting savings."
  },
  {
    id: "srv-custom-software",
    title: "Custom Software & Enterprise Web Portals",
    tagline: "Tailored web applications, API integrations & modernization",
    category: "software",
    icon: "code",
    badge: "Full Lifecycle",
    badgeColor: "bg-purple-600",
    basePrice: 4500,
    pricingModel: "per milestone / sprint",
    summary: "Bespoke SaaS platforms, internal workflow automation systems, enterprise ERP/CRM integration, and high-throughput real-time APIs.",
    deliverables: [
      "Responsive React / Vue / Next.js Web Frontends",
      "High-Performance Python / Node.js / Go Microservices",
      "Enterprise Database Design (PostgreSQL, MongoDB, Redis)",
      "API Integrations (Salesforce, Stripe, SAP, Workday)",
      "Automated Unit, Integration & End-to-End Test Suites",
      "Complete Source Code Handover & IP Rights"
    ],
    tiers: [
      { name: "MVP Rapid Sprint", price: "$4,500/sprint", response: "2-Week Turnaround", coverage: "Prototype to Working Product" },
      { name: "Dedicated Pod", price: "$9,500/month", response: "Full-Stack + QA + PM", coverage: "Ongoing Feature Expansion" },
      { name: "Enterprise Platform", price: "Custom Quote", response: "High-Availability Architecture", coverage: "Mission-Critical Systems" }
    ],
    caseStudySnippet: "Engineered a custom claims processing portal processing $12M+ monthly transactions."
  },
  {
    id: "srv-networking",
    title: "Network Infrastructure & Structured Cabling",
    tagline: "High-density 10Gbps/40Gbps fiber, SD-WAN & enterprise Wi-Fi 7",
    category: "networking",
    icon: "network",
    badge: "Hardware & Install",
    badgeColor: "bg-emerald-600",
    basePrice: 1800,
    pricingModel: "per site / project",
    summary: "Turnkey enterprise network deployments, certified Cat6A / single-mode fiber installations, rack cleanup, and site-to-site SD-WAN mesh setups.",
    deliverables: [
      "Heatmap-Driven Wi-Fi 7 / 6E Access Point Site Surveys",
      "Certified Cat6A & Fiber Optic Backbone Pulling & Terminations",
      "Server Rack Cable Dressing, PDU Setup & Labeling",
      "Cisco / Fortinet / Ubiquiti Hardware Commissioning",
      "Dual WAN ISP Redundancy with Automated Failover",
      "Full Fluke Testing Certification Documentation"
    ],
    tiers: [
      { name: "Branch Office Setup", price: "$1,800 base", response: "Up to 50 Drops", coverage: "Cabling, Switch & AP Install" },
      { name: "HQ Campus Infrastructure", price: "$5,500 base", response: "Fiber Backbone + Multi-Floor", coverage: "Redundant Core Switches & SD-WAN" },
      { name: "Data Center Rack Installation", price: "Custom Quote", response: "High-Density 40G/100G", coverage: "Containment, Dual Power & SAN" }
    ],
    caseStudySnippet: "Deploys 4-floor commercial HQ with 320 network drops and 2.5Gbps seamless roaming."
  },
  {
    id: "srv-disaster-recovery",
    title: "Disaster Recovery & Business Continuity",
    tagline: "Near-zero RPO/RTO backup systems and automated failover",
    category: "security",
    icon: "refresh-cw",
    badge: "Zero Data Loss",
    badgeColor: "bg-cyan-600",
    basePrice: 950,
    pricingModel: "per month / storage pool",
    summary: "Air-gapped immutable backup repositories, ransomware-proof snapshots, real-time VM replication to secondary cloud data centers, and biannual disaster drill execution.",
    deliverables: [
      "Immutable Air-Gapped Cloud & On-Prem Backups",
      "15-Minute Recovery Point Objective (RPO)",
      "Instant VM Spin-Up in Azure/AWS (1-Hour RTO)",
      "Biannual Disaster Recovery Simulation Testing",
      "Full Microsoft 365 / Google Workspace Cloud Backup",
      "Automated Daily Integrity Verification Checks"
    ],
    tiers: [
      { name: "Cloud Vault Standard", price: "$950/mo", response: "Daily Backups", coverage: "Up to 5TB Immutable Cloud Storage" },
      { name: "Rapid Standby DR", price: "$2,200/mo", response: "Hourly Replication", coverage: "Cloud VM Standby with 1-hr Failover" },
      { name: "Multi-Region Enterprise", price: "$4,800/mo", response: "Real-time Sync", coverage: "Dual Datacenter Active-Passive Cluster" }
    ],
    caseStudySnippet: "Restored complete financial SQL database of 4TB within 38 minutes after a severe hardware failure."
  }
];
