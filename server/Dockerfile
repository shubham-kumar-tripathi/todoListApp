FROM node:latest

# Create App Directory
RUN mkdir -p /home/MyNoteApp

WORKDIR /home/MyNoteApp

COPY package*.json ./

RUN npm install 

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","start"]
