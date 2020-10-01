Feature: housepricesarviewer

    Scenario: User navigates to housepricesarviewer
        Given I am a User loading housepricesarviewer
        When I navigate to the housepricesarviewer
        Then housepricesarviewer will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors