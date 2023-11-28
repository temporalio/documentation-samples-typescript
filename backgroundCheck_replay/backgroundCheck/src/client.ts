import { Connection, WorkflowClient } from "@temporalio/client";
import { nanoid } from "nanoid";

import { backgroundCheck } from "./workflow";
import { BACKGROUND_CHECK_TASK_QUEUE } from "./shared";

async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new WorkflowClient({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const backgroundCheckHandle = await client.start(backgroundCheck, {
    // type inference works! args: [name: string]
    args: ["555-55-5555"],
    taskQueue: BACKGROUND_CHECK_TASK_QUEUE,
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: "background-check-" + nanoid(),
  });

  console.log(
    `Started backgroundCheck workflow ${backgroundCheckHandle.workflowId}`
  );

  // optional: wait for client result
  console.log(await backgroundCheckHandle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
