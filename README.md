# result-getter


[`result-getter`]((https://result-getter.netlify.app)) is a responsive web application built with SvelteKit and Typescript on Netlify that allows students to get their aggregate results, SGPA, and CGPA using their hall ticket number.

## Features

### Aggregate results
Use when the JNTUH server is up and running nicely.
- Get your aggregate results by entering your hall ticket number.
- View your total marks, percentage, and grade.
- View your SGPA and CGPA.

### Real-time results
Use when the JNTUH server is down or slow.
- Get your results for one single examination series by entering your hall ticket number and choosing the exam.
- View your total marks, percentage, and grade.
- View your SGPA.

## API
To get aggregate results, send a `GET` request to `https://result-getter.netlify.app/api/v1/normalizedresults?htno=[Your Hallticket Number]`.

## Code
This application is built with SvelteKit and Typescript and should be easy to understand and modify. Feel free to fork and contribute.

### Run locally
1. Make sure you have Node.js installed.
2. Clone the repository.
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the development server.

Run `npm run build` to build the application.

### Contributing
Feel free to contribute to this project. You can create a pull request or open an issue.

## License
This project is licensed under the GPL-2.0 License - see the [LICENSE](LICENSE) file for details.
