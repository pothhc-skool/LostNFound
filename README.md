# LostNFound 
Lost and Found FSC Project App

Team Members
- Henri Pothier
- Isaac Temitope Abolarinwa 
- Matthew Quintanilla
- Miguel Ventura
- Fatima Manzar
- Shatlyn Henriquez

Proposed Project Idea
- Lost and Found
  FSC L&F is a centralized campus application that is held specifically for Farmingdale State College that helps students, staff, and faculty report, search for, and recover lost items within the campus using an A.I development

  Epics:
1. Report a lost item with descriptions of said items, with specific descriptions based on item category (Electronics, phones, clothing, school supplies, keys, ID Cards, etc.)
2. Searching and filtering listings by date, category, location and time it was lost or found, keywords pertaining to said lost and found item.
3. Use ai to sort through the lost reports and found reports to locate possible matches, using campus security or campus police to verify claims via information provided or to contact individuals to confirm claims.
4. Hold a weekly notification post of a lost item that has remained lost for a significant amount of time (Push notification would note an item lost approximately 8 months ago)
5. Location based item reporting


Test Plan Overview

Our testing approach for FSC L&F covers two categories which are unit and integration testing. They both make sure the individual features work on their own correctly to support the lost and found process for students and campus security.

Unit Testing
Unit tests check the functionality of our site.
Lost and Found report forms have required fields like item name, category, location, date and keywords. Any invalid inputs are rejected so the forms are straight to the point.
Search and filtering results by their specific categories, locations, date and time with other keywords.
Status tracking shows reports through stages like reported, possible match, under verification, ready for pickup, and returned.
Items that are past a semester date are automatically flagged for a weekly notification and are put into the archives.

Integration Testing
Integration tests check that separate parts of the site all work together.
Report submissions and database are an example in which the moment a form is submitted it appears on the students account and gives it to the ai to find possible matches.
Claims and campus security can see students forms or claiming items that are theirs which appear in their list of ai matches.
User accounts and permissions are separate so a student cannot see other forms or see every listing of any item on the site.
