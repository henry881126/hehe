FROM  node:14.2.0-alpine3.11

COPY ./universal /universal

WORKDIR /universal

CMD ["node","app.js"]



