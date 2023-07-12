# Use an Ubuntu-based image
FROM ubuntu

# Update package repositories and install packages
RUN apt-get update -y && \
  apt-get upgrade && \
  apt-get install -y curl libreoffice-core

# Get latest nodejs and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

# Set JAVA_HOME environment variable
RUN apt-get --no-install-recommends install libreoffice -y
RUN apt-get install -y libreoffice-java-common
RUN apt-get install unoconv

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD npm run start
