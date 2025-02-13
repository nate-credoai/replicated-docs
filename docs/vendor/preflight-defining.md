import HttpSecret from "../partials/preflights/_http-requests-secret.mdx"
import HttpCr from "../partials/preflights/_http-requests-cr.mdx"
import MySqlSecret from "../partials/preflights/_mysql-secret.mdx"
import MySqlCr from "../partials/preflights/_mysql-cr.mdx"
import K8sVersionSecret from "../partials/preflights/_k8s-version-secret.mdx"
import K8sVersionCr from "../partials/preflights/_k8s-version-cr.mdx"
import K8sDistroSecret from "../partials/preflights/_k8s-distro-secret.mdx"
import K8sDistroCr from "../partials/preflights/_k8s-distro-cr.mdx"
import NodeReqSecret from "../partials/preflights/_node-req-secret.mdx"
import NodeReqCr from "../partials/preflights/_node-req-cr.mdx"
import NodeCountSecret from "../partials/preflights/_node-count-secret.mdx"
import NodeCountCr from "../partials/preflights/_node-count-cr.mdx"
import NodeMemSecret from "../partials/preflights/_node-mem-secret.mdx"
import NodeMemCr from "../partials/preflights/_node-mem-cr.mdx"
import NodeStorageClassSecret from "../partials/preflights/_node-storage-secret.mdx"
import NodeStorageClassCr from "../partials/preflights/_node-storage-cr.mdx"
import NodeEphemStorageSecret from "../partials/preflights/_node-ephem-storage-secret.mdx"
import NodeEphemStorageCr from "../partials/preflights/_node-ephem-storage-cr.mdx"
import NodeCpuSecret from "../partials/preflights/_node-cpu-secret.mdx"
import NodeCpuCr from "../partials/preflights/_node-cpu-cr.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Defining Preflight Checks

This topic describes how to define preflight checks in Helm chart- and standard Kubernetes manifest-based applications. For more information about preflight checks, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-about).

The information in this topic applies to applications that are installed with the Helm CLI or with Replicated KOTS.

## Step 1: Create the Manifest File

You can define preflight checks in a Kubernetes Secret or in a Preflight custom resource. The type of manifest file that you use depends on your application type (Helm chart- or standard manifest-based) and installation method (Helm CLI or KOTS).

Use the following table to determine which type of manifest file to use for defining preflight checks:

<table>
  <tr>
    <th width="25%"></th>
    <th width="25%">Helm CLI</th>
    <th width="25%">KOTS v1.101.0 and Later</th>
    <th width="25%">KOTS v1.100.3 and Earlier</th>
  </tr>
  <tr>
    <th>Helm Chart-Based Application</th>
    <td><a href="#secret">Kubernetes Secret</a></td>
    <td><a href="#secret">Kubernetes Secret</a></td>
    <td><a href="#preflight-cr">Preflight Custom Resource</a></td>
  </tr>
  <tr>
    <th>Standard Manifest-Based Application</th>
    <td>N/A</td>
    <td><a href="#preflight-cr">Preflight Custom Resource</a></td>
    <td><a href="#preflight-cr">Preflight Custom Resource</a></td>
  </tr>
</table>  

### Kubernetes Secret {#secret}

You can define preflight check specifications in a Kubernetes Secret for the following installation types:
* Installations with the Helm CLI
* Helm chart-based applications installed with KOTS v1.101.0 and later

Add the following YAML to a Kubernetes Secret in your Helm chart `templates` directory:

```yaml
apiVersion: v1
kind: Secret
metadata:
  labels:
    troubleshoot.sh/kind: preflight
  name: "{{ .Release.Name }}-preflight-config"
stringData:
  preflight.yaml: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
      name: preflight-sample
    spec:
      collectors: []
      analyzers: []
```

As shown above, the Secret must include the following:

* The label `troubleshoot.sh/kind: preflight`
* A `stringData` field with a key named `preflight.yaml` so that the preflight binary can use this Secret when it runs from the CLI

### (KOTS Only) Preflight Custom Resource {#preflight-cr}

You can define preflight check specifications in a Preflight custom resource for the following installation types:
* Standard manifest-based applications installed with KOTS
* Helm chart-based applications installed with KOTS v1.100.3 and earlier

:::note
For Helm charts installed with KOTS v1.101.0 and later, Replicated recommends that you define preflight checks in a Secret in the Helm chart templates instead of using the Preflight custom resource. See [Create a Secret](#secret) above.

In KOTS v1.101.0 and later, preflights defined in the Helm chart override the Preflight custom resource used by KOTS. During installation, if KOTS v1.101.0 and later cannot find preflights specified in the Helm chart archive, then KOTS searches for `kind: Preflight` in the root of the release.
:::

Add the following YAML to a new file in a release:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflights
spec:
  collectors: []
  analyzers: []
```

For more information about the Preflight custom resource, see [Preflight and Support Bundle](/reference/custom-resource-preflight).

## Step 2: Define Collectors and Analyzers

This section describes how to define collectors and analyzers for preflight checks based on your application needs. You add the collectors and analyzers that you want to use in the `spec.collectors` and `spec.analyzers` keys in the manifest file that you created.

For examples of collectors and analyzers defined in Kubernetes Secrets and Preflight custom resources, see [Example Specifications](#example-specifications) below. 

### Collectors

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define to generate results for the preflight checks. 

The following default collectors are included automatically to gather information about the cluster and cluster resources:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You do not need manually include the `clusterInfo` or `clusterResources` collectors in the specification. To use only the `clusterInfo` and `clusterResources` collectors, delete the `spec.collectors` key from the preflight specification.

The Troubleshoot open source project includes several additional collectors that you can include in the specification to gather more information from the installation environment. To view all the available collectors, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

### Analyzers

Analyzers use the output from the collectors to generate results for the preflight checks, including the criteria for pass, fail, and warn outcomes and custom messages for each outcome.

For example, in a preflight check that checks the version of Kubernetes running in the target cluster, the analyzer can define a fail outcome when the cluster is running a version of Kubernetes less than 1.25 that includes the following custom message to the user: `The application requires Kubernetes 1.25.0 or later, and recommends 1.27.0`.

The Troubleshoot open source project includes several analyzers that you can include in your preflight check specification. The following are some of the analyzers in the Troubleshoot project that use the default `clusterInfo` or `clusterResources` collectors:
* [clusterPodStatuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/)
* [clusterVersion](https://troubleshoot.sh/docs/analyze/cluster-version/)
* [deploymentStatus](https://troubleshoot.sh/docs/analyze/deployment-status/)
* [distribution](https://troubleshoot.sh/docs/analyze/distribution/)
* [nodeResources](https://troubleshoot.sh/docs/analyze/node-resources/)
* [statefulsetStatus](https://troubleshoot.sh/docs/analyze/stateful-set-status/)
* [storageClass](https://troubleshoot.sh/docs/analyze/storage-class/)

To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

### (KOTS Only) `strict` Analyzers

For applications installed with KOTS, you can set any preflight analyzer to `strict: true`. When `strict: true` is set, any `fail` outcomes for the analyzer block the deployment of the release. For more information, see [strict](https://troubleshoot.sh/docs/analyze/#strict) in the Troubleshoot documentation.

:::note
Strict preflight analyzers are ignored if the `exclude` property is also included and evaluates to `true`. See [exclude](https://troubleshoot.sh/docs/analyze/#exclude) in the Troubleshoot documentation.
:::

## Example Specifications

This section includes common examples of preflight check specifications. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/preflight) in GitHub.

### Check HTTP or HTTPS Requests from the Cluster

The examples below use the `http` collector and the `textAnalyze` analyzer to check that an HTTP request to the Slack API at `https://api.slack.com/methods/api.test` made from the cluster returns a successful response of `"status": 200,`.

For more information, see [HTTP](https://troubleshoot.sh/docs/collect/http/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <HttpSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <HttpCr/>
    <p>The following shows how the <code>pass</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing pass message" src="/images/preflight-http-pass.png"/>
    <a href="/images/preflight-http-pass.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Kubernetes Version

The examples below use the `clusterVersion` analyzer to check the version of Kubernetes running in the cluster. The `clusterVersion` analyzer uses data from the default `clusterInfo` collector. The `clusterInfo` collector is automatically included.

For more information, see [Cluster Version](https://troubleshoot.sh/docs/analyze/cluster-version/) and [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <K8sVersionSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <K8sVersionCr/>
    <p>The following shows how the <code>warn</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing warning message" src="/images/preflight-k8s-version-warn.png"/>
    <a href="/images/preflight-k8s-version-warn.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Kubernetes Distribution

The examples below use the `distribution` analyzer to check the Kubernetes distribution of the cluster. The `distribution` analyzer uses data from the default `clusterInfo` collector. The `clusterInfo` collector is automatically included.

For more information, see [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) and [Distribution](https://troubleshoot.sh/docs/analyze/distribution/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <K8sDistroSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <K8sDistroCr/>
    <p>The following shows how the <code>pass</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing pass message" src="/images/preflight-k8s-distro.png"/>
    <a href="/images/preflight-k8s-distro.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check MySQL Version Using Template Functions

The examples below use the `mysql` collector and the `mysql` analyzer to check the version of MySQL running in the cluster.

For more information, see [Collect > MySQL](https://troubleshoot.sh/docs/collect/mysql/) and [Analyze > MySQL](https://troubleshoot.sh/docs/analyze/mysql/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <p>This example uses Helm template functions to render the credentials and connection details for the MySQL server that were supplied by the user. Additionally, it uses Helm template functions to create a conditional statement so that the MySQL collector and analyzer are included in the preflight checks only when MySQL is deployed, as indicated by a <code>.Values.global.mysql.enabled</code> field evaluating to true.</p>
    <p>For more information about using Helm template functions to access values from the values file, see <a href="https://helm.sh/docs/chart_template_guide/values_files/">Values Files</a>.</p>
    <MySqlSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <p>This example uses Replicated template functions in the Config context to render the credentials and connection details for the MySQL server that were supplied by the user in the Replicated admin console <strong>Config</strong> page. Replicated recommends using a template function for the URI, as shown above, to avoid exposing sensitive information. For more information about template functions, see <a href="/reference/template-functions-about">About Template Functions</a>.</p>
    <p>This example also uses an analyzer with <code>strict: true</code>, which prevents installation from continuing if the preflight check fails.</p>
    <MySqlCr/>
    <p>The following shows how a <code>fail</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade when <code>strict: true</code> is set for the analyzer:</p>
    <img alt="Strict preflight checks in admin console showing fail message" src="/images/preflight-mysql-fail-strict.png"/>
    <a href="/images/preflight-mysql-fail-strict.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Node Memory

The examples below use the `nodeResources` analyzer to check that a required storage class is available in the nodes in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeMemSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <NodeMemCr/>
    <p>The following shows how a <code>warn</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing warn message" src="/images/preflight-node-memory-warn.png"/>
    <a href="/images/preflight-node-memory-warn.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Node Storage Class Availability

The examples below use the `storageClass` analyzer to check that a required storage class is available in the nodes in the cluster. The `storageClass` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeStorageClassSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <NodeStorageClassCr/>
    <p>The following shows how a <code>fail</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing fail message" src="/images/preflight-storageclass-fail.png"/>
    <a href="/images/preflight-storageclass-fail.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Node Ephemeral Storage

The examples below use the `nodeResources` analyzer to check the ephemeral storage available in the nodes in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeEphemStorageSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <NodeEphemStorageCr/>
    <p>The following shows how a <code>pass</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing pass message" src="/images/preflight-ephemeral-storage-pass.png"/>
    <a href="/images/preflight-ephemeral-storage-pass.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Requirements Are Met By At Least One Node

The examples below use the `nodeResources` analyzer with filters to check that the requirements for memory, CPU cores, and architecture are met by at least one node in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeReqSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <NodeReqCr/>
    <p>The following shows how the <code>fail</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing fail message" src="/images/preflight-node-filters-faill.png"/>
    <a href="/images/preflight-node-filters-faill.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Total CPU Cores Across Nodes

The examples below use the `nodeResources` analyzer to check the version of Kubernetes running in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeCpuSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <NodeCpuCr/>
    <p>The following shows how the <code>pass</code> outcome for this preflight check is displayed in the admin console during KOTS installation or upgrade:</p>
    <img alt="Preflight checks in admin console showing fail message" src="/images/preflight-cpu-pass.png"/>
    <a href="/images/preflight-cpu-pass.png">View a larger version of this image</a>
  </TabItem>
</Tabs>