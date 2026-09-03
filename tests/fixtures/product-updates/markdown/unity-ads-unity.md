# Unity Ads SDK changelog

> Track Unity Ads SDK version releases for native iOS and Android developers to integrate the SDK for app monetization. See details on new features, changes, and bug fixes in a release.

> **Note:**
>
> Starting April 1, 2026, apps that monetize with Unity Ads through direct integration through the Advertisement Legacy Package might see reduced ad performance. To avoid reduction in performance, switch to integrating Unity Ads as a bidder.
>
> The Unity Ads network will continue to support and provide fill for all apps using direct integration. However, to maximize revenue and performance, the recommended best practice is to [install the Ads Mediation package for LevelPlay](/grow/levelplay/sdk/unity/package-integration.md.md), Unity's ad mediation platform.

## Version 4.20.0 - released 2026-08-14

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Improved ad load reliability and overall performance.
* Fixed a crash on Android 8 and reduced Application Not Responding errors (ANRs).
* Added support for Android Gradle Plugin 9 with R8 minification.If you’re upgrading or plan to upgrade to Android Gradle Plugin 9 / AGP 9 with isMinifyEnabled = true, install the Unity Ads SDK 4.20.0.If you’re using a Unity Ads SDK version earlier than 4.20.0 with Android Gradle Plugin 9 with isMinifyEnabled = true, you must add the required keep rules to your own ProGuard configuration, otherwise Unity's diagnostic and operative events are silently dropped under R8. |
| iOS          | - Improved ad load reliability and overall performance.
- Fixed a crash when presenting the App Store product sheet while the product sheet is open from previous ad cycle, and other stability fixes.                                                                                                                                                                                                                                                                                                                                                                                                                              |

## Version 4.19.0 - released 2026-06-26

| **Platform** | **Notes**                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Upgraded Kotlin to 2.1.x.
* Fixed bugs and added stability improvements.Direct integration publishers: Refer to the Unity Ads 4.19.0 Android API reference for Java and Kotlin deprecated APIs. |
| iOS          | - Fixed bugs and added stability improvements.Direct integration publishers: Refer to the Unity Ads 4.19.0 iOS API reference for Swift and Objective-C for deprecated APIs.                       |
| Unity        | * Fixed privacy API for graceful handling.                                                                                                                                                        |

## Version 4.18.1 - released 2026-05-28

| **Platform** | **Notes**                        |
| ------------ | -------------------------------- |
| Android      | * No change.                     |
| iOS          | - Fixed an uncommon crash issue. |

## Version 4.18.0 - released 2026-05-06

| **Platform** | **Notes**                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Android      | * Improved diagnostics and observability.
* Improved ad load reliability and overall performance.                                                                                                                                                      |
| iOS          | - Reduced crashes on devices running iOS versions earlier than 18.
- Updated the minimum supported Xcode version for building the iOS SDK to 26.0.1.
- Improved diagnostics and observability.
- Improved ad load reliability and overall performance. |

## Version 4.17.0 - released 2026-03-04

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Added new beta public API for Kotlin and Java. Refer to the [Beta privacy API update guide](/grow/ads/privacy/beta-privacy-api/unity-ads-sdk-beta-privacy-api-update-guide.md) for details on the updated Unity Ads privacy APIs.                                                       |
| iOS          | - Added new beta public API for Swift and Objective-C. Refer to the [Beta privacy API update guide](/grow/ads/privacy/beta-privacy-api/unity-ads-sdk-beta-privacy-api-update-guide.md) for details on the updated Unity Ads privacy APIs.
- Reduced memory usage during network requests. |
| Unity        | * Added support for the new Swift Xcode project type in the Unity Editor 6.5.                                                                                                                                                                                                             |

## Version 4.16.6 - released 2026-01-22

| **Platform** | **Notes**                                                                  |
| ------------ | -------------------------------------------------------------------------- |
| Android      | * Improved stability on some low-memory devices by improving ANR handling. |
| iOS          | - No change.                                                               |

## Version 4.16.5 - released 2025-12-04

| **Platform** | **Notes**                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Android      | * Improved performance on low memory devices.
* Improved banner ad behavior to prevent full-screen transitions.
* Fixed an issue with crashes that might occur for devices without access to the Play Store. |
| iOS          | - No change.                                                                                                                                                                                                 |

## Version 4.16.4 - released 2025-11-14

| **Platform** | **Notes**                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Android      | * Fixed out-of-memory crashes that occurred on low-memory devices to improve app stability.
* Fixed an issue where the back button might behave unexpectedly during ad interactions. |
| iOS          | - Improved in-app puchasing (IAP) event handling.                                                                                                                                    |
| Unity        | * Fixed an issue that might prevent banners from refreshing correctly in projects using Unity Editor 6.0 or newer with Unity Ads-only integrations.                                  |

## Version 4.16.3 - released 2025-10-10

| **Platform** | **Notes**                                                                  |
| ------------ | -------------------------------------------------------------------------- |
| Android      | * Optimized fallback logic when issues are detected during initialization. |
| iOS          | - No change.                                                               |

## Version 4.16.2 - released 2025-10-02

| **Platform** | **Notes**                                                                                                                                                                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Updated banner API to improve compatibility with mediation partners for smoother banner integration.
* Updated in-app purchase support for Google Play Billing Library v8 to ensure smoother transactions.
* Fixed a bug with Open Measurement affecting programmatic campaigns. |
| iOS          | - Enabled offerwall ads for apps that already integrate an offerwall SDK.                                                                                                                                                                                                          |

## Version 4.16.1 - released 2025-08-13

| **Platform** | **Notes**                                    |
| ------------ | -------------------------------------------- |
| Android      | * Reduced Unity Ads SDK initialization time. |
| iOS          | - Reduced Unity Ads SDK initialization time. |

## Version 4.16.0 - released 2025-07-23

| **Platform** | **Notes**                                                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Improved handling to ensure ads can display correctly after the app screen closes.
* Added feature to enable Android publishers to promote offerwalls with Unity Ads. |
| iOS          | - Upgraded the minimum Target iOS version to 13.                                                                                                                        |

## Version 4.15.1 - released 2025-07-02

| **Platform** | **Notes**                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Android      | * Fixed an ad lifecycle issue potentially denying the display of subsequent ads in a session.
* Updated the Proguard consumer file for improved Acquire Optimizations support. |

## Version 4.15.0 - released 2025-05-28

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Added support for the [Android display content edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge) feature.
* Added a new `getToken` API that supports ad formats. Providing an ad format optimizes ad loading processes for faster ad delivery.
* Improved asset memory usage.
* Improved error handling.
* Fixed issue with streaming ad performance on low-end devices. |
| iOS          | - Added a new `getToken` API that supports ad formats. Providing an ad format optimizes ad loading processes for faster ad delivery.
- Refined `Show` error message to improve consistency across mediation error messaging.
- Improved asset memory usage.
- Fixed behavior of error message `Cannot show the ad while another is already being shown`, which appeared when no ads were showing.          |

> **Note:**
>
> iOS app publishers releasing or updating an app in the Apple App Store on April 24, 2025 or later will need to update to a minimum Xcode version 16.1. For more information, refer to Apple’s&#x20;
>
> [SDK minimum requirements](https://developer.apple.com/news/upcoming-requirements/?id=02212025a)
>
> &#x20;for apps uploaded to App Store Connect.

## Version 4.14.2 - released 2025-04-16

| **Platform** | **Notes**                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Refactored and optimized the signal collection system for better performance.
* Improved support for some ad network A/B testing scenarios.  |
| iOS          | - Added a safeguard to prevent an issue affecting acquisition improvement in some iOS apps.
- Fixed an issue affecting banner error reporting. |

## Version 4.14.1 - released 2025-03-24

| **Platform** | **Notes**                                                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Enhanced error reporting for publisher edge cases.
* Upgraded Protobuf dependency from v3.21.12 to v3.25.6 to address a [known security vulnerability](https://access.redhat.com/security/cve/cve-2024-7254). |
| iOS          | - No change.                                                                                                                                                                                                    |

> **Important:**
>
> All Android publishers are strongly advised to update their Protobuf version
> to 3.25.6 or later to avoid security issues.

## Version 4.14.0 - released 2025-03-11

| **Platform** | **Notes**                                                                 |
| ------------ | ------------------------------------------------------------------------- |
| Android      | * Added the feature to promote an offerwall from within video placements. |
| iOS          | - No change.                                                              |

> **Note:**
>
> Contact your account manager or [Unity Ads Support](https://support-ads.unity.com/s/ContactUs) for more information on how to promote an offerwall in video placements.

## Version 4.13.2 - released 2025-02-25

| **Platform** | **Notes**                                                  |
| ------------ | ---------------------------------------------------------- |
| Android      | * No change.                                               |
| iOS          | - Optimized ad impression opportunities in some scenarios. |

## Version 4.13.1 - released 2025-01-29

| **Platform** | **Notes**                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed a crash that could occur when attempting to re-initialize the SDK inside the initialization complete callback.                                                                                      |
| iOS          | - Fixed framework warnings related to the `UnityAdsCommon.h` file in the Unity Ads framework.
- Fixed an issue where the initialization callback would not fire when calling initialization multiple times. |

## Version 4.13 - released 2025-01-14

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed a potential `Null Pointer Error` for Banners.
* Fixed a potential deserialization issue in the Android Player.
* Improved reporting for initialization failures.
* Fixed an issue with operative message event retries following an error message.
* Improved data requests to simplify reporting complexity. |
| iOS          | - Fixed an issue that could cause a crash when changing the device mute status.
- Standardized metric names to simplify reporting complexity.                                                                                                                                                                         |

## Version 4.12.5 - released 2024-11-21

| **Platform** | **Notes**                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------- |
| Android      | * Fixed an issue to improve internal counters.                                                 |
| iOS          | - Fixed an issue to improve internal counters.
- Updated the location of the iOS cache folder. |

## Version 4.12.4 - released 2024-10-23

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed a crash that occurred when flushing diagnostics events.
* Fixed a crash that occurred during communication with the Google Play Billing Library.
* Fixed an issue where the internal state was not set prior to calling `IUnityAdsInitializationListener`, leading to later session errors. |
| iOS          | - Fixed an issue that caused the app sheet dismissal to make the UI unresponsive.                                                                                                                                                                                                                   |

## Version 4.12.3 - released 2024-9-20

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed an issue that caused a `NullPointerException` on banner show.
* Fixed an issue with `ShowOptions` serialization which sometimes caused a crash.
* Fixed a race condition in `getToken` that led to null tokens being returned in some cases.
* Adjusted packaging to allow for better minification when using ProGuard.                    |
| iOS          | - Added a fix for some mobile devices which included an incorrect User Agent when making requests.
- Fixed a crash that sometimes occurred when calling `getSharedSessionId`.
- Fixed a crash that sometimes occurred when sending some diagnostics metrics.
- Fixed a crash that sometimes occurred when detecting a mute state during playbacks. |

## Version 4.12.2 - released 2024-8-06

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed an issue with Proguard minification leading to runtime exceptions.
* Fixed an issue where the billing service disconnections could lead to a crash in some configurations.
* Fixed an issue where when the activity is destroyed from external sources, the Ad Player still responds with a complete event.
* Fixed an issue where ad show failures would prevent subsequent ad shows from starting.
* Fixed an issue where the ad display orientation would not update from the device leading to incorrect end card orientations. |
| iOS          | - Fixed an issue that could sometimes cause the `Show` method to report a timeout even after a successful display of an ad.
- Fixed the user agent string to report correctly when some tablets were used in desktop mode.
- Fixed an issue where the ad display orientation would not update from the device leading to incorrect end card orientations.                                                                                                                                                                                   |

## Version 4.12 - released 2024-07-17

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * (iOS) Added support for the Apple Privacy Manifest update to ensure publisher compliance with the App Store submission requirements.
* (iOS) Increased banner demand.
* (iOS) Removed the use of a deprecated `openURL` method.
* (iOS) Fixed an issue with detecting location on certain iOS versions for devices used in China.
* (Android) Added Java 8 as a minimum requirement for adding the Unity Ads SDK to your project.
* (Android) Improved banner life cycle performance.
* (Android) Reduced network requests.
* (iOS, Android) Fixed multiple bugs and made improvements. |

> **Important:**
>
> This SDK version includes the Apple Privacy Manifest update for C# developers,
> with no further updates planned for the package.

## Version 4.12.1 - released 2024-07-04

| **Platform** | **Notes**                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Optimized data cache behavior.
* Improved data fetching timing and efficiency for some services.
* Improved the Acquire Optimization feature performance. |
| iOS          | - Added additional network metrics to improve downstream performance.
- Extended Apple podspec to cover additional use cases.                               |

## Version 4.12 - released 2024-05-31

| **Platform** | **Notes**                                                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Enhanced support and targeting for multi-store campaigns where applicable.
* Removed dependency on Koin that led to transitive dependency resolution issues when using EDM4U.
* Fixed a crash that occurred when reading corrupted cached data. |
| iOS          | - Fixed a crash that occurred in the `UADSGenericMediator` class.                                                                                                                                                                                 |

## Version 4.11.3 - released 2024-05-10

| **Platform** | **Notes**                                                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Android      | * Fixed a potential race condition causing a `NullPointerException` in the `AndroidSessionRepository` init block.
* Removed all BOM dependencies from the Unity Ads SDK. |
| iOS          | - No change.                                                                                                                                                             |

## Version 4.11.2 - released 2024-05-05

| **Platform** | **Notes**                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Adjusted a Kotlin dependency version that was changed in 4.11.0 that led to an infinite loop when resolving Unity Ads dependencies with the EDM4U package resolver. |
| iOS          | - No change.                                                                                                                                                          |

## Version 4.11.1 - released 2024-05-05

| **Platform** | **Notes**                                                          |
| ------------ | ------------------------------------------------------------------ |
| Android      | * Fixed a build issue that led to a missing dependency at runtime. |
| iOS          | - No change.                                                       |

## Version 4.11 - released 2024-05-02

| **Platform** | **Notes**                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed an `Out of Memory Exception`that occurred during initialization.
* Fixed a crash that occurred when HTTP response headers were corrupted.                                   |
| iOS          | - Added support for Open Measurement to allow publishers to use third-party viewability providers to verify impressions and clicks.
- Removed use of a deprecated `openUrl` method. |

## Version 4.10 - released 2024-03-25

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed an error where banner loaded callbacks were triggered twice.
* Fixed a `java.lang.NoSuchMethodError` issue that affected a subset of publishers using Unity Ads SDK 4.9.3.                                                                                                                          |
| iOS          | - Added support for the Apple Privacy Manifest update to ensure publisher compliance with new App Store submission requirements.
- Fixed a crash that occurred when fetching token during initialization.
- Fixed an issue that occurred when network requests retry and the server responds with an error. |

> **Note:**
>
> iOS app publishers releasing or updating an app in the Apple App Store on April 1, 2024 or later will need to update to a minimum Xcode version 15, and minimum Target iOS 12.0. Refer to [Apple's Privacy updates for App Store submissions](https://developer.apple.com/news/?id=3d8a9yyh) for more information.

## Version 4.9.3 - released 2024-02-23

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed an error related to missing Android Privacy Sandbox classes that occurred when running R8.
* Fixed an `IllegalStateException` that occurred when calling `getVersion` before initializing the SDK.
* Fixed a crash that occurred when flushing queued diagnostic metrics.
* Fixed a build dependency issue that affected some publishers not using Gradle as the dependency management tool in SDK 4.9.2. |
| iOS          | - Fixed an issue with detecting location on certain iOS versions for devices used in China.                                                                                                                                                                                                                                                                                                                       |

## Version 4.9.2 - released 2023-11-08

| **Platform** | **Notes**                                                                         |
| ------------ | --------------------------------------------------------------------------------- |
| Android      | * No change.                                                                      |
| iOS          | - Fixed an issue when building with Xcode 15 and targeting iOS versions below 12. |

## Version 4.9.1 - released 2023-10-13

| **Platform** | **Notes**                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------ |
| Android      | * Fixed an issue with the `getToken` listener timing out and responding with a null token. |
| iOS          | - No change.                                                                               |

## Version 4.9 - released 2023-09-27

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Android      | * Added increased banner demand.
* Added support to test optional load flows which reduce the chance of timeout under high latency conditions.
* Fixed a bug so banner `no_fill` responses don't return as an internal error.
* Fixed an issue with the example app **banner hide** button.
* Fixed an issue with diagnostic metrics so they can now be sent.
* Fixed an issue with the exception handler re-throwing unhandled exceptions.
* Fixed an issue with a null pointer exception being thrown when an `AdUnityActivity` was destroyed. |
| iOS          | - Increased banner demand.
- Fixed a crash due to unimplemented delegate methods which should have been optional.
- Fixed an issue with diagnostic metrics so they can now be sent.                                                                                                                                                                                                                                                                                                                                                              |

## Version 4.8 - released 2023-06-27

| **Platform** | **Notes**                                                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Added the `onBannerShown` callback method so publishers using third-party mediation to get more accurate banner impression reporting.                                                                         |
| iOS          | - Added the `bannerViewDidShow` delegate method so publishers using third-party mediation to get more accurate banner impression reporting.
- Added a safeguard before setting orientations to prevent crashes. |

## Version 4.7.1 - released 2023-05-08

| **Platform** | **Notes**                                                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Fixed a change that required a newer `Gradle` build version to be used to build the Android project which was incompatible with the `Gradle` version shipped with current LTS Unity Editors. |
| iOS          | - Added a safety check for `viewId` to prevent exceptions that occur when deallocating a banner object.                                                                                        |

## Version 4.7.0 - released 2023-05-02

| **Platform** | **Notes**                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Android      | * Added Java 8 as a minimum requirement for adding the Unity Ads SDK to your project.
* Fixed a potential race condition in the `VolumeChange` internal listener. |
| iOS          | - No change.                                                                                                                                                      |

## Version 4.6.1 - released 2023-03-16

| **Platform** | **Notes**                   |
| ------------ | --------------------------- |
| iOS          | * Added Xcode 13 support.   |
| Android      | - Reduced network requests. |

> **Important:**
>
> Java 8+ targeting will be required in a future SDK release.

## Version 4.6.0 - released 2023-02-23

| **Platform** | **Notes**                                                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iOS          | * Updated the support library version to maintain demand performance.
* Optimized Swift performance.
* Improved the Banner life cycle performance.
* Fixed an issue to allow you to use a previous version of the Unity Ads SDK. |
| Android      | - Improved the Banner life cycle performance.
- Fixed a `NullPointerException` when Application Context is null for cached directory file path.                                                                                  |

## Version 4.5.0 - released 2022-12-19

> **Note:**
>
> Unity Ads has new dependencies from SDK version 4.5.0. Manually including the linked aar file will lead to runtime errors if dependencies are not properly resolved. It's recommended to use a package management system such as Gradle to handle dependency management. Refer to the [Android SDK integration steps](/grow/ads/android-sdk.md) for details.

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iOS          | * Reduced the number of requests that occur during initialization.
* Updated the request retry logic to be compatible under certain known error conditions.                                                                                                                                            |
| Android      | - Reduced the number of requests that occur during initialization.
- Introduced a dependency on Kotlin.
- Improved the handling of timers when dealing with the app being placed in the background.
- Fixed a crash that occurred during video playback when the Media Player was in an invalid state. |

## Version 4.4.2 - released 2023-03-29

> **Important:**
>
> This is the last planned package update for developers using Unity. Subsequent
> updates for the Unity Ads SDK are relevant only for iOS and Android
> developers.

| **Platform** | **Notes**                                                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Removed redirect pop-ups directing users to Unity Mediation.
* Fixed a `NullPointerException` when Application Context is null for cached directory file path. |

## Version 4.4.1 - released 2022-10-05

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Removed Test Mode from the Services window in versions of Unity 2020 and newer.
* Added batchmode check to the Unity Editor dialog popup.
* Renamed `Arial.ttf` to `LegacyRuntime.ttf` for Playmode support in the Unity Editor 2022.2 and newer.                                                                                                                                                |
| iOS          | - Generated game session ID and save to storage.
- Added `sdkVersion` and `sdkVersionName` to the minimal device reader.
- Used Swift through reflection in Objective-C.                                                                                                                                                                                                                           |
| Android      | * Added an experiment to remove required gestures for media playback.
* Generated `sessionID` the same way WebView does and save it to `unifiedconfig.data`.
* Fixed `ConfigurationReader` if no remote or local files are present.
* Fixed potential crash in Android 8.1 where the `TimeZone` API has issues.
* Removed false error log message when missing applied rule for experiment object. |

## Version 4.4.0 - released 2022-09-06

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unity        | * Fixed sample app anchors to work in horizontal.
* Updated the screen orientation API.
* Mediation migration copy changes.                                                                                                                                                                                                                                                                                                                |
| iOS          | - Added network performance improvements.                                                                                                                                                                                                                                                                                                                                                                                                  |
| Android      | * Added tags to the new `Load`/`Show` metric where missing to avoid being discarded.
* Aligned retry metric tags with iOS.
* Moved token type into `TokenListenerState` class.
* Inverted operation order to test if it was affecting the token latency metric.
* Fixed `BannerPosition` being obfuscated by ProGuard.
* Fixed potential concurrency in Signals Storage when signals are collected in parallel.
* Reverted Proguard rules. |

## Version 4.3.0 - released 2022-07-25

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unity        | * Removed toggle button from Project Settings Ads window.
* Fixed issue with the Project Settings window in the Unity Editor version 2022.1f1.                                                                                                                                                                                                                                                                                                                                                               |
| iOS          | - Published to Artifactory.
- Added support for additional identifiers for `SKOverlayAppConfiguration`.
- Fixed a crash related to `UADSTimer`.
- Fixed a bug that occurred when an ad was closed at the start of show when the `show failed` callback was fired.                                                                                                                                                                                                                                            |
| Android      | * Adjusted Proguard rules for obfuscation.
* Introduced Privacy request before configuration Request.
* Introduced `UnityAdsShowError.TIMEOUT` when not able to show under specified time frame.
* Fixed potential NPE when receiving null as purchase list for acquire optimization.
* Fixed `Load` and `Show` timeouts to be lifecycle aware
* Added metrics for retries in config and WebView.
* Fixed retry metric tags overriding others instead of merging.
* Removed the use of `setAppCacheEnabled`. |

## Version 4.2.1 - released 2022-05-11

| **Platform** | **Notes**                                 |
| ------------ | ----------------------------------------- |
| iOS          | * Fixed crash related to the `UADSTimer`. |
| Android      | - No change.                              |

## Version 4.2.0 - released 2022-05-06

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Added a Sample app.
* `Show Listener` now returns an appropriate callback state.
* Ensured callbacks are fired on the main thread.                                                                                                                                                                                  |
| iOS          | - Added a check for `AppDelegate supportedInterfaceOrientationsForWindow`.                                                                                                                                                                                                                                            |
| Android      | * Added optimization features to Unity Acquire.
* Improved the initialization time for token resolution requests.
* Fixed an issue with safety checks of possible null listeners.
* Fixed possible deadlock when using `GetToken` with a listener.
* Made minor improvements to string handling in `WebViewApp.java`. |

## Version 4.1.0 - released 2022-03-17

| **Platform** | **Notes**                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Fixed the issue of `IUnityAdsShowCallback` making duplicate calls in the Editor PlayMode.                                           |
| iOS          | - Added a callback for the `getToken` public API (beta).
- Improved token availability.                                               |
| Android      | * Added a callback for the `getToken` public API (beta).
* Improved token availability.
* Added `AD_ID` to the `AndroidManifest.xml`. |

## Version 4.0.1 - released 2022-02-02

| **Platform** | **Notes**                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unity        | * Fixed a crash that occurs when callback does not occur on the main thread.
* Fixed a crash that occurs when Unity Ads is included in a tvOS build.               |
| iOS          | - Fixed a crash that occurs when the SDK attempts to invoke a callback that is null.                                                                               |
| Android      | * Removed the ARCore dependency.
* Fixed a crash that occurred when using the Acquire Optimization feature.
* Removed the retrieval and the use of the Android ID. |

## Version 4.0.0 - released 2021-11-30

| **Platform** | **Notes**                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Fixed the GameID text fields breaking in Windows.
* Remove ENABLE\_EDITOR\_GAME\_SERVICES from the Top Menu in the Editor. |
| iOS          | - Fixed a crash that occurred when committing to metadata storage from multiple threads                                      |
| Android      | * Prevented a crash that occurred if Unity Ads was initialized with an empty activity.                                       |

## Version 3.7.5 - released 2021-07-20

| **Platform** | **Notes**                                                            |
| ------------ | -------------------------------------------------------------------- |
| Android      | * Fixed a crash that occurred when re-initializing with null GameID. |

## Version 3.7.3 - released 2021-05-26

| **Platform** | **Notes**                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Fixed a bug that caused the default placement to be unable to show.                                                                                             |
| iOS          | - Fixed a crash that occurred when `placementId` became null.
- Fixed a warning that displayed when trying to access UIKit from the background thread.            |
| Android      | * Fixed a crash related to `IllegalStateException` when showing an ad.
* Fixed an issue with attempting to load multiple ads at the same time causing load error. |

## Version 3.7.1 - released 2021-03-31

| **Platform** | **Notes**                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------ |
| iOS          | * Fixed the iOS memory consumption to decrease the chance of impact to device performance. |

## Version 3.7.0 - released 2021-03-19

| **Platform** | **Notes**                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Unity        | * Added callbacks for the `Show` method signature on public API.
* Improved the `Load` method callbacks to include an error message. |

## Version 3.6.2 - released 2020-12-10

| **Platform** | **Notes**                                                     |
| ------------ | ------------------------------------------------------------- |
| Android      | * Fixed a crash due to the `ConcurrentModificationException`. |

## Version 3.6.0 - released 2020-11-12

| **Platform** | **Notes**                             |
| ------------ | ------------------------------------- |
| iOS          | * Added experimental integration API. |
| Android      | - Added experimental integration API. |

## Version 3.5.1 - released 2020-11-05

| **Platform** | **Notes**                          |
| ------------ | ---------------------------------- |
| iOS          | * Updated support for SKAdNetwork. |

## Version 3.5.0 - released 2020-08-24

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Updated the Unity Ads SDK License.
* Fixed the `IUnityAdsListener` interface methods being called twice in some devices.                                                                                                                                                                                                                                        |
| iOS          | - Added the new background download WebView Update.
- Updated the Unity Ads SDK License.
- Fixed an issue with ads automatically closing when you press the **Done** button in StoreKit on iOS14.                                                                                                                                                                 |
| Android      | * Added the new background download WebView Update.
* Updated the Unity Ads SDK License.
* Updated the `targetSdkVersion` to 29.
* Fixed a bug with the AdUnit View not regaining focus after a system popup.
* Fixed an issue with the Android background audio not resuming after the ad is closed.
* Fixed an issue with end cards showing a blank white page. |

## Version 3.4.9 - released 2020-07-24

| **Platform** | **Notes**                                                             |
| ------------ | --------------------------------------------------------------------- |
| Unity        | * Fixed an error that occurred when working on unsupported platforms. |
| Android      | - Fixed a crash in the Android API level 30 with `getNetworkType`.    |

## Version 3.4.6 - released 2020-06-04

| **Platform** | **Notes**                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unity        | * Fixed an error for building on unsupported platforms in the Unity Editor 2020.1 and newer.
* Removed `UnityEditor.Advertisement.dll`.                |
| iOS          | - Fixed a crash that occurred when calling `addDelegate`.
- Fixed a bug of iOS ads not respecting mute.                                                |
| Android      | * Fixed an `InitializationState` Out of Memory crash.
* Fixed a GooglePlayStore rejection due to unsafe SSL.
* Fixed an Android `readFileBytes` crash. |

## Version 3.4.4 - released 2020-03-02

| **Platform** | **Notes**                                                            |
| ------------ | -------------------------------------------------------------------- |
| Unity        | * Fixed a missing reference to `UnityEngine.UI` in the Unity Editor. |

## Version 3.4.2 - released 2020-01-05

| **Platform** | **Notes**                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Fixed an issue of no error callback being called when an invalid GameID is used in PlayMode.                                                                 |
| iOS          | - Fixed an `onUnityAdsError` Exception: No such proxy method.
- Fixed `FatalException` from `BufferredInputStream.Read()` that occurs on some Android devices. |
| Android      | * Fixed `UnityAdsCopyString` and `NSStringFromIl2CppString` errors when building for debug.
* Fixed Banner is unexpectedly scaled when force landscape mode.   |

## Version 3.4.1 - released 2019-12-13

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Fixed an issue where callbacks would not fire in the Editor after running PlayMode more than once.
* Fixed an issue where the Editor canvas would not display on top of all other objects in the scene.
* Fixed an issue where the placeholder gameobject was visible in the user's scene. |
| Android      | - Fixed an issue where callbacks would not dispatch on Android devices.                                                                                                                                                                                                                      |

## Version 3.4.0 - released 2019-12-09

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Added a warning message in the Asset Store package to upgrade to packman.
* Restored `TestMode` flag from the Services window in Unity 2020.1 and newer.
* Deprecated the Monetization class.
* Fixed an issue in the Test ads in the Editor buttons that don't stop click event propagation.
* Fixed a bug where `OnUnityAdsReady` was only called once per placement when running in the Unity Editor.
* Fixed the Google Play crash reports for SDK 3.3.1.                                                 |
| iOS          | - Deprecated the Monetization class.
- Removed the example app for Monetization.
- Deprecated the initialize method with listener as a parameter in favor of initialize method without a listener.
- Fixed the iOS `isWiredHeadsetOn` memory leak.
- Fixed the iOS callback `unityAdsDidError` not being triggered when initialized with an invalid GameID.
- Fixed the app crash rate increasing after upgrading to SDK 3.3.0.
- Fixed the IronSource: count duplicated impressions caused by a third party.   |
| Android      | * Deprecated the Monetization class.
* Removed the example app for Monetization.
* Deprecated the initialize method with listener as a parameter in favor of initialize method without a listener.
* Fixed the Google / Admob app crashes in SDK 3.1.0.
* Fixed the Google Play crash reports for SDK 3.3.1.
* Fixed `Listener.sendErrorEvent`.
* Fixed a bug with reinitialization that always blocked for at least ten seconds.
* Fixed the IronSource: count duplicated impressions caused by a third party. |

## Version 3.3.0 - released 2019-09-26

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Fixed an issue where callbacks would not be executed on the main thread.
* Fixed an issue where calling `RemoveListener` in a callback would cause a crash.                                                                                                                                                                    |
| iOS          | - The UI WebView is deprecated. Due to the Apple iOS 13 update, Unity Ads no longer supports iOS 7 and 8.
- Added banner optimization through a new banner API, featuring the `UADSBannerView` class. This new API supports multiple banners in a single placement, with flexible positioning.
- Fixed an iOS 13 AppSheet crash. |
| Android      | * Added banner optimization through a new banner API, featuring the UADSBannerView class. This new API supports multiple banners in a single placement, with flexible positioning.
* Fixed the WebView `onRenderProcessGone` crash.                                                                                              |

## Version 3.2.0 - released 2019-07-22

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Added OMID viewability integration. Unity is now IAB certified with VAST viewability.
* Added an error message to the SDK notifying you to remove one instance of the SDK if you've installed both the package manager and Asset store versions of Unity Ads.
* Fixed an Android java proxy usage issue for Unity versions prior to 2017, resolving a multiple listeners crash. |
| iOS          | - Added OMID viewability integration. Unity is now IAB certified with VAST viewability.                                                                                                                                                                                                                                                                                           |
| Android      | * Added OMID viewability integration. Unity is now IAB certified with VAST viewability.                                                                                                                                                                                                                                                                                           |

## Version 3.1.1 - released 2019-05-16

| **Platform** | **Notes**                                                                                                                                                                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Added support for multiple listeners.
* Added `ASWebAuthenticationSession` support.
* Fixed errors from being thrown for Playstation and Xbox attempting to access `UnityAdsSettings` when building a Project that includes ads on other platforms.
* Moved Test mode resources folder to Editor-only scope. |
| iOS          | - Updated the iOS binaries to 3.1.0.
- Added support for multiple listeners.
- Updated so iOS volume change event to be captured properly.
- Fixed a `USRVStorage` json exception.
- Updated Analytics `onLevelUp` to take a string instead of an int.                                                         |
| Android      | * Updated the Android binaries to 3.1.0.
* Added support for multiple listeners.
* Fixed a Banner memory leak.
* Fixed `GetDeviceId` on Android SDK versions below 23.
* Updated Analytics `onLevelUp` to take a string instead of an int.
* Crash prevented in the `AdUnitActivity.onPause`.                  |

## Version 3.0.3 - released 2019-03-15

| **Platform** | **Notes**                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------- |
| Unity        | * Fixed a memory leak issue in the Unity Editor when using Unity Ads Banners in a project.   |
| iOS          | - Updated the iOS binaries.
- Fixed an uncaught exception for purchasing integration on iOS. |
| Android      | * Updated the Android binaries.                                                              |

## Version 3.0.2 - released 2019-02-26

| **Platform** | **Notes**                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Fixed a build issue for the Windows platform where an incorrect result was returned.
* Fixed a conflict between the Unity Ads package and the Moq framework. |
| iOS          | - Updated the iOS binaries.                                                                                                                                    |
| Android      | * Updated the Android binaries.                                                                                                                                |

## Version 3.0.1 - released 2019-01-25

| **Platform** | **Notes**                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------- |
| Unity        | * Integrated the Ads 3.0.1 SDK.                                                               |
| iOS          | - Added API for setting Banner positioning.
- Fixed various bugs identified in the 3.0.0 SDK. |
| Android      | * Updated the Android binaries.
* Fixed various bugs identified in the 3.0.0 SDK.             |

## Version 3.0.0 - released 2018-10-18

| **Platform** | **Notes**                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iOS          | * Added the Unity Monetization Platform.
* Added personalized placements.
* Added Banners.
* Added AR Ads.
* Fixed various bugs identified in the 2.3.0 SDK. |
| Android      | - Added the Unity Monetization Platform.
- Added personalized placements.
- Added Banners.
- Added AR Ads.
- Fixed various bugs identified in the 2.3.0 SDK. |

## Version 2.3.2 - released 2018-11-21

| **Platform** | **Notes**                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Integrated the Ads 2.3.0 SDK with Unity 2019.X.
* Fixed error with platform dependency to enable you to build on other platforms besides iOS or Android. |
| iOS          | - Fixed error in Xcode to enable you to build successful runs on the tvOS platform.                                                                        |

## Version 2.3.1 - released 2018-11-15

| **Platform** | **Notes**                                                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unity        | * Updated to Ads 2.3.0 SDK.
* Updated the multithreaded Request API.
* Updated the `SendEvent` API for Ads and IAP SDK communication.
* Added a new Unity integration. |

## Version 2.3.0 - released 2018-07-12

| **Platform** | **Notes**                                                              |
| ------------ | ---------------------------------------------------------------------- |
| iOS          | * Improved HTTP request handling.
* Fixed bugs and made optimizations. |
| Android      | - Improved HTTP request handling.
- Fixed bugs and made optimizations. |

## Version 2.2.1 - released 2017-04-23

| **Platform** | **Notes**                           |
| ------------ | ----------------------------------- |
| iOS          | * Fixed issues for iOS and Android. |
| Android      | - Fixed issues for iOS and Android. |

## Version 2.2.0 - released 2017-03-22

| **Platform** | **Notes**                                                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| iOS          | * Added IAP Promotion support.
* Improved cache handling.
* Increased the flexibility of showing different ad formats.
* Fixed several rare crashes. |
| Android      | - Added IAP Promotion support.
- Improved cache handling.
- Increased the flexibility of showing different ad formats.                               |
