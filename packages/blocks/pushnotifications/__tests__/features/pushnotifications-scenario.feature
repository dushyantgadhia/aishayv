Feature: pushnotifications

    Scenario: User navigates to pushnotifications
        Given I am a User loading pushnotifications
        When I navigate to the pushnotifications
        Then pushnotifications will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors