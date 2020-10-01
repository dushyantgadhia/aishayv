Feature: emailnotifications

    Scenario: User navigates to emailnotifications
        Given I am a User loading emailnotifications
        When I navigate to the emailnotifications
        Then emailnotifications will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors