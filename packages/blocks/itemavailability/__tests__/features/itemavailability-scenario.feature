Feature: itemavailability

    Scenario: User navigates to itemavailability
        Given I am a User loading itemavailability
        When I navigate to the itemavailability
        Then itemavailability will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors