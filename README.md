# Site Explorer Project

This project is a **Site Explorer** web application built using **React**, **TypeScript**. It features filtering, pagination, and carousel functionalities, all designed to enhance the user experience when exploring a large number of sites.

## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Testing](#testing)
- [Challenges](#challenges)

## Installation

To get started, clone the repository and install the necessary dependencies.

git clone https://github.com/Nourakab/site-explorer.git
cd site-explorer
npm install
Start the development server:
npm start
Build the project for production:
npm run build

### Usage

Once the server is running, you can access the application by navigating to http://localhost:3000 in your browser.

## Technologies Used

React - Frontend library
TypeScript - Typed JavaScript
Jest - For unit and integration testing
React Testing Library - For testing React components
CSS Modules - For scoped styling

## Features

Filter Options: Users can filter sites by tags, date range, type, etc.
Sorting: Sort by different fields such as title, date created, etc.
Filter by Date and Tags: Users can filter the displayed sites by date, renovation status (new, old, renovated), or type (individual, company, state).
Pagination: Efficient navigation through thousands of sites with dynamic pagination.
Image Carousel: A carousel that allows users to view multiple images per site.
Responsive Design: Optimized for both desktop and mobile devices.

## Testing

This project uses Jest and React Testing Library for unit testing.

To run the tests:
npm test

Tests are located in the src/**tests**/ folder.

## Challenges

Jest Configuration for TypeScript and CSS Modules
Issue: Configuring Jest to work seamlessly with TypeScript and CSS modules was challenging. I encountered multiple errors, including missing module imports and syntax errors related to CSS files.
Solution: I added ts-jest as a transformer to handle TypeScript, and used moduleNameMapper in my Jest configuration to mock CSS imports. Additionally, I made sure all dependencies were compatible by aligning the versions of Jest, ts-jest, and jest-environment-jsdom. This setup allowed my tests to pass smoothly and improved compatibility.
