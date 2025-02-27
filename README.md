# Terminal-Style Personal Webpage

## Overview

This project is a unique, interactive terminal-style personal webpage for Alper Semerci, a Software Engineering Manager. It simulates a command-line interface in the browser, allowing visitors to interact with the page using familiar terminal commands to learn about Alper's professional background, skills, and experiences.

## Features

- Interactive terminal interface
- Custom commands to display various sections of the personal profile
- Responsive design that works on desktop and mobile browsers
- Easy to customize and extend with new commands and information

## Technologies Used

- HTML5
- CSS3
- JavaScript
- [Xterm.js](https://xtermjs.org/) - Terminal emulator library

## Setup

1. Clone this repository or download the HTML file.
2. Open the HTML file in a modern web browser.

That's it! The webpage should now be running locally on your machine.

## Usage

When you open the webpage, you'll see a terminal interface with a welcome message and a prompt. Here are the available commands:

- `help`: Displays a list of available commands
- `about`: Shows a brief introduction
- `contact`: Displays contact information
- `skills`: Lists technical skills and languages
- `experience`: Shows professional experience
- `education`: Displays educational background
- `awards`: Lists awards and patents
- `clear`: Clears the terminal screen

To use a command, simply type it at the prompt and press Enter.

## Customization

To customize this webpage for your own use:

1. Open the HTML file in a text editor.
2. Locate the `header` and `header2` constants and update them with your own information.
3. Find the `commands` object and modify the content of each command to reflect your own details.
4. If you want to add new commands, add a new key-value pair to the `commands` object with the command name as the key and the response as the value.

Example of adding a new command:

```javascript
commands.projects = `My Projects:\r\n\
• Project 1: Description\r\n\
• Project 2: Description\r\n\
• Project 3: Description`;
```

Don't forget to add the new command to the `help` command list as well.

## Deployment

To deploy this webpage:

1. Upload the HTML file to your web hosting service.
2. Ensure that the necessary CSS and JavaScript files are correctly linked (they are currently using CDN links, so no additional upload is needed for those).

## Contributing

This project is currently maintained by Alper Semerci. If you have suggestions or improvements, please feel free to fork the repository and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please reach out to Alper Semerci:

- Email: alper@proteams.com
- LinkedIn: www.linkedin.com/in/alper-semerci
- Website: alpersemerci.com/me

