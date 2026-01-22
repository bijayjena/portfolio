import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  Zap, 
  Brain, 
  Layers, 
  Database,
  Shield,
  Smartphone,
  Monitor,
  Server,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  Key,
  Cloud,
  Code2,
  Blocks,
  Cpu,
  Workflow,
  FileJson,
  Terminal
} from "lucide-react";

// Tech Icon URLs from SimpleIcons
const techIconUrls: Record<string, string> = {
  // Frontend
  "React.js": "https://cdn.simpleicons.org/react",
  "Redux Toolkit": "https://cdn.simpleicons.org/redux",
  "Material UI": "https://cdn.simpleicons.org/mui",
  "TypeScript": "https://cdn.simpleicons.org/typescript",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss",
  
  // Mobile
  "React Native": "https://cdn.simpleicons.org/react",
  "Expo": "https://cdn.simpleicons.org/expo",
  
  // Backend
  "Node.js": "https://cdn.simpleicons.org/nodedotjs",
  "Firebase": "https://cdn.simpleicons.org/firebase",
  "REST APIs": "https://cdn.simpleicons.org/fastapi",
  "Express": "https://cdn.simpleicons.org/express",
  
  // Database
  "MongoDB": "https://cdn.simpleicons.org/mongodb",
  
  // AI
  "Speech-to-Text": "https://cdn.simpleicons.org/googlepodcasts",
  "Conversation Analysis": "https://squbix.com/static/media/squbixlogobig.a13c0db77b20b39dbbd9.png",
  "NLP Chatbot": "https://cdn.simpleicons.org/n8n",
  "OpenAI APIs": "https://openai.com/favicon.ico",
  
  // Architecture
  "Monorepo": "https://cdn.simpleicons.org/turborepo",
  "Module Federation": "https://cdn.simpleicons.org/webpack",
  "Micro-frontends": "https://cdn.simpleicons.org/singlestore",
};

// Augastam Data
const augastamMetrics = [
  { value: "70-80%", label: "Performance Boost", icon: TrendingUp },
  { value: "5+", label: "Major Hospital Chains", icon: Building2 },
  { value: "8", label: "Team Members Led", icon: Users },
  { value: "3", label: "AI Integrations", icon: Brain },
];

const augastamClients = [
  "Care Hospitals",
  "Kalinga Hospitals", 
  "Utkal Hospitals",
  "Ankura",
  "EYE7"
];

const augastamModules = [
  { name: "Form Builder", desc: "Dynamic form generation system", icon: Layers },
  { name: "Webpart Builder", desc: "Modular UI component system", icon: Monitor },
  { name: "EMR System", desc: "Electronic Medical Records", icon: Database },
  { name: "Smart Billing", desc: "Auto-fetch patient bills", icon: Zap },
  { name: "Tariff Management", desc: "Pricing & package control", icon: TrendingUp },
  { name: "Payer Integration", desc: "Insurance & TPA handling", icon: Shield },
];

const augastamTechStack = {
  frontend: ["React.js", "Redux Toolkit", "Material UI", "TypeScript"],
  mobile: ["React Native", "Expo"],
  backend: ["Node.js", "Firebase", "REST APIs"],
  ai: ["Speech-to-Text", "Conversation Analysis", "NLP Chatbot", "OpenAI APIs"],
  architecture: ["Monorepo", "Module Federation", "Micro-frontends"],
};

// Squbix Data
const squbixMetrics = [
  { value: "Multi-tenant", label: "Architecture", icon: Layers },
  { value: "50+", label: "Active Users", icon: Users },
  { value: "Real-time", label: "Data Sync", icon: Zap },
  { value: "AI-Powered", label: "Analytics", icon: Brain },
];

const squbixModules = [
  { name: "Patient Management", desc: "Complete patient lifecycle handling", icon: Users },
  { name: "OPD/IPD Module", desc: "Outpatient & Inpatient management", icon: Monitor },
  { name: "Lab & Radiology", desc: "Diagnostic test management", icon: Database },
  { name: "Pharmacy Integration", desc: "Medicine inventory & billing", icon: Zap },
  { name: "Appointment Scheduling", desc: "Smart scheduling system", icon: TrendingUp },
  { name: "Report Generation", desc: "Automated medical reports", icon: Shield },
];

const squbixTechStack = {
  frontend: ["React.js", "Redux Toolkit", "Tailwind CSS", "TypeScript"],
  mobile: ["React Native", "Expo"],
  backend: ["Node.js", "Express", "REST APIs"],
  database: ["MongoDB", "Firebase"],
  ai: ["OpenAI APIs", "Speech-to-Text"],
};

const cloudProviders = [
  { name: "AWS", color: "from-orange-500 to-amber-500" },
  { name: "Azure", color: "from-blue-500 to-cyan-500" },
  { name: "Oracle", color: "from-red-500 to-rose-500" },
  { name: "GCP", color: "from-green-500 to-emerald-500" },
];

const CaseStudiesSection = () => {
  const [activeTab, setActiveTab] = useState("augastam");

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-on-scroll">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">
            Featured Case Studies
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Hospital Information <span className="gradient-text">Systems</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Building next-generation healthcare IT solutions that power hospitals across India
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-1 md:grid-cols-2 gap-2 mb-12 h-auto p-2 bg-card/50 backdrop-blur-sm">
            <TabsTrigger 
              value="augastam" 
              className="py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="text-left w-full">
                <div className="font-bold text-base md:text-lg">Augastam HIS</div>
                <div className="text-xs opacity-70 hidden sm:block">(Client Project - Akhil Systems Pvt Ltd)</div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="squbix" 
              className="py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="text-left w-full">
                <div className="font-bold text-base md:text-lg">Squbix HIS/CMS</div>
                <div className="text-xs opacity-70 hidden sm:block">(Company Product - Built from Scratch)</div>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Augastam Content */}
          <TabsContent value="augastam" className="space-y-12">
            {/* Description */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 animate-on-scroll">
              <p className="text-lg text-muted-foreground text-center">
                Building India's next-generation Hospital Information System for <span className="text-primary font-semibold">Akhil Systems Pvt Ltd</span>, 
                a renowned player in India's healthcare IT market.
              </p>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {augastamMetrics.map((metric, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold gradient-text mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </Card>
              ))}
            </div>

            {/* Architecture */}
            <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
              <h3 className="text-2xl font-bold mb-8 text-center">System Architecture</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-primary/20">
                    <Monitor className="w-10 h-10 mx-auto mb-2 text-blue-400" />
                    <h4 className="font-bold text-lg">Frontend Layer</h4>
                    <p className="text-sm text-muted-foreground mt-2">React.js Web App</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-primary/20">
                    <Smartphone className="w-10 h-10 mx-auto mb-2 text-green-400" />
                    <h4 className="font-bold text-lg">Mobile Apps</h4>
                    <p className="text-sm text-muted-foreground mt-2">Patient & Doctor Apps</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 shadow-lg shadow-primary/10">
                    <Server className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h4 className="font-bold text-xl">Core Services</h4>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="p-2 rounded bg-background/50">EMR Engine</div>
                      <div className="p-2 rounded bg-background/50">Billing System</div>
                      <div className="p-2 rounded bg-background/50">RBAC & Auth</div>
                      <div className="p-2 rounded bg-background/50">AI Services</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-primary/20">
                    <Database className="w-10 h-10 mx-auto mb-2 text-orange-400" />
                    <h4 className="font-bold text-lg">Data Layer</h4>
                    <p className="text-sm text-muted-foreground mt-2">Firebase & MongoDB</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-primary/20">
                    <Brain className="w-10 h-10 mx-auto mb-2 text-pink-400" />
                    <h4 className="font-bold text-lg">AI Layer</h4>
                    <p className="text-sm text-muted-foreground mt-2">NLP & Speech APIs</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-dashed border-primary/30 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Architecture Pattern:</span> Monorepo with Module Federation enabling Micro-frontend deployment
                </p>
              </div>
            </Card>

            {/* Modules */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center animate-on-scroll">Key Modules Developed</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {augastamModules.map((module, index) => (
                  <Card 
                    key={index} 
                    className="p-5 hover:shadow-xl transition-all hover:-translate-y-1 animate-on-scroll group bg-card/50 backdrop-blur-sm border-primary/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <module.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold group-hover:text-primary transition-colors">{module.name}</h4>
                        <p className="text-sm text-muted-foreground">{module.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Role & Clients */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Users className="w-7 h-7 text-primary" />
                  My Role & Leadership
                </h3>
                <ul className="space-y-4">
                  {[
                    "Led 5-member team to build the Smart Billing System",
                    "Go-to person for all AI integrations in HIS",
                    "Took over work from founding member",
                    "Recognized by PM Abdul Kalam (Solution Architect, Fenergo)",
                    "Now leading 8-member cross-functional team",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-primary" />
                  Hospital Clients
                </h3>
                <p className="text-muted-foreground mb-6">
                  Augastam serves major hospital chains across India, trusted by industry leaders:
                </p>
                <div className="flex flex-wrap gap-3">
                  {augastamClients.map((client, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="px-4 py-2 text-sm border-primary/30 bg-primary/5"
                    >
                      {client}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Tech Stack */}
            <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
              <h3 className="text-2xl font-bold mb-8 text-center">Technology Stack</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Object.entries(augastamTechStack).map(([category, techs], index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-primary mb-3 capitalize">{category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {techs.map((tech, i) => (
                        <div 
                          key={i} 
                          className="group relative flex items-center justify-center p-3 rounded-lg bg-card hover:bg-primary/10 transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/50 hover:scale-110"
                          title={tech}
                        >
                          <img 
                            src={techIconUrls[tech] || "https://cdn.simpleicons.org/code"}
                            alt={tech}
                            className="w-8 h-8 object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          />
                          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs px-3 py-1.5 rounded shadow-lg whitespace-nowrap z-10">
                            {tech}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Squbix Content */}
          <TabsContent value="squbix" className="space-y-12">
            {/* Description + Demo */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 animate-on-scroll">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  A modern, cloud-based Hospital Information System designed for seamless healthcare management
                  with real-time data synchronization and AI-powered features. <span className="text-primary font-semibold">Built from scratch</span> as Squbix's flagship product.
                </p>
                
                {/* Cloud Agnostic Banner */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Cloud className="w-6 h-6 text-primary" />
                    <h4 className="font-bold text-lg">Cloud Agnostic Architecture</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Designed to run anywhere - deploy on your preferred cloud provider
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {cloudProviders.map((provider, i) => (
                      <Badge 
                        key={i} 
                        className={`px-4 py-2 bg-gradient-to-r ${provider.color} text-white border-0`}
                      >
                        {provider.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild className="gap-2">
                    <a href="https://his-dev.squbix.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </a>
                  </Button>
                  <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                    <div className="flex items-center gap-3 text-sm">
                      <Key className="w-4 h-4 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">Demo Credentials</p>
                        <p className="text-muted-foreground text-xs">bijay.jena@squbix.com / squbix123</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {squbixMetrics.map((metric, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold gradient-text mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </Card>
              ))}
            </div>

            {/* Architecture */}
            <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
              <h3 className="text-2xl font-bold mb-8 text-center">System Architecture</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-primary/20">
                    <Monitor className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                    <h4 className="font-bold text-lg">Web Portal</h4>
                    <p className="text-sm text-muted-foreground mt-2">React.js Dashboard</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-primary/20">
                    <Smartphone className="w-10 h-10 mx-auto mb-2 text-cyan-400" />
                    <h4 className="font-bold text-lg">Mobile App</h4>
                    <p className="text-sm text-muted-foreground mt-2">Staff & Admin Access</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 shadow-lg shadow-primary/10">
                    <Server className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h4 className="font-bold text-xl">Core Services</h4>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="p-2 rounded bg-background/50">Patient Registry</div>
                      <div className="p-2 rounded bg-background/50">Billing Engine</div>
                      <div className="p-2 rounded bg-background/50">Lab Management</div>
                      <div className="p-2 rounded bg-background/50">Report Generator</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-primary/20">
                    <Database className="w-10 h-10 mx-auto mb-2 text-amber-400" />
                    <h4 className="font-bold text-lg">Data Layer</h4>
                    <p className="text-sm text-muted-foreground mt-2">MongoDB & Firebase</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-primary/20">
                    <Brain className="w-10 h-10 mx-auto mb-2 text-violet-400" />
                    <h4 className="font-bold text-lg">AI Services</h4>
                    <p className="text-sm text-muted-foreground mt-2">OpenAI Integration</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-dashed border-primary/30 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Architecture Pattern:</span> Multi-tenant cloud-agnostic architecture with real-time data synchronization
                </p>
              </div>
            </Card>

            {/* Modules */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center animate-on-scroll">Key Modules</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {squbixModules.map((module, index) => (
                  <Card 
                    key={index} 
                    className="p-5 hover:shadow-xl transition-all hover:-translate-y-1 animate-on-scroll group bg-card/50 backdrop-blur-sm border-primary/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <module.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold group-hover:text-primary transition-colors">{module.name}</h4>
                        <p className="text-sm text-muted-foreground">{module.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contributions */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Users className="w-7 h-7 text-primary" />
                  My Contributions
                </h3>
                <ul className="space-y-4">
                  {[
                    "Core frontend architecture design",
                    "Patient management module development",
                    "Integration of real-time features",
                    "Performance optimization across modules",
                    "Mobile app development using React Native",
                    "AI-powered report generation features"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-primary" />
                  Key Achievements
                </h3>
                <ul className="space-y-4">
                  {[
                    "Built scalable multi-tenant architecture",
                    "Reduced page load times by 60%",
                    "Implemented real-time sync for critical data",
                    "Integrated AI for smart suggestions",
                    "Developed responsive mobile experience",
                    "Created comprehensive test coverage"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Tech Stack */}
            <Card className="p-8 animate-on-scroll bg-card/50 backdrop-blur-sm border-primary/10">
              <h3 className="text-2xl font-bold mb-8 text-center">Technology Stack</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Object.entries(squbixTechStack).map(([category, techs], index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-primary mb-3 capitalize">{category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {techs.map((tech, i) => (
                        <div 
                          key={i} 
                          className="group relative flex items-center justify-center p-3 rounded-lg bg-card hover:bg-primary/10 transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/50 hover:scale-110"
                          title={tech}
                        >
                          <img 
                            src={techIconUrls[tech] || "https://cdn.simpleicons.org/code"}
                            alt={tech}
                            className="w-8 h-8 object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          />
                          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs px-3 py-1.5 rounded shadow-lg whitespace-nowrap z-10">
                            {tech}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CaseStudiesSection;