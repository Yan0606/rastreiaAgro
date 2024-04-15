# RastreiaAgro
<div align="center">
  <p align="center">
    <a href="https://skillicons.dev">
      <img src="https://skillicons.dev/icons?i=nodejs,firebase" />
    </a>
</div>

This is a GitHub repository for a project developed on Node.js and Firebase. The project aims to perform basic CRUD (Create, Read, Update and Delete) operations on a database. The main entities in the database are Farmer, Crop, Machine, Product, and Property.

## Features
- Data logging for Farmer, Crop, Machine, Product and Property.
- Updating existing data.
- Deletion of records.
  
## Prerequisites
To run the project locally, you'll need to have:
- Node.js
- Firebase account
- Visual Studio Code (or any code editor you prefer)

## Execution Instructions
1. Clone the repository to your local machine:
  ```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
````

2. Navigate to the project directory:
  ```bash
cd nome-do-repositorio
````

3. Install the project dependencies:
  ```bash
npm install
```

4. Set up your Firebase credentials:
Make sure you have a 'serviceAccountKey.json' file with your Firebase project credentials. You can get it from your Firebase Console account.


5. Run the project:
  ```bash
node app.js
````

This will start the server locally, and you will be able to access the CRUD functionalities through the routes defined in the project.
