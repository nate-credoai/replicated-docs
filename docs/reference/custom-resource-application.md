import Title from "../partials/custom-resource-application/_title.mdx"
import Icon from "../partials/custom-resource-application/_icon.mdx"
import ReleaseNotes from "../partials/custom-resource-application/_releaseNotes.mdx"
import AllowRollback from "../partials/custom-resource-application/_allowRollback.mdx"
import AdditionalNamespaces from "../partials/custom-resource-application/_additionalNamespaces.mdx"
import AdditionalImages from "../partials/custom-resource-application/_additionalImages.mdx"
import KubectlVersion from "../partials/custom-resource-application/_kubectlVersion.mdx"
import KustomizeVersion from "../partials/custom-resource-application/_kustomizeVersion.mdx"
import RequireMinimalRBACPrivileges from "../partials/custom-resource-application/_requireMinimalRBACPrivileges.mdx"
import SupportMinimalRBACPrivileges from "../partials/custom-resource-application/_supportMinimalRBACPrivileges.mdx"
import Ports from "../partials/custom-resource-application/_ports.mdx"
import StatusInformers from "../partials/custom-resource-application/_statusInformers.mdx"
import Graphs from "../partials/custom-resource-application/_graphs.mdx"
import GraphsTemplates from "../partials/custom-resource-application/_graphs-templates.mdx"
import TargetKotsVersion from "../partials/custom-resource-application/_targetKotsVersion.mdx"
import MinKotsVersion from "../partials/custom-resource-application/_minKotsVersion.mdx"
import ProxyRegistryDomain from "../partials/custom-resource-application/_proxyRegistryDomain.mdx"
import ReplicatedRegistryDomain from "../partials/custom-resource-application/_replicatedRegistryDomain.mdx"
import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"
import KurlNote from "../partials/custom-resource-application/_ports-kurl-note.mdx"

# Application

The Application custom resource enables features such as branding, release notes, port forwarding, dashboard buttons, app status indicators, and custom graphs.

There is some overlap between the Application custom resource manifest file and the [Kubernetes SIG Application custom resource](https://github.com/kubernetes-sigs/application/blob/master/docs/api.md). For example, enabling features such as [adding a button to the dashboard](/vendor/admin-console-adding-buttons-links) requires the use of both the Application and SIG Application custom resources.

The following is an example manifest file for the Application custom resource:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: https://support.io/img/logo.png
  releaseNotes: These are our release notes
  allowRollback: false
  kubectlVersion: ">=1.22.0 <1.25.0"
  kustomizeVersion: ">= 5.0.0"
  targetKotsVersion: "1.60.0"
  minKotsVersion: "1.40.0"
  requireMinimalRBACPrivileges: false
  additionalImages:
    - jenkins/jenkins:lts
  additionalNamespaces:
    - "*"
  ports:
    - serviceName: web
      servicePort: 9000
      localPort: 9000
      applicationUrl: "http://web"
  statusInformers:
    - deployment/my-web-svc
    - deployment/my-worker
  graphs:
    - title: User Signups
      query: 'sum(user_signup_events_total)'
```

## title

<table>
  <tr>
    <th>Description</th>
    <td>The application title. Used on the license upload and in various places in the Replicated admin console.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Title/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## icon

<table>
  <tr>
    <th>Description</th>
    <td>The icon file for the application. Used on the license upload and in various places in the admin console.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Icon/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>


## releaseNotes

<table>
  <tr>
    <th>Description</th>
    <td>The release notes for this version. These can also be set when promoting a release.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><ReleaseNotes/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## allowRollback

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enable this flag to create a <strong>Rollback</strong> button on the admin console Version History page.</p>
      <p>If an application is guaranteed not to introduce backwards-incompatible versions, such as through database migrations, then the <code>allowRollback</code> flag can allow end users to easily roll back to previous versions from the admin console.</p>
      <p>Rollback does not revert any state. Rather, it recovers the YAML manifests that are applied to the cluster.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><AllowRollback/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>


## additionalNamespaces

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>An array of additional namespaces as strings that Replicated KOTS creates on the cluster. For more information, see <a href="/vendor/operator-defining-additional-namespaces">Defining Additional Namespaces</a>.</p>
      <p>In addition to creating the additional namespaces, KOTS ensures that the application secret exists in the namespaces. KOTS also ensures that this application secret has access to pull the application images, including both images that are used and any images you add in the <code>additionalImages</code> field. This pull secret is automatically added to all manifest files that use private images.</p>
      <p>For dynamically created namespaces, specify <code>"*"</code>.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><AdditionalNamespaces/></td>
  </tr>  
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## additionalImages

<table>
  <tr>
    <th>Description</th>
    <td><p>An array of strings that reference images to be included in air gap bundles and pushed to the local registry during installation.</p>
    <p>KOTS detects images from the PodSpecs in the application. Some applications, such as Operators, might need to include additional images that are not referenced until runtime. For more information, see <a href="/vendor/operator-defining-additional-images">Defining Additional Images</a>.
    </p></td>
  </tr>
  <tr>
    <th>Example</th>
    <td><AdditionalImages/></td>
  </tr>  
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>



## kubectlVersion

:::important
`kubectlVersion` is deprecated and will be removed from KOTS on or after February 1, 2024. `kubectlVersion` allows for the use of unsupported versions of kubectl, which can cause security vulnerabilities.
:::

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Specifies the version of the kubectl command-line tool that KOTS uses.</p>
      <p>You can specify an optional Semantic Version range for <code>kubectlVersion</code>, as defined by blang. See <a href="https://github.com/blang/semver#ranges">Ranges</a> in the blang GitHub repository. The latest supported version in the provided range is used.</p>
      <p>If the specified version or range does not match any supported versions, the latest version from the above list of supported versions is used.</p>  
      <p>For backwards compatibility, exact versions are also supported.
      When an exact version is specified, KOTS chooses the matching version if it is supported. If the specific version is not supported, KOTS chooses the latest supported minor and patch version for the specified major version.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><KubectlVersion/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td>
     <p>When <code>kubectlVersion</code> is unspecified, KOTS uses the latest supported version of kubectl. The following minor versions are supported:</p>
     <ul>
       <li>1.28.x (Added in <a href="/release-notes/rn-app-manager#11020">KOTS v1.102.1</a>)</li>
       <li>1.27.x (Added in <a href="/release-notes/rn-app-manager#11000">KOTS v1.100.0</a>)</li>
       <li>1.26.x (Added in <a href="/release-notes/rn-app-manager#1931">KOTS v1.93.1</a>)</li>
       <li>1.25.x (Added in <a href="/release-notes/rn-app-manager#1870">KOTS v1.87.0</a>)</li>
       <li>1.24.x (Added in <a href="/release-notes/rn-app-manager#1710">KOTS v1.71.0</a>)</li>
       <li>1.23.x (Added in <a href="/release-notes/rn-app-manager#1610">KOTS v1.61.0</a>)</li>
       <li>1.22.x (Added in <a href="/release-notes/rn-app-manager#1593">KOTS v1.59.3</a>)</li>
       <li>1.21.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">KOTS v1.48.0</a>)</li>
       <li>1.20.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">KOTS v1.48.0</a>)</li>
       <li>1.19.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">KOTS v1.22.0</a>)</li>
     </ul>
    </td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## kustomizeVersion

:::important
`kustomizeVersion` is deprecated and will be removed from KOTS on or after February 1, 2024.
:::

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Specifies the version of Kustomize that KOTS uses.</p>
    <p>You can specify a Semantic Version range, as defined by blang. See <a href="https://github.com/blang/semver#ranges">Ranges</a> in the blang GitHub repository. The latest supported version in the provided range is used.</p>
    <p>For backwards compatibility, exact versions are also supported.
    When an exact version is specified, KOTS chooses the matching version if it is supported. If the specific version is not supported, KOTS chooses the latest supported minor and patch version for the specified major version.</p>
      </td>
  </tr>
  <tr>
  <th>Example</th>
    <td>
      <KustomizeVersion/>   
    </td>
  </tr>
  <tr>
    <th>Default</th>
    <td>
      <p>When <code>kustomizeVersion</code> is unspecified, KOTS uses the latest supported version of Kustomize.</p>
      <p>The following major versions of Kustomize are supported:</p>
      <ul>
        <li>5.x.x.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## requireMinimalRBACPrivileges

<table>
  <tr>
    <th>Description</th>
    <td><p><code>requireMinimalRBACPrivileges</code> applies to existing clusters only.</p>
    <p>Requires minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, KOTS creates a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p>
    <p>For additional requirements and limitations related to using namespace-scoped RBAC, see <a href="/vendor/packaging-rbac#min-rbac">About Namespace-scoped RBAC</a> in <em>Configuring KOTS RBAC</em>.</p>
      </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><RequireMinimalRBACPrivileges/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## supportMinimalRBACPrivileges

<table>
  <tr>
    <th>Description</th>
    <td><p><code>supportMinimalRBACPrivileges</code> applies to existing clusters only.</p>
    <p>Allows minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, KOTS supports creating a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p>
    <p> Minimal RBAC is not used by default. It is only used when the <code>--use-minimal-rbac</code> flag is passed to the <code>kots install</code> command.</p>
    <p>For additional requirements and limitations related to using namespace-scoped RBAC, see <a href="/vendor/packaging-rbac#min-rbac">About Namespace-scoped RBAC</a> in <em>Configuring KOTS RBAC</em>.</p>
      </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><SupportMinimalRBACPrivileges/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## ports

<table>
<tr>
    <th>Description</th>
    <td>
      <p>Extra ports (additional to the <code>8800</code> admin console port) that are port-forwarded when running the <code>kubectl kots admin-console</code> command. With ports specified, KOTS can establish port forwarding to simplify connections to the deployed application. When the application starts and the service is ready, the kots CLI will print a message in the terminal with the URL where the port-forwarded service can be accessed. For more information, see <a href="/vendor/admin-console-port-forward">Configuring Port Forwarding</a>.</p>
      <KurlNote/>
      <p>The <code>ports</code> key has the following fields:</p>
      <ul>
        <PortsServiceName/>
        <PortsServicePort/>
        <ServicePortNote/>
        <PortsLocalPort/>
        <PortsApplicationURL/>
        For more information, see <a href="/vendor/admin-console-adding-buttons-links">Adding Application Links to the Dashboard</a>.
      </ul> 
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Ports/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## statusInformers

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Resources to watch and report application status back to the user. When you include <code>statusInformers</code>, the dashboard can indicate when the application deployment is complete and the application is ready for use.</p>
      <p><code>statusInformers</code> use the format <code>[namespace/]type/name</code>, where namespace is optional.</p>
      <p>For more information about including statusInformers, see <a href="/vendor/admin-console-display-app-status">Adding Resource Status Informers</a>.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><StatusInformers/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>Yes</td>
  </tr>    
</table>

## graphs

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>
      Custom graphs to include on the admin console application dashboard.
      For more information about how to create custom graphs,
      see <a href="/vendor/admin-console-prometheus-monitoring">Adding Custom Graphs</a>.</p>
      <p><code>graphs</code> has the following fields:</p>
      <ul>
        <li><code>graphs.title</code>: The graph title.</li>
        <li><code>graphs.query</code>: The Prometheus query.</li>
        <li><code>graphs.legend</code>: The legend to use for the query line. You can use Prometheus templating in the <code>legend</code> fields with each element returned from the Prometheus query. <p><GraphsTemplates/></p></li>
        <li><code>graphs.queries</code>: A list of queries containing a <code>query</code> and <code>legend</code>.
        </li>  
        <li><code>graphs.yAxisFormat</code>: The format of the Y axis labels with support for all Grafana units. For more information, see <a href="https://grafana.com/docs/features/panels/graph/#left-y-right-y">Visualizations</a> in the Grafana documentation.</li>
        <li><code>graphs.yAxisTemplate</code>: Y axis labels template.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Graphs/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>
      <p>Yes</p>
    </td>
  </tr>    
</table>

## proxyRegistryDomain

:::important
`proxyRegistryDomain` is deprecated. For information about how to use a custom domain for the Replicated proxy service, see [Using Custom Domains](/vendor/custom-domains-using).
:::

<table>	
  <tr>	
    <th>Description</th>	
    <td>	
      <p>The custom domain used for proxy.replicated.com. For more information, see <a href="/vendor/custom-domains-using">Using Custom Domains</a>.</p>	
      <p>Introduced in KOTS v1.91.1.</p>	
    </td>	
  </tr>	
  <tr>	
    <th>Example</th>	
    <td><ProxyRegistryDomain/></td>	
  </tr>	
  <tr>	
    <th>Supports Go templates?</th>	
    <td>No</td>	
  </tr>	
</table>

## replicatedRegistryDomain

:::important
`replicatedRegistryDomain` is deprecated. For information about how to use a custom domain for the Replicated registry, see [Using Custom Domains](/vendor/custom-domains-using).
:::

<table>	
  <tr>	
    <th>Description</th>	
    <td>	
      <p>The custom domain used for registry.replicated.com. For more information, see <a href="/vendor/custom-domains-using">Using Custom Domains</a>.</p>	
      <p>Introduced in KOTS v1.91.1.</p>	
    </td>	
  </tr>	
  <tr>	
    <th>Example</th>	
    <td><ReplicatedRegistryDomain/></td>	
  </tr>	
  <tr>	
    <th>Supports Go templates?</th>	
    <td>No</td>	
  </tr>	
</table>

## targetKotsVersion

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>The KOTS version that is targeted by the release. For more information, see <a href="/vendor/packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a>.</p>
      <p>Introduced in KOTS v1.62.0.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><TargetKotsVersion/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## minKotsVersion (Beta)

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>The minimum KOTS version that is required by the release. For more information, see <a href="/vendor/packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a>.</p>
      <p>Introduced in KOTS v1.62.0.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><MinKotsVersion/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>
