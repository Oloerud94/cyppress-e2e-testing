# folosim imaginea oficială cu Cypress și browsere
FROM cypress/included:15.12.0

# rulăm temporar ca root
USER root

# directorul unde vor fi testele
WORKDIR /e2e

# copiem proiectul în container
COPY . .

# instalăm dependințele proiectului
RUN npm install

# comanda care va rula când pornește containerul
CMD ["npx", "cypress", "run"]