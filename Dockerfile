FROM node:18
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING=true

COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY . /app
RUN npm ci --production
RUN npm install

EXPOSE  3000

CMD [ "npm", "run", "prod" ]