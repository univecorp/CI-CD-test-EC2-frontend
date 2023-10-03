# Available Scripts
Unive [unive](http://13.232.49.214:3000/).



# Installation

### For Windows,
* with this command, **npm install --global yarn.**  
* check the version in command prompt using, **yarn --v**  

### For Mac,
* Open a terminal window on your Mac.
* Install Homebrew, which is a package manager for macOS, by running the following command
* /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
* Once Homebrew is installed, you can install Yarn by running the following command
* **brew install yarn**
 

# Run unive in your machine

* Firstly, use **git clone** command to clone the repository.
* secondly, use **yarn install**
* using yarn dev to run the project.
* you can run the app locally at  **http://localhost:5173/**
* This URL will generate automatically in your terminal when you write the **yarn dev**.

# For the Build

* Using **yarn run build**


# API Documentation

* Using Postman for the Api Documentation

* Link: https://planetary-water-952643.postman.co/workspace/6313efea-db3f-4959-94d0-71d1f6a826fa

# Features

## Course

 * **Users/Learners** can view courses on the client side.
 * They can purchase a course that is suitable for them.
 * If a user is not registered, they need to register or log in first.
 * Otherwise, they can't view the course details.
 

 ## Authorization
 * We have only One super Admin he can manage all other admin,instructors and others
 * Admin can manage **Instructors** and **Recruiters** also learners.
 * Any **Instructor** can post a course, and the admin needs to approve it.
 * **Recruiters** can post the jobs with the approval of Admin.

 ## Authentication
 
 * JWT is using for the authentication.
 * After successful registration, users need to verify their account.
 * An email will be sent to the user's email address for email verification.
 * Users can reset their password and update their password.

 ## Backend Github Repo 

 Link Here: **https://github.com/univebd/univedb/tree/1.3**