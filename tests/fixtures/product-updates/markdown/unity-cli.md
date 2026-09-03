# Unity command-line interface (CLI) release notes

> Learn about the latest releases, features, improvements and fixes for Unity CLI.

## August 21, 2026

### 1.0.0-beta.6

* **Breaking changes**
  * `unity bug` now requires you to be signed in, and exits with code `3` instead of `0` when you aren't. Previously a signed-out run reported nothing and appeared to succeed. Authenticate first, or pass service-account credentials, before a script or CI job calls `unity bug`.
  * `unity test` now uses exit code `8` specifically for a run whose tests failed. Every other way a test run fails to reach a verdict — a compile error, an expired license, an editor crash, or `--timeout` — keeps exit code `6`. If a script treats exit code `6` as "tests failed," point it at `8` instead.

* **Source control**
  * `unity projects create` and `unity projects link vcs` can now create the new repository through `gh`, `glab`, or `tea` when the CLI's own REST clients can't reach the host: a GitHub Enterprise Server, a self-managed GitLab, or a self-hosted Gitea or Forgejo instance. `--vcs` accepts a bare hostname for these. No token passes through the CLI on this path; the provider CLI's own signed-in session does the work. A new `--git-description <text>` flag sets the repository's description.
  * `unity projects clone` and `unity projects link vcs` now accept a plain git URL — `ssh://`, `git@host:path`, or `https://` — as an optional positional argument, so any git host works, including Bitbucket, Azure DevOps, and a self-hosted server. This form uses your machine's own ambient git authentication rather than a provider API call.
  * Both commands, and `unity projects create --vcs`, now work fully over SSH, including host-key verification and passphrase-protected keys. Use `--git-remote-protocol ssh` on the flag form to switch the transport.
  * Signing in to github.com no longer implies anything on a self-hosted host. When a self-hosted or enterprise host needs its own sign-in, the CLI now names the exact command to run for whichever provider CLI you have installed.
  * Git credential prompts no longer hang. Without a terminal, in CI, under a machine-readable `--format`, or with `--non-interactive`, the CLI now fails immediately with exit code `4` naming the credential it needed, instead of waiting on a prompt nobody could answer.
  * Git operations under `unity projects` now respect your own git configuration (`core.sshCommand`, `includeIf` rules, credential helpers) instead of ignoring it, and credential lookups resolve per organization when your credential helper supports it (set `git config --global credential.useHttpPath true` to opt in).

* **Project management**
  * Added `unity projects verify`, a fast check for the things version control breaks in a Unity project: orphaned or missing `.meta` files, duplicate GUIDs from a bad merge, and unresolved conflict markers. It needs no Editor, license, or network access, so a broken checkout fails in seconds instead of after a full build. Pass `--strict` to fail on warnings too, and `--expect-editor <version>` to also check for editor-version drift.

* **Build automation**
  * `unity build` now writes a build provenance manifest next to its output, recording the editor version, resolved package set, build target, git revision, and timestamps that produced the build. It's written for failed builds too. Paths, credentials, and machine-identifying details are deliberately left out, so it's safe to publish alongside the artifact. Use `--provenance-path` to choose where it's written, or `--no-provenance` to turn it off.
  * `unity build` now prints a periodic heartbeat during a long build, tracking both elapsed time and how long since the editor's log last grew, so silence in the log no longer looks the same as a hang. A new `--timeout <seconds>` flag (also `UNITY_BUILD_TIMEOUT`) aborts a build that runs too long.

* **Unity Collaboration**
  * `unity collaboration` (`unity collab` for short) is now part of every build, instead of development builds only. It covers Unity Collaboration's annotations end to end — create, list, update, resolve, reply, and react — plus attachments, thumbnails, and a Jira integration that creates and links issues from the CLI. Run `unity collab --help` for the full command tree.

* **Automation and CI**
  * Added `--format github`, a global output format that reports command failures as GitHub Actions annotations instead of plain text, so a red step in a workflow points at what went wrong in its summary.
  * Added `unity cache key`, which prints a deterministic cache key for a Unity project's `Library` folder, derived from the editor version, the resolved package set, and the build target. Use it as the key for a CI cache step.
  * Added `unity doctor --ci`, a fast preflight that checks whether a machine can actually finish a build or test run — an activatable license, the project's required editor, disk space, and network reachability — and exits non-zero when it can't, so a pipeline fails in seconds instead of partway through a build.
  * `unity test` gained `--shard N/M` to split a suite deterministically across parallel CI jobs, `--retries N` to re-run only the tests that failed and report which ones were flaky, and `--rerun-failed` to re-run just the failures from a previous run's report.

* **Security and privacy**
  * Shell completion scripts (`unity completion bash`, `fish`, and `powershell`) now escape the strings they interpolate, closing a defense-in-depth gap where an unescaped value could have run as a command or broken out of its quoting.
  * Progress spinners and the background update check are hardened against a tampered update manifest smuggling terminal control sequences into the spinner label.

* **Issues fixed**
  * Editor and module install progress bars are back in the terminal. A large download previously printed nothing at all until it finished, which looked indistinguishable from a hang.
  * A stale Unity Licensing Client is now detected and replaced automatically, instead of silently rejecting every `unity license` command until it was deleted by hand.
  * The Android module on Linux, the Android NDK on macOS, Windows modules that need administrator elevation, and language packs all had install paths that were broken outright; all are fixed.
  * Headless or wrapped editors (running under `xvfb-run`, `dbus-run-session`, or a CI runner) are counted correctly again by `unity status`, instead of appearing as duplicates or "ambiguous."
  * The loop where signing in with `unity auth login` eventually signed you out of the Unity Hub is fixed for good.
  * Installing the CLI on Windows no longer corrupts your user `PATH`. PowerShell tab completion now actually registers (it never took effect before). `unity command` now catches malformed or misspelled arguments instead of silently running on default values.

## August 13, 2026

### 1.0.0-beta.5

* **Security and privacy**
  * `unity bug` no longer uploads your account name or email address. The CLI's log file records paths under your home directory on nearly every line, and a bug submission attaches that file as-is, so on a machine where the account name is your real name, submitting a report sent it too. Both are now redacted as each line is written: the account name becomes `<user>` wherever it appears, and email addresses become `<redacted-email>`. Nothing else about the line changes, so an install failure stays diagnosable. Logs written before this release are unaffected; delete them if you'd rather not send them.

* **Issues fixed**
  * A retried module download in `unity install-modules` now resumes the partial file it already has instead of starting that module again from the beginning. A module that failed and then succeeded within the same run previously left one numbered file per attempt, such as `android (1).pkg` and `android (2).pkg`; it now leaves a single file and downloads its bytes once. The retry count and the exit code are unchanged.
  * `unity build`, `unity test`, and `unity run` now report an Editor killed by a signal as `stopped with signal SIGSEGV`, naming the signal, instead of reporting `exited with code 1`. `SIGILL`, `SIGTRAP`, `SIGFPE`, and `SIGBUS` are recognized too, where they previously surfaced as a bare number such as 132. An Editor that exits normally still reports its own exit code.
  * Routine outcomes no longer suggest you report a CLI bug. Declining a module's license terms, being told to pass `--accept-eula` in a non-interactive shell, running `unity modules <version>` for an Editor you haven't installed, setting an invalid path with `unity install-path --set`, a `unity build` whose build fails, and a `unity install` that waits on another install's lock all stopped printing "Run `unity bug` to report this issue". The messages, the exit code (6), and the `--format json` envelope, including the `BUILD_FAILED` error code, are unchanged, so scripts that branch on them keep working. An Editor that crashes mid-build is still reported as a fault.
  * `unity --help`, `unity -h`, `unity help`, and bare `unity` show the Unity logo header again. The header still stays out of the way when you pipe the output, pass `--quiet` or `--no-banner`, or ask for a machine-readable format, and subcommand help such as `unity install --help` is unchanged.
  * `unity completion zsh` now produces a script that registers itself with zsh, so pressing Tab completes commands, subcommands, and flags. The script previously defined the completer without telling zsh about it, and Tab fell back to plain filename completion with no error to explain why. Save it to a directory on your `$fpath`:

    ```sh
    mkdir -p ~/.zsh/completions
    unity completion zsh > ~/.zsh/completions/_unity
    ```

    Then make sure your `~/.zshrc` has `fpath=(~/.zsh/completions $fpath)` followed by `autoload -Uz compinit && compinit`. bash, fish, and PowerShell completion are unaffected.
  * The `--proxy` help text shows its credentialed example as `http://<user>:<pass>@host:8080`, so it's clear which parts you substitute. In Spanish, the username in that example is no longer mistranslated.

## August 12, 2026

### 1.0.0-beta.4

* **Breaking change**
  * Linux now requires glibc 2.34 or newer. This drops support for Ubuntu 20.04 and earlier, Debian 11, RHEL and CentOS 8, and Amazon Linux 2. RHEL 9 and Ubuntu 22.04 are the oldest supported releases. The `.deb` and `.rpm` packages declare the requirement, so `apt upgrade` and `dnf upgrade` refuse the update on an affected system and leave your working CLI in place, and `install.sh` checks before it downloads. If you're on an affected distribution, stay on 1.0.0-beta.3. macOS and Windows are unaffected.

* **Installation and updates**
  * Added winget as an install source on Windows: `winget install Unity.CLI`, then `winget upgrade Unity.CLI` to stay current.
  * Added Homebrew as an install source on macOS and Linux: `brew install --cask unity-cli`, then `brew upgrade unity-cli`.
  * Added self-updating Windows installs. `unity upgrade` now updates an MSIX install directly instead of deferring to winget, downloading only the parts of the package that changed. It also registers the install with Windows, which then keeps the CLI current in the background. Rollback remains unavailable on MSIX.
  * Added `unity diagnose update`, which reports the version and channel the install resolved, the manifest it reads, and the exact command that updates it. On Windows it also shows the update feed Windows is registered against.

* **Editor and project management**
  * Added `unity projects exec -- <command>`, which runs one command across every registered project. Narrow the set with repeatable `--filter` terms, raise concurrency with `--parallel <n>`, and use `--continue-on-error` to run the whole fleet regardless.
  * Added `unity projects clean [project]` to delete a project's regenerable cache folders and reclaim disk space. Use `--dry-run` to list the targets and sizes without deleting.
  * Added `unity editors prune` to find installed Editors no registered project uses, with the disk space each would reclaim. Report-only by default; `--remove` uninstalls them after confirmation.
  * Added `unity editors verify <version>` to check that an installed Editor's binary and modules are present and non-empty, catching installs left broken by antivirus quarantine or a failed extraction.
  * Added `unity templates pack <project-path> --output <file>` to pack an existing project into a portable template archive.

* **Build automation**
  * `unity build` no longer requires `--execute-method`. On Unity 6 and newer, `--profile <path-or-name>` builds a Build Profile, and on every version the desktop targets build without a method, so `unity build --target StandaloneWindows64 --output-path Build/MyGame.exe` works with no project-side C# code. `--execute-method` keeps working and takes precedence.

* **Authentication**
  * Added multi-account support. `unity auth login` adds an account without dropping existing sessions, `unity auth list` shows every stored account, `unity auth switch <account>` changes the active one, and `unity auth logout <account>` signs out one account while preserving the rest.
  * Added per-project default accounts with `unity auth default <account>`, so cloud-authenticated commands run from inside that project resolve it automatically.

* **AI agent integration**
  * Added `unity skill install <client>` to install the Unity CLI agent skill into an AI client's rules or skills directory, in that client's native format. The skill is embedded in the binary, so it works offline and matches the running version. `unity skill refresh` re-renders previously installed skills after an upgrade.

* **Automation and CI**
  * Added CI-native test reports and code coverage to `unity test`, so it drops into a GitHub Actions or GitLab pipeline without a converter step.
  * Added detached Editor command jobs: `unity command <name> --detach` and `unity eval <expr> --detach` return a job ID immediately, and `unity job wait`, `unity job status`, and `unity job cancel` manage it. Requires a Unity pipeline package with job support.
  * Added live Editor task progress to `unity command` and `unity run --command`, rendered as a progress bar on an interactive terminal and as `{"type":"progress"}` frames under `--format ndjson`.
  * `unity command`, `unity list`, `unity job`, and `unity mcp` now find the right Editor on their own when several are open, by matching the directory you run them from against the registered projects. Explicit `--project-path` still takes precedence.
  * Added the full query surface to `unity command` listings: `--query`, `--tag`, `--group_by`, `--sort`, `--order`, `--offset`, `--limit`, and `--detail`.
  * `unity bug` can now attach files with `--attachments <paths...>` and a stripped copy of the project with `--share-project <path>`.

* **Output and integration**
  * `--format ndjson` failures are now machine-readable: a failed command ends the stream with a terminal `{"type":"result","success":false,…}` frame carrying the same fields as the `--format json` envelope, instead of reporting only on stderr.
  * Long human-readable output now scrolls in a pager on an interactive terminal, using `$UNITY_PAGER`, `$PAGER`, or `less`. Machine formats, piped output, and `--quiet` never page. Opt out with `--no-pager` or `UNITY_NO_PAGER`.

* **Interactive shell**
  * Added full line editing to the `unity shell` prompt: Up and Down recall previous commands across sessions, Tab completes commands, subcommands, flags, and values, and Left, Right, Home, and End move within the line.
  * Tab completion now completes pipeline command names live from the connected Editor.

* **Issues fixed**
  * `unity upgrade` now verifies that the downloaded binary starts on your system before replacing the one you have, and no longer cancels itself where the temporary directory is mounted `noexec`.
  * `unity upgrade` no longer overwrites an npm-managed install; it now defers to `npm i -g @unity/cli@latest` the same way it defers to apt, rpm, and Homebrew.
  * `unity open` no longer causes the Editor to open Unity Hub, and the Editor now picks up the account you signed in with.
  * `unity license` commands and Unity Version Control commands now work on a machine that has never run Unity Hub.
  * `unity editors upgrade` no longer hides upgrades for Apple silicon and Arm Windows Editors, no longer offers an older patch than the newest in the line, and no longer reports prerelease Editors as up to date when a newer prerelease exists.
  * `unity editors info <version>` now finds releases on entitlement-gated lines, such as extended LTS.
  * `unity install <version>` now distinguishes an unreachable release service from a version that doesn't exist, retrying briefly and exiting with the new code 7 rather than blaming the version.
  * `unity hub install` works again on macOS and Linux, and `--hub-version` works again for Hub 3.20.0 and newer.
  * Running a command with `sudo` no longer leaves root-owned directories that break every later command.
  * `unity install` failures now report the underlying reason instead of a bare `Installation Failed`, and interrupted downloads can be resumed with `--resume`.
  * Editor and module downloads are now verified against the release manifest's checksum, including downloads resumed across attempts.
  * `unity mcp configure` now writes the config key and file path each AI client actually reads, preserves comments and formatting in the files it edits, and the `run_tests` and `recompile` tools return as soon as the Editor answers instead of always failing at their poll timeout.
  * Running a command group without a subcommand now prints its help to stdout and exits 0 instead of reporting a usage error.
  * Editor Pipeline commands now work behind an HTTP proxy, and long-running Editor commands no longer hard-fail at 60 seconds.

* **Security**
  * Values that come from Unity services, user-editable settings, or the licensing client are now sanitized before they're printed, so a crafted value can't smuggle terminal escape sequences into your terminal or forge extra rows in `tsv` output. This covers table headers and cells, interactive prompt choices, `unity license status`, `unity editors default`, `unity install-path`, and `unity config proxy`.
  * A rejected `--proxy` value shaped like `user:pass@host` no longer echoes the password in the usage error.
  * `unity uninstall` on macOS and Linux now refuses an Editor whose stored location resolves to a filesystem root.
  * Updated the bundled HTTP client library, which now rejects header values containing CR or LF characters.

## July 23, 2026

### 1.0.0-beta.3

* **Interactive shell**
  * Added persistent command history to `unity shell`. Press the Up and Down arrow keys to recall previous commands. History is capped at 1,000 entries, and secret-bearing flag values are masked before they're written to disk.
  * Added tab completion to `unity shell` for command names, subcommands, option flags, and option values.
  * Added session context and defaults to `unity shell`: `use project <path>` and `use org <id>` set an active project or organization for later commands, and `set format`, `set verbose`, and `set banner` set default global options for the session. `unset <key>` clears one setting and `context` displays the current state.
  * Added `unity shell --protocol ndjson`, a machine mode that runs a framed NDJSON request/response protocol over `stdio` so automated callers and agents can run many commands in one warm process and read one parseable result per command.
  * Updated piped and scripted `unity shell` sessions to exit with the code of the first failed command instead of always exiting `0`.

* **Editor and project management**
  * Added `unity editors running` to list running Unity Editor instances with the open project, Editor version, and process ID.
  * Added `unity projects size [project]` to report a project's on-disk size broken down by top-level folder. Use `--all` to summarize every registered project, sorted largest first.
  * Added `unity projects close [project]` to close the running Editor that has a project open. Use `--timeout <seconds>` to bound the graceful wait and `--force` to terminate the process when it can't exit.
  * Added `unity editor module remove` to remove installed modules from an Editor by module ID.
  * Added `unity install <version> --list-components` as an alias for `unity modules list <version>`.
  * Added `unity run --command <name>` to run a registered `[CliCommand]` Editor command headlessly in a single invocation. The CLI starts the Editor in batch mode, runs the command, prints the return value, and shuts the Editor down. Requires the Unity pipeline package.

* **Automation and CI**
  * Added `--json` as a global shorthand for `--format json` on every command.
  * Added support for the `UNITY_PROJECT_PATH` and `UNITY_CLOUD_ORG` environment variables.
  * Unified flag names across commands: `--project-path` is the canonical flag for a Unity project path and `--cloud-org` for a Unity Cloud organization. The previous `--project` and `--org` spellings keep working as hidden aliases.
  * Added non-interactive support to `unity bug` through the `--title`, `--description`, `--steps`, `--reproducibility`, and `--email` options, so you can submit bug reports from scripts and CI.
  * Added the `UNITY_NO_CONSENT_PROMPT` environment variable to suppress the one-time first-run consent prompt without recording a choice.
  * Added terminal-integrated progress reporting through the `OSC 9;4` escape sequence. On Windows Terminal, the taskbar icon fills with download and install progress while `unity install` runs.
  * Updated the CLI to terminate on `SIGTERM` with the conventional exit code `143` instead of ignoring the signal.

* **Installation and updates**
  * Updated `install.sh` on Linux to install the binary to `~/.local/bin/unity`, which is on `PATH` by default on most distributions. Re-running the installer migrates an existing `~/.unity` install.
  * Added publication of the `.deb` and `.rpm` packages to Unity's apt and rpm repositories on every beta and general availability (GA) release, so package-managed installs update through the system package manager.
  * Added in-place AppImage updates to `unity upgrade`, including checksum verification and `--rollback` support.
  * Updated the background update notice to suggest the owning package manager's exact upgrade command on package-managed installs.
  * Fixed the MSIX package never receiving updates because every release rendered the same package version.
  * Fixed the Windows install one-liner failing for every user with "The assignment expression is not valid".

* **Diagnostics and crash reporting**
  * Added anonymous crash and error reporting through Sentry. Reports contain no IP address or hostname, and home-directory paths and token-like values are scrubbed before sending. Set `UNITY_NO_CRASH_REPORT` to disable reporting entirely.
  * Expanded the opt-in usage analytics to record which commands run (registered command names only, never arguments, paths, or project names) and the outcomes of key workflows. Nothing is sent when you're opted out, which is the default.
  * Updated the "Recent log" section of `unity doctor` to render readable log rows instead of raw NDJSON logger lines.

* **Localization**
  * Updated `unity language` to share the Unity Hub's language catalog, with display names derived from CLDR data.
  * Updated `unity lang --set` to accept common spellings of a language code: BCP-47 (`ja-JP`), locale (`ja_JP`), bare language (`ja`), or bare region (`jp`).
  * Fixed non-English locales missing translations for newer commands, so CLI output renders localized instead of falling back to English.

* **Security**
  * Hardened usage errors, the `unity bug` log-archive warning, and `unity projects add` and `unity projects remove` machine output against terminal escape-sequence injection.
  * Added GPG signing to the `.rpm` packages with the published Unity Technologies ApS key.

* **Issues fixed**
  * Fixed `unity upgrade` on Windows flashing a console window about a second after the command exits.
  * Fixed an invalid `--proxy <url>` value being silently ignored. It now fails with a usage error (exit code `2`).
  * Fixed editor and module downloads failing with a DNS error when the operating system proxy settings point at an unreachable proxy auto-config (PAC) URL.
  * Fixed `unity auth login` on Linux without `xdg-open` surfacing a confusing error. The command now prints the sign-in URL so you can open it manually. Under Windows Subsystem for Linux (WSL), the CLI now opens URLs through Windows interop.
  * Fixed `unity open <path> --editor-version <version>` failing with "Not a Unity project" when the project has no `ProjectSettings/ProjectVersion.txt` file.
  * Fixed `unity open` with `--editor-version` starting a multi-gigabyte Editor download without asking. A terminal session now confirms before installing, and a non-interactive session fails fast instead.
  * Fixed `unity status` and `unity pipeline list` not detecting a running Editor whose project path contains a space on macOS and Linux.
  * Fixed `unity command eval` and `unity command eval_file` exiting `0` when the Editor reported a compilation error. They now exit `6` and print the compiler diagnostics.
  * Fixed `unity mcp` reporting failed `eval` tool calls as successful, and fixed `unity mcp` breaking permanently after an Editor script recompile.
  * Fixed `unity editors --installed` stalling for minutes on Windows when antivirus real-time scanning intercepts a freshly installed Editor.
  * Fixed an intermittent crash at exit on Windows right after a command completed successfully.
  * Fixed `unity upgrade` failing with a cross-device link error when the system temporary directory is on a different filesystem than the install directory.
  * Fixed `unity projects create` handing a corrupt template archive to the Editor. Template downloads are now verified against their published checksum.
  * Fixed `unity run --command` launching a second Editor on Windows when the project path differed only by letter case.
  * Fixed the `.deb` package failing to install on minimal Debian and Ubuntu systems by declaring a dependency on `ca-certificates`, and fixed the Unity licensing client never installing on Linux systems without the `unzip` utility.
  * Fixed opted-out runs sending a single anonymous analytics request in some commands. Consent off now means zero analytics requests.
  * Fixed `unity analytics opt-in` and `unity analytics opt-out` not permanently answering the first-run consent prompt when run from a script.

## July 16, 2026

### 1.0.0-beta.2

* **Interactive shell**
  * Added `unity shell`, an interactive session that boots the CLI once and runs many commands in the same warm process. Enter any command without the `unity` prefix, and leave with `exit`, `quit`, or Ctrl+D. Interactive prompts work inside the shell, and a change made by one command is visible to the next.

* **Proxy diagnostics**
  * Added `unity diagnose proxy` to print a redacted, paste-safe proxy diagnostic report: the resolved proxy and its source, PAC configuration, CA bundle, and credential-store and Kerberos checks.
  * Added the global `--log-proxy` flag (or `UNITY_LOG_PROXY=1`) to log one redacted entry per outbound request for reproducing proxy issues.
  * Fixed part of the CLI's HTTPS traffic bypassing the configured proxy. Sign-in, template and release lookups, `unity bug`, and `unity upgrade` traffic now route through the same proxy stack as downloads, and `--proxy-disable` now forces a direct connection.

* **Unity pipeline package**
  * Added `unity pipeline upgrade` to upgrade the Unity pipeline package in a project when the registry has a newer version.
  * Added `unity pipeline list-versions` to list every published version of the package, and `unity pipeline install --package-version <version>` to install a specific version.
  * Updated `unity pipeline list` to show each project's installed package version and flag when a newer version is available.
  * Added `unity list`, a discovery command that queries the connected Unity Editor and prints every registered tool with its name, description, group, and parameter schema.

* **Editor and module installation**
  * Added `--reinstall` and `-f, --force` to `unity install-modules` to repair modules that are already installed.
  * Added automatic retries for module downloads that fail intermittently. Tune or disable retries with `--retries <n>` or `UNITY_INSTALL_RETRIES`.
  * Added `--no-elevate` (or `UNITY_NO_ELEVATE=1`) on Windows to skip the elevated (UAC) install helper for user-writable install locations and CI shells.
  * Updated `unity install` and `unity install-modules` to continue installing the remaining modules when one fails, and to report a per-item result for each Editor and module on both success and failure.
  * Added a desktop entry for installed Editors on Linux, so a launched Editor shows the Unity name and icon in the taskbar.

* **Diagnostics**
  * Added environment health checks to `unity doctor`: whether the `unity` binary's directory is on `PATH`, whether multiple `unity` binaries shadow each other, and whether Windows long-path support is enabled.

* **Installation and updates**
  * Updated `unity upgrade` to detect how the CLI was installed. On a package-manager install, it points you at the owning manager instead of replacing the binary in place.
  * Added GPG signing and AppImage-native update information to the Linux AppImage, so third-party updaters can check for and apply CLI updates.

* **CLI behavior**
  * Added "Did you mean" suggestions for unknown commands that look like a typo of a real one.
  * Updated command modules to load only when their command runs, reducing startup time on every invocation.
  * Removed `--instance <host:port>` from `unity command` and `unity mcp`. The CLI now always discovers running Editors itself; run from the project directory or pass `--project-path` to target one.
  * Removed the regional display languages Spanish (Latin America), French (Canada), and Portuguese (Portugal) from `unity language`. Spanish, French, and Portuguese (Brazil) remain available.
  * Updated the first-run consent prompt to require an explicit `y` or `n` answer.

* **Security**
  * Hardened the Editor and module installers against command injection through the configured install location.
  * Updated `unity hub install` to verify that the downloaded installer is signed by Unity specifically, instead of accepting any validly signed binary.
  * Extended escape-sequence hardening to more output surfaces, including `unity projects list` and the detail views.

* **Issues fixed**
  * Fixed the `lts` version alias resolving to the newest Supported-stream release instead of the newest Long Term Support (LTS) release.
  * Fixed command hints showing literal markdown backticks. Commands now render in cyan on color terminals and as plain text elsewhere.
  * Fixed the CLI requiring the Microsoft Visual C++ Redistributable on Windows.
  * Fixed Unity 2021 and 2022 Editors failing to start when launched through the CLI on Windows.
  * Fixed the `unity license` commands not recognizing service-account sessions, and fixed `unity license return` not returning serial-activated licenses.
  * Fixed file sizes printing a literal `undefined` where the unit belongs.
  * Fixed installing the Visual Studio module opening the interactive Visual Studio Installer on Editor versions whose release manifest omits the install command.
  * Fixed `unity templates list` and `unity templates info` silently falling back to cached template data when the template registry is unreachable. The CLI now prints a warning when it shows cached data.
  * Fixed concurrent module installs corrupting the Editor's module state or failing with misleading permission errors.
  * Fixed the install scripts failing on systems without a shell startup file, and fixed the Windows install script failing to parse under Windows PowerShell 5.1 when saved to disk.
  * Fixed authentication failures in the `unity cloud` commands exiting with code `6` instead of `3`, and aligned operational failures in the cloud and auth commands on exit code `6`.
  * Fixed interrupted builds exiting with a generic `1`. Interrupting `unity build` now exits `130` for Ctrl+C and `143` for `SIGTERM`.
  * Fixed `unity upgrade` failing with a 404 error when the Unity Hub ran in a non-production environment on the same machine.

## June 30, 2026

### 1.0.0-beta.1

The first 1.0 beta of the Unity CLI. This release marks the move to 1.0 versioning and rolls up the functionality shipped across the 0.1.0 betas.

* **Issues fixed**
  * The CLI no longer logs your OAuth access token or Hub session ID in plaintext. Editor-launch commands previously wrote them to the log file that `unity logs`, `unity doctor`, and `unity bug` read; they're now redacted.
  * Fixed detail commands printing nothing under `--format tsv` and `--format ndjson`, including `unity editors info`, `unity config update-check`, `unity pipeline install`, `unity license activate`, and `unity upgrade --dry-run`.
  * Fixed `unity run` and `unity test` mixing the Editor's batch-mode output into machine-readable output. Under `--format json` and `--format ndjson`, the Editor's output goes to `stderr` so the result is the only thing on `stdout`.
  * Fixed `unity projects list` dropping its column flags (`-v`, `--cloud`, `--editor-version`, `--vcs`, `-m`, `--pipeline`) when piped.
  * Fixed `unity templates create` flattening dots in the stored template name, which made later lookups by name fail.
  * Fixed `unity editors --installed` hanging on Windows right after an install when antivirus scanning or a file lock delayed reading the Editor executable.
  * Fixed invalid `unity upgrade --target` and `--channel` values exiting with a generic error code instead of the standard usage-error code.

## June 25, 2026

### 0.1.0-beta.8

* **AI agent integration**
  * Added `unity mcp` to start a Model Context Protocol (MCP) server, built into the `unity` binary, that exposes the commands of a connected Unity Editor as MCP tools. AI agent clients connect over `stdio` and can list and run those commands.
  * Added `unity mcp configure <client>` to register the Unity MCP server in an AI agent's configuration in one step, for 16 supported clients including Claude, Claude Code, Cursor, and VS Code. Only the Unity entry is written; every other key in the file is preserved.

* **Editor management**
  * Added `unity editors upgrade [editor]` to upgrade an installed Editor to the newest official patch in its same `major.minor` line, carrying the Editor's installed modules over to the new patch. Supports `--all`, `--dry-run`, `--replace`, and module and architecture flags.
  * Added an explicit `unity editors list` subcommand, matching the `list` verb used by other command groups.
  * Added an "Upgrade to" column to `unity editors list --installed` that flags installed Editors with a newer patch available in their line.

* **CLI behavior**
  * Updated `unity bug` to collect the same diagnostic system information as the Unity Hub bug reporter, including GPU details.
  * Updated the Unity CLI and the Unity Hub to store their sign-in credentials separately, so each can stay signed in as a different account.
  * Updated `unity projects clone` to download Git LFS objects after cloning.
  * Added a background check for a newer `unity` version with an unobtrusive update notice. Turn it off with `unity config update-check off` or the `UNITY_NO_UPDATE_CHECK` environment variable.

* **Issues fixed**
  * Fixed `unity projects clone` storing your Git access token in the cloned repository's `.git/config`.
  * Fixed the CLI hanging at exit after a command finished printing its output.
  * Fixed the bundled Unity licensing client failing its signature check on macOS and being re-downloaded on every run.
  * Fixed `unity releases --limit` not limiting the number of releases returned.
  * Fixed `unity analytics`, `unity language`, and `unity config proxy` printing nothing under `--format tsv` and `--format ndjson`.

* **Removed**
  * Removed the deprecated `unity implode` alias. Use `unity self-uninstall` instead.

## June 16, 2026

### 0.1.0-beta.7

* **Licensing**
  * Added `unity license` (`unity license list`) to display active Unity licenses on the current machine, including product, license type, organization, and expiration date.
  * Added `unity license status` to display licensing status, sign-in state, and active license information.
  * Added `unity license activate` to activate licenses through serial, Personal, floating, offline file, or offline request workflows.
  * Added `unity license return` to return active licenses and free associated seats.
  * Added `unity license server status` and `unity license server list` to display floating license server status and availability.

* **Project management and source control**
  * Added `unity projects clone` to clone and register Unity projects from GitHub, GitLab, and Unity Version Control repositories.
  * Added support for branch, commit, and changeset selection during project cloning.
  * Added `unity projects link vcs` and `unity projects unlink vcs` to connect or disconnect projects from source control repositories.
  * Added source control options to `unity projects create` and `unity projects link vcs`, including repository visibility, default branch, Git LFS, and Unity Version Control region settings.

* **Hub and Editor management**
  * Added `unity hub install` to install Unity Hub.
  * Added support for architecture selection, silent installation, version selection, and installer signature verification.
  * Added `unity editors path <version>` to display the installation path of an installed Editor.

* **Build automation**
  * Added Android signing options to `unity build`, including keystore, signing key, version code, symbol generation, and target SDK configuration.
  * Added support for exporting Android builds as APK, Android App Bundle (AAB), or Android Studio projects.
  * Added validation for Android signing parameters and warnings when sensitive information is provided through command-line arguments.

* **Testing**
  * Added `unity test [project]` to run Edit Mode and Play Mode tests through the Unity Editor test runner in batch mode.
  * Added support for NUnit XML test reports through the `--output` option. The default output file is `test-results.xml`.
  * Added support for `--mode`, `--filter`, `--editor-version`, `--editor-path`, `--architecture`, `--allow-install`, and `--timeout` options.
  * Added support for the `UNITY_TEST_TIMEOUT` environment variable.
  * Added exit code `6` when test execution completes but one or more tests fail.

* **CLI behavior**
  * Added a dedicated `cli-log.json` log file for Unity CLI.
  * Updated `unity logs`, `unity bug`, and `unity doctor` to use CLI-specific logs.
  * Added a branded Unity header for interactive CLI entry points, including `unity`, `unity help`, and `unity --help`.
  * Updated the CLI to display usage information and return exit code `0` when users run `unity` without arguments.

* **Issues fixed**
  * Fixed an issue where module installers always used the same installation command instead of honoring module-specific installation parameters.
  * Fixed an issue where `--format ndjson` was not supported by `unity projects list` and `unity modules list`.
  * Fixed an issue where `unity bug` could fail with an HTTP 400 error.
  * Fixed table output that could truncate identifier columns when terminal width was limited.
  * Hardened terminal output against control-character and escape-sequence injection from server-provided values.
  * Fixed session-state reporting in `unity doctor` and `unity cloud status` to match `unity auth status`.
  * Fixed architecture detection on Windows Arm64 systems running x64 emulation.

## June 04, 2026

### 0.1.0-beta.6

* **Editor scripting and status**
  * Added `unity eval '<expr>'` to evaluate C# expressions against a connected Unity Editor through the Pipeline server.
  * Added support for human-readable, JSON, TSV, and NDJSON output formats, timeouts, and instance targeting in `unity eval`.
  * Added `unity status` to display the status of connected Unity Editors, including port, project path, Unity version, process ID, and connectivity.
  * Added filtering options for Editor instances and support for automation workflows through structured output and exit codes.

* **Custom templates**
  * Added `unity templates create` to package existing Unity projects as reusable custom templates.
  * Added `unity templates edit` to update custom template metadata.
  * Added `unity templates delete` to remove custom templates.
  * Added `unity templates location` to view, configure, or reset the custom template storage location.
  * Added support for filtering templates by type in `unity templates list`.

* **Unity Cloud**
  * Added `unity cloud status` to display cloud sign-in status and the active organization.
  * Added commands to list, select, and manage Unity Cloud organizations.
  * Added `unity cloud project list` to display Unity Cloud projects in the active organization.

* **Project management**
  * Added `--cloud` support to `unity projects create` to create and link a Unity Cloud project during project creation.
  * Added `--cloud-project` support to link a project to an existing Unity Cloud project.
  * Added `unity projects link cloud` and `unity projects unlink cloud` to manage Unity Cloud project associations.
  * Added support for creating projects from `.tgz` archives and directory paths in addition to registered template IDs.

* **Build versioning**
  * Added `--versioning-strategy` and `--build-version` options to `unity build`.
  * Added support for deriving build versions from Git tags and repository history.
  * Added validation that prevents builds from using a modified working tree unless `--allow-dirty-build` is specified.

* **Authentication and analytics**
  * Added shared authentication between Unity CLI and Unity Hub through the operating system keyring.
  * Added automatic migration of existing Unity Hub sessions to keyring-based storage.
  * Added `unity analytics opt-in`, `unity analytics opt-out`, and `unity analytics status` commands to manage telemetry preferences.
  * Added a first-run consent prompt for telemetry collection.
  * Added support for shared telemetry preferences between Unity CLI and Unity Hub.
  * Set telemetry collection to opt out by default.

* **Networking and proxy support**
  * Added support for HTTP, HTTPS, SOCKS, and PAC proxies.
  * Added support for authenticated proxies, including Kerberos and SPNEGO.
  * Added proxy configuration precedence through command-line arguments, environment variables, stored settings, and operating system settings.
  * Added `unity config proxy` to view, configure, or clear proxy settings.
  * Added proxy diagnostics to `unity doctor` and `unity env`.
  * Added `--proxy-disable` to bypass proxy settings for a single command invocation.

* **CLI behavior**
  * Standardized command naming to `unity <command>` across the CLI, documentation, and shell completions.
  * Updated `unity auth status` to report actual session state through the Session Service.
  * Improved Windows upgrade messaging to provide clearer post-upgrade guidance.

* **Issues fixed**
  * Fixed an issue where `unity install` could become stuck when resuming a corrupted partial download.
  * Fixed an issue where concurrent `unity install` commands could corrupt shared installation data.
  * Fixed an issue on Windows where Visual Studio modules could incorrectly appear as already installed.
  * Fixed an issue where `unity auth logout` did not reliably remove stored credentials.
  * Fixed interactive prompts on Windows for module installation confirmation and architecture selection.
  * Fixed an issue where `unity open` did not correctly forward `--args` to the Unity Editor on Windows.
  * Fixed validation and error handling for `unity --instance host:port`.
  * Fixed support for `--format tsv` and `--format ndjson` in `unity editors`.
  * Fixed an issue where unattended installations using `unity install --accept-eula --non-interactive` could fail.
  * Fixed template command error handling when no default Editor is configured.
  * Fixed structured output from `unity status` when no reachable Editor instances are available.
  * Fixed JSON output formatting inconsistencies for command failures.
  * Fixed JSON output handling for validation errors.
  * Fixed command execution flow to ensure handlers exit correctly after failures.

## May 21, 2026

### 0.1.0-beta.5

* **Service account authentication**
  * Added support for Unity service account authentication in `unity auth login`.
  * Added support for automatic bearer token generation when `UNITY_SERVICE_ACCOUNT_ID` and `UNITY_SERVICE_ACCOUNT_SECRET` are set.
  * Added support for unattended authentication workflows in CI environments and automation scenarios.
  * Updated `unity auth logout` to clear both service account and OAuth credentials.
  * Added a warning when only one of `UNITY_SERVICE_ACCOUNT_ID` or `UNITY_SERVICE_ACCOUNT_SECRET` is configured.

* **Unity Pipeline**
  * Added `unity pipeline install` (`unity pipe install`) to install the Unity Pipeline package into a Unity project.
  * Added automatic project detection for pipeline installation and support for the `--project-path` and `--ssh` options.
  * Added `unity pipeline list` (`unity pipe list`) to display Unity Editor instances and Pipeline package status.
  * Added `unity command` (`unity cmd`, `unity request`) to execute commands against connected Unity Editor instances or list available commands.

* **Editor installation and management**
  * Enhanced `unity install --resume` to recover orphaned partial downloads that result from interrupted installations.
  * Added module discovery support with `unity install` and `unity install-modules` for Editors registered with `unity editors add <path>`.
  * Added support for module discovery on Editors that Unity Hub did not install.

* **Output and integration**
  * Added a `phase: 'download' | 'install'` field to NDJSON progress output for `unity install` and `unity install-modules` to distinguish download and installation phases.
  * Improved NDJSON output and CLI progress reporting by grouping module progress under the parent Editor installation.

* **Error handling**
  * Standardized CLI error messages across commands.
  * Improved separation between user-actionable errors and internal errors.
  * Updated exit code behavior to align with the exit-code contract introduced in version `0.1.0-beta.4`.

* **Issues fixed**
  * Fixed an issue where NDJSON progress output for `unity install` reset progress from 100 percent to 0 percent during installation.
  * Fixed an issue where `unity editors --installed` could hang indefinitely when the release feed was unavailable, such as on split-tunnel VPN connections.
  * Fixed an issue where `unity install --resume` could hang when the target Editor was already installed.
  * Fixed orphaned download discovery to detect partial downloads under all supported interruption scenarios.
  * Fixed an issue on Windows where `unity install` could incorrectly report that an Editor was already installed immediately after uninstalling it.
  * Fixed an issue where `unity install -m` and `unity install-modules -m` did not correctly process multiple space-separated module values after a single `-m` flag.

## May 07, 2026

### 0.1.0-beta.4

A major release that adds core workflow commands for diagnostics, Editor management, project management, and automation.

* **Diagnostics and inspection**
  * Added `unity doctor` to generate a diagnostic snapshot that includes platform information, CLI version, installation path, log directory, authentication status, installed Editors, and recent log entries.
  * Added `unity completion <bash|zsh|fish|powershell>` to generate shell completion scripts.
  * Added `unity env` to display environment variables used by Unity CLI and Unity Hub.
  * Added `unity logs` to view and follow Unity Hub log files.
  * Added `unity editors info <version>` to display detailed metadata for an installed Editor.
  * Added `unity releases` to list available Unity releases from the release feed.
  * Added `unity modules list <version>` to display available modules for an Editor version.
  * Added `unity templates list` and `unity templates info <id>` to list project templates and view template details.

* **Editor management and installation**
  * Added `unity editors add <path>` to register an existing Editor installation with Unity Hub.
  * Added `unity editors default [<version>]` to get or set the default Editor.
  * Added `unity editors install-path [<path>]` to get or set the Editor installation path.
  * Added commands to list and install modules for an installed Editor.
  * Added `unity install --dry-run` to preview Editor installations.
  * Added `unity install --force` to reinstall an Editor that is already installed.
  * Added `unity install --resume` to resume interrupted downloads from the local cache.
  * Added `unity install-modules --dry-run` to preview module installations.
  * Added prompts to accept module license agreements before downloading modules.
  * Added `unity cache info` and `unity cache clean` to view and manage the download cache.

* **Project management**
  * Added `unity projects open [<query>]` to open a project by using a fuzzy-matched project name when no exact path is provided.
  * Added `unity projects new <name> --template <id> --editor-version <version>` to create projects non-interactively for scripts and CI workflows.
  * Added `unity projects pin <pattern>` and `unity projects unpin <pattern>` to manage favorite projects.
  * Added `unity projects export` and `unity projects import` to export and import project lists in JSON format.
  * Added `unity projects info <path>` to display Editor, module, and cloud information for a project.
  * Added `unity projects upgrade [<path-or-name>] --to <version>` to upgrade a project to a different Editor version.
  * Added `unity projects require <module>...` to verify that required modules are installed for a project.
  * Added automatic Editor version detection for `open`, `install`, and `uninstall` when no version is specified and the current working directory contains a Unity project.

* **CI and automation**
  * Added `unity run` to execute projects in batch mode, stream logs, and return the Editor exit code.
  * Added NDJSON progress output for long-running commands, including `unity build` and `unity projects new`.

* **Output and integration**
  * Added a standardized JSON output envelope that includes `success`, `command`, `data`, `errors`, and `warnings`.
  * Added the `ndjson` output format for streaming progress updates from long-running commands.
  * Added documentation for the `tsv` output format alongside `human` and `json`.
  * Added global `--non-interactive`, `--quiet`, and `--no-banner` options.
  * Added `-y` and `--yes` options for commands that require confirmation.
  * Added `-w` and `--watch` options to keep Editor and project lists updated automatically.
  * Added environment variables that mirror global CLI options, including `UNITY_FORMAT`, `UNITY_QUIET`, `UNITY_NO_BANNER`, and `UNITY_NON_INTERACTIVE`. `HUB_FORMAT` remains supported as an alias for `UNITY_FORMAT`.
  * Added searchable version selectors for interactive workflows.
  * Extended exit code support to include authentication, network, conflict, usage, and command-specific errors.

* **Platform and extensibility**
  * Added `unity <version> [path]` as a shorthand command to launch an Editor with an optional project path.
  * Added plugin discovery for executables named `unity-<name>`, which Unity CLI exposes as `unity <name>`.
  * Added `unity self-uninstall` to remove the CLI binary, environment files, and stored credentials.
  * Added `unity report-bug` to launch the Unity Hub bug reporter or create a structured bug report.
  * Added `unity upgrade --rollback` to restore the previously installed CLI version.

* **CLI behavior**
  * Deprecated `unity implode` in favor of `unity self-uninstall`.
  * Updated automatic update checks to run in the background without blocking command execution.
  * Enhanced `unity editors list` to display version aliases, identify the default Editor, and resolve installation paths.
  * Improved `unity auth login` for remote and headless environments by displaying the sign-in URL before attempting to launch a browser.
  * Added authentication progress events to JSON output so automation tools can capture sign-in URLs programmatically.

* **Issues fixed**
  * Fixed an issue where `unity auth` could fail to start the sign-in flow after a fresh installation.
  * Fixed an issue on Windows where `unity auth` removed query parameters from the OAuth callback URL, which could prevent sign-in from completing.
  * Fixed an issue on Windows where `unity upgrade` could fail to replace the CLI binary.
  * Fixed issues in `unity projects upgrade` related to project name lookups, confirmation prompts, and short version aliases.
  * Fixed an issue where `unity editors info` did not expand short major-version aliases.
  * Fixed issues in `unity install-modules` that prevented correct handling of invalid Editor versions, version aliases, and ambiguous version matches.
  * Fixed an issue where `unity install --dry-run` reported incorrect download sizes when the Editor was already installed.
  * Updated `unity projects require` to accept a project name in addition to a project path.
  * Fixed an issue where the Windows installer could corrupt the system `PATH`.
  * Added ASCII fallback support for terminals that do not support Unicode characters.
  * Routed module installation errors to `stderr` to improve scripting and output redirection.
  * Fixed Linux configuration directory inconsistencies between Unity CLI and Unity Hub to keep settings, projects, and Editors synchronized.
  * Fixed startup failures in Bun runtimes that do not support `mkdtempDisposable`.
  * Fixed startup failures in packaged Bun binaries caused by an unnecessary runtime dependency on `@vscode/proxy-agent`.

## April 24, 2026

### 0.1.0-beta.3

* Fixed an issue where `unity install`, `unity install-modules`, and `unity auth` failed with a service resolution error after a fresh installation.
* Fixed an issue on Linux where the CLI used `~/.local/share/unityhub` for Hub data. The CLI now reads and writes Hub data in `~/.config/unityhub`, which matches the Unity Hub location and keeps projects, Editors, and preferences synchronized between the CLI and Unity Hub.

## April 23, 2026

### 0.1.0-beta.2

* Added `unity implode` to uninstall the CLI. This command removes the installed binary and environment files and clears stored credentials from the operating system keyring. In non-interactive shells, the command requires the `--yes` flag and only works on a CLI installed using the official installer.
* Added `unity projects create` to create a Unity project from the CLI.
* Added `unity changelog` to display the release notes for the installed CLI.
* Added `unity upgrade --changelog` to preview release notes for an update without installing it.
* Added `unity upgrade --target <version>` to upgrade to a specific published version instead of the latest version in your channel.
* Added interactive `unity upgrade` which shows release note previews for the target version before confirmation.

## April 04, 2026

### 0.1.0-beta.1

First public beta release of Unity CLI. This release provides a single executable for macOS, Linux, and Windows on x64 and Arm64 architectures. Install Unity CLI by using `install.sh` or `install.ps1`.

* **Authentication:** Added `unity auth` with secure token storage in the operating system keychain:
  * Keychain on macOS
  * Credential Manager on Windows
  * libsecret on Linux
* **Editor management:** Added the following commands:
  * `unity editors`, `unity install`, `unity uninstall`, `unity install-modules`, and `unity install-path`
  * Supports Editor version aliases
  * Installs Editor versions with or without a changeset
* **Project management:** Added the following commands:
  * `unity projects` to list, add, remove, and create projects
  * `unity open <path>` to open a project
  * Supports bare-path syntax, such as `unity ./MyProject`
* **Upgrade management:** Added `unity upgrade`. Automatically selects the appropriate update channel based on the installed version (stable or prerelease).
* **Localization:** Added the `unity language` command.
  * Added support for 13 locales
* **Output formats:** Added the global `--format <human|json|tsv>` flag for machine-readable output. Suppresses the interactive banner for JSON and TSV output and when output is piped.
* **Verifiable downloads:** Added SHA-256 checksums for all platform binaries
