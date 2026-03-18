Failed to compile.
./components/project-detail/upgrade-prompt.tsx:12:41
Type error: Module '"@/lib/tier-utils"' declares 'FeatureName' locally, but it is not exported.
  10 | import { Button } from "@/components/ui/button";
  11 | import { PLAN_FEATURES, PLAN_NAMES, PLAN_PRICES, type PlanName } from "@/lib/tier-config";
> 12 | import { getMinimumPlanForFeature, type FeatureName } from "@/lib/tier-utils";
     |                                         ^
  13 |
  14 | interface UpgradePromptProps {
  15 |   feature: string; // Display name (e.g., "Social Posts")
Next.js build worker exited with code: 1 and signal: null
 ELIFECYCLE  Command failed with exit code 1.
Error: Command "pnpm run build" exited with 1