sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 13

SSample strget p4
p3 filelen SSample

aChannel [] diskin2 SSample

iLength lenarray aChannel

if iLength == 2 then

aLeft = aChannel [ 0 ]
aRight = aChannel [ 1 ]

elseif iLength == 1 then

aLeft = aChannel [ 0 ]
aRight = aChannel [ 0 ]

endif

if p ( 5 ) >= 0 then

chnmix aLeft, "left"

endif

if p ( 6 ) >= 0 then

chnmix aRight, "right"

endif

endin

instr out

aLeft chnget "left"
aRight chnget "right"

aLeft clip aLeft, 1, 1
aRight clip aRight, 1, 1

outs aLeft, aRight

chnclear "left"
chnclear "right"

endin
