#!/bin/bash

#---------------------------------------------------------
# Description:
# Create a file to generate auto complete suggestions on 1st screen
#
# Usage:
# sh buildStops.sh
#
# Author:
# Anuj Duggal <er.anujduggal@gmail.com>
#
# Date Created  :  25-Nov-2016
# Date Modified :  28-Nov-2016
#---------------------------------------------------------

#INIT_VARIABLES:
path_to_input_file="/Users/duggal/Desktop/pwa/projects/webserver_Route_Details/busRouteInfo/bus_stop_list.json"
path_to_output_file="/Users/duggal/Desktop/pwa/projects/bmtc/bmtc/scripts/bus_stop_list.txt"
path_to_temp_file="/Users/duggal/Desktop/pwa/projects/bmtc/bmtc/scripts/bus_stop_list_temp.txt"
new_file="/Users/duggal/Desktop/pwa/projects/bmtc/bmtc/scripts/auto_complete_bus_stop_list.txt"

# CHECK IF FILE EXISTS:
if [[ -f $path_to_input_file ]]
then
	# READ FILE:
	echo "[READ ] Started reading $path_to_input_file"

	# READ THE JSON FILE INTO A TEXT FILE LEAVING BEHIND THE DOUBLE QUOTES QUOTES:
	echo "[WRITE] Writing intermediate file"
	grep -o '".*"' $path_to_input_file | tr -d '"' > $path_to_temp_file
	
	# CREATE A NEW FILE:
	echo "" > $new_file
	
	# SEPARATE COMMA SEPARATED LIST AND GENEARTE AUTOCOMPLETE FILE DATA FORMAT:
	echo "[WRITE] Writing final file for auto complete suggestions"
	cat $path_to_temp_file | sed -n 1'p' | tr ',' '\n' | while read word; do
    		#echo $word
		echo "{ value: '$word', data: '${word:0:3}'}," >> $new_file 
	done

	# READ LINE BY LINE ------------------:
	#while read line;
	#do
		# echo $line

		# WRITE INTO JSON FILE:
		#echo "{'stop_name':'$line'}," >> $path_to_output_file
	#done < $path_to_input_file
	#echo "]" >> $path_to_output_file
	# ------------------------------------

	echo "[WRITE] Successfully written data to $path_to_output_file"
fi
