/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

// @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually

  tutorialSidebar: [
    'intro',
    'intro-replicated',
    {
      type: 'category',
      label: 'Vendor',
      items: [
        {
          type: 'category',
          label: 'Getting started',
          items: [
            'vendor/getting-started-how-to-use-replicated',
            'vendor/getting-started-creating-vendor-account',
          ],
        },
        {
          type: 'category',
          label: 'Planning and packaging an application',
          items: [
            'vendor/packaging-planning-checklist',
            'vendor/packaging-an-app',
            'vendor/packaging-private-images',
            'vendor/packaging-custom-resources',
            'vendor/packaging-template-functions',
            'vendor/packaging-include-resources',
            'vendor/packaging-ingress',
            'vendor/packaging-using-tls-certs',
            'vendor/packaging-cleaning-up-jobs',
            'vendor/packaging-rbac',
            'vendor/identity-service-configuring',
            {
                type: 'category',
                label: 'Snapshots',
                items: [
                  'vendor/snapshots-overview',
                  'vendor/snapshots-configuring-backups',
                  'vendor/snapshots-backup-hooks',
              ],
            },
            'vendor/preflight-support-bundle-creating',
            {
              type: 'category',
              label: 'Customizing the admin console and download portal',
              items: [
                'vendor/admin-console-customize-app-icon',
                'vendor/admin-console-display-app-status',
                'vendor/admin-console-adding-buttons-links',
                'vendor/admin-console-prometheus-monitoring',
                'vendor/admin-console-customize-config-screen',
              ],
            },
            {
              type: 'category',
              label: 'Packaging an application using Helm charts',
              items: [
                'vendor/helm-overview',
                'vendor/helm-chart-components',
                'vendor/helm-applications',
                'vendor/helm-optional-charts',
                'vendor/helm-optional-value-keys',
                'vendor/helm-airgap-builder',
                'vendor/helm-installing-native-helm',
                'vendor/helm-native-helm-install-order',
                'vendor/helm-installing-replicated-helm',
                'vendor/helm-processing',
                'vendor/helm-mapping-example',
              ],
            },
            {
              type: 'category',
              label: 'Packaging a Kubernetes Operator application',
              items: [
                'vendor/operator-packaging-about',
                'vendor/operator-defining-additional-images',
                'vendor/operator-referencing-images',
                'vendor/operator-defining-additional-namespaces',
              ],
            },
            'vendor/packaging-embedded-kubernetes',
            ],
          },
        {
          type: 'category',
          label: 'Releasing an application',
          items: [
            'vendor/releases-understanding',
            'vendor/releases-workflow',
            {
              type: 'category',
              label: 'Creating and managing channels',
              items: [
                'vendor/releases-creating-channels',
                'vendor/releases-about-channels',
              ],
            },
            {
              type: 'category',
              label: 'Creating and managing releases',
              items: [
                'vendor/releases-creating-releases',
                'vendor/releases-promoting',
                'vendor/releases-updating',
              ],
            },
            {
              type: 'category',
              label: 'Creating a customer',
              items: [
                'vendor/releases-creating-customer',
                'vendor/licenses-about',
                'vendor/licenses-about-types',
                'vendor/licenses-using-builtin-fields',
                'vendor/licenses-adding-custom-fields',
                'vendor/licenses-referencing-fields',
              ],
            },

            'vendor/releases-sharing-license-install-script',
          ],
        },
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'vendor/tutorial-installing-without-existing-cluster',
            'vendor/tutorial-installing-with-existing-cluster',
            'vendor/tutorial-installing-with-cli',
            'vendor/tutorial-installing-air-gap',
            'vendor/tutorial-installing-air-gap-existing-cluster-gcp',
            'vendor/tutorial-ecr-private-images',
            'vendor/tutorial-ha-cluster-deploying',
            'vendor/tutorial-ci-cd-integration',
            'vendor/tutorial-adding-db-config',
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          items: [
            {
              type: 'category',
              label: 'Custom resources',
              items: [
                'vendor/custom-resource-about',
                'vendor/custom-resource-application',
                'vendor/custom-resource-config',
                'vendor/custom-resource-preflight',
                'vendor/custom-resource-redactor',
                'vendor/custom-resource-support-bundle',
                'vendor/custom-resource-sig-application',
                'vendor/custom-resource-helmchart',
                'vendor/custom-resource-backup',
                'vendor/custom-resource-identity',
              ],
            },
            {
              type: 'category',
              label: 'Template functions',
              items: [
                'vendor/template-functions-about',
                'vendor/template-functions-static-context',
                'vendor/template-functions-config-context',
                'vendor/template-functions-kurl-context',
                'vendor/template-functions-license-context',
                'vendor/template-functions-identity-context',
              ],
            },
            {
              type: 'category',
              label: 'Vendor CLI',
              items: [
                'vendor/vendor-cli-installing',
                'vendor/vendor-cli-tokens',
                'vendor/vendor-cli-app-create',
                'vendor/vendor-cli-app-delete',
                'vendor/vendor-cli-app-ls',
                'vendor/vendor-cli-channel-create',
                'vendor/vendor-cli-channel-delete',
                'vendor/vendor-cli-channel-inspect',
                'vendor/vendor-cli-channel-ls',
                'vendor/vendor-cli-customer-create',
                'vendor/vendor-cli-customer-download-license',
                'vendor/vendor-cli-customer-ls',
                'vendor/vendor-cli-installer-create',
                'vendor/vendor-cli-installer-ls',
                'vendor/vendor-cli-release-create',
                'vendor/vendor-cli-release-download',
                'vendor/vendor-cli-release-lint',
                'vendor/vendor-cli-release-ls',
                'vendor/vendor-cli-release-promote',
                'vendor/vendor-cli-release-update',
              ],
            },
            {
              type: 'category',
              label: 'Vendor API v3',
              items: [
                {
                  type: 'doc',
                  id: 'vendor/reference-vendor-api'
                },
                {
                  type: 'link',
                  label: 'Vendor API v3 Documentation',
                  href: 'https://replicated-vendor-api.readme.io/v3/'
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Enterprise',
      items: [
        {
          type: 'category',
          label: 'Installing an application',
          items: [
            'enterprise/installing-overview',
            'enterprise/installing-general-requirements',
            {
              type: 'category',
              label: 'Installing on an existing cluster',
              items: [
                'enterprise/installing-existing-cluster-requirements',
                'enterprise/installing-existing-cluster-persistent-storage',
                'enterprise/installing-existing-cluster-online',
                'enterprise/installing-existing-cluster-airgapped',
                'enterprise/installing-existing-cluster-automation',
              ],
            },
            {
              type: 'category',
              label: 'Installing on an embedded cluster with the Kubernetes installer',
              items: [
                'enterprise/installing-embedded-cluster-requirements',
                'enterprise/installing-embedded-cluster',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Using self-hosted image registries',
          items: [
            'enterprise/image-registry-airgap',
            'enterprise/image-registry-embedded-cluster',
            'enterprise/image-registry-rate-limits',
          ],
        },
        {
          type: 'category',
          label: 'Updating',
          items: [
            'enterprise/updating-kots-apps',
            'enterprise/updating-admin-console',
            'enterprise/updating-embedded-cluster',
            'enterprise/updating-patching-with-kustomize',
            'enterprise/updating-licenses',
          ],
        },
        {
          type: 'category',
          label: 'GitOps',
          items: [
            'enterprise/gitops-single-app-workflow',
            'enterprise/gitops-multi-app-workflow',
            'enterprise/gitops-managing-secrets',
          ],
        },
        {
          type: 'category',
          label: 'Managing user access',
          items: [
            'enterprise/auth-identity-provider',
            'enterprise/auth-configuring-rbac',
          ],
        },
        {
          type: 'doc',
          id: 'enterprise/monitoring-applications'
        },
        {
          type: 'category',
          label: 'Snapshots',
          items: [
            'enterprise/snapshots-understanding',
            'enterprise/snapshots-storage-destinations',
            'enterprise/snapshots-configuring-nfs',
            'enterprise/snapshots-configuring-hostpath',
            'enterprise/snapshots-scheduling',
            'enterprise/snapshots-restoring-full',
            'enterprise/snapshots-restoring-partial',
            'enterprise/snapshots-troubleshooting-backup-restore',
          ],
        },
        {
          type: 'doc',
          id: 'enterprise/troubleshooting-an-app'
        },
        {
          type: 'link',
          label: 'kots CLI Documentation',
          href: 'https://kots.io/kots-cli/getting-started/'
        },
      ],
    },
    {
      type: 'category',
      label: 'Policies',
      items: [
            'vendor/policies-vulnerability-patch',
            'vendor/policies-data-transmission',
             ],
    },
  ],
};

module.exports = sidebars;
