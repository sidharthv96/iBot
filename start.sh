#!/bin/bash
git pull
cd frontend
npm start build &
cd ..
sudo /home/pi/.local/share/virtualenvs/iBot-yjzPlzR6/bin/python manage.py runserver 0.0.0.0:80 --settings=iBot.production_settings &
