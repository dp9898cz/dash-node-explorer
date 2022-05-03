FROM ubuntu
WORKDIR /
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y software-properties-common gcc && \
    add-apt-repository -y ppa:deadsnakes/ppa

RUN apt-get update && apt-get install -y python3.8 python3-distutils python3-pip python3-apt
RUN apt-get update && apt-get install -y curl

COPY . .
RUN pip3 install -r requirements.txt

RUN bash init_dashnode.bash

EXPOSE 9998

# Copy the source from the current directory to the Working Directory inside the container