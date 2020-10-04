FROM centos:7

ENV container docker
ENV PATH="/root/.cargo/bin:${PATH}"
RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;

RUN yum install -y gcc make
RUN yum install -y sqlite-devel && yum clean all
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs && yum clean all
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y && rustup toolchain install nightly && rustup default nightly
RUN npm install -g serve

COPY systemd/* /etc/systemd/system/
COPY api /root/api_server
COPY react /root/ui_server

RUN cd /root/api_server && cargo build --release
RUN cd /root/ui_server && npm install && npm run build

RUN systemctl enable api.service
RUN systemctl enable ui.service

EXPOSE 8000
EXPOSE 3000

VOLUME [ "/sys/fs/cgroup" ]

CMD ["/usr/sbin/init"]
