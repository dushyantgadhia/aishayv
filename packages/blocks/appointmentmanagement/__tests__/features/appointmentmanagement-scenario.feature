Feature: appointmentmanagement

    Scenario: User navigates to appointmentmanagement
        Given I am a User loading appointmentmanagement
        When I navigate to the appointmentmanagement
        Then appointmentmanagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors