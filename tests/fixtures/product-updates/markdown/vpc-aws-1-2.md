# Release notes for Self-Hosted Deployment in Amazon Web Services 1.2

> Learn about new features, improvements, and fixed issues.

## Version 1.2.3 — May 20, 2026

### Fixed issues

#### Workspace service with an external UVCS server

Modified the `workspace-service` to honor the `uvcs_repository_guid` variable when `enable_uvcs=false`. The workspace pod skips in-cluster UVCS discovery and connects to your pre-existing UVCS repository, so it starts successfully when pointed at an external UVCS server.

## Version 1.2.2 — May 12, 2026

### Fixed issues

#### 3D Data Streaming workflow retries

Fixed 3D Data Streaming (3DDS) workflows so they increase memory allocation correctly on retry after an out-of-memory failure. Previously, the memory request didn't increase on retries, which could cause repeated failures.

## Version 1.2.1 — February 23, 2026

### Improvements

### Upgraded services

These services have been upgraded:

* Asset Manager 1.1.5 with improved timeout issue handling when downloading assets

## Version 1.2.0 — February 13, 2026

### New features

#### UVCS deployment through Helm chart

Unity Version Control Server (UVCS) can now be deployed through a Helm chart. To enable this feature, set the Terraform variable `enable_uvcs` to `true` in your Terraform configuration.
