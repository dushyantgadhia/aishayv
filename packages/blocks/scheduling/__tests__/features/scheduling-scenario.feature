Feature: scheduling

    Scenario: User navigates to scheduling
        Given I am a User loading scheduling
        When I navigate to the scheduling
        Then scheduling will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors