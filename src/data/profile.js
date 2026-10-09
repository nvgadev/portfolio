// All site content lives here — edit this file to update the portfolio.
import photo from '../assets/gopi.webp';
import cutout from '../assets/gopi-cutout.webp';

export const profile = {
  name: 'Venkat Gopi Namburi',
  short: 'Gopi',
  title: 'Senior AWS Cloud & DevSecOps Engineer',
  location: 'Florida, USA',
  email: 'gopi.dev999@gmail.com',
  linkedin: 'https://linkedin.com/in/venkata-gopi-namburi',
  github: 'https://github.com/nvgadev',
  photo,
  cutout,
  first: 'Venkat Gopi',
  last: 'Namburi',
  monogram: 'VG',
  available: 'Open to senior cloud platform roles',
  summary:
    'Senior AWS Cloud / DevSecOps Engineer with 8+ years designing and operating enterprise AWS landing zones, multi-account governance, network security architecture and Infrastructure-as-Code automation — with hands-on GCP alongside.',
  current:
    'Currently leading AWS Control Tower, Cloud WAN and Terraform-based platform engineering for a multi-account enterprise environment at Brown & Brown Insurance.',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

// Revealed one by one while the hero is scrubbed
export const journey = [
  { year: '2018', role: "Master's, Industrial Technology", org: 'Pittsburg State University' },
  { year: '2019', role: 'DevOps / Cloud Engineer', org: 'Accenture Federal Services' },
  { year: '2021', role: 'Sr. DevSecOps Engineer', org: 'Accenture Federal Services' },
  { year: '2025', role: 'Sr. AWS Cloud Engineer', org: 'Brown & Brown Insurance' },
];

export const stats = [
  { value: '8+', label: 'Years in DevOps & Cloud' },
  { value: '18+', label: 'AWS accounts on Cloud WAN' },
  { value: '30+', label: 'Prod routes reconciled into IaC' },
  { value: '~37%', label: 'Storage cost driver identified' },
];

export const expertise = [
  {
    key: 'landing-zone',
    title: 'Multi-Account Architecture',
    body: 'AWS Organizations, Control Tower, Account Factory for Terraform, SCP guardrails and IAM Identity Center SSO with Entra ID.',
  },
  {
    key: 'network',
    title: 'Network Security',
    body: 'Cloud WAN hub-and-spoke, Transit Gateway, central Network Firewall inspection, segmented routing and site-to-site VPN.',
  },
  {
    key: 'iac',
    title: 'Infrastructure as Code',
    body: 'Terraform wrapper modules in a private registry with semantic versioning, remote state, drift reconciliation, CloudFormation StackSets, Ansible.',
  },
  {
    key: 'cicd',
    title: 'CI/CD & DevSecOps',
    body: 'GitHub Actions on self-hosted VPC runners with keyless OIDC, Checkov policy-as-code, Jenkins, ArgoCD and integrated SAST/DAST scanning.',
  },
  {
    key: 'containers',
    title: 'Containers & Orchestration',
    body: 'Docker, Kubernetes on EKS, ECS, Helm and ECR image scanning, including monolith-to-container migration with GitOps.',
  },
  {
    key: 'observability',
    title: 'Observability, DR & Cost',
    body: 'CloudWatch, GuardDuty, Security Hub, EventBridge → ServiceNow automation, cross-region DR and storage cost optimisation.',
  },
];

export const experience = [
  {
    company: 'Brown & Brown Insurance',
    role: 'Sr. AWS Cloud Engineer',
    period: 'Jul 2025 — Present',
    place: 'Daytona Beach, FL · On-site',
    areas: [
      {
        name: 'Landing Zone, Governance & Identity',
        points: [
          'Platform engineer for the enterprise multi-cloud Landing Zone, provisioning new AWS accounts and GCP projects end to end to onboard business units and applications.',
          'Designed an enterprise AWS Landing Zone on Control Tower and Organizations (management, audit, network, shared-services and workload accounts) and extended the same governance model to GCP.',
          'Configured IAM Identity Center (SSO) with Microsoft Entra ID for centralized identity, role-based access and single sign-on across every AWS account.',
          'Authored Service Control Policies to restrict unauthorized services, enforce region controls and apply preventive guardrails organization-wide.',
          'Set up Account Factory for Terraform for compliant, automated account lifecycle and led onboarding of workload accounts into Organizations with minimal disruption.',
          'Implemented keyless GitHub Actions → AWS deployments with a two-hop OIDC (AFT-based) pattern, removing long-lived AWS credentials from every onboarded repository.',
        ],
      },
      {
        name: 'Network & Security Architecture',
        points: [
          'Designed and led an enterprise hub-and-spoke network on AWS Cloud WAN with centralized Network Firewall and Transit Gateway across 18+ AWS accounts.',
          'Implemented VPC peering and Transit Gateway attachments for cross-VPC and cross-account connectivity alongside the Cloud WAN design.',
          'Built a central inspection model with segment-based routing that isolates prod, non-prod and shared-services workloads with least-privilege access.',
          'Established hybrid connectivity with site-to-site VPN tunnels routing on-premises traffic through Cloud WAN inspection.',
          'Built a reusable hub-spoke ALB/NLB ingress pattern to expose services for multiple business units without per-account NAT gateways or public IPs.',
          'Rolled out GuardDuty, Security Hub, centralized logging and CrowdStrike Falcon across all accounts; Secrets Manager, KMS and SSM Patch/Session Manager for secrets, keys and agentless access.',
        ],
      },
      {
        name: 'Infrastructure as Code & CI/CD',
        points: [
          'Built the end-to-end GitHub + Terraform CI/CD framework from the ground up for networking, security, identity and account provisioning, integrated with CodeBuild and CodePipeline.',
          'Published Terraform wrapper modules to a private registry with Git-tag semantic versioning; automated monthly registry token rotation with a scheduled Lambda.',
          'Migrated pipelines from GitHub-hosted to self-hosted runners inside the VPC for private access to internal AWS resources.',
          'Used CloudFormation StackSets for baseline account bootstrap ahead of Terraform-managed infrastructure.',
          'Led Terraform state migration and drift reconciliation across accounts, bringing 30+ console-managed production routes (API Gateway authorizers, CloudFront/ACM) under IaC.',
          'Rolled out Checkov as a shared GitHub Actions workflow and standardized safe AWS provider pins after diagnosing a breaking provider regression.',
        ],
      },
      {
        name: 'Onboarding, Billing & Cost',
        points: [
          'Automated new-account onboarding end to end: repository creation, account provisioning, baseline network and security tooling as a self-service pipeline.',
          'Automated security onboarding: CrowdStrike sensor setup via Lambda, EventBridge rules, central SNS alerting and SES relay to the Audit account.',
          'Configured S3 cross-account access with bucket and resource policies for secure data sharing.',
          'Built Lambda functions that publish account cost and billing tags to Apptio, plus a cost-allocation pipeline that writes reports to S3 and notifies billing via SNS.',
          'Designed S3 lifecycle policies (Intelligent-Tiering, Glacier, Deep Archive) with cross-region replication, addressing ~37% of storage cost from unmanaged noncurrent versions.',
          'Implemented DynamoDB Global Tables and ElastiCache Redis Global Datastore for cross-region disaster recovery.',
        ],
      },
      {
        name: 'Reliability & Incident Response',
        points: [
          'Automated incident management by integrating EventBridge with ServiceNow via API, centralized in the Audit account.',
          'Root-caused a production Lambda cold-start latency issue to SSM Parameter Store throttling through systematic performance analysis.',
          'Isolated a critical email-delivery latency incident to an application-layer timeout collision, preventing an unnecessary vendor network change.',
          'Resolved a CloudFront/S3 outage with Origin Access Control and reconciled drifted bucket and distribution policies.',
          'Built Lambda collectors for Lightsail database metrics into CloudWatch with tuned alarms; provided on-call production deployment support.',
        ],
      },
      {
        name: 'Multi-Cloud (GCP)',
        points: [
          'Created and supported GCP projects end to end, mirroring AWS Landing Zone governance for project structure, IAM and onboarding.',
          'Restored a broken production AI workload pipeline by remediating GCP service-account IAM gaps after an infrastructure factory rebuild.',
          'Extended the GCP project factory to onboard GitHub repositories (service accounts, Workload Identity Federation), completing an org-wide GitHub migration with zero downtime.',
          'Resolved a Cloud Run out-of-memory incident and reconciled Terraform/console drift across dev and prod.',
        ],
      },
    ],
    environment: ['Control Tower', 'Organizations', 'AFT', 'IAM Identity Center', 'Cloud WAN', 'Transit Gateway', 'Network Firewall', 'GuardDuty', 'Security Hub', 'KMS', 'SSM', 'EKS', 'ECS', 'Lambda', 'EventBridge', 'DynamoDB', 'ElastiCache', 'CloudFront', 'Terraform', 'GitHub Actions', 'Checkov', 'CrowdStrike', 'GCP', 'Cloud Run', 'ServiceNow'],
  },
  {
    company: 'Accenture Federal Services',
    role: 'Sr. DevSecOps Engineer',
    period: 'Jan 2021 — Jul 2025',
    place: 'Fairfax, VA · Remote',
    areas: [
      {
        name: 'Security Scanning & DevSecOps',
        points: [
          'Integrated OWASP ZAP, Fortify, Sonatype Nexus Lifecycle, Nessus, Snyk, SonarQube and Chef Inspec into Jenkins pipelines for Maven/Gradle apps, automating source, third-party jar and API-endpoint scanning.',
          'Installed and configured SonarQube on Jenkins for code-quality metrics and rapid developer feedback.',
          'Developed Selenium/Java automation to authenticate and scan targets via Nessus and OWASP ZAP.',
        ],
      },
      {
        name: 'CI/CD & Build Automation',
        points: [
          'Built a Jenkins shared library of reusable Groovy functions called from Jenkinsfiles across pipelines.',
          'Created custom RPMs with Gradle and semantic release versioning, GPG-signed them and automated scheduled key rotation.',
          'Orchestrated deployments across environments with Jenkins and AWS CodePipeline.',
        ],
      },
      {
        name: 'Configuration, Containers & Operations',
        points: [
          'Wrote Ansible roles and playbooks for package installation, configuration management and Tomcat setup across production and pre-production.',
          'Integrated Ansible with Jenkins and Rundeck for continuous deployment and stack monitoring.',
          'Managed Docker images in ECR with vulnerability scanning and orchestrated EKS clusters with Helm.',
          'Completed a POC migrating monolithic apps to containers with GitOps delivery through ArgoCD.',
          'Took part in on-call incident response, coordinating cross-functional teams on high-severity incidents and root-cause analysis.',
        ],
      },
    ],
    environment: ['Jenkins', 'Ansible', 'Groovy', 'Maven', 'Gradle', 'Java', 'Selenium', 'CodePipeline', 'Docker', 'ECR', 'EKS', 'ArgoCD', 'Helm', 'Nexus', 'OWASP ZAP', 'Fortify', 'Nessus', 'Snyk', 'SonarQube', 'Chef Inspec', 'CentOS', 'JIRA'],
  },
  {
    company: 'Accenture Federal Services',
    role: 'DevOps / Cloud Engineer',
    period: 'Aug 2019 — Jan 2021',
    place: 'Reston, VA',
    areas: [
      {
        name: 'Infrastructure Automation',
        points: [
          'Automated provisioning and operations with Terraform, AWS CLI, Ansible and Packer, including hardened, application-ready AMIs.',
          'Designed module-driven Terraform with S3/DynamoDB remote state, workspaces and parameterized variables, improving provisioning reliability by 25%.',
          'Developed Ansible playbooks for configuration, patching and application deployments across environments.',
        ],
      },
      {
        name: 'AWS Networking & Core Services',
        points: [
          'Architected VPCs, Transit Gateway, Route 53, Network Firewall and ALB/NLB for secure, resilient connectivity.',
          'Provisioned EC2, IAM, RDS, Lambda, S3, CloudFront, EFS, EMR, SQS, SNS, CloudTrail and CloudFormation.',
          'Designed highly available, cost-optimized architectures with Auto Scaling, custom AMIs and multi-AZ deployments; IAM governance automated via Terraform.',
        ],
      },
      {
        name: 'Containers, Monitoring & Systems',
        points: [
          'Improved performance and stability of EKS-based applications by 35% through proactive maintenance and tuning; deployed Kube-ops-view dashboards.',
          'Implemented monitoring with CloudWatch, Splunk and New Relic for proactive alerting and faster incident resolution.',
          'Administered and upgraded RHEL 7 → 8.10 for stability, security hardening and compliance.',
        ],
      },
    ],
    environment: ['EC2', 'VPC', 'IAM', 'S3', 'RDS', 'Lambda', 'CloudWatch', 'CloudFormation', 'EKS', 'ECS', 'Route 53', 'Network Firewall', 'Terraform', 'Ansible', 'Packer', 'Docker', 'RHEL', 'Prometheus', 'Grafana', 'Splunk', 'New Relic'],
  },
];

export const projects = [
  {
    kind: 'Enterprise',
    title: 'Enterprise AWS Landing Zone',
    org: 'Brown & Brown Insurance',
    body: 'Multi-account foundation on Control Tower and Organizations — management, audit, network, shared-services and workload accounts — with the same governance model extended to GCP.',
    points: ['IAM Identity Center SSO federated with Microsoft Entra ID for RBAC across every account', 'Service Control Policies enforcing region controls and preventive guardrails', 'Account Factory for Terraform blueprints for compliant, automated account lifecycle'],
    metric: { value: 'Multi-cloud', label: 'AWS accounts + GCP projects' },
    tags: ['Control Tower', 'Organizations', 'AFT', 'IAM Identity Center', 'SCPs', 'Entra ID', 'GCP'],
  },
  {
    kind: 'Enterprise',
    title: 'Cloud WAN Hub-and-Spoke Network',
    org: 'Brown & Brown Insurance',
    body: 'Enterprise-wide network on AWS Cloud WAN with centralized Network Firewall inspection and segment-based routing that isolates prod, non-prod and shared services.',
    points: ['Transit Gateway attachments and VPC peering for cross-account connectivity', 'Site-to-site VPN hybrid connectivity routed through central inspection', 'Reusable ALB/NLB ingress pattern — no per-account NAT gateways or public IPs'],
    metric: { value: '18+', label: 'AWS accounts connected' },
    tags: ['Cloud WAN', 'Transit Gateway', 'Network Firewall', 'Site-to-site VPN', 'ALB / NLB', 'Terraform'],
  },
  {
    kind: 'Enterprise',
    title: 'Terraform CI/CD Platform & Private Registry',
    org: 'Brown & Brown Insurance',
    body: 'GitHub + Terraform delivery framework built from scratch for networking, security, identity and account provisioning, backed by versioned wrapper modules.',
    points: ['Private module registry with Git-tag semantic versioning and Lambda-rotated tokens', 'Self-hosted GitHub runners inside the VPC for private access', 'State migration and drift reconciliation across accounts'],
    metric: { value: '30+', label: 'Prod routes brought under IaC' },
    tags: ['Terraform', 'GitHub Actions', 'CodeBuild', 'CodePipeline', 'Lambda', 'Checkov'],
  },
  {
    kind: 'Enterprise',
    title: 'Keyless OIDC Deployments',
    org: 'Brown & Brown Insurance',
    body: 'Two-hop OIDC pattern (AFT-based) that lets GitHub Actions deploy into any AWS account without a single long-lived credential, plus Checkov policy-as-code as a shared workflow.',
    points: ['Long-lived access keys eliminated across all onboarded repositories', 'Shared Checkov workflow enforcing policy-as-code org-wide', 'Safe Terraform AWS provider pins standardized after diagnosing a regression'],
    metric: { value: '0', label: 'Long-lived CI credentials' },
    tags: ['GitHub Actions', 'OIDC', 'IAM', 'AFT', 'Checkov'],
  },
  {
    kind: 'Enterprise',
    title: 'Self-Service Account Onboarding & Security Automation',
    org: 'Brown & Brown Insurance',
    body: 'Repeatable pipeline that takes a business unit from request to a ready account: repo creation, provisioning, baseline network and security tooling.',
    points: ['CrowdStrike Falcon sensor setup via Lambda, EventBridge rules and central SNS alerting', 'GuardDuty, Security Hub and centralized logging rolled out to every account', 'EventBridge → ServiceNow incident automation centralized in the Audit account'],
    metric: { value: 'E2E', label: 'Automated onboarding' },
    tags: ['Lambda', 'EventBridge', 'SNS', 'SES', 'GuardDuty', 'Security Hub', 'CrowdStrike', 'ServiceNow'],
  },
  {
    kind: 'Enterprise',
    title: 'Storage Cost Optimization & Cross-Region DR',
    org: 'Brown & Brown Insurance',
    body: 'S3 lifecycle tiering with cross-region replication, cost allocation pipelines to Apptio, and multi-region disaster recovery for data stores.',
    points: ['Intelligent-Tiering, Glacier and Deep Archive lifecycle policies', 'Lambda pipelines publishing billing tags and cost allocation to Apptio', 'DynamoDB Global Tables and ElastiCache Redis Global Datastore for DR'],
    metric: { value: '~37%', label: 'Storage cost driver removed' },
    tags: ['S3', 'Glacier', 'DynamoDB Global Tables', 'ElastiCache', 'Lambda', 'Apptio'],
  },
  {
    kind: 'Enterprise',
    title: 'DevSecOps Security Scanning Pipelines',
    org: 'Accenture Federal Services',
    body: 'Security scanning baked into Jenkins pipelines for Maven/Gradle applications — source, third-party jars and live API endpoints — with a shared Groovy library.',
    points: ['OWASP ZAP, Fortify, Nexus Lifecycle, Nessus, Snyk, SonarQube and Chef Inspec integrated', 'Selenium/Java automation to authenticate and scan targets', 'GPG-signed RPMs with semantic release versioning and key rotation'],
    metric: { value: '7', label: 'Scanners in one pipeline' },
    tags: ['Jenkins', 'Groovy', 'OWASP ZAP', 'Fortify', 'SonarQube', 'Snyk', 'Nessus', 'Gradle'],
  },
  {
    kind: 'Enterprise',
    title: 'Monolith → Containers GitOps POC',
    org: 'Accenture Federal Services',
    body: 'Proof of concept that moved monolithic apps into containers on EKS, delivered by ArgoCD GitOps with Helm charts and ECR image scanning.',
    points: ['Docker images in ECR with vulnerability scanning', 'EKS clusters orchestrated with Helm', 'GitOps delivery via ArgoCD'],
    tags: ['Docker', 'EKS', 'Helm', 'ECR', 'ArgoCD'],
  },
  {
    kind: 'Open source',
    title: 'Reddit Clone — End-to-End DevSecOps on Kubernetes',
    org: 'GitHub · nvgadev',
    body: 'Next.js app shipped through a full DevSecOps pipeline: SonarQube quality gate, Trivy filesystem and image scans, Docker build & push, then a GitOps CD repo that deploys to Kubernetes.',
    points: ['Jenkins CI with SonarQube analysis + quality gate', 'Trivy FS and image scanning before push', 'Separate GitOps repo with Deployment/Service manifests; infra in Terraform'],
    tags: ['Jenkins', 'SonarQube', 'Trivy', 'Docker', 'Kubernetes', 'Terraform', 'Next.js'],
    link: 'https://github.com/nvgadev/a-reddit-clone',
  },
  {
    kind: 'Open source',
    title: 'Reddit Clone GitOps Manifests',
    org: 'GitHub · nvgadev',
    body: 'CD half of the Reddit clone: Kubernetes Deployment and Service manifests updated by a Jenkins job so ArgoCD can sync each new image tag.',
    points: ['Image tag bump automated from CI', 'Declarative Kubernetes manifests', 'Pull-based GitOps sync'],
    tags: ['ArgoCD', 'Kubernetes', 'Jenkins', 'GitOps'],
    link: 'https://github.com/nvgadev',
  },
];

export const skills = [
  { group: 'Cloud', items: ['AWS', 'EC2', 'ELB / ALB / NLB', 'VPC', 'RDS', 'IAM', 'EKS', 'ECS', 'S3', 'Lambda', 'Route 53', 'CloudFront', 'EventBridge', 'GuardDuty', 'Security Hub', 'Control Tower', 'Organizations', 'Cloud WAN', 'Transit Gateway', 'Network Firewall', 'Lightsail', 'SNS', 'SES', 'SQS', 'EFS', 'CloudTrail', 'Azure', 'GCP', 'Cloud Run'] },
  { group: 'IaC & Automation', items: ['Terraform', 'AFT', 'Private Terraform Registry', 'CloudFormation', 'StackSets', 'Ansible', 'Packer', 'AWS CLI'] },
  { group: 'CI/CD', items: ['GitHub Actions', 'Self-hosted runners', 'OIDC / WIF', 'Jenkins', 'Jenkins Shared Library', 'CodeBuild', 'CodePipeline', 'ArgoCD', 'Rundeck'] },
  { group: 'Containers', items: ['Docker', 'Kubernetes (EKS)', 'Helm', 'ECR'] },
  { group: 'Security', items: ['OWASP ZAP', 'Fortify', 'SonarQube', 'Nexus Lifecycle', 'Nessus', 'Snyk', 'Trivy', 'Chef Inspec', 'Checkov', 'CrowdStrike Falcon', 'IAM Identity Center', 'SCPs', 'KMS', 'Secrets Manager', 'SSM Session Manager'] },
  { group: 'Observability', items: ['Prometheus', 'Grafana', 'Splunk', 'Datadog', 'Dynatrace', 'New Relic', 'AppDynamics', 'ELK Stack', 'CloudWatch', 'Kafka'] },
  { group: 'Languages', items: ['Python', 'Bash / Shell', 'Groovy', 'PowerShell', 'Java (Selenium)', 'YAML', 'HTML'] },
  { group: 'Databases', items: ['MySQL', 'PostgreSQL', 'DynamoDB', 'ElastiCache (Redis)'] },
  { group: 'Servers', items: ['Nginx', 'Apache', 'Tomcat', 'WebLogic', 'WebSphere', 'JBoss'] },
  { group: 'Version Control', items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN'] },
  { group: 'Build & Tickets', items: ['Maven', 'Gradle', 'JIRA', 'ServiceNow', 'Confluence', 'draw.io'] },
  { group: 'OS', items: ['Linux', 'RHEL', 'CentOS', 'Ubuntu', 'UNIX', 'Windows'] },
];

export const certifications = [
  {
    name: 'AWS Certified DevOps Engineer – Professional',
    issuer: 'Amazon Web Services (AWS)',
    level: 'Professional level',
    credentialId: 'bcdab5ebcfed4696af1728d49ad8364e',
    verifyUrl: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/bcdab5ebcfed4696af1728d49ad8364e',
    domains: ['SDLC automation', 'Configuration management & IaC', 'Resilient cloud solutions', 'Monitoring & logging', 'Incident & event response', 'Security & compliance'],
  },
];

export const education = {
  degree: "Master's in Industrial Technology",
  school: 'Pittsburg State University',
  year: '2018',
};
