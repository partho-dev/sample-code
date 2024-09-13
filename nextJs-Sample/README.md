## Folder structure
```
.
├── README.md
├── babel.config.js
├── docker
│   ├── local
│   └── production
├── jest.config.js
├── jest.setup.js
├── jsconfig.json
├── k8s
│   ├── local
│   └── production
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── postcss.config.mjs
├── src
│   └── app
│       ├── about
│       │   └── page.js
│       ├── favicon.ico
│       ├── fonts
│       │   ├── GeistMonoVF.woff
│       │   └── GeistVF.woff
│       ├── globals.css
│       ├── layout.js
│       └── page.js
├── tailwind.config.js
└── test
    ├── __mocks__
    │   └── fileMock.js
    ├── e2e
    │   └── home.cy.js
    └── unit
        └── HomePage.test.js
```

### Setting up unit test using Jest for Next 14 
- `JEST` - Unit Test

- Install these packahes - `npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react jest-environment-jsdom`

- Create `babel.config.js` in the root project folder ( Refer teh above folder structure)
```
module.exports = {
  presets: ['next/babel'],
};
```

- Create `jest.config.js` on the root folder
```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
};
```

- Create `jest.setup.js` file on the root folder
```
import '@testing-library/jest-dom';
```

- create a mock file for test inside `test` folfer
- /test/__mocks__/fileMock.js
```
module.exports = 'test-file-stub';
```

- Adjust the scripts on Packagejson 
```
"scripts": {
  "test:unit": "jest"
}
```

- Create a homepage test file and write a simple test case which checks the contents on page
- `root/test/unit/HomePage.test.js`
```
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';

describe('Home page', () => {
  it('renders the homepage', () => {
    render(<Home />);
    expect(screen.getByText('This is Home page of NextJS')).toBeInTheDocument();
  });
});
```
- If tteest fails due to React not found, import that on Home page & on test page as well - `import React from 'react';`
- Execute the test - `npm run test:unit`


### Settimg up the End to End testing with Cypress
- Install `cypress` & its dependancies - `npm install cypress --save-dev`

- Dependancies 
```
npm install cypress-real-events --save-dev
npm install cypress-plugin-tab --save-dev

```

- create a test file for cypress in `root/test/e2e/home.cy.js` - But this is just a placeholder
- We need to write all test inside the `cypress`folder

- Once the cypress is installed
- Execute this command to get all folders of Cypress created automatically
- `npx cypress open`
- This will create this folders
```
/cypress
    /downloads
    /fixtures
    /support
cypress.config.js
```
- Create e2e inside cypress to have all e2e test cases inside this folder
```
/cypress
    /downloads
    /e2e
    /fixtures
    /support
cypress.config.js
```
- Cypress config file `cypress.config.js` [Auto generate while execite cypress open command]
- Ensure to update the `base_url`

```
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Your Next.js dev server URL
    setupNodeEvents(on, config) {
      // Add custom event listeners if needed
    },
  },
});

```



- Adjust the test case 
```
describe('Home page', () => {
  it('should navigate to the About page', () => {
    cy.visit('/');
    cy.contains('Go to About').click();
    cy.url().should('include', '/about');
    cy.contains('This is About page');
  });
});

```

- Update the script on package.json
```
{
  "scripts": {
    "test:e2e": "cypress open"
  }
}
```

- run the test - `npm run test:e2e`



### Dockerise the app
- Create an imahe 
- Remember the dockerfile is in /root/docker/local/Dockerfile
- so the docker image creation would be like this - `docker build -f ./docker/local/Dockerfile -t next-image .`

- Create a container - `docker run -d --name next-cont -p 3010:3000 next-image `

### To let the developers continue development and refelect on the container
- `docker run -it --rm -v $(pwd):/app -p 3000:3000 -w /app next-image npm run dev`

