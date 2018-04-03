#!/bin/bash
git pull | grep 'up-to-date' &> /dev/null
if [ $? == 0 ]; then
   cd frontend
    npm run build &
    cd ..
fi
sudo /home/pi/.local/share/virtualenvs/iBot-yjzPlzR6/bin/python manage.py runserver 0.0.0.0:80 --settings=iBot.production_settings &
