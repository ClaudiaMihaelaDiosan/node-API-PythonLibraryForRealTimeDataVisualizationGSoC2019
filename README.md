# node-API-PythonLibraryForRealTimeDataVisualizationGSoC2019

## __Welcome to the Node.js API from Python Library For Real Time Data Visualization project__



This Node.js API is composed by 3 main models: Homeless, Donors and Volunteers and contains CRUD (Create Read Update Delete) operations for each model.

This API is used with the next applications, three of them making part from the same project:

 * [Vuejs Web Interface](https://github.com/LiquidGalaxyLAB/Python-library-for-real-time-data-visualization----Web-Interface)
 
 * [Social Care Android Application](https://github.com/LiquidGalaxyLAB/Python-library-for-real-time-data-visualization--SocialCare-Android-App)
 
 
 
 ## __Google Summer Of Code 2019__
 
<p align="center"> 
 <img width="460" height="300" src="https://i.ibb.co/6YRpnjS/google-summer-of-code-2016.png">
</p>

This project is developed in a context of a scolarship in the program Google Summer Of Code 2019.
If you want to see all my experience here is [MY WORKLOG](https://docs.google.com/document/d/1V9TZTECHCCe-VXC95t71uiPQfWrQ5vkXqKbgOuxqiqo/edit?usp=sharing) where I wrote every day about my experience and issues.
 


 ## __Wiki__
 
 You can find all the development process and more information about this project on the [Wiki](https://github.com/LiquidGalaxyLAB/PythonLibraryForRealTimeDataVisualizationGSoC2019--API-nodeJs/wiki) 
 
 ## __Prerequisites__
 
 * [Ubuntu 16.04](http://releases.ubuntu.com/16.04/)
 * [Node.js](https://nodejs.org/en/)
 * [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
 * [Postman](https://www.getpostman.com/downloads/)
 
 ## __Getting Started__
 
 The easiest way to get started is to clone the repository:
 ```
 # Get the latest version
 git clone https://github.com/LiquidGalaxyLAB/PythonLibraryForRealTimeDataVisualizationGSoC2019--API-nodeJs.git 
 
 #go to content folder
 cd PythonLibraryForRealTimeDataVisualizationGSoC2019--API-nodeJs
 
 #before executing the code, make sure that the mongoDB server is running
 sudo service mongod start
 
 #execute node to run
 node server.js
 
 #if some package is missing install it with the fllow command
 npm install [package_name] --save
 
 #update project after installing package
 npm install -g npm
 
 # Open one browser and go to this URL
 localhost:3000
 ```
 
 
  ## __License__
  
 This Node.js API is used to make CRUD operations with three specific models, in order to use this data into a Web Interface and an Android Application to display the data into the Liquid Galaxy.

Copyright (C) 2019 Mihaela Claudia Diosan

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.


 

 
