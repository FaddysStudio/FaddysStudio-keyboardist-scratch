working_directory=`pwd`

cd .keyboardist

csound -m0 --omacro:working_directory=`echo $working_directory` index.csd 2>/dev/null
