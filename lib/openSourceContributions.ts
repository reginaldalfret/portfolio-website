export type ContributionStatus = "merged" | "incorporated";
export type ContributionCategory = "DOCS" | "BUG FIX" | "TEST" | "INFRA" | "BUILD";

export interface OpenSourceContribution {
  id: string;
  organization: string;
  orgKey:
    | "meta"
    | "apache"
    | "intel"
    | "azure"
    | "ibm"
    | "docker"
    | "sap"
    | "github"
    | "rocm"
    | "cloudflare"
    | "qualcomm"
    | "nvidia"
    | "airbnb"
    | "apple"
    | "pinterest"
    | "uber"
    | "jruby"
    | "nasa"
    | "aws"
    | "dotnet"
    | "adobe";
  repository: string;
  prNumber: number;
  title: string;
  url: string;
  status: ContributionStatus;
  statusLabel: string;
  incorporatedInto?: {
    prNumber: number;
    url: string;
    description: string;
  };
  category: ContributionCategory;
  contribution: string;
  date: string; // ISO date string
  displayDate: string;
  theme: {
    accent: string;
    borderGlow: string;
    gradient: string;
    textColor: string;
    badgeBg: string;
  };
}

export const OPEN_SOURCE_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    id: "airbnb-magazinelayout-169",
    organization: "Airbnb",
    orgKey: "airbnb",
    repository: "airbnb/MagazineLayout",
    prNumber: 169,
    title: "fix(podspec): specify swift_versions array supporting Swift 4.0, 4.2, and 5.0",
    url: "https://github.com/airbnb/MagazineLayout/pull/169",
    status: "merged",
    statusLabel: "Merged",
    category: "BUILD",
    contribution:
      "Specified explicit swift_versions array supporting Swift 4.0, 4.2, and 5.0 in the CocoaPods specification for dependency manager compatibility.",
    date: "2026-10-08T15:24:52Z",
    displayDate: "Oct 8, 2026",
    theme: {
      accent: "#FF5A5F",
      borderGlow: "rgba(255, 90, 95, 0.35)",
      gradient: "from-rose-500/15 via-pink-600/5 to-transparent",
      textColor: "text-rose-400",
      badgeBg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
    },
  },
  {
    id: "apple-swift-numerics-355",
    organization: "Apple",
    orgKey: "apple",
    repository: "apple/swift-numerics",
    prNumber: 355,
    title: "docs: add dedicated documentation for ApproximateEquality",
    url: "https://github.com/apple/swift-numerics/pull/355",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Authored dedicated documentation and usage examples for the ApproximateEquality protocol in Swift Numerics.",
    date: "2026-10-08T14:44:08Z",
    displayDate: "Oct 8, 2026",
    theme: {
      accent: "#E5E5E7",
      borderGlow: "rgba(255, 255, 255, 0.35)",
      gradient: "from-neutral-300/15 via-neutral-400/5 to-transparent",
      textColor: "text-neutral-200",
      badgeBg: "bg-white/10 border-white/30 text-white",
    },
  },
  {
    id: "qualcomm-appbuilder-286",
    organization: "Qualcomm",
    orgKey: "qualcomm",
    repository: "qualcomm/qai-appbuilder",
    prNumber: 286,
    title: "docs(webui): fix screenshot relative image paths in README",
    url: "https://github.com/qualcomm/qai-appbuilder/pull/286",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Fixed broken screenshot relative image paths in WebUI documentation to ensure consistent asset rendering across docs.",
    date: "2026-10-08T02:59:53Z",
    displayDate: "Oct 8, 2026",
    theme: {
      accent: "#3253DC",
      borderGlow: "rgba(50, 83, 220, 0.35)",
      gradient: "from-blue-600/15 via-indigo-600/5 to-transparent",
      textColor: "text-blue-400",
      badgeBg: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    },
  },
  {
    id: "cloudflare-vinext-3469",
    organization: "Cloudflare",
    orgKey: "cloudflare",
    repository: "cloudflare/vinext",
    prNumber: 3469,
    title: "docs(standalone): document startProdServer for custom and compiled entries",
    url: "https://github.com/cloudflare/vinext/pull/3469",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Documented startProdServer programmatic API for custom server scripts and compiled standalone outputs in Cloudflare vinext.",
    date: "2026-10-07T23:29:25Z",
    displayDate: "Oct 7, 2026",
    theme: {
      accent: "#F38020",
      borderGlow: "rgba(243, 128, 32, 0.35)",
      gradient: "from-amber-500/15 via-orange-600/5 to-transparent",
      textColor: "text-amber-400",
      badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    },
  },
  {
    id: "nvidia-cuda-quantum-5560",
    organization: "NVIDIA",
    orgKey: "nvidia",
    repository: "NVIDIA/cuda-quantum",
    prNumber: 5560,
    title: "docs: correct typos and phrasing in state vector simulators documentation",
    url: "https://github.com/NVIDIA/cuda-quantum/pull/5560",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Corrected typographical errors and refined technical phrasing in the state vector simulators quantum documentation.",
    date: "2026-10-07T22:35:17Z",
    displayDate: "Oct 7, 2026",
    theme: {
      accent: "#76B900",
      borderGlow: "rgba(118, 185, 0, 0.35)",
      gradient: "from-emerald-500/15 via-green-600/5 to-transparent",
      textColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    },
  },
  {
    id: "amd-rocm-1231",
    organization: "AMD ROCm",
    orgKey: "rocm",
    repository: "ROCm/hrx-system",
    prNumber: 1231,
    title: "[Infra] Allow reusing populated tool environments with compatible Python versions",
    url: "https://github.com/ROCm/hrx-system/pull/1231",
    status: "merged",
    statusLabel: "Merged",
    category: "INFRA",
    contribution:
      "Improved Python environment reuse by allowing compatible populated environments instead of enforcing strict Python-version string equality.",
    date: "2026-10-05T19:21:14Z",
    displayDate: "Oct 5, 2026",
    theme: {
      accent: "#ED1C24",
      borderGlow: "rgba(237, 28, 36, 0.35)",
      gradient: "from-red-500/15 via-rose-600/5 to-transparent",
      textColor: "text-red-400",
      badgeBg: "bg-red-500/10 border-red-500/30 text-red-300",
    },
  },
  {
    id: "cli-cli-14592",
    organization: "GitHub",
    orgKey: "github",
    repository: "cli/cli",
    prNumber: 14592,
    title: "docs: recommend nix-shell and declarative config for Nix/NixOS",
    url: "https://github.com/cli/cli/pull/14592",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Improved Nix/NixOS installation documentation for GitHub CLI by recommending nix-shell and declarative configuration approaches.",
    date: "2026-10-05T16:25:08Z",
    displayDate: "Oct 5, 2026",
    theme: {
      accent: "#8957E5",
      borderGlow: "rgba(137, 87, 229, 0.35)",
      gradient: "from-purple-500/15 via-violet-600/5 to-transparent",
      textColor: "text-purple-300",
      badgeBg: "bg-purple-500/10 border-purple-500/30 text-purple-200",
    },
  },
  {
    id: "sap-terraform-1710",
    organization: "SAP",
    orgKey: "sap",
    repository: "SAP/terraform-provider-btp",
    prNumber: 1710,
    title: "docs(subaccount_service_instance): expand service instance import guidance",
    url: "https://github.com/SAP/terraform-provider-btp/pull/1710",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Expanded Terraform import documentation with guidance for parameters, timeouts, and non-updateable service instances.",
    date: "2026-10-05T08:43:16Z",
    displayDate: "Oct 5, 2026",
    theme: {
      accent: "#008FD3",
      borderGlow: "rgba(0, 143, 211, 0.35)",
      gradient: "from-sky-500/15 via-blue-600/5 to-transparent",
      textColor: "text-sky-400",
      badgeBg: "bg-sky-500/10 border-sky-500/30 text-sky-300",
    },
  },
  {
    id: "docker-docs-26266",
    organization: "Docker",
    orgKey: "docker",
    repository: "docker/docs",
    prNumber: 26266,
    title: "docs: align enableDockerAI accepted values description with settings-reference",
    url: "https://github.com/docker/docs/pull/26266",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Updated Docker documentation so enableDockerAI accurately documents both boolean and Business-tier string values.",
    date: "2026-10-05T06:41:38Z",
    displayDate: "Oct 5, 2026",
    theme: {
      accent: "#2496ED",
      borderGlow: "rgba(36, 150, 237, 0.35)",
      gradient: "from-blue-500/15 via-cyan-600/5 to-transparent",
      textColor: "text-blue-400",
      badgeBg: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    },
  },
  {
    id: "ibm-docling-85",
    organization: "IBM",
    orgKey: "ibm",
    repository: "IBM/docling-pipelines",
    prNumber: 85,
    title: "docs: remove stale src/docpipe_app/backend references",
    url: "https://github.com/IBM/docling-pipelines/pull/85",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Removed obsolete project paths from contributor and architecture documentation and aligned documentation with current project structure.",
    date: "2026-10-05T04:21:05Z",
    displayDate: "Oct 5, 2026",
    theme: {
      accent: "#1F70C1",
      borderGlow: "rgba(31, 112, 193, 0.35)",
      gradient: "from-indigo-500/15 via-blue-600/5 to-transparent",
      textColor: "text-indigo-400",
      badgeBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
    },
  },
  {
    id: "azure-cosmos-359",
    organization: "Microsoft Azure",
    orgKey: "azure",
    repository: "Azure/azure-cosmos-db-emulator-docker",
    prNumber: 359,
    title: "docs: update Linux-based emulator heading and image tags to GA",
    url: "https://github.com/Azure/azure-cosmos-db-emulator-docker/pull/359",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Updated Linux Cosmos DB emulator documentation and container image references to reflect GA status.",
    date: "2026-10-02T23:54:08Z",
    displayDate: "Oct 2, 2026",
    theme: {
      accent: "#0089D6",
      borderGlow: "rgba(0, 137, 214, 0.35)",
      gradient: "from-cyan-500/15 via-blue-600/5 to-transparent",
      textColor: "text-cyan-400",
      badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    },
  },
  {
    id: "intel-torch-5518",
    organization: "Intel",
    orgKey: "intel",
    repository: "intel/torch-xpu-ops",
    prNumber: 5518,
    title: "[UT] Align grid_sample error assertion with upstream",
    url: "https://github.com/intel/torch-xpu-ops/pull/5518",
    status: "merged",
    statusLabel: "Merged",
    category: "TEST",
    contribution:
      "Aligned the XPU test suite with upstream PyTorch by removing an obsolete grid_sample exception assertion.",
    date: "2026-09-29T14:48:45Z",
    displayDate: "Sep 29, 2026",
    theme: {
      accent: "#0071C5",
      borderGlow: "rgba(0, 113, 197, 0.35)",
      gradient: "from-blue-600/15 via-sky-600/5 to-transparent",
      textColor: "text-sky-400",
      badgeBg: "bg-sky-500/10 border-sky-500/30 text-sky-300",
    },
  },
  {
    id: "apache-shenyu-696",
    organization: "Apache",
    orgKey: "apache",
    repository: "apache/shenyu-dashboard",
    prNumber: 696,
    title: "[ISSUE #650] Fix PropTypes validators declared in defaultProps",
    url: "https://github.com/apache/shenyu-dashboard/pull/696",
    status: "merged",
    statusLabel: "Merged",
    category: "BUG FIX",
    contribution:
      "Fixed incorrect placement of PropTypes validators in defaultProps by moving them to propTypes.",
    date: "2026-09-28T12:51:02Z",
    displayDate: "Sep 28, 2026",
    theme: {
      accent: "#D22128",
      borderGlow: "rgba(210, 33, 40, 0.35)",
      gradient: "from-rose-500/15 via-red-600/5 to-transparent",
      textColor: "text-rose-400",
      badgeBg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
    },
  },
  {
    id: "meta-stylex-1899",
    organization: "Meta",
    orgKey: "meta",
    repository: "facebook/stylex",
    prNumber: 1899,
    title: "fix(docs): avoid inline-flex on heading anchor links",
    url: "https://github.com/facebook/stylex/pull/1899",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Removed problematic inline-flex/gap styling from heading anchor links to preserve natural inline wrapping for mixed inline content.",
    date: "2026-09-23T22:17:00Z",
    displayDate: "Sep 23, 2026",
    theme: {
      accent: "#0081FB",
      borderGlow: "rgba(0, 129, 251, 0.35)",
      gradient: "from-blue-500/15 via-indigo-600/5 to-transparent",
      textColor: "text-blue-400",
      badgeBg: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    },
  },
,
  {
    id: "pinterest-pymemcache-657",
    organization: "Pinterest",
    orgKey: "pinterest",
    repository: "pinterest/pymemcache",
    prNumber: 657,
    title: "build: remove bdist_wheel universal flag to build py3-only wheels",
    url: "https://github.com/pinterest/pymemcache/pull/657",
    status: "merged",
    statusLabel: "Merged",
    category: "BUILD",
    contribution:
      "Corrected wheel metadata so Python 3-only releases are not incorrectly advertised as supporting Python 2.",
    date: "2026-10-08T21:23:14Z",
    displayDate: "Oct 8, 2026",
    theme: {
      accent: "#E60023",
      borderGlow: "rgba(230, 0, 35, 0.35)",
      gradient: "from-rose-500/15 via-red-600/5 to-transparent",
      textColor: "text-rose-400",
      badgeBg: "bg-rose-500/10 border-red-500/30 text-rose-300",
    },
  },
  {
    id: "uber-kraken-715",
    organization: "Uber",
    orgKey: "uber",
    repository: "uber/kraken",
    prNumber: 715,
    title: "chore: remove checked-in vim swap files and ignore *.sw?",
    url: "https://github.com/uber/kraken/pull/715",
    status: "merged",
    statusLabel: "Merged",
    category: "MAINTENANCE",
    contribution:
      "Removed accidentally committed Vim swap files and added .gitignore patterns to prevent future occurrences.",
    date: "2026-10-13T15:21:02Z",
    displayDate: "Oct 13, 2026",
    theme: {
      accent: "#FFFFFF",
      borderGlow: "rgba(255, 255, 255, 0.25)",
      gradient: "from-neutral-200/10 via-neutral-400/5 to-transparent",
      textColor: "text-neutral-200",
      badgeBg: "bg-white/10 border-white/20 text-white",
    },
  },
  {
    id: "jruby-9796",
    organization: "JRuby",
    orgKey: "jruby",
    repository: "jruby/jruby",
    prNumber: 9796,
    title: "fix(string): prevent ArrayIndexOutOfBoundsException in strip on 4-byte GB18030 strings",
    url: "https://github.com/jruby/jruby/pull/9796",
    status: "merged",
    statusLabel: "Merged",
    category: "BUG FIX",
    contribution:
      "Fixed string processing with four-byte GB18030-encoded characters to prevent ArrayIndexOutOfBoundsException in strip-related operations.",
    date: "2026-10-14T08:26:21Z",
    displayDate: "Oct 14, 2026",
    theme: {
      accent: "#CC342D",
      borderGlow: "rgba(204, 52, 45, 0.35)",
      gradient: "from-red-500/15 via-rose-600/5 to-transparent",
      textColor: "text-rose-400",
      badgeBg: "bg-rose-500/10 border-red-500/30 text-rose-300",
    },
  },
  {
    id: "nasa-oceandata-208",
    organization: "NASA",
    orgKey: "nasa",
    repository: "nasa/oceandata-notebooks",
    prNumber: 208,
    title: "docs: point l2 flags links to oceandata.sci.gsfc.nasa.gov",
    url: "https://github.com/nasa/oceandata-notebooks/pull/208",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Updated six outdated L2 flags links across four notebooks to point to the current NASA OceanData reference.",
    date: "2026-10-16T17:47:34Z",
    displayDate: "Oct 16, 2026",
    theme: {
      accent: "#0B3D91",
      borderGlow: "rgba(11, 61, 145, 0.35)",
      gradient: "from-blue-500/15 via-indigo-600/5 to-transparent",
      textColor: "text-blue-300",
      badgeBg: "bg-blue-500/10 border-blue-500/30 text-blue-200",
    },
  },
  {
    id: "nasa-oceandata-209",
    organization: "NASA",
    orgKey: "nasa",
    repository: "nasa/oceandata-notebooks",
    prNumber: 209,
    title: "docs: clarify earthaccess.open vs download outside the cloud",
    url: "https://github.com/nasa/oceandata-notebooks/pull/209",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Clarified when opening data outside the cloud may be slow and when downloading data is an alternative.",
    date: "2026-10-16T17:45:48Z",
    displayDate: "Oct 16, 2026",
    theme: {
      accent: "#0B3D91",
      borderGlow: "rgba(11, 61, 145, 0.35)",
      gradient: "from-blue-500/15 via-indigo-600/5 to-transparent",
      textColor: "text-blue-300",
      badgeBg: "bg-blue-500/10 border-blue-500/30 text-blue-200",
    },
  },
  {
    id: "aws-xray-sdk-python-494",
    organization: "AWS",
    orgKey: "aws",
    repository: "aws/aws-xray-sdk-python",
    prNumber: 494,
    title: "docs: escape tcp daemon address in docstring to prevent broken link",
    url: "https://github.com/aws/aws-xray-sdk-python/pull/494",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Used inline-code formatting for TCP daemon addresses to prevent Sphinx from interpreting them as external URLs.",
    date: "2026-10-16T20:50:22Z",
    displayDate: "Oct 16, 2026",
    theme: {
      accent: "#FF9900",
      borderGlow: "rgba(255,153,0,0.35)",
      gradient: "from-orange-500/15 via-amber-600/5 to-transparent",
      textColor: "text-amber-400",
      badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    },
  },
  {
    id: "aws-powertools-8542",
    organization: "AWS",
    orgKey: "aws",
    repository: "aws-powertools/powertools-lambda-python",
    prNumber: 8542,
    title: "fix(parser): support camelCase replyTo in SesMailCommonHeaders",
    url: "https://github.com/aws-powertools/powertools-lambda-python/pull/8542",
    status: "merged",
    statusLabel: "Merged",
    category: "BUG FIX",
    contribution:
      "Updated SES email-header parsing to support camelCase replyTo, preserve existing aliases, and add unit tests.",
    date: "2026-10-15T12:43:57Z",
    displayDate: "Oct 15, 2026",
    theme: {
      accent: "#FF9900",
      borderGlow: "rgba(255,153,0,0.35)",
      gradient: "from-orange-500/15 via-amber-600/5 to-transparent",
      textColor: "text-amber-400",
      badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    },
  },
  {
    id: "dotnet-roslyn-85999",
    organization: "Microsoft .NET",
    orgKey: "dotnet",
    repository: "dotnet/roslyn",
    prNumber: 85999,
    title: "docs(banned-api): add package readme and bundle with NuGet package",
    url: "https://github.com/dotnet/roslyn/pull/85999",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Added README documentation, configuration examples, and NuGet packaging support for BannedApiAnalyzers.",
    date: "2026-10-13T21:02:18Z",
    displayDate: "Oct 13, 2026",
    theme: {
      accent: "#512BD4",
      borderGlow: "rgba(81,43,212,0.35)",
      gradient: "from-violet-500/15 via-purple-600/5 to-transparent",
      textColor: "text-violet-300",
      badgeBg: "bg-violet-500/10 border-violet-500/30 text-violet-200",
    },
  },
  {
    id: "adobe-skills-445",
    organization: "Adobe",
    orgKey: "adobe",
    repository: "adobe/skills",
    prNumber: 445,
    title: "docs: replace obsolete aem-design references with stardust plugin",
    url: "https://github.com/adobe/skills/pull/445",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution:
      "Updated plugin installation instructions, documented Stardust capabilities, and aligned marketplace references with the current plugin registration.",
    date: "2026-10-17T13:46:42Z",
    displayDate: "Oct 17, 2026",
    theme: {
      accent: "#EB1000",
      borderGlow: "rgba(235,16,0,0.35)",
      gradient: "from-red-500/15 via-orange-600/5 to-transparent",
      textColor: "text-red-400",
      badgeBg: "bg-red-500/10 border-red-500/30 text-red-300",
    },
  }
];

export const OPEN_SOURCE_METRICS = {
  mergedCount: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.status === "merged").length,
  incorporatedCount: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.status === "incorporated").length,
  totalContributions: OPEN_SOURCE_CONTRIBUTIONS.length,
  totalOrganizations: new Set(OPEN_SOURCE_CONTRIBUTIONS.map((c) => c.organization)).size,
  summaryStatement: "23 merged pull requests across 20 major organizations and ecosystems",
};
