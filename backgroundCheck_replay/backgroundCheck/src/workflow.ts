import { proxyActivities, log, sleep } from "@temporalio/workflow";
import type * as activities from "./activities";

const { ssnTraceActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 seconds",
});

export async function backgroundCheck(ssn: string): Promise<string> {
  log.info("Sleeping for 1 minute...");
  await sleep("1 minute");
  log.info("Finished sleeping");
  try {
    const ssnTraceResult = await ssnTraceActivity(ssn);
    return ssnTraceResult;
  } catch (err) {
    throw err;
  }
}
