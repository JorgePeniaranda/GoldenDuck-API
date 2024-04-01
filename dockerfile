FROM node:18

# Create app directory
WORKDIR /app
COPY ./package.json .
RUN npm install

# Bundle app source
COPY . .
RUN npm run db:generate
RUN npm run db:migrate
RUN npm run build
CMD npm run start:prod