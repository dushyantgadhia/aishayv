Feature: multiplecurrencysupport

    Scenario: User navigates to multiplecurrencysupport
        Given I am a User loading multiplecurrencysupport
        When I navigate to the multiplecurrencysupport
        Then multiplecurrencysupport will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors