# Changelog

> The vpctl command-line tool release history, including new features, fixes, and breaking changes.

This changelog records vpctl release notes from an operator's perspective: new commands, new flags, behavior changes, and breaking changes. This changelog doesn't include internal refactors.

## \[0.13.0] - 2026-08-12

### Added

The `vpctl cluster check` command validates your manifest and then verifies that the target Kubernetes cluster meets the deployment prerequisites, before you deploy.

For more information, refer to [vpctl cluster command](./commands/cluster.md).

## \[0.12.0] - 2026-07-10

### Security

* Rebuilt with Go 1.26.5 (previously 1.26.4) to fix an Encrypted Client Hello privacy vulnerability in `crypto/tls`, reachable from vpctl through OCI registry pulls, Helm operations, and manifest parsing.
* Updated `oras.land/oras-go/v2` to version 2.6.1 to fix a registry authentication vulnerability: the client followed a `Bearer` challenge's `realm` URL without validating its scheme or host, so a malicious or intercepted registry could redirect token requests to internal endpoints or downgrade them to unencrypted HTTP. This was reachable from every authenticated registry operation, such as `release pull` and `artifact sync`.
* These updates improve the toolchain and dependencies without changing `vpctl` behavior.

### Added

* The `configuration.networking.ipFamily` manifest field (`ipv4` or `ipv6`, default `ipv4`) adds support for single-stack IPv6 clusters. When you set `ipv6`, vpctl injects `global.ipFamily: ipv6` into every chart's values and configures MongoDB to bind its pods' IPv6 addresses. Manifests that omit the field render identical output to previous versions.
* The `configuration.kubernetes.dnsService` manifest field (default `kube-dns`) overrides the in-cluster DNS service name that the log-collection gateway resolves against. Set it to your Kubernetes distribution's CoreDNS service name, for example `rke2-coredns-rke2-coredns` on RKE2, if log collection crash-loops with the error `host not found in resolver`.
* The `keyType: "base64"` secret schema field makes `vpctl secret generate` emit the standard base64 encoding of `length` random bytes, for example `length: 32` for an AES-256 key. Base64-encoded symmetric keys that previously had to be generated manually with `openssl rand -base64 32` and pasted in are now auto-generated.

### Changed

* `release generate` and `artifact sync` now merge the shared base `versions.yaml` with the platform overlay when they read the release package, instead of relying on a pre-merged file, and release packages now ship both files. Older release packages that contain a single pre-merged `versions.yaml` continue to load unchanged.

## \[0.11.0] - 2026-06-03

### Security

* Rebuilt with Go 1.26.4 (previously 1.26.3) to address two standard library CVEs that affect `vpctl`:
  * Fixed a `net/textproto` vulnerability that could include unescaped input in error messages during CUE and YAML manifest parsing.
  * Fixed a `crypto/x509` issue that could cause inefficient hostname parsing during TLS verification for Helm and OCI registry operations.
* Updated `golang.org/x/net` to version `0.55.0` to fix an `idna` Punycode validation vulnerability during manifest validation.
* These updates improve the toolchain and dependencies without changing `vpctl` behavior.

### Added

* The `configuration.imageVariant` manifest field lets you select an image variant, such as `hardened`, during chart generation. If an image doesn't support the requested variant, `vpctl release generate` now fails instead of generating incorrect image tags.
* The `configuration.infrastructure.singleNode` manifest field lets you deploy Garage, PostgreSQL (Percona), MongoDB (Percona), Elasticsearch (ECK), and RabbitMQ as single-replica deployments. Set this Boolean value to `true` to disable PodDisruptionBudgets and remove hard anti-affinity rules. Use this option only for test or evaluation clusters, not for production.
* The `release deploy --concurrency` flag lets you deploy independent charts within the same deployment wave in parallel. The default value is `1`, which preserves sequential deployment. You can set `deployment.helm.concurrency` in the manifest to change the default, and the command-line flag overrides the manifest value. If the concurrency value is greater than `1`, `vpctl` buffers each chart's Helm output and displays it after the chart finishes.
* Per-wave and end-of-deploy summary lines, for example, `Wave N complete: X total, Y succeeded, Z failed` are now emitted on every non-dry-run deploy, regardless of the concurrency setting.
* The `configuration.networking.ingress.traefik.nodePorts` manifest field lets you assign fixed Kubernetes node ports for the `web` and `websecure` Traefik entry points. Each port must be within the `30000-32767` range. Omit this field to let Kubernetes assign node ports automatically.
* The `vpctl configure set --password-stdin` option reads the registry password from standard input. This is the recommended authentication method for automation.
* The `VPCTL_USERNAME` and `VPCTL_PASSWORD` environment variables provide non-interactive credentials to `vpctl configure set`. Credential precedence is command-line flag, environment variable, then interactive prompt.
* The `minLength` secret schema field enforces a minimum secret length. `vpctl secret generate` now prompts for a longer value in interactive mode or exits with an error in non-interactive mode if the value is too short. You can't combine `minLength` with `default`, and generated secrets must use a `length` value that is at least equal to `minLength`.

### Changed

* `secret generate --persist` now requires a file path. The `--persist` shortcut no longer defaults to `secrets.import.yaml`. To preserve the previous behavior, use `--persist secrets.import.yaml`.
* `vpctl configure set` now displays a warning if you use the `--password` command-line option because the password is visible in your shell history and the process list. The option remains available for backward compatibility. Use `--password-stdin` or `VPCTL_PASSWORD` instead. If you don't provide credentials and standard input isn't connected to a terminal, the command exits with an error instead of waiting indefinitely.

### Fixed

* `vpctl artifact sync` now applies the `configuration.imageVariant` value when it mirrors Docker images, which matches the behavior of `vpctl release generate`. Previously, `artifact sync` mirrored the base image tags while chart generation referenced variant-specific tags, such as `asset-front-end:1.0.342-hardened`. This mismatch could cause `ImagePullBackOff` errors when you set `imageVariant: hardened`.
* `secret generate --persist <file>` now correctly writes secrets to the specified file. Previously, the command ignored the provided file path and always wrote to `secrets.import.yaml`, which could overwrite the existing import file.

## \[0.10.0] - 2026-05-12

### Security

* Rebuilt with Go 1.26.3 (previously 1.25.x) to pick up four standard-library CVE fixes that were reachable from vpctl: two `html/template` escaper bypasses used by CUE schema validation, a `net.Dialer` NUL-byte panic on Windows used by OCI registry pulls, and an HTTP/2 `SETTINGS_MAX_FRAME_SIZE` infinite loop used by every outbound HTTP call. The `golang.org/x/net` dependency is bumped to v0.53.0.

### Added

* New optional `configuration.networking.trustedCaSecretName` manifest field. Reference a pre-existing Kubernetes Secret (single key `ca-bundle.crt`, PEM-encoded CA chain) to make the .NET workflow containers (StorageTool) trust an internally-signed ingress certificate. Required for environments where the ingress TLS isn't chained to a publicly-trusted CA. The CA bundle is also mounted into the Pixyz Argo workflow templates (`asset-manager-glb-preview`, `asset-manager-metadata-extraction`, `asset-manager-optimize-and-convert`, `asset-manager-thumbnail-generator`) for defensive coverage of any future outbound HTTPS calls from those containers.
* `release deploy --timeout` flag (default `10m`): per-release timeout passed to `helm` when waiting.
* `release deploy --retries` flag (default `0`): number of additional attempts after a failed `helm upgrade --install` or `helm template | kubectl apply`. Helps with the "CRDs not yet visible on first attempt" race that sometimes resolves on a second attempt.
* `release deploy --retry-delay` flag (default `5s`): sleep between retry attempts.
* `keyType: hex` support in the secret schema: generates `length` hex characters (lowercase `a`–`f` / `0`–`9`) from `crypto/rand` for cryptographic secrets that require pure hex (for example, the Garage `rpc_secret`). The `length` field is required and must be even.

### Changed

* **Breaking:** `release deploy --wait` now defaults to `true` (was `false`). Each Helm release is waited on before vpctl moves to the next chart, with the new default 10-minute per-release timeout. Pass `--wait=false` to restore the previous fire-and-forget behavior.
* **Breaking:** the `rustfs:` manifest field under `configuration.infrastructure.components` is replaced by `garage:`, which exposes `resources` (standard CPU and memory requests and limits), `metaStorage`, `dataStorage`, `replicas`, and `replicationFactor` (capped at 3). The on-premises release package's `compatibility.yaml` `minVpctlVersion` is bumped to `0.10.0` in the same release, so you must upgrade vpctl to `0.10.0` before you can deploy on-premises release `0.13.0` or later.
* Remote Helm charts now resolve their source registry from `manifest.yaml` `artifactSync.sourceRepository`, the same way Docker images and ORAS artifacts already do, instead of a per-chart URL.
* The `_arrayMerge` helper in chart values now recurses through nested map levels, so paths like `_arrayMerge.backups.pgbackrest.repos.0.X` merge into `backups.pgbackrest.repos[0].X`. Top-level array behavior is unchanged.

## \[0.9.0] - 2026-04-24

### Added

* `secret generate --persist [path]` flag: saves generated values to a file (default: `secrets.import.yaml`) and auto-loads it on subsequent runs so values are reused without regeneration.
* `keyType: ca-cert` support in the secret schema: auto-generates a self-signed CA certificate (RSA 4096-bit, 10-year validity period) when no value is provided, so you don't need to manually supply a CA certificate for non-interactive generation.
* Alphanumeric-only validation for generated password fields, to prevent special characters, for example, `@`, `!`, from breaking connection strings. This applies to both auto-generated and user-provided values. Set `alphanumeric: false` in the secret schema to opt out for fields that are not used in connection strings.
* `deployment.helmChartMode` manifest setting (`"local"` or `"remote"`, defaults to `"local"`): choose between local charts from the release package or remote OCI charts. Existing manifests without this field continue using local charts.
* `vpctl artifact sync charts` subcommand to sync OCI Helm charts between registries (mirrors remote charts for air-gapped deployments).
* Remote chart support across the `release generate` and `release deploy --format helm` paths, including multi-source ArgoCD `Application` generation (OCI chart source + Git values reference).
* Image and chart references in rendered output are rewritten to your target registry during generation (air-gapped deployments).

### Fixed

* `secret generate` now re-prompts on invalid input in interactive mode instead of aborting the entire session.
* `secret generate` export now correctly base64-encodes fields with `encoding: "base64"` (e.g. licenses), so reimporting preserves the original values instead of corrupting them.
* `secret generate` interactive input for `encoding: "base64"` fields (licenses) now uses a multi-line reader, so pasted multiline base64 content works correctly.

### Changed

* `secret generate --use-defaults` now writes a `TBD` placeholder for required fields with no default and no auto-generate option, instead of stopping execution. A warning is logged for each such field so you know to replace them before deploying.
* Sync recap now lists the specific images and artifacts that failed instead of only showing a count.

## \[0.8.0] - 2026-03-17

### Added

* `oras_artifacts` support in `versions.yaml` for tracking OCI artifact versions alongside Docker images.
* `vpctl artifact sync images` subcommand for syncing Docker images between registries.
* `vpctl artifact sync oras` subcommand for syncing ORAS artifacts between registries.
* `vpctl artifact sync preflight` subcommand: verifies registry authentication by syncing one Docker image and one ORAS artifact, and provides troubleshooting hints if the command fails

### Changed

* **Breaking:** `vpctl image sync` renamed to `vpctl artifact sync images` / `vpctl artifact sync oras`. Update any CI scripts that invoke the old command.
* **Breaking:** Manifest field `imageSync` renamed to `artifactSync`. Update your `manifest.yaml`.
* **Breaking:** `--skip-login` flag removed from `artifact sync images`. Authenticate to source and target registries with `docker login` before running the sync.

## \[0.7.0] - 2026-03-13

### Added

* `vpctl manifest init` command to interactively create a new `manifest.yaml` (replaces `vpctl release init`).
* `vpctl manifest validate` command to validate an existing manifest against the embedded CUE schema.
* `vpctl manifest schema` command to display the CUE schema and export it for standalone `cue vet` validation.
* Manifest validation errors are now more precise: schema constraints, defaults, and cross-field rules are defined in CUE and embedded in the binary. `LoadManifest` now validates manifests automatically during loading.
* `authentication.x509` manifest configuration for X509 client certificate authentication.
* `logStorage` field on the RustFS infrastructure component to size the log volume PVC independently of data storage.
* `configuration.transformations.parallelism` manifest field to control the maximum number of concurrent transformation workflows in Argo Workflows (default: 20).
* `exactLength` field in the secret schema to enforce exact value length validation.

### Deprecated

* `vpctl release init` is deprecated; use `vpctl manifest init` instead.

### Removed

* **Breaking:** `configuration.licensing` manifest section (`FlexLM` and `sdkLicenses`) removed. Parallelism is now controlled by `configuration.transformations.parallelism`.

## \[0.6.0] - 2026-03-03

### Added

* Version compatibility check: `release generate` and `secret generate` now verify that vpctl satisfies the minimum version required by the release package (`compatibility.yaml`). The command blocks execution and displays a clear upgrade message when vpctl is too old. Use `--skip-version-check` to bypass. Dev builds and RC versions are handled gracefully.
* `image sync --concurrency` flag: processes multiple images in parallel using a worker pool (default: 1 = sequential).

### Fixed

* `vpctl version` no longer prints an irrelevant manifest-not-found warning.

## \[0.5.0] - 2026-02-23

### Added

* `infrastructure` manifest section with sizing profiles (`small`, `medium`, `large`) and per-component resource overrides for MongoDB, PostgreSQL, RabbitMQ, object storage, and Elasticsearch.
* `image sync --skip-existing` flag: checks if each image already exists on the target registry (via `docker manifest inspect`) and skips it, to avoid redundant pull an push cycles.
* `image sync --cleanup` flag: removes local images (`docker rmi`) after each successful push, to free disk space on CI runners and local machines.

## \[0.4.0]

### Added

* `monitoring.logCollection` manifest section to enable or disable Loki + Alloy log collection.
* `deployment.argocd` manifest section for ArgoCD deployment defaults (`repoURL`, `pathPrefix`, `destinationServer`, `targetRevision`). CLI flags take precedence over manifest values when you provide both.

### Changed

* **Breaking:** Manifest field `docker.images.sourceRepository` renamed to `imageSync.sourceRepository`.

## \[0.3.1]

### Added

* Service mesh configuration in the manifest.

### Changed

* Traefik configuration moved under the `ingress` manifest section.

## \[0.3.0]

### Added

* ArgoCD app-of-apps chart generation support (`release generate --format argocd`).
* `release init` command to initialize a new manifest file.
* `release uninstall` command to uninstall a release.
* RSA private key generation in the secret schema.
* `--name` flag on `image sync`, `release generate`, and `release deploy` to filter to a single chart or image.
* `--dry-run` flag on `release deploy` and `image sync`.
* Default storage class configuration for Kubernetes storage in the manifest.
* Network configuration in the manifest.

### Changed

* `release pull` now extracts to `./extracted-release` by default. Use `--skip-extract` to skip extraction; use `--extract-dir` to specify a custom extraction directory. Replaces the previous `--extract` flag.
* **Breaking:** `release deploy` and `image sync` now execute by default. Use `--dry-run` to preview commands. Previously they printed commands without executing.
* `image sync` is now a no-op when the target registry is unset or equals the source registry (`uccmpprivatecloud.azurecr.io`).
* Traefik configuration simplified to set up a `LoadBalancer` service with annotations.

## \[0.2.0]

No customer-facing changes. (Internal updates to the secret-template format.)

## \[0.1.0]

### Added

* Initial release of the vpctl CLI tool.
* Application management commands: download, generate, and deploy.
* Manifest file support with automatic discovery, searched upward from CWD.
* Secret management commands: generate.
* Configuration management commands: view, set, and delete.
* `version` command.
