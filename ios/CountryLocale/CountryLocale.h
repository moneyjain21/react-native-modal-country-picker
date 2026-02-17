#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <CountryLocaleSpec/CountryLocaleSpec.h>

@interface CountryLocale : NSObject <NativeCountryLocaleSpec>
#else
@interface CountryLocale : NSObject <RCTBridgeModule>
#endif

@end
