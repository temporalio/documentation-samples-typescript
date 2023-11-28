import { proxyActivities, log, sleep } from "@temporalio/workflow";
import type * as activities from "./activities";

/*
One way to produce a non-deterministic error is to use a random number to determine whether to sleep inside the Workflow.
*/

const { ssnTraceActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 seconds",
});

// backgroundCheckNonDeterministic is an anti-pattern Workflow Definition
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
title: BackgroundCheckNonDeterministic Workflow
label: Info node label (often becomes the anchor if node is used as a header)
description: BackgroundCheckNonDeterministic Workflow is a non-deterministic Workflow as it uses a random number generator.
lines: 1-35
@dacx */