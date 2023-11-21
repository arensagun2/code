#!/bin/bash

CHECK_FILE_INFO_="ls -l /etc/passwd"
old_info=$($CHECK_FILE_INFO_)
new_info=$($CHECK_FILE_INFO_)
# $($CHECK_FILE_INFO_) can give the last modified time of /etc/passwd
# old_info and new_info are used to track if /etc/passwd has been modified
# XXXX is to be filled with the condition
while [ "$old_info" == "$new_info" ];  
do
   new_info=$($CHECK_FILE_INFO_)
   ./vprog
done
echo "Success! The passwd file has been changed"
