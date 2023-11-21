#!/bin/bash

# Use shorthand to avoid covering the value of the env varibale
# f=from, t=to, l=line, v=value, k=key, e=env
f='.env'
t='./public/env.js'

echo '***';
echo $STAGE;
echo '***';

if [[ "$STAGE" != "local" ]]; then
  f='/var/www/html/.env'
  t='./env.js'
fi
echo "window._env_ = {" > $t;
while read -r l || [[ -n "$l" ]]; do
    v=${l#*=}
    k=${l%="$v"}

    e=$(eval "echo \$${k}")
    if [[ "$v" == "SKIP_ENV" || "$e" == "SKIP_ENV" ]]; then
      continue
    fi

    if [[ "$e" == "" || "$STAGE" == "local" ]]; then
      echo "  $k: '$v'," >> $t
    else
      echo "  $k: '$e'," >> $t
    fi
done < $f
echo '};' >> $t