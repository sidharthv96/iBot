#!/bin/bash
git reset --hard origin/master
git pull | grep 'frontend' &> /dev/null
if [ $? == 0 ]; then
   cd frontend
   npm run build
   cd ..
fi
ps -a | grep 'python' &> /dev/null
if [ $? != 0 ]; then
    sudo /home/pi/.local/share/virtualenvs/iBot-yjzPlzR6/bin/python manage.py runserver 0.0.0.0:80 --settings=iBot.production_settings > log 2>&1 &
fi

