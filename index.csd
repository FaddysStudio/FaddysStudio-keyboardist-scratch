<CsoundSynthesizer>

<CsOptions>

;;-m0
-odac

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

#include "engine/process.part"
#include "engine/synthesizer2.part"

instr out

aChannel1 chnget "channel/1"
aChannel2 chnget "channel/2"

outs aChannel1, aChannel2

chnclear "channel/1"
chnclear "channel/2"

endin

schedule "out", 0, -1

</CsInstruments>

<CsScore>
</CsScore>

</CsoundSynthesizer>
