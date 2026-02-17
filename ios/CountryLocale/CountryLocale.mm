#import "CountryLocale.h"
#import <React/RCTUtils.h>

@implementation CountryLocale

RCT_EXPORT_MODULE()

// Set of RTL languages
static NSSet<NSString *> *rtlLanguages;

+ (void)initialize {
    if (self == [CountryLocale class]) {
        rtlLanguages = [NSSet setWithArray:@[
            @"ar", @"ckb", @"fa", @"he", @"ks", @"lrc", @"mzn", @"ps", @"sd", @"ug", @"ur", @"yi"
        ]];
    }
}

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (NSString *)getScriptCode:(NSLocale *)locale {
    NSString *scriptCode = [locale objectForKey:NSLocaleScriptCode];
    if (scriptCode != nil) {
        return scriptCode;
    }
    
    // Try to extract from language tag
    NSString *languageTag = [locale localeIdentifier];
    NSArray *components = [languageTag componentsSeparatedByString:@"-"];
    if (components.count >= 2) {
        NSString *potential = components[1];
        // Script codes are 4 characters (e.g., "Hans", "Hant")
        if (potential.length == 4 && [[NSCharacterSet letterCharacterSet] isSupersetOfSet:
            [NSCharacterSet characterSetWithCharactersInString:potential]]) {
            return potential;
        }
    }
    
    return nil;
}

- (BOOL)isRTLLanguage:(NSLocale *)locale {
    NSString *languageCode = [locale objectForKey:NSLocaleLanguageCode];
    
    // Check if language is in RTL set
    if ([rtlLanguages containsObject:languageCode]) {
        return YES;
    }
    
    // Use system's character direction detection
    NSLocaleLanguageDirection direction = [NSLocale characterDirectionForLanguage:languageCode];
    return direction == NSLocaleLanguageDirectionRightToLeft;
}

- (NSDictionary *)localeToDict:(NSLocale *)locale {
    NSString *languageCode = [locale objectForKey:NSLocaleLanguageCode] ?: @"";
    NSString *countryCode = [locale objectForKey:NSLocaleCountryCode] ?: @"";
    NSString *scriptCode = [self getScriptCode:locale];
    
    // Build language tag
    NSString *languageTag;
    if (scriptCode != nil && countryCode.length > 0) {
        languageTag = [NSString stringWithFormat:@"%@-%@-%@", languageCode, scriptCode, countryCode];
    } else if (countryCode.length > 0) {
        languageTag = [NSString stringWithFormat:@"%@-%@", languageCode, countryCode];
    } else if (scriptCode != nil) {
        languageTag = [NSString stringWithFormat:@"%@-%@", languageCode, scriptCode];
    } else {
        languageTag = languageCode;
    }
    
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:@{
        @"languageCode": languageCode,
        @"countryCode": countryCode,
        @"languageTag": languageTag,
        @"isRTL": @([self isRTLLanguage:locale])
    }];
    
    if (scriptCode != nil) {
        dict[@"scriptCode"] = scriptCode;
    }
    
    return [dict copy];
}

/**
 * Synchronous method to get the user's country code.
 * 
 * This implementation works for BOTH architectures:
 * - New Architecture (TurboModules): The method signature matches NativeCountryLocaleSpec protocol.
 *   TurboModules call this method directly via JSI.
 * - Old Architecture (Bridge): RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD registers the method
 *   with the bridge and creates the implementation.
 *
 * Note: RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD creates a method returning `id`, but this is
 * compatible with the TurboModule spec expecting `NSString *` due to Objective-C's type system.
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getCountry) {
    NSLocale *currentLocale = [NSLocale currentLocale];
    NSString *countryCode = [currentLocale objectForKey:NSLocaleCountryCode];
    
    if (countryCode == nil) {
        // Fallback: try to get from preferred languages
        NSArray<NSString *> *preferredLanguages = [NSLocale preferredLanguages];
        if (preferredLanguages.count > 0) {
            NSLocale *locale = [[NSLocale alloc] initWithLocaleIdentifier:preferredLanguages[0]];
            countryCode = [locale objectForKey:NSLocaleCountryCode];
        }
    }
    
    // Handle Latin American regional settings (419 is not a valid country code)
    if ([countryCode isEqualToString:@"419"]) {
        return @"UN";
    }
    
    return countryCode ?: @"US"; // Default to US if still nil
}

/**
 * Synchronous method to get the user's preferred locales.
 * Works for both New Architecture and Old Architecture (see getCountry comments above).
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getLocales) {
    NSMutableArray *locales = [NSMutableArray array];
    NSArray<NSString *> *preferredLanguages = [NSLocale preferredLanguages];
    
    for (NSString *languageTag in preferredLanguages) {
        NSLocale *locale = [[NSLocale alloc] initWithLocaleIdentifier:languageTag];
        [locales addObject:[self localeToDict:locale]];
    }
    
    return [locales copy];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCountryLocaleSpecJSI>(params);
}
#endif

@end
