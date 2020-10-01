Feature: languageoptions

    Scenario: User navigates to languageoptions
        Given I am a User loading languageoptions
        When I navigate to the languageoptions
        Then languageoptions will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors