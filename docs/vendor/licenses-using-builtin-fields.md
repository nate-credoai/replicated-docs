# Built-in License Fields

Built-in fields are reserved field names. The following table describes each built-in license field that you can define for a customer.

| License field         | Description           |
|------------------------|------------------------|
| `appSlug` | Application slug value. This value never changes. |
| `channelID` | Current channel ID from which releases will be downloaded. When channel changes, the latest release of that will be downloaded on the next update check. |
| `channelName` | Current channel name from which releases will be downloaded. When channel changes, the latest release of that will be downloaded on the next update check. |
| `customerName` | The name of the customer. |
| `endpoint` | (KOTS Only) The endpoint that the Replicated admin console uses to synchronize license and download updates. This is typically `https://replicated.app`. |
| `entitlements` | The `entitlements` property includes the `expires_at` field and any custom entitlements for the license. For more information about adding custom license fields, see [Managing Custom License Fields](licenses-adding-custom-fields).|
| `expires_at` | Defines the expiration date for the license. The date is encoded in ISO 8601 format (`2026-01-23T00:00:00Z`) and is set to midnight UTC on the date selected. If a license does not expire, this field is missing. By default, a KOTS installation with an expired license continues to run, but KOTS prevents the application from receiving updates.|
| `isAirgapSupported` | (KOTS Only) If a license supports air gapped installations, then this field is set to `true`. If air gapped is not supported, this field is missing. When you enable this feature, the `.rli` file will have license meta data embedded in it, and must be re-downloaded. |
| `isGeoaxisSupported` | (KOTS Only) If a license supports integration with GeoAxis, this field is set to `true`. If GeoAxis is not supported, this field is either `false` or missing. **Note**: This field requires that the vendor has the GeoAxis entitlement. It also requires that the vendor has access to the Identity Service entitlement. |
| `isGitOpsSupported` | (KOTS Only) If a license supports gitops-enablement in the admin console, this field is set to `true`. If GitOps is not supported, this field is either `false` or missing. |
| `isIdentityServiceSupported` | (KOTS Only) If a license supports identity-service enablement for the admin console, this field is set to `true`. If identity service is not supported, this field is either `false` or missing. **Note**: This field requires that the vendor have access to the Identity Service entitlement. |
| `isKotsInstallEnabled` | (KOTS Only) If a license supports installation with KOTS, this field is set to `true`. If KOTS installations are not supported, this field is either `false` or missing. **Note**: This field requires that the vendor has the KOTS entitlement. |
| `isSemverRequired` | (KOTS Only) If set to `true`, this field requires that the admin console orders releases according to Semantic Versioning. This field is controlled at the channel level. For more information about enabling Semantic Versioning on a channel, see [Semantic Versioning](releases-about#semantic-versioning) in _About Releases_. |
| `isSnapshotSupported` | (KOTS Only) If a license supports the snapshots backup and restore feature, this field is set to `true`. If a license does not support snapshots, this field is either missing or `false`. **Note**: This field requires that the vendor have access to the Snapshots entitlement. |
| `isSupportBundleUploadSupported` | (KOTS Only) If a license supports uploading a support bundle in the admin console, this field is set to `true`. If a license does not support uploading a support bundle, this field is either missing or `false`. |
| `licenseID`, `licenseId` | ID of the installed license.  This value never changes. |
| `licenseSequence` | Every time a license is updated, its sequence number is incremented. This value represents the license sequence that the client currently has. |
| `licenseType` | This field contains a string value that describes the type of the license. This is currently one of `paid`, `trial`, `dev` or `community`. For more information about license types, see [Managing License Type](licenses-about-types).|
| `signature` | The base64 encoded license signature. This value will change when license is updated. |
