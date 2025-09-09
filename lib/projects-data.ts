
export interface Project {
  id: string
  title: string
  category: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  year: string
  status: 'Production' | 'Development' | 'Completed'
  company?: string
  domain: 'Transportation' | 'Healthcare' | 'Supply Chain' | 'Fintech' | 'E-commerce' | 'Cloud'
  image?: string
}

export const projects: Project[] = [
  {
    id: 'transportation-logistics',
    title: 'Transportation Logistics Management System',
    category: 'Enterprise Platform',
    description: 'Real-time logistics platform processing bulk transportation data for North America\'s largest railway network with advanced tracking and analytics.',
    longDescription: 'Developed and maintained a comprehensive Transportation Logistics Management System at Canadian Pacific Kansas City (CPKC). The platform integrates with multiple external APIs, third-party shipping providers, and real-time tracking services, processing bulk transportation data and managing shipment tracking, customer communications, and logistics analytics for the continent\'s largest railway network.',
    technologies: ['Java 11', 'Spring Boot', 'Microservices', 'Apache Kafka', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Redis', 'REST APIs'],
    features: [
      'Real-time shipment tracking across North America',
      'Bulk data processing with 99.9% uptime',
      'Integration with 50+ external shipping APIs',
      'Advanced analytics dashboard with custom metrics',
      'Automated workflow orchestration',
      'Multi-tenant architecture for enterprise clients'
    ],
    year: '2023',
    status: 'Production',
    company: 'Canadian Pacific Kansas City (CPKC)',
    domain: 'Transportation'
  },
  {
    id: 'supply-chain-platform',
    title: 'Global Supply Chain Management Platform',
    category: 'B2B Platform',
    description: 'Comprehensive supply chain visibility platform managing procurement, processing, and distribution operations with automated marketing campaigns.',
    longDescription: 'Built a sophisticated Supply Chain Management and Customer Engagement Platform at Alliance One Industries, managing global procurement, processing, and distribution operations. The application provides end-to-end supply chain visibility, customer relationship management, and automated marketing campaigns for international tobacco supply chain operations.',
    technologies: ['Java 8', 'Spring Boot', 'Angular 12', 'Apache Kafka', 'MongoDB', 'ELK Stack', 'AWS Lambda', 'PCF', 'Jenkins'],
    features: [
      'Global supply chain visibility across 35+ countries',
      'Real-time inventory management',
      'Automated procurement workflows',
      'Customer engagement automation',
      'Predictive analytics for demand forecasting',
      'Multi-language support for international operations'
    ],
    year: '2022',
    status: 'Production',
    company: 'Alliance One Industries',
    domain: 'Supply Chain'
  },
  {
    id: 'healthcare-management',
    title: 'Healthcare Management System (HMS)',
    category: 'Healthcare Platform',
    description: 'B2B healthcare solution providing patient management, care coordination, and provider network solutions with comprehensive APIs.',
    longDescription: 'Developed a comprehensive Healthcare Management System as a B2B provider at Microspark Solution, offering patient management, care coordination, and provider network solutions. The system utilizes RESTful APIs and modern web interfaces to facilitate seamless healthcare operations, patient data management, and provider communications.',
    technologies: ['Java 8', 'Spring Boot', 'Struts', 'EJB', 'Oracle Database', 'AWS EC2', 'Jenkins', 'JUnit', 'SOAP/REST APIs'],
    features: [
      'Patient data management with HIPAA compliance',
      'Provider network coordination',
      'Appointment scheduling and management',
      'Insurance claims processing',
      'Real-time patient monitoring dashboards',
      'Secure API gateway for third-party integrations'
    ],
    year: '2020',
    status: 'Production',
    company: 'Microspark Solution',
    domain: 'Healthcare'
  },
  {
    id: 'microservices-architecture',
    title: 'Microservices Architecture Framework',
    category: 'Infrastructure',
    description: 'Scalable microservices framework with service discovery, API gateway, and distributed tracing for enterprise applications.',
    longDescription: 'Designed and implemented a comprehensive microservices architecture framework supporting multiple enterprise applications. The framework includes service discovery, API gateway, distributed tracing, and centralized configuration management, enabling rapid development and deployment of scalable applications.',
    technologies: ['Java 11', 'Spring Boot', 'Spring Cloud', 'Eureka', 'Zuul', 'Zipkin', 'Docker', 'Kubernetes', 'Consul', 'Prometheus'],
    features: [
      'Service discovery and registration',
      'API gateway with rate limiting',
      'Distributed tracing and monitoring',
      'Circuit breaker patterns',
      'Centralized configuration management',
      'Auto-scaling based on metrics'
    ],
    year: '2023',
    status: 'Production',
    domain: 'Cloud'
  },
  {
    id: 'real-time-analytics',
    title: 'Real-time Analytics Engine',
    category: 'Data Platform',
    description: 'High-performance analytics engine processing millions of events per second with machine learning capabilities for predictive insights.',
    longDescription: 'Built a real-time analytics engine capable of processing millions of events per second, providing instant insights and predictive analytics. The system incorporates machine learning models for anomaly detection, trend analysis, and forecasting across various business domains.',
    technologies: ['Java 11', 'Apache Kafka', 'Apache Spark', 'Elasticsearch', 'InfluxDB', 'TensorFlow', 'Python', 'Grafana', 'AWS Kinesis'],
    features: [
      'Real-time event processing at scale',
      'Machine learning-powered predictions',
      'Anomaly detection algorithms',
      'Interactive dashboards with drill-down capabilities',
      'Custom alerting and notification system',
      'Historical data analysis and reporting'
    ],
    year: '2023',
    status: 'Development',
    domain: 'Cloud'
  },
  {
    id: 'payment-processing',
    title: 'Secure Payment Processing System',
    category: 'Fintech Solution',
    description: 'PCI DSS compliant payment processing system handling millions of transactions with fraud detection and multi-currency support.',
    longDescription: 'Developed a secure payment processing system handling high-volume transactions with advanced fraud detection capabilities. The system is PCI DSS compliant and supports multiple payment methods, currencies, and integration with various financial institutions.',
    technologies: ['Java 8', 'Spring Security', 'PostgreSQL', 'Redis', 'Kafka', 'Vault', 'Docker', 'AWS', 'Stripe API', 'PayPal SDK'],
    features: [
      'PCI DSS Level 1 compliance',
      'Real-time fraud detection using ML',
      'Multi-currency transaction support',
      'Tokenization for secure card storage',
      'Comprehensive audit trails',
      'Integration with 20+ payment gateways'
    ],
    year: '2022',
    status: 'Production',
    domain: 'Fintech'
  },
  {
    id: 'inventory-optimization',
    title: 'AI-Powered Inventory Optimization',
    category: 'ML Application',
    description: 'Intelligent inventory management system using machine learning for demand forecasting and automated procurement decisions.',
    longDescription: 'Created an AI-powered inventory optimization system that uses machine learning algorithms to predict demand, optimize stock levels, and automate procurement decisions. The system reduces inventory costs by 30% while maintaining 99.5% service levels.',
    technologies: ['Java 11', 'Python', 'TensorFlow', 'Apache Spark', 'MongoDB', 'Apache Airflow', 'Docker', 'Kubernetes', 'AWS SageMaker'],
    features: [
      'Demand forecasting with 95% accuracy',
      'Automated reorder point calculations',
      'Seasonal trend analysis',
      'Multi-location inventory optimization',
      'Supplier performance analytics',
      'Cost optimization algorithms'
    ],
    year: '2023',
    status: 'Production',
    domain: 'Supply Chain'
  },
  {
    id: 'telemedicine-platform',
    title: 'Telemedicine Platform',
    category: 'Healthcare Solution',
    description: 'Comprehensive telemedicine platform enabling secure video consultations, prescription management, and patient monitoring.',
    longDescription: 'Built a comprehensive telemedicine platform that enables healthcare providers to conduct secure video consultations, manage prescriptions, and monitor patients remotely. The platform includes mobile applications for both patients and healthcare providers.',
    technologies: ['Java 8', 'Spring Boot', 'WebRTC', 'React Native', 'PostgreSQL', 'MongoDB', 'AWS', 'Socket.io', 'FFmpeg'],
    features: [
      'HD video consultations with screen sharing',
      'Electronic prescription management',
      'Patient health record integration',
      'Appointment scheduling and reminders',
      'Mobile apps for iOS and Android',
      'HIPAA compliant data handling'
    ],
    year: '2021',
    status: 'Production',
    domain: 'Healthcare'
  },
  {
    id: 'ecommerce-platform',
    title: 'Enterprise E-commerce Platform',
    category: 'E-commerce Solution',
    description: 'Scalable e-commerce platform supporting millions of products with advanced search, recommendation engine, and multi-vendor support.',
    longDescription: 'Developed a highly scalable e-commerce platform capable of handling millions of products and concurrent users. The platform includes advanced search capabilities, AI-powered recommendation engine, and comprehensive multi-vendor marketplace functionality.',
    technologies: ['Java 11', 'Spring Boot', 'Elasticsearch', 'Redis', 'MySQL', 'Apache Solr', 'AWS', 'Docker', 'Angular', 'Node.js'],
    features: [
      'Multi-million product catalog management',
      'AI-powered product recommendations',
      'Advanced faceted search',
      'Multi-vendor marketplace support',
      'Real-time inventory synchronization',
      'Mobile-responsive design'
    ],
    year: '2022',
    status: 'Production',
    domain: 'E-commerce'
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Migration & Modernization',
    category: 'Cloud Solution',
    description: 'Complete cloud migration strategy and implementation for legacy systems with zero-downtime migration and 40% cost reduction.',
    longDescription: 'Led a comprehensive cloud migration project, moving legacy on-premise applications to AWS cloud infrastructure. The project included application modernization, containerization, and implementation of DevOps practices, resulting in improved scalability and reduced operational costs.',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Java 11', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis'],
    features: [
      'Zero-downtime migration strategy',
      'Infrastructure as Code (IaC)',
      'Automated CI/CD pipelines',
      'Cost optimization with 40% reduction',
      'Auto-scaling and load balancing',
      'Comprehensive monitoring and alerting'
    ],
    year: '2023',
    status: 'Completed',
    domain: 'Cloud'
  },
  {
    id: 'data-pipeline',
    title: 'Enterprise Data Pipeline',
    category: 'Data Engineering',
    description: 'High-throughput data pipeline processing TB of data daily with real-time ETL, data quality checks, and ML model serving.',
    longDescription: 'Designed and implemented a robust enterprise data pipeline that processes terabytes of data daily from multiple sources. The pipeline includes real-time ETL processes, data quality validation, and serves machine learning models for various business applications.',
    technologies: ['Java 11', 'Apache Kafka', 'Apache Spark', 'Apache Airflow', 'Hadoop', 'Hive', 'Elasticsearch', 'Python', 'AWS'],
    features: [
      'Real-time data processing at TB scale',
      'Automated data quality checks',
      'ML model serving and inference',
      'Data lineage tracking',
      'Flexible schema evolution',
      'Multi-source data integration'
    ],
    year: '2023',
    status: 'Production',
    domain: 'Cloud'
  },
  {
    id: 'blockchain-supply-chain',
    title: 'Blockchain Supply Chain Tracker',
    category: 'Blockchain Solution',
    description: 'Blockchain-based supply chain tracking system providing end-to-end traceability and transparency for pharmaceutical products.',
    longDescription: 'Developed a blockchain-based supply chain tracking system for pharmaceutical products, providing immutable records and complete traceability from manufacturing to end consumer. The system ensures product authenticity and helps combat counterfeit medications.',
    technologies: ['Java 11', 'Hyperledger Fabric', 'Spring Boot', 'Node.js', 'MongoDB', 'React', 'Docker', 'Kubernetes', 'IPFS'],
    features: [
      'Immutable product tracking records',
      'QR code-based product verification',
      'Smart contract automation',
      'Real-time supply chain visibility',
      'Anti-counterfeiting measures',
      'Regulatory compliance reporting'
    ],
    year: '2022',
    status: 'Production',
    domain: 'Supply Chain'
  }
]

export const getProjectsByDomain = (domain: string) => {
  return projects.filter(project => project.domain === domain)
}

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id)
}

export const getFeaturedProjects = () => {
  return projects.filter(project => ['transportation-logistics', 'supply-chain-platform', 'healthcare-management', 'microservices-architecture'].includes(project.id))
}
