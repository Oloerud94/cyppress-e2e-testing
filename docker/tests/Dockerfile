FROM cypress/included:15.12.0

USER root

WORKDIR /e2e

COPY . .

RUN npm install

CMD ["npx", "cypress", "run"]