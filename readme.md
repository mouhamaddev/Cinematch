----Movie Recommendation System App Documentation
Overview

The Movie Recommendation System App is a mobile application developed using React Native for the frontend and Python for the machine learning backend. The app provides personalized movie recommendations based on user preferences and historical data. It utilizes various machine learning algorithms to analyze user behavior and generate accurate recommendations. The backend is built with Django, and it is hosted on AWS. Docker is used to containerize the application for easy deployment and scalability. The documentation provides an overview of the app's functionalities, the knowledge gained during development, and instructions on how to set up and use the app.
Functionality

--

The Movie Recommendation System App offers the following features:

    User Registration and Login: Users can create an account or log in to an existing account to access personalized movie recommendations.
    Movie Recommendations: Based on user preferences and historical data, the app generates a list of movie recommendations tailored to each user. These recommendations are presented in a user-friendly interface.
    Comparison of Algorithms: The app implements multiple machine learning algorithms for recommendation generation. The performance of these algorithms is compared to select the most accurate and efficient one for generating recommendations.
    Docker Integration: Docker is used to containerize the app, providing easy deployment and scalability options.
    APK Generation: The app can be built into an APK file for installation on Android devices.

--

Knowledge Gained

During the development of the Movie Recommendation System App, the following key knowledge and skills were acquired:

    Hosting Django App on AWS: The process of deploying a Django application on AWS was learned, allowing the app to be accessible to users over the internet.
    CORS Implementation: Cross-Origin Resource Sharing (CORS) was used to establish a connection between the React Native frontend and the Django backend, enabling seamless communication between the two.
    Machine Learning Recommendation Systems: The development of a recommendation system using machine learning techniques was explored. Different algorithms were implemented, and their performance was evaluated and compared.
    Docker Usage: Docker was employed to containerize the application, simplifying the deployment process and ensuring consistent behavior across different environments.
    APK Generation: The steps to generate an APK file from the React Native project were learned, enabling the installation of the app on Android devices.







Instructions
Django Setup:

    Install the required dependencies by running the following command:

pip install virtualenv

Navigate to the project directory:

bash

cd project

Create a virtual environment:

bash

virtualenv env

Activate the virtual environment:

    For Windows:

    bash

env\Scripts\activate

For macOS/Linux:

bash

    source env/bin/activate

Install the project dependencies:

pip install -r requirements.txt

Start the Django development server:

    python manage.py runserver

React Native Setup:

    Install Node.js and npm (Node Package Manager) if not already installed.
    Navigate to the React Native project directory.
    Install the required dependencies by running the following command:

npm install

Start the React Native development server:

    For iOS:

    arduino

npx react-native run-ios

For Android:

arduino

        npx react-native run-android

Please note that additional setup steps may be required for specific development environments, such as configuring Android SDK for Android development. Refer to the React Native documentation for detailed instructions.
Conclusion

The Movie Recommendation System App combines the power of React Native, Django, and machine learning to deliver personalized movie recommendations to users. By following the provided instructions, you can set up and run the app on your development environment. Enjoy exploring the world of movies with this recommendation system!