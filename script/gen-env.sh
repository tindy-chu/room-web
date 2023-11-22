#!/bin/sh

# Use shorthand to avoid covering the value of the env variable
# f=from, t=to, l=line, v=value, k=key, e=env
f='.env'
t='./public/env.js'

echo '***'
echo $STAGE
echo '***'

if [ "$STAGE" != "local" ]; then
  f='/var/www/html/.env'
  t='./env.js'
fi
echo "window._env_ = {" > $t

# Read each line from .env file
while IFS= read -r l; do
    v=$(echo "$l" | cut -d '=' -f2-)
    k=$(echo "$l" | cut -d '=' -f1)

    # Use eval to expand the variable
    e=$(eval echo "\$$k")
    if [ "$v" = "SKIP_ENV" ] || [ "$e" = "SKIP_ENV" ]; then
      continue
    fi

    if [ -z "$e" ] || [ "$STAGE" = "local" ]; then
      echo "  $k: '$v'," >> $t
    else
      echo "  $k: '$e'," >> $t
    fi
done < $f
echo '};' >> $t
