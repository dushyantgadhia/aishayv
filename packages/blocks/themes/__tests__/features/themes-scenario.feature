Feature: themes

    Scenario: User navigates to themes
        Given I am a User loading themes
        When I navigate to the themes
        Then themes will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors