package com.countrypicker.countrylocale

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableArray
import com.facebook.react.turbomodule.core.interfaces.TurboModule

/**
 * Abstract base class for CountryLocale TurboModule.
 * This class is the base for both the new architecture (TurboModule) and old architecture.
 */
abstract class NativeCountryLocaleSpec(reactContext: ReactApplicationContext) :
    com.facebook.react.bridge.ReactContextBaseJavaModule(reactContext), TurboModule {

    abstract fun getCountry(): String
    abstract fun getLocales(): WritableArray
}
