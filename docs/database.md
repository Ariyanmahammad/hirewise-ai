# Database Design

Database Name: hirewise

## User Collection

Collection Name: users

### Fields

## User Schema

| Field      | Type   | Description              |
|:-----------|:-------|:-------------------------|
| **name**   | String | User's full name         |
| **email**  | String | User's email address     |
| **password** | String | Hashed password        |
| **role**   | String | Either `admin` or `candidate` |
| **phone**  | String | User phone number        |
| **createdAt** | Date | Account creation time   |
| **updatedAt** | Date | Last update time        |

## Upcoming Collections

- jobs
- applications
- interviews