import InstallerRequirements from "../partials/updating/_installerRequirements.mdx"
import UpgradePrompt from "../partials/updating/_upgradePrompt.mdx"

# Updating Embedded Clusters

This topic describes how to upgrade the versions of Kubernetes, Replicated KOTS, and kURL add-ons in an embedded cluster.

## About Updating Embedded Clusters 

The application vendor uses a Replicated kURL installer specification file to specify the kURL add-ons and the Kubernetes version that are deployed to your cluster. To update your cluster, you run the kURL installation script.

For more information about how the script updates the versions of Kubernetes, KOTS, and any additional add-ons running in your cluster, see the following sections:
* [Kubernetes Updates](#kubernetes)
* [Air Gap Multi-version Kubernetes Updates](#kubernetes-multi)
* [Add-ons and KOTS Updates](#add-ons)

### Kubernetes Updates {#kubernetes}

You can use the installation script to upgrade Kubernetes by one or more minor versions. The Kubernetes upgrade process steps through one minor version at a time. For example, upgrades from Kubernetes 1.19.x to 1.26.x install versions 1.20.x, 1.21x, 1.22.x, 1.23.x, 1.24.x, and 1.25.x before installing 1.26.x.

The installation script automatically detects when the Kubernetes version in your cluster must be updated. When a Kubernetes upgrade is required, the script first prints a prompt: `Drain local node and apply upgrade?`. When you confirm the prompt, it drains and upgrades the local primary node where the script is running.

Then, if there are any remote primary nodes to upgrade, the script drains each sequentially and prints a command that you must run on the node to upgrade. For example, the command that that script prints might look like the following: `curl -sSL https://kurl.sh/myapp/upgrade.sh | sudo bash -s hostname-check=master-node-2 kubernetes-version=v1.24.3`.

The script polls the status of each remote node until it detects that the Kubernetes upgrade is complete. Then, it uncordons the node and proceeds to cordon and drain the next node. This process ensures that only one node is cordoned at a time. After upgrading all primary nodes, the script performs the same operation sequentially on all remote secondary nodes.

### Air Gap Multi-version Kubernetes Updates {#kubernetes-multi}

To upgrade Kubernetes by more than one minor version in air gap clusters, you must provide a package that includes the assets required for the upgrade.

When you run the installation script to upgrade, the script searches for the package in the `/var/lib/kurl/assets/` directory. The script then lists any required assets that are missing, prints a command to download the missing assets as a `.tar.gz` package, and prompts you to provide an absolute path to the package in your local directory. For example:

```
⚙  Upgrading Kubernetes from 1.23.17 to 1.26.3
This involves upgrading from 1.23 to 1.24, 1.24 to 1.25, and 1.25 to 1.26.
This may take some time.
⚙  Downloading assets required for Kubernetes 1.23.17 to 1.26.3 upgrade
The following packages are not available locally, and are required:
   kubernetes-1.24.12.tar.gz
   kubernetes-1.25.8.tar.gz

You can download them with the following command:

   curl -LO https://kurl.sh/bundle/version/v2023.04.24-0/19d41b7/packages/kubernetes-1.24.12,kubernetes-1.25.8.tar.gz

Please provide the path to the file on the server.
Absolute path to file:
```

### Add-ons and KOTS Updates {#add-ons}

If the application vendor updated any add-ons in the kURL installer specification since the last time that you ran the installation script in your cluster, the script automatically updates the add-ons after completing any required Kubernetes upgrade.

For a complete list of add-ons that can be included in the kURL installer specification, including the KOTS add-on, see [Add-ons](https://kurl.sh/docs/add-ons/antrea) in the kURL documentation.

#### Containerd and Docker Add-on Updates

The installation script upgrades the version of the Containerd or Docker container runtime if required by the installer specification file. For example, if your cluster uses Containerd version 1.6.4 and the specification file is updated to use 1.6.18, then Containerd is updated to 1.6.18 in your cluster when you run the installation script.

The installation script also supports migrating from Docker to Containerd as Docker is not supported in Kubernetes versions 1.24 and later. If the install script detects a change from Docker to Containerd, it installs Containerd, loads the images found in Docker, and removes Docker.

For information about the container runtime add-ons, see [Containerd Add-On](https://kurl.sh/docs/add-ons/containerd) and [Docker Add-On](https://kurl.sh/docs/add-ons/docker) in the kURL documentation.

#### KOTS Updates (KOTS Add-on)

The version of KOTS installed in your cluster is set by the KOTS add-on provided in the kURL installer specification file. For example, if the version of KOTS running in your cluster is 1.92.0, and the vendor updates the KOTS add-on in the kURL installer specification to use 1.92.1, then the KOTS version in your cluster is updated to 1.92.1 when you run the installation script.

## Update

This section includes procedures for updating embedded clusters in online and air gapped environments.

:::note
The Kubernetes scheduler automatically reschedules Pods to other nodes during maintenance. Any deployments or StatefulSets with a single replica experience downtime while being rescheduled.
:::

### Online Environments

To update the cluster in an online environment:

1. Run the kURL installation script on any primary node in the cluster:

   ```
   curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s ADVANCED_OPTIONS
   ```
   Replace:
   * `APP_SLUG` with the unique slug for the application from your application vendor.
   * `ADVANCED_OPTIONS` optionally with any flags listed in [Advanced Options](https://kurl.sh/docs/install-with-kurl/advanced-options) in the kURL documentation.
      
     To use no advanced installation options, remove `-s ADVANCED_OPTIONS` from the command.

     See the following recommendations for advanced options:

      <InstallerRequirements/>

1. <UpgradePrompt/>

### Air Gap Environments

For air gap installations, you must load images on each node in the cluster before you can run the installation script to update Kubernetes and any add-ons. This is because upgraded components might have Pods scheduled on any node in the cluster. 

To update the cluster in an air gap environment:

1. On each node in the cluster, download the kURL `.tar.gz` bundle provided by your software vendor and extract the contents:

   ```bash
   tar -xvzf FILENAME.tar.gz
   ```
   Replace `FILENAME` with the name of the kURL `.tar.gz` bundle.

   For more information about the kURL `.tar.gz` bundle, see [Download the kURL Bundle](/vendor/releases-sharing-license-install-script#installer-bundle) in _Sharing a Release_.

1. Run the following KURL script to ensure all required images are available:

   ```
   cat tasks.sh | sudo bash -s load-images
   ```

   :::note
   The kURL installation script that you run in the next step also performs a check for required images and prompts you to run the `load-images` command if any images are missing.
   :::

1. Run the kURL installation script on any primary node in the cluster with the `airgap` option:

   ```
   cat install.sh -s airgap OTHER_ADVANCED_OPTIONS
   ```
   Replace `OTHER_ADVANCED_OPTIONS` optionally with any flags listed in [Advanced Options](https://kurl.sh/docs/install-with-kurl/advanced-options) in the kURL documentation.
   
     See the following recommendations for advanced options:
      <InstallerRequirements/>

1. <UpgradePrompt/>
   
   :::note
   If Kubernetes must be upgraded by more than one minor version, the script automatically searches for the required Kubernetes assets in the `/var/lib/kurl/assets/` directory. If the assets are not available, the script prints a command to download the assets as a `tar.gz` package. Download and provide the absolute path to the package when prompted to continue with the upgrade.
   :::
