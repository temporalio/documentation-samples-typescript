import { proxyActivities, log, sleep } from "@temporalio/workflow";
import type * as activities from "./activities";

/*
In the following sample, we add a couple of logging statements and a Timer to the Workflow code to see how this affects the Event History.

Use the `sleep()` API to cause the Workflow to sleep for a minute before the call to execute the Activity.

By using Temporal's logging API, the Worker is able to suppress these log messages during replay so that log statements from the original execution aren't duplicated by the re-execution.
*/

const { ssnTraceActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 seconds",
});

export async function backgroundCheckNonDeterministic(
  ssn: string
): Promise<string> {
  // CAUTION, the following code is an anti-pattern showing what NOT to do
  if (getRandomNumber(1, 100) > 50) {
    await sleep("10 seconds");
  }

  log.info("Preparing to run daily report", {});

  try {
    const ssnTraceResult = await ssnTraceActivity(ssn);
    return ssnTraceResult;
  } catch (err) {
    throw err;
  }
}

function getRandomNumber(min: number, max: number) {
  let seed = 1234;
  seed = Math.floor(((seed * seed) % 10000) / 100);
  return min + (seed % (max - min + 1));
}

/* @dacx
id: non-deterministic-code-changes
title: Testing Example NonDeterminism
label: Info node label (often becomes the anchor if node is used as a header)
description: Longer description of the info node used in link page previews.
lines: 1-38
@dacx */