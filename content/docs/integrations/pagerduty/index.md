---
title: Set up the PagerDuty plugin
publishedDate: '2022-08-26T21:00:00.0Z'
description: How to set up the Backstage PagerDuty plugin in Roadie Backstage.

humanName: PagerDuty
logoImage: '../../../assets/logos/pagerduty/pagerduty-logo-light-200x200.png'
integrationType: OSS plugin
---

## Introduction

The PagerDuty Backstage plugin allows Roadie Backstage users to:

 1. See who is on call for a particular catalog Component.
 2. See if there are active incidents for a given catalog Component.
 3. Create new incidents from Backstage.

![PagerDuty plugin in Roadie Backstage](./pagerduty-plugin.png)

In order to use the PagerDuty plugin, Roadie needs an API token to communicate with it's APIs.

This page describes how to create and set up the API token.

## Steps

### Step 1: Create an API token

Inside PagerDuty, access "API Access Keys" inside the "Integrations" menu.

![API Access menu Item on PagerDuty integrations menu](./create-api-token.png)

On the API Access Keys page, click the "Create New API Key" button.

![Create new api key button](./create-new-api-key.png)

Set a sensible description and click "Create Key".

![Create key modal](./create-key.png)

ℹ️  The PagerDuty Backstage plugin allows users to create PagerDuty incidents from within Backstage. For this reason, the API key needs both read and write permissions to function correctly.

Copy the key that is created to your clipboard.

### Step 2: Store the credentials in Roadie

Visit the following URL and enter the API Key value from above into `PAGERDUTY_TOKEN`.

```text
https://<tenant-name>.roadie.so/administration/settings/secrets
```

ℹ️  Roadie accepts the token from PagerDuty unmodified. The configuration steps for the PagerDuty plugin in self-hosted Backstage are more complex, and will not work in Roadie.

### Step 3: Add the PagerDuty annotation

Backstage requires a PagerDuty annotation on every component which will display the PagerDuty plugin. The annotation key is `pagerduty.com/integration-key`.

This example shows how it might look on a Backstage component:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-service
  title: Sample Service
  description: A sample service
  annotations:
    pagerduty.com/integration-key: <sample-service-integration-key>
spec:
  type: service
  owner: sample-team
  lifecycle: experimental
```

To generate the PagerDuty integration key, find a "Service" in the PagerDuty Service Directory and view the Integrations tab.

![integrations tab](./integrations-tab.png)

Click the Add an integration link. Choose Events API V2, and click the Add button.

![Integrations list](./integrations-list.png)

You should now be redirected back to the Integrations tab, and a new integration should have been created. You can edit the integration name to indicate that this is a Roadie Backstage integration.

![Created integration](./created-integration.png)

Copy the Integration Key and add it to the Component YAML.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-service
  title: Sample Service
  description: A sample service
  annotations:
    pagerduty.com/integration-key: c5dd2b278fdc4d01d0a4a02b25c1ccc1
spec:
  type: service
  owner: sample-team
  lifecycle: experimental
```

Commit and merge this change and the Roadie Backstage PagerDuty plugin should begin working shortly afterwards.


## References

- [PagerDuty docs for creating API tokens](https://support.pagerduty.com/docs/generating-api-keys)
