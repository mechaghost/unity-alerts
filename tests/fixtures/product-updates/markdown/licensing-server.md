# What's new

> Learn what's new and changed in the recent versions of the Unity Licensing Server.

{/* potential L3 headings are: Added, Changed, Deprecated, Removed, Fixed, Security (include applicable headings only) */}

Summary of changes in Unity Licensing Server.

## Version 2.4.1

The main updates in this release include:

### Added##241added

* Exposed historical data through the server plug-in API.
* Added Self-Hosted Deployment support in the Licensing Server.

### Changed##241changed

* Secured certificate password storage in server configuration.
* Improved consistency for historical lease retrieval.

### Fixed##241fixed

* Fixed issues with the Editor closing when floating licenses expired.

## Version 2.1.0

The main updates in this release include:

### Added##210added

* Added a feature to collect server analytics. These analytics help Unity provide support and develop performance improvements. For more information, refer to [Server analytics](./server-admin.md#server-analytics).

### Changed##210changed

* Improved the performance of the Overview graph on the Licensing Server Dashboard.
* Improved the performance of lease management and periodic archiving.
* Streamlined transactions to improve server traffic.

### Fixed##210fixed

* Fixed an issue where warnings about expiring licenses weren't shown in the license grid of the Licensing Server Dashboard.
* Fixed an issue where duplicate entries for Access Control Lists were written to the server log file.
* Fixed an issue where the archiving service wasn't batching leases properly.
* Fixed an issue on the Overview page of the Licensing Server Dashboard, to include rotated log files in the download archive.
* Other fixes and server performance improvements.

## Version 2.0.2

The main updates in this release include:

### Fixed##202fixed

* Fixed an issue when running server migration on historical data.

## Version 2.0.1

The main updates in this release include:

### Added##201added

* Added license checkout. After enabling this feature, floating licensing users can work offline for up to 99 days. For more information, refer to [License checkout to work offline](./license-borrow.md).
* Added the administration dashboard. Use this browser-based interface to monitor the status of your licensing server, and get real-time and historical data about Unity license usage. For more information, refer to [Licensing Server Dashboard](./server-admin-dash.md).
* Added simple access control. You can add a configuration file key to allow or deny license access, based on user name, machine name, or both. For more information, refer to `accessControlList` in [Advanced configuration keys](./server-admin.md#advanced-configuration-keys).
* Added a disk space warning configuration key. The server status displays as degraded when the disk space on your licensing server falls below a configurable threshold. For more information, refer to `diskSpaceWarningThresholdMegabytes` in [Advanced configuration keys](./server-admin.md#advanced-configuration-keys).

### Changed##201changed

* Changed the location of most folders and files for the licensing server. For more information, refer to [Server paths](./server-paths.md).

### Removed##201removed

* Removed `useLsd` from the services configuration file (`services-config.json`). This client configuration key is no longer used.

### Fixed##201fixed

* Fixed a permissions setting for server files on Linux to ensure recursive application.
* Fixed an issue associated with loading outdated configurations.
* Improved logic to detect older versions, to facilitate server migration.
* Fixed a concurrency issue where a client computer reserved more than one floating license.
* Fixed an issue that prevented serving a floating license from the next available toolset if the default toolset was invalid.
* Fixed issues related to persisting server configurations across multiple server setup instances, which included server update scenarios.
* Fixed an issue to remove log entries when there are no leases to recycle.
* Fixed an issue that used older server paths during the migration process.
* Improved user permission validation during license import.
