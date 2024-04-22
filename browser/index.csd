<CsoundSynthesizer>

<CsOptions>

-Lstdin
-odac

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr play

iIndex = 4
iCount pcount
iDuration = 0

while iIndex <= iCount do

SSample strget p ( iIndex )

iSample filelen SSample

SNote sprintf {{ i "note" %f %f "%s" }}, iDuration, iSample, SSample

scoreline_i SNote

iDuration += iSample

iIndex += 1

od

p3 = iDuration

schedule "exit", iDuration, 0

endin

instr note

SSample strget p4

aLeft, aRight diskin2 SSample

chnmix aLeft, "left"
chnmix aRight, "right"

endin

instr out

aLeft chnget "left"
aRight chnget "right"

outs aLeft, aRight

chnclear "left"
chnclear "right"

endin

schedule "out", 0, -1

instr exit

exitnow

endin

;scoreline_i {{ i "play" 0 0 "dom.wav" }}

</CsInstruments>

<CSNote>
</CSNote>

</CsoundSynthesizer>
