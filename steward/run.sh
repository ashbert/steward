#!/bin/bash

: sudo sh -c 'chgrp admin /dev/bpf* ; chmod g+r /dev/bpf*; arp -d -a'

. ~/.nvm/nvm.sh

sudo node index.js
