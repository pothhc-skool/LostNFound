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

##Prototype

View the FSC L&F Prototype on Figma: [Sprint 1](https://www.figma.com/design/y0RLHV7CkEecTQxfpCZyuc/Sprint-1?node-id=0-1&t=WWqzANalACrKRzbF-1)


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

## Application Architecture

### Architecture Overview

The Lost & Found application uses a **client-server architecture** organized into three primary layers: the Presentation Layer, Application Layer, and Data Layer. This structure separates the user interface from the backend processing and database, making the application easier to maintain, expand, and secure.

### 1. Presentation Layer (Frontend)

The presentation layer is the interface students interact with when using the application. The frontend design is represented by our Figma prototype.

Users can:
- Create an account and log in.
- Report lost or found items.
- Upload pictures and descriptions of items.
- Search and browse reported items.
- View potential matches.
- Submit claims for items they believe belong to them.

The frontend communicates with the backend consistently on features such as these.

### 2. Application Layer (Backend)

The application layer handles the main business logic and processes requests received from the frontend.

Its responsibilities include:
- **User Authentication:** Managing user accounts and login verification.
- **Item Management:** Creating, updating, retrieving, and removing lost or found item reports.
- **Item Matching:** Comparing lost and found reports based on descriptions, categories, locations, and dates.
- **Claim Verification:** Processing ownership claims and supporting verification before an item is returned.
- **Notifications:** Alerting users when potential matches are identified.

The backend acts as the intermediary between the frontend and the database, ensuring that data is processed securely.

### 3. Data Layer (Database)

The data layer stores and manages the information required for the application to function.

A relational database such as this could store:

- **Users:** User IDs, names, email addresses, and authentication information.
- **Lost Items:** Item descriptions, categories, locations, dates, and report status.
- **Found Items:** Information about recovered items and their current status.
- **Claims:** Ownership requests, verification status, and associated users.
- **Notifications:** Alerts generated for users when potential matches are discovered.

Images could be stored separately in with their references maintained in the database.

### 4. Communication and Data Flow

The application follows a client-server communication model:

1. A student interacts with the Lost & Found application.
2. The frontend sends an HTTP request to the backend REST API.
3. The backend validates the request and performs the necessary operations.
4. The backend retrieves or updates information in the database.
5. The backend sends a response to the frontend.
6. The application displays the updated information to the student.

### 5. Security and Scalability

The proposed architecture includes several security considerations such as HTTPS communication, input validation, and role-based access control.

Separating the frontend, backend, and database also allows individual components to be maintained and expanded without redesigning the entire application.

### 6. Architecture Design Decision

A layered client-server architecture was selected because it provides a clear separation of responsibilities while remaining practical for a student software engineering project. It allows the development team to work on the frontend, backend, and database independently.

The main tradeoff is increased complexity compared with a simple application that combines all functionality into one component. However, the layered structure provides better maintainability, security, and flexibility as the Lost & Found application grows.

**Current Development Status:** The user interface has been designed in Figma. The backend, database, and API components described above represent the proposed implementation architecture.

