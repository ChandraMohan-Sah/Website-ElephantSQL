---------------------------------------------------------------------------------------------------------
Key FEATURES ON THIS PROJECT 

1. Form Validation 
	-Email (check email)
	-Phone (checks 10 digit number or not)
	-Name (checks if characters and spaces only provided )

2. Checks if email or phone number already exists .

3. Retrive data from database and displays in Frontent.

4. Edit for Name and Email 

5. Delete User

6. Search User by name or Email


---------------------------------------------------------------------------------------------------------
1.Install Package For creating Virtual Environment
	
	a)For (Linux or Mac):
		.Install nvm(Node Version Manager):
			curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
		
		.Run the following command to load nvm:
			source ~/.bashrc	
		
		.Verify the installation by running the following command:
			nvm --version
		
	b) (Windows)
		.Install nvm(Node Version Manager):
			iex (iwr https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.ps1)
		
		.Verify the installation by running the following command:
			nvm --version
	
	Why nvm?
		nvm allows you to manage multiple Node.js versions and create isolated environments for your projects. 
		Here's how you can create a virtual environment using nvm:


2.Creating Virtual Environment

	1.Use nvm to install the desired version of Node.js. For example, if you want to use Node.js version 14.x, you can run the following command:
		nvm install 14
	
	2.Initialize a new Node.js project by running the following command:
		npm init -y
	
	3.Install the required packages for your project. For example, if you need Express and pg, run the following command:
		npm install express pg
		
		This command will install the required packages and their dependencies in the node_modules directory within your project.

		At this point, you have created a virtual environment for your Node.js project using nvm and installed the necessary packages using npm. You can now start developing your project and run the necessary scripts as needed.

		Remember that nvm allows you to switch between different Node.js versions and create isolated environments for each project. To activate the virtual environment for your project, you can use the nvm use command followed by the desired Node.js version. 


	4.Activate virtual environment
		nvm use 14

		This ensures that your project uses the specified Node.js version and its associated packages installed in the project directory.


3. Directory Heirarchy inside VS Code:
	Project_Folder:
		- node_modules (Folder)	//this folder is automatically created during installation of Express
		- public (Folder)
			-index.html
			-style.css
			-script.js
			-images.avif

		//these files  are automatically created during installation of pg
		-package-lock.json(file)
		-package.json(file)

	During the installation of Express, a node_modules folder is automatically created in your project directory. This folder contains all the dependencies and modules required by Express and its associated packages. The node_modules folder is created when you run the npm install command to install Express and any other dependencies specified in your project's package.json file.

	Express is a minimal and flexible web application framework for Node.js, designed for building web applications and APIs.

	It provides a simple and intuitive way to handle HTTP requests, define routes, manage middleware, and render views.


4.Setting Up ElephantSQL

	1.Create account

	2.Create table named 'users' inside database.
		CREATE TABLE users (
		  id SERIAL PRIMARY KEY,
		  name VARCHAR(255),
		  email VARCHAR(255),
		  phone VARCHAR(10)
		);
	
	3.Note Down : URL from Detail section in ELephantSQL.
			This URL allows you to connect to ElephantSQL .
			Paste the url in server.js file inside connectionString: variable


5. write code for index.html , style.css, script.js , server.js	

6. Runserver using the command:
	node server.js

7. Provide data into html template and click 'submit' button.
	if success :" Data will be posted and Fetched from server and displayed on Frontent "

8. GO to ElephantSql 
	-Click on Browser:
	-Write Query:
		SELECT *FROM users;
	-You can see the data in the table
