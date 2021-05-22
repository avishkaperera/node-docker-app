FROM node:14.15.1

# below directive is not really needed but good to have. this sets the working directory of the container
# we can then use "." to access the directory instead of "/app"
WORKDIR /app 

# copying pakage.json and running npm i before copying ". ." all dir and files to working dir
# docker caches each step after executing. so if we copy all and run npm i, when code changes are done
# it will invalidate cache, copy all and run npm i each time. this way it will copy package.json
# run npm i and cache it. only last step will be run again and again when code changes happen
# usually when a step is run again all other subsequesnt steps are also run. this is an optimization
COPY package.json .

#RUN npm install
# instead
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi;

COPY . .

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
