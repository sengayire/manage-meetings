FROM node:8.15

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

USER root

COPY dist /usr/src/app

EXPOSE 80:8080

RUN npm install -g serve@9.4.0 && \
  echo "0.0.0.0     mrm-dev.andela.com" >> /etc/hosts

CMD [ "serve", "-s", "-l", "8080" ]
