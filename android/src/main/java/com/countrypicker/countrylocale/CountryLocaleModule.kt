package com.countrypicker.countrylocale

import android.content.res.Configuration
import android.os.LocaleList
import android.text.TextUtils
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule
import java.util.Locale

@ReactModule(name = CountryLocaleModule.NAME)
class CountryLocaleModule(reactContext: ReactApplicationContext) :
    NativeCountryLocaleSpec(reactContext) {

    companion object {
        const val NAME = "CountryLocale"

        // Characters that indicate right-to-left languages
        private val RTL_SCRIPTS = setOf(
            "Arab", "Hebr", "Thaa", "Nkoo", "Syrc", "Samr", "Mand", "Adlm"
        )

        private val RTL_LANGUAGES = setOf(
            "ar", "ckb", "fa", "he", "ks", "lrc", "mzn", "ps", "sd", "ug", "ur", "yi"
        )
    }

    override fun getName(): String = NAME

    override fun getCountry(): String {
        val locale = getCurrentLocale()
        val countryCode = locale.country

        // Handle Latin American regional settings (419 is not a valid country code)
        return if (countryCode == "419") "UN" else countryCode
    }

    override fun getLocales(): WritableArray {
        val locales = Arguments.createArray()
        val localeList = getDeviceLocales()

        for (i in 0 until localeList.size()) {
            val locale = localeList.get(i)
            locales.pushMap(createLocaleMap(locale))
        }

        return locales
    }

    private fun getCurrentLocale(): Locale {
        val localeList = getDeviceLocales()
        return if (localeList.isEmpty) Locale.getDefault() else localeList.get(0)
    }

    private fun getDeviceLocales(): LocaleList {
        val configuration: Configuration = reactApplicationContext.resources.configuration
        return configuration.locales
    }

    private fun createLocaleMap(locale: Locale): WritableMap {
        val map = Arguments.createMap()

        map.putString("languageCode", locale.language)
        map.putString("countryCode", locale.country)
        map.putString("languageTag", locale.toLanguageTag())
        map.putBoolean("isRTL", isRTL(locale))

        // Add script code if available
        val script = locale.script
        if (!TextUtils.isEmpty(script)) {
            map.putString("scriptCode", script)
        }

        return map
    }

    private fun isRTL(locale: Locale): Boolean {
        // First check by script
        val script = locale.script
        if (!TextUtils.isEmpty(script)) {
            return RTL_SCRIPTS.contains(script)
        }

        // Fall back to checking language
        val language = locale.language
        if (RTL_LANGUAGES.contains(language)) {
            return true
        }

        // Use Android's built-in RTL detection as final fallback
        val layoutDirection = TextUtils.getLayoutDirectionFromLocale(locale)
        return layoutDirection == View.LAYOUT_DIRECTION_RTL
    }
}
