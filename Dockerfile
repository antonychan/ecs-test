FROM ubuntu:14.04

# make sure apt is up to date
RUN apt-get update
RUN apt-get -y -qq install python wget git git-core

# install nodejs and npm
RUN \
  wget -O - http://nodejs.org/dist/v0.10.29/node-v0.10.29-linux-x64.tar.gz \
  | tar xzf - --strip-components=1 --exclude="README.md" --exclude="LICENSE" \
  --exclude="ChangeLog" -C "/usr/local"

# Set the working directory
WORKDIR   /src

#

CMD ["/bin/bash"]
