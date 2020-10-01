Feature: dashboard

    Scenario: User navigates to dashboard
        Given I am a User loading dashboard
        When I navigate to the dashboard
        Then dashboard will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors