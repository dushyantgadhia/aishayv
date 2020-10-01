# **React Native** | _**OPLUS1**_ | _**148**_

## NOTE FOR DEVELOPERS:
Clone the code-engine branch into your working branch. The contents of the branch may get overwritten.
## Author:
Code-Engine
## Keywords:
 - OPLUS1
 - mobile
## Assembled Blocks:
 - Blockname: email-account-login, Path: packages/blocks/email-account-login 
 - Blockname: email-account-registration, Path: packages/blocks/email-account-registration 
 - Blockname: country-code-selector, Path: packages/blocks/country-code-selector 
 - Blockname: forgot-password, Path: packages/blocks/forgot-password 
 - Blockname: otp-input-confirmation, Path: packages/blocks/otp-input-confirmation 
 - Blockname: housepricesarviewer, Path: packages/blocks/housepricesarviewer 
 - Blockname: searchengineoptimisationseo, Path: packages/blocks/searchengineoptimisationseo 
 - Blockname: themes, Path: packages/blocks/themes 
 - Blockname: appointmentmanagement, Path: packages/blocks/appointmentmanagement 
 - Blockname: calendar, Path: packages/blocks/calendar 
 - Blockname: paymentadmin, Path: packages/blocks/paymentadmin 
 - Blockname: catalogue, Path: packages/blocks/catalogue 
 - Blockname: payments, Path: packages/blocks/payments 
 - Blockname: emailnotifications, Path: packages/blocks/emailnotifications 
 - Blockname: dashboard, Path: packages/blocks/dashboard 
 - Blockname: profilebio, Path: packages/blocks/profilebio 
 - Blockname: filteritems, Path: packages/blocks/filteritems 
 - Blockname: pushnotifications, Path: packages/blocks/pushnotifications 
 - Blockname: reviews, Path: packages/blocks/reviews 
 - Blockname: salesreporting, Path: packages/blocks/salesreporting 
 - Blockname: scheduling, Path: packages/blocks/scheduling 
 - Blockname: itemavailability, Path: packages/blocks/itemavailability 
 - Blockname: shoppingcart, Path: packages/blocks/shoppingcart 
 - Blockname: languageoptions, Path: packages/blocks/languageoptions 
 - Blockname: location, Path: packages/blocks/location 
 - Blockname: multiplecurrencysupport, Path: packages/blocks/multiplecurrencysupport 
## Assembled Features To Block Status:
 - FeatureName: email-login, Status: Non-Empty
   * Blockname: email-account-login, Path: packages/blocks/email-account-login
   * Blockname: email-account-registration, Path: packages/blocks/email-account-registration
   * Blockname: country-code-selector, Path: packages/blocks/country-code-selector
   * Blockname: forgot-password, Path: packages/blocks/forgot-password
   * Blockname: otp-input-confirmation, Path: packages/blocks/otp-input-confirmation
 - FeatureName: house-prices-ar-viewer, Status: Empty
   * Blockname: housepricesarviewer, Path: packages/blocks/housepricesarviewer
 - FeatureName: search-engine-optimisation-seo, Status: Empty
   * Blockname: searchengineoptimisationseo, Path: packages/blocks/searchengineoptimisationseo
 - FeatureName: themes, Status: Empty
   * Blockname: themes, Path: packages/blocks/themes
 - FeatureName: appointment-management, Status: Empty
   * Blockname: appointmentmanagement, Path: packages/blocks/appointmentmanagement
 - FeatureName: calendar, Status: Empty
   * Blockname: calendar, Path: packages/blocks/calendar
 - FeatureName: payment-admin, Status: Empty
   * Blockname: paymentadmin, Path: packages/blocks/paymentadmin
 - FeatureName: catalogue, Status: Empty
   * Blockname: catalogue, Path: packages/blocks/catalogue
 - FeatureName: payments, Status: Empty
   * Blockname: payments, Path: packages/blocks/payments
 - FeatureName: email-notifications, Status: Empty
   * Blockname: emailnotifications, Path: packages/blocks/emailnotifications
 - FeatureName: dashboard, Status: Empty
   * Blockname: dashboard, Path: packages/blocks/dashboard
 - FeatureName: profile-bio, Status: Empty
   * Blockname: profilebio, Path: packages/blocks/profilebio
 - FeatureName: filter-items, Status: Empty
   * Blockname: filteritems, Path: packages/blocks/filteritems
 - FeatureName: push-notifications, Status: Empty
   * Blockname: pushnotifications, Path: packages/blocks/pushnotifications
 - FeatureName: reviews, Status: Empty
   * Blockname: reviews, Path: packages/blocks/reviews
 - FeatureName: sales-reporting, Status: Empty
   * Blockname: salesreporting, Path: packages/blocks/salesreporting
 - FeatureName: scheduling, Status: Empty
   * Blockname: scheduling, Path: packages/blocks/scheduling
 - FeatureName: item-availability, Status: Empty
   * Blockname: itemavailability, Path: packages/blocks/itemavailability
 - FeatureName: shopping-cart, Status: Empty
   * Blockname: shoppingcart, Path: packages/blocks/shoppingcart
 - FeatureName: language-options, Status: Empty
   * Blockname: languageoptions, Path: packages/blocks/languageoptions
 - FeatureName: location, Status: Empty
   * Blockname: location, Path: packages/blocks/location
 - FeatureName: multiple-currency-support, Status: Empty
   * Blockname: multiplecurrencysupport, Path: packages/blocks/multiplecurrencysupport

## AWS BACKEND DEPLOYMENT URL
 - BaseURL exported as: "https://oplus1-35789-ruby.35789.dev.ap-southeast-1.aws.svc.builder.ai"

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

See docs folder for additional information.

### Prerequisites

What things you need to install the software and how to install them

* React Native (last tested on react-native0.61.3)  - https://facebook.github.io/react-native/docs/getting-started

* IFF brew is installed and user doesn't have permisions.
```

  $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"

  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```


* XCode 11 or greater

* XCode Command Line Tools
```

  $ xcode-select --install

```


* Android SDK
```

  $ brew cask install android-sdk

```


* JDK 11
```

  $ brew tap homebrew/cask-versions

  $ brew cask install java

  $ brew cask install java11

```


### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn
```

  $ brew install yarn

```


Install node


```

  $ brew install node

```


Web
```

  $ yarn

  $ yarn workspace web start 
  (Note: After udpating depencies run again if no cocde erros. )
```


iOS
```

  $ yarn

  $ cd packages/mobile/ios && pod install && cd ../../../ && npx react-native bundle --entry-file ./packages/mobile/index.js --platform ios --dev true --bundle-output ./packages/mobile/ios/main.jsbundle && yarn ios

```


Android - https://docs.expo.io/versions/latest/workflow/android-studio-emulator/
```

  $ yarn

  $ export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version; export ANDROID_HOME=${HOME}/Library/Android/sdk; export PATH=${PATH}:${ANDROID_HOME}/emulator && yarn android

```


## Running the tests


```

  $ yarn test

```




## CI/CD Details

We use CircleCI/Codefresh/GitlabCI for our deployment/Build pipelines

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).





