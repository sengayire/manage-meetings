FROM node:8.15

WORKDIR /mrm_front

USER root

COPY . .


EXPOSE 8080

RUN yarn install && \
  echo "0.0.0.0     mrm-dev.andela.com" >> /etc/hosts

CMD [ "yarn", "start:dev" ]
