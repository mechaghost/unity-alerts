# Release notes

> Review the latest Vivox Core release notes and updates.

## Version 5.28.0

### Release overview

The 5.28.0 release includes new features, introduces support for Linux arm64 and Nintendo SDK 22.2.0, and it contains various bug fixes and improvements.

For further technical details on all the changes included in this release, refer to the `CHANGELOG.md`  file within the SDK.

### Key features and bugs addressed

**Added**

* Ability to synchronize custom metadata between participants in sessions, a.k.a. "session presence custom metadata".
* New noise reduction algorithm, RNNoise, for removing keystrokes, mouse clicks and other environmental transient noises.
* Jitter compensation API.
* Enumeration of audio devices on Linux.
* Namespace and Body fields added to session and user-to-user message events.
* New audio callbacks that separate local audio processing from voice session audio processing.
* Support for Linux arm64.
* Support for Nintendo SDK 22.2.0.

**Changed**

* Local loopback audio has noise reduction applied in the same way that voice session audio does.

**Fixed**

* Various minor bug fixes.

### Public API Changes

* New request: `vx_req_session_set_presence_custom_metadata` .
* New event: `vx_evt_participant_presence_custom_metadata_updated` .
* Event changes: `vx_evt_session_archive_message`  and `vx_evt_account_archive_message` now contain `application_stanza_namespace` and `application_stanza_body` .
* Callback change: `pf_on_audio_unit_before_capture_audio_sent`  callback signature has changed. `is_speaking` is now an `int *`  in/out parameter (was `int` ), and a new `int *fade_speech_transition_ms`  parameter has been added.
* New noise reduction API: `vx_noise_reduction_rnnoise_set_enabled` , `vx_noise_reduction_rnnoise_get_enabled` , `vx_noise_reduction_rnnoise_set_strength`, `vx_noise_reduction_rnnoise_get_strength`, `vx_noise_reduction_webrtcns_set_enabled`, `vx_noise_reduction_webrtcns_get_enabled`, `vx_noise_reduction_webrtcns_set_level`, `vx_noise_reduction_webrtcns_get_level`.
* Deprecated: `vx_get_noise_suppression_enabled`, `vx_set_noise_suppression_enabled`, `vx_get_noise_suppression_level`, and `vx_set_noise_suppression_level`. Use the new `vx_noise_reduction_webrtcns_*`  functions instead.
* New jitter compensation API: `vx_set_jitter_compensation_periods` and `vx_get_jitter_compensation_periods`.
* New audio callbacks: `pf_on_local_audio_unit_before_signal_processing`, `pf_on_local_audio_unit_after_signal_processing`, and `pf_on_local_audio_unit_before_render`.

### Known Issues

None.

## Version 5.27.3

### Release overview

The 5.27.3 release introduces support for the PlayStation® 5 13.00 SDK and Linux x64, and it contains various bug fixes and improvements.

For further technical details on all the changes included in this release, refer to the `CHANGELOG.md` file within the SDK.

### Key features and bugs addressed

**Added**

* Support for PS5 13.00 SDK.
* Support for Linux x64.

**Changed**

* Improved login latency.
* Android: Disabled the default pooled allocator to avoid a rare memory alignment issue on ARM64.
* Android: Bluetooth microphone devices now have software Acoustic Echo Cancellation enabled.

**Fixed**

* Android: Fixed a race condition so that switching between devices doesn't stop Bluetooth microphones from streaming.
* PlayStation: Increased TLS SSL pool size to prevent crashes at login under certain network conditions.

### Public API Changes

* Android: `vx_set_force_pooled_allocator(int enable)` added to allow for re-enabling the pooled allocator.

### Known Issues

None.

## Version 5.27.1

### Release overview

The 5.27.1 release contains various bug fixes and improvements.

For further technical details on all the changes included in this release, refer to the `CHANGELOG.md` file within the SDK.

### Key features and bugs addressed

**Added**

* Vivox clients now reconnect automatically when Vivox servers make live upgrades.

**Changed**

* Windows: Only audio input devices now have the `AudioCategory_GameChat` AudioCategory specified by default due to Windows forcing some Bluetooth devices into a low quality mode when `AudioCategory_GameChat` was specified for an audio output device. Use `vx_sdk_config_t.capture_audio_stream_category` to change the capture audio stream category at initialization.

**Fixed**

* Android: Building the SDKSampleApp from source is now achievable in modern Android Studio versions without major build file changes.

## Version 5.27.0

### Release overview

Version 5.27.0 introduces support for the Nintendo Switch™ 2 and fixes bugs related to Android and Automatic Connection Recovery (ACR).

For further technical details on all the changes included in this release, refer to the `CHANGELOG.md` file within the SDK.

### Key features and bugs addressed

* Android armeabi/armeabi-v7a: Fixed a crash that would occur on certain SoCs at the time of Vivox login when custom allocators were not specified.
* Fixed layered service provider debug log spam from Automatic Connection Recovery (ACR).
* All time-dependent operations within the Vivox SDK are now immune to system clock changes.

**Windows**

* Audio devices opened by the Vivox SDK now have their AudioCategory marked as `AudioCategory_GameChat` for client applications that have declared compatibility with Windows 10 and 11 in their manifest.

**Platform-specific changes**

* Added support for Nintendo Switch™ 2.

### Public API Changes

**New error codes**

* Added `VxErrorJobDependencyFailed (5111)`
* Added `VxErrorFailed (1004)`

### Known Issues

* Some Bluetooth audio devices on Windows have reduced audio quality because the operating system forces them into Handsfree Telephony mode. This will be fixed in the next hotfix release.

## Version 5.26.3

### Release overview

Version 5.26.3 officially provides support for Nintendo Switch™ 2.

### Key features and bugs addressed

* Added support for Nintendo Switch™ 2.

### API changes

None.

### Known issues

None.

## Version 5.26.0

## Release overview

Version 5.26.0 introduces comprehensive audio processing improvements with enhanced noise suppression, expanded platform support for audio processing features, and significant performance optimizations.

This release focuses on improving voice quality while optimizing resource usage across all supported platforms.

For further technical details on all the changes included in this release, refer to the `CHANGELOG.md` file within the SDK.

## Key Features and Bugs Addressed

* Updated license and third-party notices.
* Vivox log levels were off-by-one. There may be more Vivox log statements now if initial\_log\_level was set for your application.

### Audio Processing Improvements

* Noise suppression now applied to capture audio by default.
* Extended Acoustic Echo Cancellation (AEC) and Automatic Gain Control (AGC) support to Nintendo Switch™, PlayStation®, XBOX, visionOS, and UWP.
* New AEC implementation prevents microphone dropouts in the presence of echo on mobile platforms.
* AGC enabled by default with improved microphone capture loudness.
* Optimized voice codec for reduced packet loss and jitter.

### Performance Optimizations

* Existing AEC/AGC platforms:
  * 11 MB reduction in memory usage during active sessions.
  * Improved CPU efficiency in Release configuration.

* New AEC/AGC platforms:
  * 44% increase in audio thread CPU usage.
  * 6 MB additional memory usage during sessions.

* Memory allocator improvements reducing heap memory requests.

### Platform-Specific Changes

* Android: Added 16KB page size support for native libraries
* Android: Proguard rules now included in AAR libraries
* iOS: Removed support for ARMV7 architecture
* iOS: Removed bitcode
* Android/iOS: Improved platform AEC control independent of DVPS

### Implementation Considerations

* Consider adjusting application volume presets due to new AGC behavior.

## Public API Changes

### New APIs

* `vx_get_noise_suppression_enabled`
* `vx_get_noise_suppression_level`
* `vx_set_noise_suppression_enabled`
* `vx_set_noise_suppression_level`
* `on_audio_unit_requesting_final_mix_for_echo_canceller_analysis`

### Modified APIs

* `vx_set_platform_aec_enabled` - Now functions independently of Dynamic Voice Processing Switching (DVPS) status.

### New Error Code

* Added `VxXmppErrorChannelAtCapacity (20507)`

## Known Issues

* Android sample applications do not yet support 16KB page size despite native library support.
