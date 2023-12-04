/* dacx */

/*
In the Temporal TypeScript SDK programming model, an Activity is an exportable async function.
The following code shows an example of an Activity defined as a function:
*/

export async function ssnTrace(param: string): Promise<string> {
  // This is where a call to another service is made
  // Here we are pretending that the service that does SSNTrace returned "pass"
  return "pass";
}

/*
This Activity definition uses a single input parameter and returns a string.

An Activity Definition can support as many other custom parameters as needed.
However, all parameters must be serializable.

We recommend creating an Interface and using a single input parameter rather
than using multiple input parameters.
*/

/* @dacx
id: backgroundcheck-boilerplate-ssntrace-activity
title: Boilerplate Activity code
label: Activity code
description: In the Temporal TypeScript SDK programming model, an Activity Definition is an exportable async function.
tags:
- typescript sdk
- code sample
- activity
lines: 3-12
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-activity-details
title: Boilerplate Activity code details
label: Activity code details
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- typescript sdk
- activity
lines: 14-22
@dacx */
