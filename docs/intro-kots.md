---
displayed_sidebar: kots
---

# About KOTS and kURL

This topic describes Replicated KOTS and Replicated kURL, used for installing and upgrading applications in a Kubernetes cluster, and the Replicated admin console, used for managing application instances.

:::note
You must have the Replicated KOTS entitlement to use the KOTS and kURL installers and features.
:::

## Replicated KOTS

Vendors that want to provide a UI-based installation and management experience for applications can leverage KOTS, which provides highly successful installs in diverse environments using a single installer. KOTS is a kubectl plugin that automates installations, making it quick and easy to install with minimal expertise. Applications are deployed securely to on-prem, online, and air gap environments.

When KOTS is combined with kURL, kURL provisions an embedded cluster on a virtual machine (VM) or bare metal server for customers that do not have their own Kubernetes cluster. Then KOTS installs the application on the embedded cluster. For more information about kURL, see [kURL](#kurl).

KOTS also provides the Replicated admin console to make it easy for customers to install, upgrade, and manage their application instance. Customers can also use the kots CLI for installing and manage applications. For more information, see [Admin Console](#admin-console) and [kots CLI](#kots-cli).

KOTS is an open source project that is maintained by Replicated. For more information, see the [kots](https://github.com/replicatedhq/kots) repository in GitHub.

## Admin Console

The admin console is a customer-facing user interface that includes built-in functionality allowing users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instances. The admin console communicates securely with KOTS to synchronize licenses, check for upgrades, and so on. 

![Admin Console Dashboard](/images/guides/kots/application.png)

[View a larger version of this image](/images/guides/kots/application.png)

<!--
The admin console features include:

- **Config Screen:** Customize the customer-facing Config screen in the admin console to collect required or optional values from your customers that are used to run your application. 
- **Custom Admin Console:** Customize the admin console with your company's branding, release notes, custom graphs display, application status display, and more.
- **Backup and Restore:** Enable backup and restore capabilities so that customers can implement full disaster recovery protection for the application and the admin console. 
- **RBAC:** Use role-based access control (RBAC) for clusters and namespaces. By default, the KOTS installation sets RBAC for the cluster, but you can scope it to namespaces instead. 
-->

## kots CLI

The kots command-line interface (CLI) is a kubectl plugin. Customers can run commands with the kots CLI to install and manage their application instances with KOTS programmatically. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).

## kURL

Replicated kURL provisions Kubernetes clusters, which allow customers who do not have an existing cluster to install your application without provisioning a cluster themselves. Clusters created by kURL are called _embedded clusters_. Embedded clusters can be provisioned in online or air gap environments.

kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, customers can run a kURL installation script in their virtual machine (VM) or bare metal server, which creates a cluster and then automatically installs KOTS in the cluster. Your application is then deployed with KOTS. 

For information about how to install applications in embedded clusters, see [Installing with kURL](/enterprise/installing-embedded-cluster). For information about how to create a specification for kURL, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

kURL is an open source project that is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub and the [kURL documentation](https://kurl.sh).
