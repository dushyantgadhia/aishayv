Feature: catalogue

    Scenario: User navigates to catalogue
        Given I am a User loading catalogue
        When I navigate to the catalogue
        Then catalogue will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors