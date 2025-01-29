FROM ubuntu:latest
LABEL authors="janar"

ENTRYPOINT ["top", "-b"]